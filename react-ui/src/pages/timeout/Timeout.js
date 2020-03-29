import React, { useState } from 'react'
import { Redirect } from 'react-router';


function Timeout() {
    const [toHome, setToHome] = useState(false);

    const next = () => {
        setToHome(true);
    }

    if (toHome)
        return <Redirect to="/" />

    return (
        <section className="hero is-fullheight">
            <div className="hero-body">
                <div className="container">
                    <div className="title">Game Timed Out</div>
                    <button onClick={next} className="button">Back Home</button>
                </div>
            </div>
        </section>
    );
}

export default Timeout;