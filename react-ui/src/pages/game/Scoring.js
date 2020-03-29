import React, { useState, useEffect } from 'react'
import { Redirect } from "react-router-dom"
import { connect } from 'react-redux'

import { setRound } from '../../redux/actions';

function Scoring({ socket }) {
    const [toGame, setToGame] = useState(false);

    useEffect(() => {
        socket.emit('game:round:get', round => {
            setRound(round);
        });

        socket.on('game:round:listenForGoToGame', round => {
            setRound(round);
            setToGame(true);
        });

        return () => {
            socket.off('game:round:listenForGoToGame');
        }
    }, [])

    const next = () => {
        socket.emit('game:round:stop');
        setToGame(true);
    }

    if (toGame)
        return <Redirect to="/game" />

    return (
        <section className="hero is-fullheight">
            <div className="hero-body">
                <div className="container">
                    <div className="title">Scoring</div>
                    <div className="subtitle">This page is complex, and will be built next week</div>
                    <button onClick={next} className="button">Next</button>
                </div>
            </div>
        </section>
    );
}

const mapStateToProps = state => ({
    socket: state.appReducer.socket
})

export default connect(mapStateToProps)(Scoring);