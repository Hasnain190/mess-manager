import AttendanceSheet from './AttendanceSheet'
import React from "react";


function DailyAttendance({
    month,
    filteredMonthlyAttendance
}: any) {
    const attendance = filteredMonthlyAttendance;
    const dailyDateList = attendance?.map((item: any) => Number((item.date).split("-")[2])) //[06,06,06]
    const dailyDateSet = [...new Set(dailyDateList)]


    const filteredAttendance = (number: any) => attendance.filter((item: any) => Number((item.date).split("-")[2]) === number)


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
