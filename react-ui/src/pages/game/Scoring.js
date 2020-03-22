import React, { useState, useEffect } from 'react'
import { Redirect } from "react-router-dom"

function Scoring() {
    const [toRanking, setToRanking] = useState(false);

    const next = () => {
        setToRanking(true);
    }

    if (toRanking)
        return <Redirect to="/ranking" />

    return (
        <section className="hero is-fullheight">
            <div className="hero-body">
                <div className="container">
                    <div className="title">Scoring</div>
                    <div className="subtitle">This page is complex, and will be built next week</div>
                    <button onClick={next} className="button">Next Page</button>
                </div>
            </div>
        </section>
    );
}

export default Scoring;