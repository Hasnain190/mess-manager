
import Button from "../../../components/Button";
import { listUsers, deleteUser } from "../../../features/user/user_actions_creators";
import React, { useState, useEffect, useRef } from "react";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { postAttendance, getAttendance, getDailyAttendance } from "../../../features/attendance/attendance_actions_creators";
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






  // const [firstTime, setFirstTime] = useState<'present' | 'absent' | 'double'>('present')
  // const [secondTime, setSecondTime] = useState<'present' | 'absent' | 'double'>('present')


  const userIds = users?.map((user: any) => user.id)

  // Prs = Present
  const [totalFirstTimePrs, setTotalFirstTimePrs] = useState(0)
  const [totalSecondTimePrs, setTotalSecondTimePrs] = useState(0)
  const [totalGrandPrs, setTotalGrandPrs] = useState(0)
  // Abs = Absent
  const [totalFirstTimeAbs, setTotalFirstTimeAbs] = useState(0)
  const [totalSecondTimeAbs, setTotalSecondTimeAbs] = useState(0)
  const [totalGrandAbs, setTotalGrandAbs] = useState(0)




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

        // attendanceLoading ? setStatus('pending') : attendanceSuccess ? setStatus('success') : attendanceError ? setStatus('error') : 

        // if(firstTime==='present') {setTotalFirstTimePrs(totalFirstTimePrs++)}
        // setTotalFirstTimePrs(countFirstTimePrs)
        // setTotalSecondTimePrs(countSecondTimePrs)
        // setTotalGrandPrs(countFirstTimePrs + countSecondTimePrs)

        // setTotalFirstTimeAbs(countFirstTimeAbs)
        // setTotalSecondTimeAbs(countSecondTimeAbs)
        // setTotalGrandAbs(countSecondTimeAbs + countSecondTimeAbs)
      }

      // dispatch(getAttendance());


    } catch (error) {
      // setStatus('error')
      console.error(error)

    }
  }


  function getAttendancePerUsr(user: any) {
    const f_t = (getAttendanceLi && getAttendanceLi.find(att => att.student === user.id))?.first_time;
    const s_t = (getAttendanceLi && getAttendanceLi.find(att => att.student === user.id))?.second_time;


    return { f_t, s_t }
  }


  const [status, setStatus] = useState<'not-yet-submitted' | 'pending' | 'success' | 'error'>('not-yet-submitted')

  const [date, setDate] = useState(today)
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
      if (attendanceSuccess) {
        dispatch(getDailyAttendance(today))

        let { countFirstTimePrs, countSecondTimePrs, } = counter(getAttendanceLi, date);
        setTotalFirstTimePrs(countFirstTimePrs)
        setTotalSecondTimePrs(countSecondTimePrs)
      }

    } else {
      navigate("/login");
    }

  }, [attendanceSuccess, dispatch, userInfo, navigate]);


  function handleSelectChange(value: string, id: number): void {

  }

  return <>

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

                    <i className="bi bi-check" >{status} {attendanceError && attendanceError}</i>
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
  </>;


}



