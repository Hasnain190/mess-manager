import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { getMonthlyAttendance } from "../../../features/attendance/attendance_actions_creators"
import { useNavigate } from "react-router-dom"
import { listUsers } from "../../../features/user/user_actions_creators";
import DailyAttendance from './DailyAttendance'
import Loader from '../../../components/Loader';
import Message from '../../../components/Message';

function MonthlyAttendance() {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const thisYearMonth = (new Date().toISOString()).slice(0, 7);

    const [yearMonth, setYearMonth] = useState(thisYearMonth)
    const month = yearMonth.split('-')[1]


    const { userInfo } = useAppSelector((state) => state.userLogin);

    const { attendance, error, loading } = useAppSelector(state => state.getMonthlyAttendance)


    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
            dispatch(getMonthlyAttendance(Number(month)))
        } else {
            navigate('./login')
        }
    }, [navigate, dispatch, userInfo, month])


    return (

        <div className='container'>
            <div className="h1 text-center text-dark" id="pageHeaderTitle">
                Attendance of <code>
                    <input type="month" id="month" value={yearMonth} onChange={(e) => { setYearMonth(e.target.value) }} max={yearMonth} />
                </code>
            </div>
            {loading ? <Loader ></Loader> : error ? <Message>{error}</Message> :

                <DailyAttendance month={month} filteredMonthlyAttendance={attendance} />

            }

        </div>
    )
}

export default MonthlyAttendance
