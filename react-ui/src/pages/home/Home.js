import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { setGameUUID } from '../../redux/actions';

function Home({ socket, setGameUUID }) {
    const [toPregame, setToPregame] = useState(false);

    const handleCreateGame = () => {
        socket.emit('createGame', gameUUID => {
            setGameUUID(gameUUID);
            setToPregame(true);
        });
    }

    if (toPregame)
        return <Redirect to='/pregame' />

    return (
        <section className="hero is-info is-fullheight">
            <div className="hero-body">
                <div className="container">
                    <div className="title">Project 02 / Drawing Game</div>
                    <div className="subtitle">This page is really boring right now</div>
                    <button className="button" onClick={handleCreateGame}>Create Game</button>
                </div>
            </div>
        </section>
    );
}

const mapStateToProps = state => {
    return { socket: state.appReducer.socket };
}

export default connect(mapStateToProps, { setGameUUID })(Home);