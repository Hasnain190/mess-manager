import React from 'react'

export default function ConvertToWeekDay({
    number
}: any) {
    const weekday = Intl.DateTimeFormat('en', { weekday: 'long' }).format(new Date(`${number}`));

    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return <>{weekday}</>
}
