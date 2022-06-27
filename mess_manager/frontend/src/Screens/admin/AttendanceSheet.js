// for this month bill
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAttendance } from "../../actions/attendance_actions"
import { useNavigate } from "react-router-dom"
import { listUsers } from "../../actions/user_actions";



function AttendanceSheet({ month, filteredAttendance }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const attendance = filteredAttendance;

    const { userInfo } = useSelector((state) => state.userLogin);

    // const { attendance, error, loading } = useSelector(state => state.getAttendance)
    const { users } = useSelector(state => state.userList)
    // useEffect(() => {
    //     if (userInfo && userInfo.isAdmin) {
    //         dispatch(listUsers())
    //         dispatch(getAttendance())


    //     } else {
    //         navigate('./login')
    //     }
    // }, [navigate, dispatch, userInfo])




    function IdToStudant({ id }) {
        const name = users?.find(user => user.id === id).username
        return <div>{name}</div>
    }


    return (
        <div className="container">

            <div className="h5 text-start">
                {`${month}-27`}
            </div>



            {/* boostrap table for all the users , room no , current bill added */}
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Studants</th>
                        <th scope="col">First Time</th>
                        <th scope="col">Second Time</th>
                    </tr>
                </thead>
                {attendance?.map(item => (





                    <tbody  >
                        <tr>
                            <th key={item.id} scope="row">{item.id}</th>
                            <td><IdToStudant id={(item.studant)} /></td>
                            <td>{item.first_time}</td>
                            <td>{item.second_time}</td>
                        </tr>
                    </tbody>

                ))}
            </table>
        </div >
    );
}

export default AttendanceSheet;
