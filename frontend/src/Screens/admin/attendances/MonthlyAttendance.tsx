import AttendanceSheet from './AttendanceSheet'
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAttendance } from "../../../actions/attendance_actions"
import { useNavigate } from "react-router-dom"
import { listUsers } from "../../../actions/user_actions";
import ConvertToMonth from '../../../components/ConvertToMonth';
import DailyAttendance from './DailyAttendance'

function MonthlyAttendance() {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const { userInfo } = useSelector((state) => state.userLogin);

    const { attendance, error, loading } = useSelector(state => state.getAttendance)
    const { users } = useSelector(state => state.userList)
    const monthDateList = attendance?.map(item => Number((item.date).split("-")[1])) //[06,06,06]
    const monthDateSet = [...new Set(monthDateList)]

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
            dispatch(getAttendance())
        } else {
            navigate('./login')
        }
    }, [navigate, dispatch, userInfo])

    const filteredAttendance = (number) => attendance.filter(item => Number((item.date).split("-")[1]) === number)


    return (
        <div className='container'>
            {monthDateSet.map(item => (
                <>
                    <div class="h1 text-center text-dark" id="pageHeaderTitle">
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
