// for this month bill
import React, { useState, useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";

import { getAttendance } from "../../../features/attendance/attendance_actions_creators"
import { useNavigate } from "react-router-dom"
import { listUsers } from "../../../features/user/user_actions_creators";
import Downloader from "../../../components/Downloader";
import ConvertToMonth from "../../../components/ConvertToMonth";
import IdToStudent from "../../../components/IdToStudent";


function AttendanceSheet({
    month,
    day,
    attendance
}: any) {
    console.log(attendance)
    return (

        <div  >


            <Downloader htmlInputId={`attendance-${day}`} name={"Attendance-Sheet"} />

            <div id={`attendance-${day}`}>





                <div className="h5 text-start">
                    {`${month}-${day}`}

                    {/* <ConvertToMonth number={Number(month)} /> - {day} */}
                </div>


                <table className="table table-striped">

                    <thead>

                        <tr>

                            <th scope="col">#</th>

                            <th scope="col">Students</th>

                            <th scope="col">First Time</th>

                            <th scope="col">Second Time</th>
                        </tr>
                    </thead>

                    {attendance?.map((item: any) => <tbody  >

                        <tr>

                            <th key={item.id} scope="row">{item.id}</th>

                            <td><IdToStudent id={(item?.student)} /></td>

                            <td>{item.first_time}</td>

                            <td>{item.second_time}</td>
                        </tr>
                    </tbody>)}
                </table>
            </div>
        </div >
    );
}

export default AttendanceSheet;
