

export function counter(attendance: any, date: any) {

    const countFirstTime = attendance?.filter((item: any) => item.date === date && item.first_time === 'present').length;

    const countSecondTime = attendance?.filter((item: any) => item.date === date && item.second_time === "present").length

    const total = countFirstTime + countSecondTime

    return total

}
