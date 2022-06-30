import React, { useEffect, useState } from "react";

function ThisMonthBill() {









  return (
    <div>
      <div class="h1 text-center text-dark" id="pageHeaderTitle">
        Bill July
      </div>

      <div class="text-end">
        <button class="btn btn-primary">Download PDF</button>
      </div>

      {/* boostrap table for all the users , room no , current bill added */}
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Room No</th>
            <th scope="col">Current Bill</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Hasnain Sikandar</td>
            <td>43</td>
            <td>+100</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Muzaffar Jamil</td>
            <td>54</td>
            <td>900+</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Myan Bazaan</td>
            <td>11</td>
            <td>+400</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ThisMonthBill;
