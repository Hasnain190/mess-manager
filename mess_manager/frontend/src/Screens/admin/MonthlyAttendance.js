import AttendanceSheet from './AttendanceSheet'
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAttendance } from "../../actions/attendance_actions"
import { useNavigate } from "react-router-dom"
import { listUsers } from "../../actions/user_actions";



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
            convertToMonth(6)

            console.log(monthDateList)


        } else {
            navigate('./login')
        }
    }, [navigate, dispatch, userInfo])

    function IdToStudant({ id }) {
        const name = users?.find(user => user.id === id).username
        return <div>{name}</div>
    }

    const filteredAttendance = (number) => attendance.filter(item => Number((item.date).split("-")[1]) === number)



    const [month, setMonth] = useState()
    function convertToMonth(number) {
        const monthName = Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(`${number}`));
        setMonth(monthName)
        return monthName

    }

    return (
        <div className="container">

            {monthDateSet.map(item => (
                <>

                    <div class="h1 text-center text-dark" id="pageHeaderTitle">
                        Attendance Sheet of <code>{item}</code>
                    </div>
                    <AttendanceSheet key={item} month={item} filteredAttendance={filteredAttendance(item)} />
                </>

            ))
            }
        </div>
    )
}


export default MonthlyAttendance
