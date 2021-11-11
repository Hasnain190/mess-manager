import React from "react";
// this screen displays the mess details
import "./ViewMess.css";
function ViewMess() {
  return (
    <section id="tabs" class="project-tab">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
              
                <button class="btn btn-primary">Download PDF</button>

                <button class="btn btn-primary">Edit</button>
            
           

            </div>

          <div class="col-md-12">
            <div class="tab-content" id="nav-tabContent">
              <div
                class="tab-pane fade show active"
                id="nav-home"
                role="tabpanel"
                aria-labelledby="nav-home-tab"
              >
                <table class="table" cellspacing="0">
                  <thead>
                    <tr>
                      <th>Day</th>
                      <th>First Time</th>
                      <th>Second Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <a href="#">Sunday</a>
                      </td>
                      <td>Daal Chawal</td>
                      <td>Daal chatni</td>
                    </tr>
                    <tr>
                      <td>
                        <a href="#">Monday</a>
                      </td>
                      <td>Daal Chawal</td>
                      <td>Daal chatni</td>
                    </tr>
                    <tr>
                      <td>
                        <a href="#">Tuesday</a>
                      </td>
                      <td>Daal Chawal</td>
                      <td>Daal chatni</td>
                    </tr>
                    <tr>
                      <td>
                        <a href="#">Wednesday</a>
                      </td>
                      <td>Daal Chawal</td>
                      <td>Daal chatni</td>
                    </tr>
                    <tr>
                      <td>
                        <a href="#">Thursday</a>
                      </td>
                      <td>Daal Chawal</td>
                      <td>Daal chatni</td>
                    </tr>
                    <tr>
                      <td>
                        <a href="#">Friday</a>
                      </td>
                      <td>Daal Chawal</td>
                      <td>Daal chatni</td>
                    </tr>
                    <tr>
                      <td>
                        <a href="#">Saturday</a>
                      </td>
                      <td>Daal Chawal</td>
                      <td>Daal chatni</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ViewMess;
