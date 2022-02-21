import { formatRelative } from 'date-fns';
export default function formatTime(seconds: any) {
    let formatTime = '';
    if (seconds) {
        formatTime = formatRelative(new Date(seconds * 1000), new Date());
        formatTime = formatTime.charAt(0).toUpperCase() + formatTime.slice(1);
    }
    return formatTime;
}
