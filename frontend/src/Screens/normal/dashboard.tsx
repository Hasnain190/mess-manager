
import React, { useState, useEffect } from "react";
import "./dashboard-cards.css";

import { getMessMenu } from '../../features/mess/mess_actions_creators'
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import ConvertToWeekDay from "../../components/ConvertToWeekDay"
import { useAppDispatch, useAppSelector } from "../../app/hooks";


function Dashboard() {
  const dispatch = useAppDispatch();
  const today = new Date().toISOString().slice(0, 7); //2023-01-23


  const [dateState, setDateState] = useState(new Date());



  const { messMenu, loading: loadingMessMenu, error: errorMessMenu } = useAppSelector((state) => state.messMenu);
  const userLogin = useAppSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;






  const [todaysMess] = messMenu.filter((item: any) => item.day === Intl.DateTimeFormat('en', { weekday: 'long' }).format(new Date(`${today}`)))
  // e.g. it item.day === "sunday" 

  useEffect(() => {
    setInterval(() => setDateState(new Date()), 1000);

    dispatch(getMessMenu())

  }, [])

  return (
    <div>
      <h2>Welcome</h2>
      <h3>{userInfo?.username}</h3>
      <div>
        Today's Date : <code> {today}</code>
      </div>
      <div>
        Today's time :{" "}
        <code>
          {dateState.toLocaleTimeString('en-US')}
          {/*  Expected output: "1:15:30 AM" */}
        </code>
      </div>

      {/* today's menu  */}

      {loadingMessMenu ? <Loader></Loader> : errorMessMenu ? <Message >{error}</Message> :


        <section className="light">
          <div className="container py-2">
            <div className="h1 text-center text-dark" id="pageHeaderTitle">
              What's on <ConvertToWeekDay number={today} />
            </div>

            <article className="postcard light blue">
              <a className="postcard__img_link" href="#">
                <img
                  className="postcard__img"
                  src="https://picsum.photos/1000/1000"
                  alt="Image Title"
                />
              </a>
              <div className="postcard__text t-dark">
                <h1 className="postcard__title blue">Lunch</h1>

                <div className="postcard__preview-txt">
                  <ul className="list-group">
                    <li className="list-group-item">{todaysMess?.first_time}</li>

                  </ul>
                </div>
              </div>
            </article>
            <article className="postcard light blue">
              <a className="postcard__img_link" href="#">
                <img
                  className="postcard__img"
                  src="https://picsum.photos/1000/1000"
                  alt="Image Title"
                />
              </a>
              <div className="postcard__text t-dark">
                <h1 className="postcard__title blue">Dinner</h1>

                <div className="postcard__preview-txt">
                  <ul className="list-group">
                    <li className="list-group-item">{todaysMess?.second_time}</li>

                  </ul>
                </div>
              </div>
            </article>

          </div>
        </section>

        // )}
      }


      {/* table for this month's bill */}
      <section className="light">
        <div className="container py-2">
          <div className="h1 text-center text-dark" id="pageHeaderTitle">
            Your Bill
          </div>
          {/* download pdf button */}

          <div className="text-end">

            <button className="btn btn-primary">Download PDF</button>
          </div>

          <table className="table table-striped">

            <thead>

              <tr>

                <th scope="col">#</th>

                <th scope="col">Month</th>

                <th scope="col">Total</th>

                <th scope="col">Paid</th>

                <th scope="col">Due</th>
              </tr>
            </thead>

            <tbody>

              <tr className="table-primary">

                <th scope="row">0</th>

                <td scope="row">March</td>

                <td>4000</td>
              </tr>



            </tbody>
          </table>
        </div>
      </section>





    </div>
  );
}

export default Dashboard;
