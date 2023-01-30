// for this month bill
import React from "react";

import Downloader from "../../../components/Downloader";


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

                    {attendance?.map((item) => <tbody  >

                        <tr>

                            <th key={item.id} scope="row">{item.id}</th>

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
