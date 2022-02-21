function approvedFilm(first_air_date?: string, release_date?: string) {
    if (!first_air_date && !release_date) return false;
    const currentYear = new Date().getFullYear();
    const date = first_air_date || release_date;
    const year = parseInt(date?.split('-')[0] as string);
    if (year <= currentYear && year >= 2000) {
        return true;
    }
    return false;
}

export default approvedFilm;
