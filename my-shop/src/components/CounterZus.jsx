import React from 'react'
import { useCouterStore } from './store'

const CounterZus = () => {
    const { count, setCount } = useCouterStore();
    return (
        <div>
            <p>{count}</p>
            <button onClick={setCount}>+</button>
        </div>
    )
}

export default CounterZus
