export default function getMoney(money: any) {
    if (typeof money !== 'number' || money === 0) {
        return 'Chưa có thông tin';
    }
    return new Intl.NumberFormat('de-DE').format(money) + ' USD';
}
