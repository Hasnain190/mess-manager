// a react component for the dashboard screen of the mess manager app
//  - this is the screen that is displayed when the user is logged in
//  - this screen displays the current user's name, the current date, and the current time
//  - this screen also displays the current user's current meal plan's meals' items ingredients
import React, { useState, useEffect } from "react";
import "./dashboard-cards.css";

import { getMessMenu } from '../../features/mess/mess_actions_creators'
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import ConvertToWeekDay from "../../components/ConvertToWeekDay"
import { useAppDispatch, useAppSelector } from "../../app/hooks";


function Dashboard() {
  const dispatch = useAppDispatch();
  const today = new Date().getDay();

  useEffect(() => {
    dispatch(getMessMenu())
    console.log(today)
  }, [])
  const { messMenu, loading: loadingMessMenu, error: errorMessMenu } = useAppSelector((state) => state.messMenu);

  const [date, setDate] = useState(today)


  const userLogin = useAppSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  const [dateState, setDateState] = useState(new Date());

  useEffect(() => {
    setInterval(() => setDateState(new Date()), 1000);
  }, []);

  const [todaysMess] = messMenu.filter((item: any) => item.day === Intl.DateTimeFormat('en', { weekday: 'long' }).format(new Date(`${today}`)))


  return (
    <div>
      <h2>Welcome</h2>
      <h3>{userInfo?.username}</h3>
      <div>
        Today's Date : <code> {dateState.toLocaleDateString()}</code>
      </div>
      <div>
        Today's time :{" "}
        <code>
          {dateState.toLocaleTimeString({

            // @ts-expect-error TS(2345): Argument of type '{ hour: string; minute: string; ... Remove this comment to see the full error message
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </code>
      </div>

      {/* today's menu  */}

      {loadingMessMenu ? <Loader></Loader> : errorMessMenu ? <Message >{error}</Message> :

        // { messMenu?.map(item =>
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
                <div className="postcard__subtitle small">
                  <time dateTime={new Date().toLocaleDateString()}>
                    <i className="fas fa-calendar-alt mr-2"></i>
                    {new Date().toLocaleDateString()}
                  </time>
                </div>
                <div className="postcard__bar"></div>
                <div className="postcard__preview-txt">
                  <ul className="list-group">
                    <li className="list-group-item">{todaysMess.first_time}</li>

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
                <div className="postcard__subtitle small">
                  <time dateTime={new Date().toLocaleDateString()}>
                    <i className="fas fa-calendar-alt mr-2"></i>
                    {new Date().toLocaleDateString()}
                  </time>
                </div>
                <div className="postcard__bar"></div>
                <div className="postcard__preview-txt">
                  <ul className="list-group">
                    <li className="list-group-item">{todaysMess.second_time}</li>

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

              <tr>

                <th scope="row">1</th>

                <td>Fabruary</td>

                <td>4000</td>

                <td>0</td>

                <td>4000</td>
              </tr>

              <tr>

                <th scope="row">2</th>

                <td>May</td>

                <td>3600</td>

                <td>400</td>

                <td>3400</td>
              </tr>

              <tr>

                <th scope="row">3</th>

                <td>June</td>

                <td>4400</td>

                <td>0</td>

                <td>4400</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* section for feedback to the admin */}

      <section className="light">

        <div className="container py-2">

          <div className="h1 text-center text-dark" id="pageHeaderTitle">
            Give Feedback
          </div>

          <form>

            <div className="form-group">

              <label htmlFor="feedBackForm">Feedback</label>

              <textarea
                class="form-control"
                id="feedBackForm"
                // @ts-expect-error TS(2322): Type 'string' is not assignable to type 'number'.
                rows="3"
              ></textarea>


              <div className="text-center">

                <button className="btn btn-primary" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>



    </div>
  );
}

export default Dashboard;
