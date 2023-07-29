
type TAttendance = {
    id: number;
    date: string;
    first_time: string;
    second_time: string;
    student: string;
    student_id: number
}
export function counter(attendance: TAttendance[], date: string) {



    let countFirstTimePrs = 0;
    let countSecondTimePrs = 0;
    for (const i of attendance) {
        if (i.date === date && i.first_time === "present") {
            countFirstTimePrs++;
        }
        if (i.date === date && i.second_time === "present") {
            countSecondTimePrs++;
        }
    }

    return { countFirstTimePrs, countSecondTimePrs }

}
