import React, { useEffect, useState } from "react";
import { getMessMenu } from "../../../features/mess/mess_actions_creators";

import Message from "../../../components/Message";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import "./ViewMess.css";
import Loader from "../../../components/Loader";
import { Link } from "react-router-dom";
import Downloader from "../../../components/Downloader";

function ViewMess() {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getMessMenu());



  }, [dispatch, useAppSelector]);

  const { messMenu, loading, error } = useAppSelector((state) => state.messMenu);




  return (

    <section id="tabs" className="project-tab">

      <div className="container">

        <div className="row">

          <div className="col-md-12">


            <Downloader tableData={messMenu} htmlInputId={'divToPrint'} name={"Mess-Menu"} />



          </div>


          <div className="col-md-12">

            <div className="tab-content" id="nav-tabContent">

              <div
                className="tab-pane fade show active"
                id="nav-home"
                role="tabpanel"
                aria-labelledby="nav-home-tab"
              >

                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                  : (

                    <table id="divToPrint" className="table" cellSpacing="0">

                      <thead>

                        <tr>

                          <th>Day</th>

                          <th>First Time</th>

                          <th>Second Time</th>

                          <th>Edit</th>
                        </tr>
                      </thead>


                      <tbody>

                        {messMenu?.map((menu) => <tr key={menu.id}>

                          <td>

                            <a href="#">{menu.day}</a>
                          </td>

                          <td>{menu.first_time}</td>

                          <td>{menu.second_time}</td>

                          <td><button className="btn btn-primary"><Link
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
