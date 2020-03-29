import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { setRound } from '../../redux/actions';
import { useIsGameOwner } from '../../common/effects';
import { Redirect } from 'react-router';

import Describer from './Describer';
import Drawer from './Drawer';

function Game({ socket, players, player, setRound }) {
    const [isDescriber, setIsDescriber] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [toRanking, setToRanking] = useState(false);

    const isGameOwner = useIsGameOwner(player, players);

    useEffect(() => {
        socket.emit('game:isFinished', isFinished => {
            if (isFinished) return setToRanking(true);

            socket.on('game:round:listenForStarted', round => {
                setRound(round);
                setIsLoading(false);
                setIsDescriber(round.describer.id === player);
            });

            if (isGameOwner) {
                socket.emit('game:round:create');
            }

            socket.emit('game:round:ready');
        });

        return () => {
            socket.off('game:round:listenForStarted')
        }
    }, [])

    if (toRanking)
        return <Redirect to="/ranking" />

    if (!isLoading) {
        return (
            <div className="container">
                <div className="section">
                    {isDescriber
                        ? <Describer></Describer>
                        : <Drawer></Drawer>
                    }
                </div>
            </div>
        );
    } else {
        return (
            <section className="hero is-fullheight">
                <div className="hero-body">
                    <div className="container">
                        <div className="title">Loading...</div>
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = state => ({
    socket: state.appReducer.socket,
    player: state.gameReducer.player,
    players: state.gameReducer.players,
})


export default connect(mapStateToProps, { setRound })(Game);