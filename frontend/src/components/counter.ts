

export function counter(attendance, date) {

    const countFirstTime = attendance?.filter(item => item.date === date && item.first_time === 'present').length;

    const countSecondTime = attendance?.filter(item => item.date === date && item.second_time === "present").length

    const total = countFirstTime + countSecondTime

    return total

}
