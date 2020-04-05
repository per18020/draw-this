import React, { useState, useEffect } from 'react'

function Timer({ onTimeout, time = 60 }) {
    const [counter, setCounter] = useState(time);

    React.useEffect(() => {
        if (counter < 0) onTimeout();
        const timer =
            counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);
    }, [counter]);

    return (
        <div>
            {counter}
        </div>
    );
}

export default Timer;