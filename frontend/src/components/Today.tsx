import React, { useState } from 'react'

export default function Today() {
    const today = new Date().getDay().toLocaleString();
    const [date, setDate] = useState(today)

    return today
}
