import React, { useState, useEffect } from 'react'
import { Redirect } from "react-router-dom"
import { connect } from 'react-redux'
import { decompressAndParse } from '../../common/util';
import { setRound } from '../../redux/actions';
import ScoringCard from './ScoringCard';

function Scoring({ socket, roundState, setRound }) {
    const [toGame, setToGame] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        socket.emit('game:round:get', round => {
            setRound(round);
            setIsLoading(false);
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
                    <div className="title">Scoring</div>
                    { roundState.drawings.map(obj => {
                        return (
                            <ScoringCard key={obj.playerID} playerID={obj.playerID} canvasData={decompressAndParse(obj.data)} />
                        )
                    }) }
                    <div onClick={next} className="button is-primary">Next</div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => ({
    socket: state.appReducer.socket,
    roundState: state.gameReducer.round,
})

export default connect(mapStateToProps, { setRound })(Scoring);