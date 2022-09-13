import React, { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import { getMessMenu } from "../../../actions/mess_actions";

import Message from "../../../components/Message";
import { useSelector, useDispatch } from "react-redux";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import "./ViewMess.css";
import Loader from "../../../components/Loader";
import { Link } from "react-router-dom";
import Downloader from "../../../components/Downloader";

function ViewMess() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMessMenu());



  }, [dispatch, useSelector]);

  const { messMenu, loading, error } = useSelector((state) => state.messMenu);


  const [editMenu, setEditMenu] = useState(false)

  // function printDocument() {
  //   const input = document.getElementById('divToPrint');
  //   html2canvas(input)
  //     .then((canvas) => {
  //       const imgData = canvas.toDataURL('image/png');
  //       const pdf = new jsPDF();
  //       pdf.addImage(imgData, 'JPEG', 0, 0);
  //       // pdf.output('dataurlnewwindow');
  //       pdf.save("Mess.pdf");
  //     })
  //     ;
  // }

  return (
    <section id="tabs" class="project-tab">
      <div class="container">
        <div class="row">
          <div class="col-md-12">

            <Downloader htmlInputId={'divToPrint'} name={"Mess-Menu"} />
            {/* <button onClick={printDocument} >Download</button> */}


          </div>

          <div class="col-md-12">
            <div class="tab-content" id="nav-tabContent">
              <div
                class="tab-pane fade show active"
                id="nav-home"
                role="tabpanel"
                aria-labelledby="nav-home-tab"
              >
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                  : (
                    <table id="divToPrint" class="table" cellspacing="0">
                      <thead>
                        <tr>
                          <th>Day</th>
                          <th>First Time</th>
                          <th>Second Time</th>
                          <th>Edit</th>
                        </tr>
                      </thead>

                      <tbody>
                        {messMenu?.map((menu) => (

                          <tr key={menu.id}>
                            <td>
                              <a href="#">{menu.day}</a>
                            </td>
                            <td>{menu.first_time}</td>
                            <td>{menu.second_time}</td>
                            <td><button class="btn btn-primary"><Link
                              to={`/admin/update-mess/${menu.day}`}>Edit</Link>
                            </button> </td>
                          </tr>
                        ))}


                      </tbody>
                    </table>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ViewMess;
