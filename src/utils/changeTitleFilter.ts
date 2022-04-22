export function changeTitleFilter(title: string) {
    if (title === 'Mới nhất') {
        return 'Mới cập nhật';
    } else {
        return title;
    }
}
