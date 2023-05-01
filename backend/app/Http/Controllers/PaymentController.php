<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Order;
use App\Models\Coupon;
use App\Models\Product;
use App\Models\Transaction;
use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\OrderController;
use App\Models\UserAddress;
use Illuminate\Support\Facades\Validator;

class PaymentController extends ApiController
{
    public function send(Request $request)
    {
        // return $request;
        $validator = Validator::make($request->all(), [
            'cart' => 'required',
            'cart.*.id' => 'required|integer',
            'cart.*.qty' => 'required|integer',
            'address_id' => 'required|integer|exists:user_addresses,id',
            'coupon' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return $this->errorResponse($validator->messages(), 422);
        }

        if (UserAddress::find($request->address_id) == null) {
            return $this->errorResponse(['error' => ['آدرس وارد شده، حذف و یا وجود ندارد']], 422);
        }

        $totalAmount = 0;
        foreach ($request->cart as $orderItem) {
            $product = Product::findOrFail($orderItem['id']);
            if ($product->quantity < $orderItem['qty']) {
                return $this->errorResponse(['error' => ['تعداد محصول وارد شده اشتباه است']], 422);
            }

            $totalAmount += $product->is_sale ? $product->sale_price * $orderItem['qty'] : $product->price * $orderItem['qty'];
        }

        $couponAmount = 0;
        $coupon = null;

        if ($request->coupon) {
            $coupon = Coupon::where('code', $request->coupon)->where('expired_at', '>', Carbon::now())->first();

            if ($coupon == null) {
                return $this->errorResponse(['error' => ['کد تخفیف وارد شده وجود ندارد']], 422);
            }

            if (Order::where('user_id', Auth()->id())->where('coupon_id', $coupon->id)->where('payment_status', 1)->exists()) {
                return $this->errorResponse(['error' => ['شما قبلا از این کد تخفیف استفاده کرده اید']], 422);
            }

            $couponAmount = ($totalAmount * $coupon->percentage) / 100;
        }

        $payingAmount = $totalAmount - $couponAmount;

        $amounts = [
            'totalAmount' => $totalAmount,
            'couponAmount' => $couponAmount,
            'payingAmount' => $payingAmount,
        ];

        // return $amounts;
        function curl_post($url, $params)
        {
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($params));
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_HTTPHEADER, [
                'Content-Type: application/json',
            ]);
            $res = curl_exec($ch);
            curl_close($ch);

            return $res;
        }

        function token($api, $amount, $callback, $mobile, $email, $description)
        {
            return curl_post('https://sandbox.shepa.com/api/v1/token', [
                'api' => $api,
                'amount' => $amount,
                'callback' => $callback,
                'mobile' => $mobile,
                'email' => $email,
                'description' => $description,

            ]);
        }

        $api = env('PAY_IR_API_KEY');
        $amount = $payingAmount . '0';
        $mobile = "09102911947";
        $email = "test@gmail.com";
        $description = "خرید تستی";
        $callback = env('PAY_IR_CALLBACK_URL');
        $result = token($api, $amount, $callback, $mobile, $email, $description);
        $result = json_decode($result);

        if (!empty($result->success)) {
            OrderController::create($request, $coupon, $amounts, $result->result->token);
            return $this->successResponse([
                'url' => $result->result->url
            ]);
        } else {
            return $this->errorResponse($result->errors, 0);
        }
    }

    public function verify(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'token' => 'required',
            'status' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->errorResponse($validator->messages(), 422);
        }

        function curl_post($url, $params)
        {
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($params));
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_HTTPHEADER, [
                'Content-Type: application/json',
            ]);
            $res = curl_exec($ch);
            curl_close($ch);

            return $res;
        }

        function verify($api, $token, $amount)
        {
            return curl_post('https://sandbox.shepa.com/api/v1/verify', [
                'api' => $api,
                'token' => $token,
                'amount' => $amount,
            ]);
        }

        if (!empty($request->status) && $request->status == "success") {
            $api = env('PAY_IR_API_KEY');
            $token = $request->token;
            $trans = Transaction::where('token', $request->token)->first();
            $order = Order::where('id', $trans->order_id)->first();
            $amount = $order->paying_amount . 0;
            $result = json_decode(verify($api, $token, $amount));
            if ($result->success) {
                OrderController::update($token, $result->result->transaction_id);
                return $this->successResponse([
                    'status' => true,
                    'transId' => $result->result->transaction_id
                ], 200);
            } else {
                if ($result->errorCode == 3) {
                    return $this->successResponse([
                        'status' => false,
                        'error' => 'این تراکنش قبلا در سیستم ثبت شده است.'
                    ], 200);
                } else {
                    return $this->successResponse([
                        'status' => false,
                        'error' => 'تراکنش شما ناموفق بود'
                    ], 200);
                }
            }
        } else {
            return $this->successResponse([
                'status' => false,
                'error' => 'تراکنش شما ناموفق بود.'
            ], 200);
        }
    }
}
