import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { setGameUUID } from '../../redux/actions';
import { useWindowSearchParameter } from '../../common/effects';

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
                console.log(gameExists)
                if (gameExists) {
                    console.log("wow")
                    setGameUUID(join);
                    setToNextPage(true);
                }
            })
        }
    }, [socket]);

    if (toNextPage)
        return <Redirect to='/drawYourself' />

    return (
        <section className="hero is-info is-fullheight">
            <div className="hero-body">
                <div className="container">
                    <div className="title">Project 02 / Drawing Game</div>
                    <div className="subtitle">This page is really boring right now</div>
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