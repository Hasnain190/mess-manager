


export default function convertToMonth(
    monthNumber: string | number
) {
    const date = new Date(2023, Number(monthNumber) - 1);
    return new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);

}
