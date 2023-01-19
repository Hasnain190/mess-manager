import React from 'react'

export default function ConvertToMonth({
    number
}: any) {
    const monthName = Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(`${number}`));

    return <div>{monthName}</div>
}
