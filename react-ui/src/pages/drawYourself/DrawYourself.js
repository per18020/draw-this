import React, { useState } from 'react'
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';

function DrawYourself({ socket, gameUUID }) {
    const [toNextPage, setToNextPage] = useState(false);
    const [nickname, setNickname] = useState("");

    const handleContinue = () => {
        socket.emit('joinGame', { player: { nickname }, gameUUID }, () => {
            setToNextPage(true);
        });
    }

    const handleNickNameChange = event => {
        setNickname(event.target.value);
    }

    if (toNextPage)
        return <Redirect to='/pregame' />

    return (
        <div className="container">
            <div className="section">
                <div className="title">Draw Yourself</div>
                <div className="subtitle">And then there's going to be a canvas here to draw your avatar</div>

                <label className="label">Nickname</label>
                <div className="field has-addons">
                    <div className="control is-expanded">
                        <input onChange={handleNickNameChange} className="input" type="text" placeholder="A super awesome nickname"/>
                    </div>
                    <div className="control">
                        <button onClick={handleContinue} className="button is-primary">Continue</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return { 
        socket: state.appReducer.socket,
        gameUUID: state.gameReducer.gameUUID
    };
}

export default connect(mapStateToProps)(DrawYourself);