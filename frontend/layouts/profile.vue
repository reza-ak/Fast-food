<template>
  <section class="profile_section layout_padding">
    <div class="container">
      <div class="row">
        <div class="col-sm-12 col-lg-3">
          <ul class="list-group">
            <li class="list-group-item">
              <a href="./index.html">اطلاعات کاربر</a>
            </li>
            <li class="list-group-item">
              <a href="./addresses.html">آدرس ها</a>
            </li>
            <li class="list-group-item">
              <a href="./orders.html">سفارشات</a>
            </li>
            <li class="list-group-item">
              <a href="./transactions.html">تراکنش ها</a>
            </li>
            <li class="list-group-item">
              <a href="#">خروج</a>
            </li>
          </ul>
        </div>

        <div class="col-sm-12 col-lg-9">
          <slot />
        </div>
      </div>
    </div>
  </section>
</template>
