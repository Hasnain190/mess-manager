import React from 'react'
import { useAppSelector } from "../app/hooks";


export default function IdToStudent({
    id
}: any) {
    const { users } = useAppSelector(state => state.userList)

    //    FIXME: ... as any
    const user = users.find((user: any) => user?.id === id) as any
    const { username } = user

    return (

        <div>{username}</div>
    )
}