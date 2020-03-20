import React, { useState } from 'react'
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { stringifyAndCompress } from '../../common/util';

import Canvas from '../../common/components/Canvas';

function DrawYourself({ socket, currentCanvasData, gameUUID }) {
    const [toNextPage, setToNextPage] = useState(false);
    const [toTimeout, setToTimeout] = useState(false);
    const [nickname, setNickname] = useState("");

    const handleContinue = () => {
        let compressedAvatarData = stringifyAndCompress(currentCanvasData);
        socket.emit('joinGame', { player: { nickname, compressedAvatarData }, gameUUID }, successful => {
            if (successful) {
                setToNextPage(true);
            } else {
                setToTimeout(true);
            }
            
        });
    }

    const handleNickNameChange = event => {
        setNickname(event.target.value);
    }

    if (toTimeout)
        return <Redirect to="/timeout" />

    if (toNextPage)
        return <Redirect to="/pregame" />

    return (
        <div className="container">
            <div className="section">
                <div className="columns">
                    <div className="column">
                        <div className="title">Draw Yourself</div>
                        <Canvas autoSave ></Canvas>
                    </div>
                    <div className="column">
                        <label className="label">Nickname</label>
                        <div className="field has-addons">
                            <div className="control is-expanded">
                                <input onChange={handleNickNameChange} className="input" type="text" placeholder="A super awesome nickname" />
                            </div>
                            <div className="control">
                                <button onClick={handleContinue} className="button is-primary">Continue</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        socket: state.appReducer.socket,
        currentCanvasData: state.appReducer.currentCanvasData,
        gameUUID: state.gameReducer.gameUUID
    };
}

export default connect(mapStateToProps)(DrawYourself);