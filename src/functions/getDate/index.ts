export function getDate(obj: string | undefined) {
    if (obj) {
        const paymentDate = new Date(obj);
        const formattedDate = paymentDate.toISOString().split('T')[0];
        return formattedDate
    }
    return ''
}