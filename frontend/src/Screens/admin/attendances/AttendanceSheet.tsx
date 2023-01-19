// for this month bill
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAttendance } from "../../../actions/attendance_actions"
import { useNavigate } from "react-router-dom"
import { listUsers } from "../../../actions/user_actions";
// @ts-expect-error TS(6142): Module '../../../components/Downloader' was resolv... Remove this comment to see the full error message
import Downloader from "../../../components/Downloader";
// @ts-expect-error TS(6142): Module '../../../components/ConvertToMonth' was re... Remove this comment to see the full error message
import ConvertToMonth from "../../../components/ConvertToMonth";



function AttendanceSheet({
    month,
    day,
    filteredAttendance
}: any) {
    const attendance = filteredAttendance;


    // @ts-expect-error TS(2339): Property 'userList' does not exist on type 'Defaul... Remove this comment to see the full error message
    const { users } = useSelector(state => state.userList)


    function IdToStudent({
        id
    }: any) {
        const name = users?.find((user: any) => user.id === id).username
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        return <div>{name}</div>
    }

    return (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div  >

            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Downloader htmlInputId={`attendance-${day}`} name={"Attendance-Sheet"} />
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div id={`attendance-${day}`}>




                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <div className="h5 text-start">
                    {/* {`${month}-${day}`} */}
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <ConvertToMonth number={month} /> - {day}
                </div>

                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <table class="table table-striped">
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <thead>
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <tr>
                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            <th scope="col">#</th>
                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            <th scope="col">Students</th>
                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            <th scope="col">First Time</th>
                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            <th scope="col">Second Time</th>
                        </tr>
                    </thead>
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    {attendance?.map((item: any) => <tbody  >
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <tr>
                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            <th key={item.id} scope="row">{item.id}</th>
                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            <td><IdToStudent id={(item.student)} /></td>
                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            <td>{item.first_time}</td>
                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            <td>{item.second_time}</td>
                        </tr>
                    </tbody>)}
                </table>
            </div>
        </div >
    );
}

export default AttendanceSheet;
