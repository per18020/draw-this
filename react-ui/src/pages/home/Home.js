import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { setGameUUID } from '../../redux/actions';
import { useWindowSearchParameter } from '../../common/effects';

import Canvas from '../../common/components/canvas/Canvas';

function Home({ socket, setGameUUID }) {
    const [toNextPage, setToNextPage] = useState(false);
    const join = useWindowSearchParameter("join");

    const handleCreateGame = () => {
        if (!socket) return; // Null check
        socket.emit('createGame', gameUUID => {
            setGameUUID(gameUUID);
            setToNextPage(true);
        });
    }

    useEffect(() => {
        if (join && socket) {
            socket.emit('gameExists', { gameUUID: join }, gameExists => {
                if (gameExists) {
                    setGameUUID(join);
                    setToNextPage(true);
                }
            })
        }
    }, [socket]);

    if (toNextPage)
        return <Redirect to='/drawYourself' />

    return (
        <section className="hero is-fullheight">
            <div className="hero-body">
                <div className="container">
                    <div className="title">Draw This</div>
                    <div className="subtitle">A game where you draw things</div>
                    <button className="button is-primary" onClick={handleCreateGame}>Create Game</button>
                </div>
            </div>
        </section>
    );
}

const mapStateToProps = state => {
    return { socket: state.appReducer.socket };
}

export default connect(mapStateToProps, { setGameUUID })(Home);