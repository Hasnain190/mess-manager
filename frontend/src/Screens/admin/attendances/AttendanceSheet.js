// for this month bill
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAttendance } from "../../../actions/attendance_actions"
import { useNavigate } from "react-router-dom"
import { listUsers } from "../../../actions/user_actions";
import Downloader from "../../../components/Downloader";
import ConvertToMonth from "../../../components/ConvertToMonth";



function AttendanceSheet({ month, day, filteredAttendance }) {
    const attendance = filteredAttendance;


    const { users } = useSelector(state => state.userList)


    function IdToStudent({ id }) {
        const name = users?.find(user => user.id === id).username
        return <div>{name}</div>
    }

    return (
        <div  >

            <Downloader htmlInputId={`attendance-${day}`} name={"Attendance-Sheet"} />
            <div id={`attendance-${day}`}>




                <div className="h5 text-start">
                    {/* {`${month}-${day}`} */}
                    <ConvertToMonth number={month} /> - {day}
                </div>

                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Students</th>
                            <th scope="col">First Time</th>
                            <th scope="col">Second Time</th>
                        </tr>
                    </thead>
                    {attendance?.map(item => (
                        <tbody  >
                            <tr>
                                <th key={item.id} scope="row">{item.id}</th>
                                <td><IdToStudent id={(item.student)} /></td>
                                <td>{item.first_time}</td>
                                <td>{item.second_time}</td>
                            </tr>
                        </tbody>

                    ))}
                </table>
            </div>
        </div >

    );
}

export default AttendanceSheet;
