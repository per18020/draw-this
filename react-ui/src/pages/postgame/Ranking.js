import React, { useState, useEffect } from 'react'
import { Redirect } from "react-router-dom"

function Ranking() {
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
                    <div className="title">Ranking</div>
                    <div className="subtitle">This final page is also complex, and will be built next week</div>
                    <button onClick={next} className="button">Back Home</button>
                </div>
            </div>
        </section>
    );
}

export default Ranking;