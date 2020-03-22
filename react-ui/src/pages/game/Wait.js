import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { Redirect } from 'react-router'

function Wait({ socket, player, describer }) {
    const [toScoring, setToScoring] = useState(false);
    const isDescriber = player === describer.id;

    useEffect(() => {
        socket.emit('game:readyForScoring');

        socket.on('game:everyoneIsReadyForScoring', () => {
            setToScoring(true);
        })

        return () => {
            socket.off('game:everyoneIsReadyForScoring');
        }
    }, [])

    if (toScoring)
        return <Redirect to="/scoring" />
        
    return (
        <section className="hero is-fullheight">
            <div className="hero-body">
                <div className="container">
                    <div className="title">Wait until everyone has finished drawing</div>
                </div>
            </div>
        </section>
    );
}

const mapStateToProps = state => ({
    socket: state.appReducer.socket,
    player: state.gameReducer.player,
    describer: state.gameReducer.describer
})

export default connect(mapStateToProps)(Wait);