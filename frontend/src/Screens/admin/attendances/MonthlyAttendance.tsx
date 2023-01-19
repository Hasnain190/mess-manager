// @ts-expect-error TS(6142): Module './AttendanceSheet' was resolved to 'F:/mes... Remove this comment to see the full error message
import AttendanceSheet from './AttendanceSheet'
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAttendance } from "../../../actions/attendance_actions"
import { useNavigate } from "react-router-dom"
import { listUsers } from "../../../actions/user_actions";
// @ts-expect-error TS(6142): Module '../../../components/ConvertToMonth' was re... Remove this comment to see the full error message
import ConvertToMonth from '../../../components/ConvertToMonth';
// @ts-expect-error TS(6142): Module './DailyAttendance' was resolved to 'F:/mes... Remove this comment to see the full error message
import DailyAttendance from './DailyAttendance'

function MonthlyAttendance() {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    // @ts-expect-error TS(2339): Property 'userLogin' does not exist on type 'Defau... Remove this comment to see the full error message
    const { userInfo } = useSelector((state) => state.userLogin);

    // @ts-expect-error TS(2339): Property 'getAttendance' does not exist on type 'D... Remove this comment to see the full error message
    const { attendance, error, loading } = useSelector(state => state.getAttendance)
    // @ts-expect-error TS(2339): Property 'userList' does not exist on type 'Defaul... Remove this comment to see the full error message
    const { users } = useSelector(state => state.userList)
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
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className='container'>
            {monthDateSet.map(item => (
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <>
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <div class="h1 text-center text-dark" id="pageHeaderTitle">
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        Attendance of <code><ConvertToMonth number={(item)} /></code>
                    </div>

                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <DailyAttendance key={item} month={item} filteredMonthlyAttendance={filteredAttendance(item)} />
                </>
            ))
            }
        </div>
    )
}

export default MonthlyAttendance
