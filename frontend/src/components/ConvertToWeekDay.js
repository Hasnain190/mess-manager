import React from 'react'

export default function ConvertToWeekDay({ number }) {
    const weekday = Intl.DateTimeFormat('en', { weekday: 'long' }).format(new Date(`${number}`));

    return <>{weekday}</>
}
