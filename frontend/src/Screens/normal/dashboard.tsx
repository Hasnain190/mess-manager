// a react component for the dashboard screen of the mess manager app
//  - this is the screen that is displayed when the user is logged in
//  - this screen displays the current user's name, the current date, and the current time
//  - this screen also displays the current user's current meal plan's meals' items ingredients
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./dashboard-cards.css";
import { getMessMenu } from '../../actions/mess_actions'
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import ConvertToWeekDay from "../../components/ConvertToWeekDay"

function Dashboard() {
  const dispatch = useDispatch();
  const today = new Date().getDay();

  useEffect(() => {
    dispatch(getMessMenu())
    console.log(today)
  }, [])
  const { messMenu, loading: loadingMessMenu, error: errorMessMenu } = useSelector((state) => state.messMenu);

  const [date, setDate] = useState(today)



  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  const [dateState, setDateState] = useState(new Date());

  useEffect(() => {
    setInterval(() => setDateState(new Date()), 1000);
  }, []);
  const [todaysMess] = messMenu?.filter(item => item.day === Intl.DateTimeFormat('en', { weekday: 'long' }).format(new Date(`${today}`)))


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
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </code>
      </div>

      {/* today's menu  */}
      {loadingMessMenu ? <Loader></Loader> : errorMessMenu ? <Message >{error}</Message> :

        // { messMenu?.map(item =>
        <section class="light">
          <div class="container py-2">
            <div class="h1 text-center text-dark" id="pageHeaderTitle">
              What's on <ConvertToWeekDay number={today} />
            </div>

            <article class="postcard light blue">
              <a class="postcard__img_link" href="#">
                <img
                  class="postcard__img"
                  src="https://picsum.photos/1000/1000"
                  alt="Image Title"
                />
              </a>
              <div class="postcard__text t-dark">
                <h1 class="postcard__title blue">Lunch</h1>
                <div class="postcard__subtitle small">
                  <time datetime={new Date().toLocaleDateString()}>
                    <i class="fas fa-calendar-alt mr-2"></i>
                    {new Date().toLocaleDateString()}
                  </time>
                </div>
                <div class="postcard__bar"></div>
                <div class="postcard__preview-txt">
                  <ul class="list-group">
                    <li class="list-group-item">{todaysMess.first_time}</li>

                  </ul>
                </div>
              </div>
            </article>
            <article class="postcard light blue">
              <a class="postcard__img_link" href="#">
                <img
                  class="postcard__img"
                  src="https://picsum.photos/1000/1000"
                  alt="Image Title"
                />
              </a>
              <div class="postcard__text t-dark">
                <h1 class="postcard__title blue">Dinner</h1>
                <div class="postcard__subtitle small">
                  <time datetime={new Date().toLocaleDateString()}>
                    <i class="fas fa-calendar-alt mr-2"></i>
                    {new Date().toLocaleDateString()}
                  </time>
                </div>
                <div class="postcard__bar"></div>
                <div class="postcard__preview-txt">
                  <ul class="list-group">
                    <li class="list-group-item">{todaysMess.second_time}</li>

                  </ul>
                </div>
              </div>
            </article>

          </div>
        </section>

        // )}
      }
      {/* table for this month's bill */}
      <section class="light">
        <div class="container py-2">
          <div class="h1 text-center text-dark" id="pageHeaderTitle">
            Your Bill
          </div>
          {/* download pdf button */}
          <div class="text-end">
            <button class="btn btn-primary">Download PDF</button>
          </div>
          <table class="table table-striped">
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
      <section class="light">
        <div class="container py-2">
          <div class="h1 text-center text-dark" id="pageHeaderTitle">
            Give Feedback
          </div>
          <form>
            <div class="form-group">
              <label for="feedBackForm">Feedback</label>
              <textarea
                class="form-control"
                id="feedBackForm"
                rows="3"
              ></textarea>

              <div class="text-center">
                <button class="btn btn-primary" type="submit">
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
