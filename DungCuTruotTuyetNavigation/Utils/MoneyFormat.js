
export default function moneyFormat(num) {
    return parseInt(num).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '1.') + ' VNĐ'
}