export default function getRunTime(time?: number | null) {
    if (typeof time !== 'number') {
        return '0h';
    }
    if (time < 60) {
        return `${time}m`;
    }
    const hours = Math.floor(time / 60);
    const minute = time - 60 * hours;
    return `${hours}h${minute}m`;
}
