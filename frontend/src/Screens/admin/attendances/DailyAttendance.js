import AttendanceSheet from './AttendanceSheet'
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAttendance } from "../../../actions/attendance_actions"
import { useNavigate } from "react-router-dom"
import { listUsers } from "../../../actions/user_actions";




function DailyAttendance({ month, filteredMonthlyAttendance }) {
    const attendance = filteredMonthlyAttendance;
    const dailyDateList = attendance?.map(item => Number((item.date).split("-")[2])) //[06,06,06]
    const dailyDateSet = [...new Set(dailyDateList)]


    const filteredAttendance = (number) => attendance.filter(item => Number((item.date).split("-")[2]) === number)


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
