// this screen is used to display the dashboard for admin user
// this screen displays the number of messages, and users
// this screen also displays the chceckbox to mark the attendance of the users in the today's meal

// attendance checkbox

import React from "react";
import Button  from "../../components/Button";
function MarkAttendance() {
   const today = new Date().toISOString().substr(0, 10);
  return (
    <section>
      {/* table for all the users */}
      {/* heading for attendance */}
        <div className="row">
            <div className="col-md-12 text-dark">
            <h3>Mark Attendance</h3> for <h4>{today}</h4>'s meal
            </div>
        </div>


      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Room no.</th>
            <th scope="col">First Time</th>
            <th scope="col">Second Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Hasnain Sikandar</td>
            <td>32</td>

            <td>
             
             
                <Button/>
             
            </td>
            <td>
                <Button/>
             
            </td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Taimoor Ali</td>
            <td>32</td>

            <td>
              <Button/>
            </td>
            <td>
              <Button/>
            </td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Mayo</td>
            <td>40</td>
            <td>
              <Button/>
            </td>
            <td>
                <Button/>
            </td>
          </tr>
        </tbody>
      </table>


      {/* bootstrap table which shows total attenandance , absentees doubles and total members  */}
        <div className="row">
            <div className="col-md-12 text-dark">
            <h3>{today}'s totals </h3>
            </div>
        </div>
        <table className="table table-bordered">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Total Members</th>
                <th scope="col">Total Absentees</th>
                <th scope="col">Total Doubles</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <th scope="row">1</th>
                <td>3</td>
                <td>2</td>
                <td>1</td>
                </tr>
            </tbody>    
        </table>


    </section>
  );
}



export default MarkAttendance;
