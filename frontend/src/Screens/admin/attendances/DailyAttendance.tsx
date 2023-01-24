import AttendanceSheet from './AttendanceSheet'
import React, { useState, useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";

import { getAttendance } from "../../../features/attendance/attendance_actions_creators"
import { useNavigate } from "react-router-dom"
import { listUsers } from "../../../features/user/user_actions_creators";





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
                    <AttendanceSheet month={month} day={item} filteredAttendance={filteredAttendance(item)} />
                </>
            ))

            }

        </div>
    )
}


export default DailyAttendance
