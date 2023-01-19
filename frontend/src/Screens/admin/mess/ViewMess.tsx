import React, { useEffect, useState } from "react";
// @ts-expect-error TS(7016): Could not find a declaration file for module 'file... Remove this comment to see the full error message
import { saveAs } from "file-saver";
import { getMessMenu } from "../../../actions/mess_actions";

// @ts-expect-error TS(6142): Module '../../../components/Message' was resolved ... Remove this comment to see the full error message
import Message from "../../../components/Message";
import { useSelector, useDispatch } from "react-redux";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import "./ViewMess.css";
// @ts-expect-error TS(6142): Module '../../../components/Loader' was resolved t... Remove this comment to see the full error message
import Loader from "../../../components/Loader";
import { Link } from "react-router-dom";
// @ts-expect-error TS(6142): Module '../../../components/Downloader' was resolv... Remove this comment to see the full error message
import Downloader from "../../../components/Downloader";

function ViewMess() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMessMenu());



  }, [dispatch, useSelector]);

  // @ts-expect-error TS(2339): Property 'messMenu' does not exist on type 'Defaul... Remove this comment to see the full error message
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
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <section id="tabs" class="project-tab">
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div class="container">
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div class="row">
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div class="col-md-12">

            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Downloader htmlInputId={'divToPrint'} name={"Mess-Menu"} />
            {/* <button onClick={printDocument} >Download</button> */}


          </div>

          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div class="col-md-12">
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div class="tab-content" id="nav-tabContent">
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <div
                // @ts-expect-error TS(2322): Type '{ children: Element; class: string; id: stri... Remove this comment to see the full error message
                class="tab-pane fade show active"
                id="nav-home"
                role="tabpanel"
                aria-labelledby="nav-home-tab"
              >
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                  : (
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <table id="divToPrint" class="table" cellspacing="0">
                      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                      <thead>
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <tr>
                          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                          <th>Day</th>
                          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                          <th>First Time</th>
                          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                          <th>Second Time</th>
                          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                          <th>Edit</th>
                        </tr>
                      </thead>

                      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                      <tbody>
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        {messMenu?.map((menu: any) => <tr key={menu.id}>
                          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                          <td>
                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            <a href="#">{menu.day}</a>
                          </td>
                          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                          <td>{menu.first_time}</td>
                          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                          <td>{menu.second_time}</td>
                          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                          <td><button class="btn btn-primary"><Link
                            to={`/admin/update-mess/${menu.day}`}>Edit</Link>
                          </button> </td>
                        </tr>)}


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
