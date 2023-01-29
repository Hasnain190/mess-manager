import React from 'react'
import { useAppSelector } from "../app/hooks";

type Prop = { id: number }
type user = {
    id: number;
    username: string;
    email: string;
    room: number;
    hostel: string;
    phone: string;
    isAdmin: boolean;

}
export default function IdToStudent({
    id
}: Prop): JSX.Element {
    const { users } = useAppSelector(state => state.userList)

    if (!users) return (<div>Username</div>);

    const user: user = users.find((user: any) => user?.id === id) as user
    const { username } = user

    return (

        <div>{username}</div>
    )
}