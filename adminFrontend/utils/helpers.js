const NumberFormat = (number) => {
  return new Intl.NumberFormat().format(number)
}

const SalePercent = (price, salePrice) => {
  return Math.round(((price - salePrice) / price) * 100)
}

export { NumberFormat, SalePercent}