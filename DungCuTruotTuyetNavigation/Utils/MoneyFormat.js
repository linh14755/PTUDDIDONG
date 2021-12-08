
export const moneyFormat = (num) => `${num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VNĐ`

