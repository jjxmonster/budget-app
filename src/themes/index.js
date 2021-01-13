export const formatCurrency = (value, language) => {

    const number = Number(value);

    switch (language) {
        case 'pl':
            return new Intl.NumberFormat('pl', { style: 'currency', currency: 'PLN' }).format(number);
        case 'en':
            return new Intl.NumberFormat('en-IN', {style: 'currency', currency: 'EUR' }).format(number);
            
        default:
            break;
    }
}

export const formatDate = string => {
    const date = new Date(string)

    return new Intl.DateTimeFormat('pl').format(date)
}
