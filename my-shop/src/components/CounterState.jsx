import React from 'react'
import { useCounter } from '../context/CounterContext'

const CounterState = () => {
    const { countState, setCountState } = useCounter();

    return (
        <div>
            <p>{countState}</p>
            <button onClick={()=>setCountState(countState+1)}>+</button>

        </div>
    )
}

export default CounterState
