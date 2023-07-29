// for this month bill
import React from "react";

import Downloader from "../../../components/Downloader";
import { Attendance } from '../../../types/attendanceTypes'
import convertToMonth from "../../../components/ConvertToMonth"

import { headingRow, descriptionRow } from "../../../components/ExcelMeta/Attendance";

interface propsTypes {
    month: string;
    day: number;
    attendance: Attendance[]
}

function AttendanceSheet({
    month,
    day,
    attendance
}: propsTypes) {


    const data = attendance.map((attendance: Attendance) => ({
        Student: attendance.student,
        first_time: attendance.first_time,
        second_time: attendance.second_time


    }))
    const dataWithHeaders = [
        // Add the heading row
        headingRow,

        descriptionRow,


        [],
        // Heading row
        ['Student', 'First Time', "Second Time"],
        // Original Data
        ...data.map((attendance) => [
            attendance.Student,
            attendance.first_time,
            attendance.second_time
        ]),
    ];
    return (

        <div  >


            <Downloader tableData={dataWithHeaders} htmlInputId={`attendance-${day}`} name={"Attendance-Sheet"} />

            <div id={`attendance-${day}`}>





                <div className="h5 text-start">
                    {`${convertToMonth(month)}-${day}`}

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

                    {attendance?.map((item: Attendance, index) => <tbody  >

                        <tr>

                            <th key={item.id} scope="row">{index}</th>

                            <td>{item?.student}</td>

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
