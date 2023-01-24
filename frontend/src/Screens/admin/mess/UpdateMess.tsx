import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

import { getMessMenu, updateMessMenu } from "../../../features/mess/mess_actions_creators";

import Message from "../../../components/Message";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";

import "./ViewMess.css";
import Loader from "../../../components/Loader";

type menuPerDay = {
    id: number;
    day: string;
    first_time: string,
    second_time: string
}
// interface messMenu {
//     messMenu: menuPerDay[]
// }
type messMenu = menuPerDay[]


function UpdateMess() {

    const dispatch = useAppDispatch()
    const { day } = useParams<string>()

    const [menuFirst, setMenuFirst] = useState<string>()
    const [menuSecond, setMenuSecond] = useState<string>()
    useEffect(() => {
        dispatch(getMessMenu());
    }, [dispatch, useAppSelector]);


    const { messMenu, loading, error } = useAppSelector((state) => state.messMenu);
    let menu = messMenu.find((item: menuPerDay) => item.day === day)

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        if (name === "firstTime") {
            setMenuFirst(value)
        } else if (name === "secondTime") {
            setMenuSecond(value)
        }

        console.log({ name, value })
    }

    const navigate = useNavigate()
    const submitHandler = (e: any) => {
        e.preventDefault();
        if (!menu) {
            throw new Error("Day must be provided")
        }
        dispatch(updateMessMenu(menu.day, {
            id: menu.id,
            day: menu.day,
            first_time: menuFirst as string,
            second_time: menuSecond as string,
        }))

        navigate(-1)
        alert("Menu Updated")
    }

    return (

        <section id="tabs" className="project-tab">

            <div className="container">

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

                                    <form onSubmit={(e) => submitHandler(e)}>


                                        <table className="table" cellSpacing="0">

                                            <thead>

                                                <tr>

                                                    <th>Day</th>

                                                    <th>First Time</th>

                                                    <th>Second Time</th>
                                                </tr>
                                            </thead>


                                            <tbody>

                                                <tr >

                                                    <td >

                                                        <a href="#">{menu?.day}</a>
                                                    </td>

                                                    <td className="form-group">

                                                        <input type="text" name="firstTime" className="form-control" placeholder={menu?.first_time} value={menuFirst} onChange={(e) => handleChange(e)} />

                                                    </td>

                                                    <td className="form-group">

                                                        <input type="text" name="secondTime" className="form-control" placeholder={menu?.second_time} value={menuSecond} onChange={(e) => handleChange(e)} />

                                                    </td>
                                                </tr>)


                                            </tbody>
                                        </table>

                                        <div className="row">

                                            <div className="col-md-12">

                                                <button className="btn btn-primary" type="submit">Save</button>
                                            </div>
                                        </div>
                                    </form>
                                )}
                        </div>
                    </div>
                </div>

            </div>
        </section >
    );
}

export default UpdateMess;
