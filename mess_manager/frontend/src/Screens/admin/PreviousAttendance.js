// for this month bill
import React from "react";
import { Link } from "react-router-dom";

function PreviousAttendance() {
    return (
        <div>
            <div class="h1 text-center text-dark" id="pageHeaderTitle">
                Previous Attendance From  <code>MM-YYYY</code>  to <code>MM-YYYY</code>
            </div>



            {/* boostrap table for all the users , room no , current bill added */}
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Year</th>
                        <th scope="col">Month</th>
                        <th scope="col">Go to</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>2021</td>
                        <td>December</td>
                        <td>See</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>2021</td>
                        <td>November</td>
                        <td>See</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>2021</td>
                        <td>October</td>
                        <button className="button button-primary">See</button>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default PreviousAttendance;
