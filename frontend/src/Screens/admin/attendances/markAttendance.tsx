
import { listUsers } from "../../../features/user/user_actions_creators";
import React, { useState, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import { Link, useNavigate } from "react-router-dom";
import { postAttendance, getDailyAttendance } from "../../../features/attendance/attendance_actions_creators";
import { counter } from "../../../components/counter";
import { User } from '../../../types/userTypes'

export default function MarkAttendance() {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { users, loading, error } = useAppSelector((state) => state.userList);

  const today = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(today)
  const yesterday = new Date(new Date(date).getTime() - 86400000)
    .toISOString()
    .slice(0, 10);

  const { userInfo } = useAppSelector((state) => state.userLogin);
  const { success: attendanceSuccess, error: attendanceError, loading: attendanceLoading } = useAppSelector((state) => state.attendance)
  const { attendance: getAttendanceLi, error: getAttendanceError, loading: getAttendanceLoading, success: getAttendanceLiSuccess } = useAppSelector(state => state.getDailyAttendance)

  // Prs = Present
  const [totalFirstTimePrs, setTotalFirstTimePrs] = useState(0)
  const [totalSecondTimePrs, setTotalSecondTimePrs] = useState(0)
  const [totalGrandPrs, setTotalGrandPrs] = useState(0)

  const [attendanceValuesFirst, setAttendanceValuesFirst] = useState<{ [key: number]: string }>({});
  const [attendanceValuesSecond, setAttendanceValuesSecond] = useState<{ [key: number]: string }>({});



  const userIds = users?.map((user: User) => user.id)



  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      Promise.all(userIds.map((id: number) => {
        const attendance = {
          student: id,
          date: date,
          first_time: attendanceValuesFirst[id],
          second_time: attendanceValuesSecond[id]
        }

        return Promise.all([
          dispatch(postAttendance(attendance, id)),
          dispatch(getDailyAttendance(date))
        ]);
      }))
    } catch (error) {
      console.error(error)
    }
  }



  const [otherSelectedFirst, setOtherSelectedFirst] = useState<{ [key: number]: boolean }>({});
  const [otherSelectedSecond, setOtherSelectedSecond] = useState<{ [key: number]: boolean }>({});

  const handleAttendanceChangeFirst = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>, userId: number) => {
    let value = e.target.value;
    const newAttendanceValuesFirst = { ...attendanceValuesFirst, [userId]: value };

    if (e.target instanceof HTMLInputElement) {
      setAttendanceValuesFirst(newAttendanceValuesFirst);
    }

    if (e.target instanceof HTMLSelectElement) {
      if (value === 'other') {
        setOtherSelectedFirst(prevState => { return { ...prevState, [userId]: true } });
      } else {
        setOtherSelectedFirst(prevState => { const newState = { ...prevState }; delete newState[userId]; return newState; });
        setAttendanceValuesFirst(newAttendanceValuesFirst);

      }
    }
  };

  const handleAttendanceChangeSecond = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>, userId: number) => {
    let value = e.target.value;
    const newAttendanceValuesSecond = { ...attendanceValuesSecond, [userId]: value };

    if (e.target instanceof HTMLInputElement) {
      setAttendanceValuesSecond(newAttendanceValuesSecond);
    }

    if (e.target instanceof HTMLSelectElement) {
      if (value === 'other') {
        setOtherSelectedSecond(prevState => { return { ...prevState, [userId]: true } });
      } else {
        setOtherSelectedSecond(prevState => { const newState = { ...prevState }; delete newState[userId]; return newState; });

        setAttendanceValuesSecond(newAttendanceValuesSecond);

      }
    }
  };

  const getDefaultAttendance = () => {
    const defaultAttendanceFirst: { [key: number]: string } = {}
    const defaultAttendanceSecond: { [key: number]: string } = {}


    for (const user of users) {

      defaultAttendanceFirst[user.id] = getAttendanceLi.find((att => att.student_id === user.id))?.first_time || "present"
      defaultAttendanceSecond[user.id] = getAttendanceLi.find((att => att.student_id === user.id))?.second_time || "present"

    }

    setAttendanceValuesFirst(defaultAttendanceFirst)
    setAttendanceValuesSecond(defaultAttendanceSecond)
  };

  function getColorFirst(attendance: string) {



    switch (attendance) {
      case 'absent':
        return 'red';
      case 'double':
        return 'purple';
      case 'present':
      default:
        return '';
    }

  }

  function getColorSecond(attendance: string) {
    switch (attendance) {
      case 'absent':
        return 'red';
      case 'double':
        return 'purple';
      case 'present':
      default:
        return '';
    }
  }

  useEffect(() => {

    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
      dispatch(getDailyAttendance(yesterday));
    } else {
      navigate("/login");
    }


  }, [attendanceSuccess, userInfo, getAttendanceLiSuccess, date]);



  useEffect(() => {


    getDefaultAttendance();
  }, [getAttendanceLi]);


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

                  <th scope="col">#</th>

                  <th scope="col">Name</th>

                  <th scope="col">Room no.</th>

                  <th scope="col">First Time</th>

                  <th scope="col">Second Time</th>

                  <th scope="col">Status</th>
                </tr>
              </thead>


              {users.map((user, index) => <tbody>
                <tr key={user.id}>
                  <th scope="row" id={`user-id-${user.id}`}>{index}</th>
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
                    {getAttendanceLoading ? (
                      "Loading..."
                    ) : (
                      <>
                        <select
                          id={`first-attendance-${user.id}`}
                          onChange={(e) => handleAttendanceChangeFirst(e, user.id)}
                          className="form-control "
                          style={{ color: getColorFirst(attendanceValuesFirst[user.id]) }}
                          value={attendanceValuesFirst[user.id]}
                        >

                          <option value="present">✓ Present</option>
                          <option value="absent">X Absent</option>
                          <option value="double">2 Double</option>
                          <option value="other">Other</option>
                        </select>
                        {otherSelectedFirst[user.id] ? (
                          // <div className="container">
                          <input
                            className="form-control "
                            type="number"
                            id={`customInputFirst-${user.id}`}
                            value={attendanceValuesFirst[user.id] === 'other' ? '' : attendanceValuesFirst[user.id]}
                            onChange={(e) => handleAttendanceChangeFirst(e, user.id)}
                            placeholder="Enter custom value"
                            min={3}
                          />
                          // </div>
                        ) : null}


                      </>
                    )}
                  </td>

                  <td>
                    {getAttendanceLoading ?
                      ("Loading..") :
                      (
                        <>
                          <select
                            id={`second-attendance-${user.id}`}
                            onChange={(e) => handleAttendanceChangeSecond(e, user.id)}
                            className="form-control"
                            style={{ color: getColorSecond(attendanceValuesSecond[user.id]) }}
                            value={attendanceValuesSecond[user.id]}
                          >

                            <option value="present">✓ Present</option>
                            <option value="absent">X Absent</option>
                            <option value="double">2 Double</option>
                            <option value="other">Other</option>

                          </select>
                          {otherSelectedSecond[user.id] ? (

                            <input
                              className="form-control "
                              type="number"
                              id={`customInputFirst-${user.id}`}
                              value={attendanceValuesSecond[user.id] === 'other' ? '' : attendanceValuesFirst[user.id]}
                              onChange={(e) => handleAttendanceChangeSecond(e, user.id)}
                              placeholder="Enter custom value"
                              min={3}
                              required
                            />

                          ) : null}
                        </>
                      )}
                  </td>
                  <td>

                    {/* <i className="bi bi-check2" >{attendanceError && attendanceError}</i> */}

                    {attendanceLoading ? (
                      <Loader />
                    ) : attendanceError ? (
                      <Message variant="danger">{attendanceError}</Message>
                    ) : attendanceSuccess ? (
                      <Message variant="success">Noted</Message>
                    ) : null}

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



