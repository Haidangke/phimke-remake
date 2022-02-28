export const convertTitle = (title: string) => {
    const lowerCase = title.toLowerCase();
    const re = /loklok/gi;
    const newTitle = lowerCase.replace(re, 'phimke');
    return newTitle;
};
