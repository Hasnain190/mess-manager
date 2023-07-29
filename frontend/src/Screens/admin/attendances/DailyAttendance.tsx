import AttendanceSheet from './AttendanceSheet'
import React from "react";
import { Attendance } from '../../../types/attendanceTypes';
interface propsTypes {
    month: string;

    filteredMonthlyAttendance: Attendance[]
}
function DailyAttendance({
    month,
    filteredMonthlyAttendance
}: propsTypes) {
    const attendance = filteredMonthlyAttendance;
    const dailyDateList = attendance?.map((item: Attendance) => Number((item.date).split("-")[2])) //[06,06,06]
    const dailyDateSet = [...new Set(dailyDateList)]


    const filteredAttendance = (number: number) => attendance.filter((item: Attendance) => Number((item.date).split("-")[2]) === number)


    return (
        <div>
            {dailyDateSet.map(item => (
                <>
                    <AttendanceSheet month={month} day={item} attendance={filteredAttendance(item)} />
                </>
            ))

            }

        </div>
    )
}


export default DailyAttendance
