import React from 'react'

export default function ConvertToWeekDay({
    number
}: any) {
    const weekday = Intl.DateTimeFormat('en', { weekday: 'long' }).format(new Date(`${number}`));

    return <>{weekday}</>
}
