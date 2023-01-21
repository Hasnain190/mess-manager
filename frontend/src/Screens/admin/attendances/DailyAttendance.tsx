// @ts-expect-error TS(6142): Module './AttendanceSheet' was resolved to 'F:/mes... Remove this comment to see the full error message
import AttendanceSheet from './AttendanceSheet'
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAttendance } from "../../../actions/attendance_actions"
import { useNavigate } from "react-router-dom"
import { listUsers } from "../../../actions/user_actions";




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
