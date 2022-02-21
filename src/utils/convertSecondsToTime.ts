function convertSecondToTime(seconds: number) {
    seconds = Math.floor(seconds);
    let hours = 0;
    let minute = 0;
    let second = 0;
    if (seconds >= 3600) {
        hours = Math.floor(seconds / 3600);
        minute = Math.floor((seconds - hours * 3600) / 60);
        second = seconds - hours * 3600 - minute * 60;
        return `${String('0' + hours).slice(-2)}:${String('0' + minute).slice(-2)}:${String(
            '0' + second
        ).slice(-2)}`;
    } else if (seconds >= 60) {
        minute = Math.floor(seconds / 60);
        second = seconds - minute * 60;
        return `${String('0' + minute).slice(-2)}:${String('0' + second).slice(-2)}`;
    } else {
        return `00:${String('0' + seconds).slice(-2)}`;
    }
}

export default convertSecondToTime;
