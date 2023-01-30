
import { listUsers } from "../../../features/user/user_actions_creators";
import React, { useState, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import { Link, useNavigate } from "react-router-dom";
import { postAttendance, getDailyAttendance } from "../../../features/attendance/attendance_actions_creators";
import { counter } from "../../../components/counter";


export default function MarkAttendance() {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { users, loading, error } = useAppSelector((state) => state.userList);
  const today = new Date().toISOString().slice(0, 10);

  const { userInfo } = useAppSelector((state) => state.userLogin);


  // postAttendance
  const { success: attendanceSuccess, error: attendanceError, loading: attendanceLoading } = useAppSelector((state) => state.attendance)


  const { attendance: getAttendanceLi, error: getAttendanceError, loading: getAttendanceLoading } = useAppSelector(state => state.getDailyAttendance)





  const userIds = users?.map((user: any) => user.id)

  // Prs = Present
  const [totalFirstTimePrs, setTotalFirstTimePrs] = useState(0)
  const [totalSecondTimePrs, setTotalSecondTimePrs] = useState(0)
  const [totalGrandPrs, setTotalGrandPrs] = useState(0)


  function attendanceExtractor(e, id: number): string[] {
    let first_time = e.target.elements[`first-attendance-${id}`].value;
    let second_time = e.target.elements[`second-attendance-${id}`].value;

    return [first_time, second_time];
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    try {
      for (let index = 0; index < userIds.length; index++) {
        let id: number = userIds[index];

        const attendance = {
          student: id,
          date: date,
          first_time: attendanceExtractor(e, id)[0],
          second_time: attendanceExtractor(e, id)[1]
        }

        dispatch(postAttendance(attendance, id))
        let { countFirstTimePrs, countSecondTimePrs, } = counter(getAttendanceLi, date);
        setTotalFirstTimePrs(countFirstTimePrs)
        setTotalSecondTimePrs(countSecondTimePrs)

      }



    } catch (error) {
      console.error(error)

    }
  }



  const [date, setDate] = useState(today)
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
      if (attendanceSuccess) {
        dispatch(getDailyAttendance(today))

      }

    } else {
      navigate("/login");
    }

  }, [attendanceSuccess, userInfo]);

  function handleSelectChange(value: string, id: number): void {
    throw new Error("Function not implemented.");
  }

  return (<>

    <section>

      <div className="row">

        <div className="col-md-12 text-dark text-center">

          <h3 >Mark Attendance</h3> for <label htmlFor="date">The Date:</label><h4><input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} max={today} /></h4>'s meal
        </div>
      </div>
      {loading ? (

        <Loader />
      ) : (error) ? (

        <Message variant="danger">{error}</Message>
      ) :
        (

          <form className="form" onSubmit={handleSubmit}>


            <table className="table table-bordered">

              <thead>

                <tr>

                  <th scope="col">ID</th>

                  <th scope="col">Name</th>

                  <th scope="col">Room no.</th>

                  <th scope="col">First Time</th>

                  <th scope="col">Second Time</th>

                  <th scope="col">Status</th>
                </tr>
              </thead>


              {users.map((user) => <tbody>





                <tr key={user.id}>



                  <th scope="row" id={`user-id-${user.id}}`}>{user.id}</th>

                  <td className="form-group">

                    <div
                      className="form-control"
                      id={`table-name-${user.id}`}>
                      {user.username}
                    </div>
                  </td>

                  <td className="form-group">

                    <div

                      className="form-control"
                      id={`table-room-${user.id}`}>

                      {user.room}
                    </div>

                  </td>


                  <td>

                    <select id={`first-attendance-${user.id}`} onChange={(e) => handleSelectChange(e.target.value, user.id)} className="form-control"  >

                      <option value="present">Present ✓</option>

                      <option value="absent">Absent X</option>

                      <option value="double">Double 2</option>
                    </select>

                  </td>

                  <td>

                    <select id={`second-attendance-${user.id}`} onChange={(e) => (e.target.value)} className="form-control"  >

                      <option value="present">Present ✓</option>

                      <option value="absent">Absent X</option>

                      <option value="double">Double 2</option>
                    </select>

                  </td>

                  <td>

                    <i className="bi bi-check" >{attendanceError && attendanceError}</i>
                  </td>
                </tr>

              </tbody>)
              }

            </table>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>

          </form>

        )


      }


    </section>

    <section>

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


            <th scope="col">Total Attendances First Time</th>
            <th scope="col">Total Attendances Second Time</th>
            <th scope="col">Total Attendances </th>
          </tr>
        </thead>

        <tbody>

          <tr>

            <th scope="row">1</th>

            <td>{users?.length}</td>



            <td>{totalFirstTimePrs}</td>
            <td>{totalSecondTimePrs}</td>
            <td>{totalGrandPrs}</td>

          </tr>
        </tbody>
      </table>


    </section>
  </>
  )

}



