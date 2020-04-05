import React, { useState, useEffect } from 'react'
import { Redirect } from "react-router-dom"
import { connect } from 'react-redux'

import RankingUserCard from './RankingUserCard'

function Ranking({ socket }) {
    const [toHome, setToHome] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [scores, setScores] = useState(null);

    useEffect(() => {
        socket.emit('game:getFinalScores', ({ finalScores }) => {
            setScores(finalScores);
            setIsLoading(false);
        })
    }, [])

    const next = () => {
        setToHome(true);
    }

    if (toHome)
        return <Redirect to="/" />

    if (isLoading) {
        return (
            <section className="hero is-fullheight">
                <div className="hero-body">
                    <div className="container">
                        <div className="title">Loading...</div>
                    </div>
                </div>
            </section>
        );
    } else {
        return (
            <div className="container">
                <div className="section">
                    <div className="title">Ranking</div>
                    {scores.map(item => {
                        return <RankingUserCard key={item.playerID} playerID={item.playerID} score={item.score} place={item.place}/>
                    })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    socket: state.appReducer.socket
})

export default connect(mapStateToProps)(Ranking);