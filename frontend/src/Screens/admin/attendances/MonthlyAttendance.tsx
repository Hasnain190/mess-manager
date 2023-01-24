import AttendanceSheet from './AttendanceSheet'
import React, { useState, useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { getAttendance } from "../../../features/attendance/attendance_actions_creators"
import { useNavigate } from "react-router-dom"
import { listUsers } from "../../../features/user/user_actions_creators";
import ConvertToMonth from '../../../components/ConvertToMonth';
import DailyAttendance from './DailyAttendance'

function MonthlyAttendance() {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    const { userInfo } = useAppSelector((state) => state.userLogin);

    const { attendance, error, loading } = useAppSelector(state => state.getAttendance)
    const { users } = useAppSelector(state => state.userList)
    const monthDateList = attendance?.map((item: any) => Number((item.date).split("-")[1])) //[06,06,06]
    const monthDateSet = [...new Set(monthDateList)]

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
            dispatch(getAttendance())
        } else {
            navigate('./login')
        }
    }, [navigate, dispatch, userInfo])

    const filteredAttendance = (number: any) => attendance.filter((item: any) => Number((item.date).split("-")[1]) === number)


    return (

        <div className='container'>
            {monthDateSet.map(item => (

                <>

                    <div className="h1 text-center text-dark" id="pageHeaderTitle">

                        Attendance of <code><ConvertToMonth number={(item)} /></code>
                    </div>


                    <DailyAttendance key={item} month={item} filteredMonthlyAttendance={filteredAttendance(item)} />
                </>
            ))
            }
        </div>
    )
}

export default MonthlyAttendance
