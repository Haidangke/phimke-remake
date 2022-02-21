function chooseLanguage(vietnamese: string, english: string, language: 'vi' | 'en') {
    return language === 'vi' ? vietnamese : english;
}

export default chooseLanguage;
