import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router';
import { stringifyAndCompress } from '../../common/util';
import { setRound } from '../../redux/actions';

import Canvas from '../../common/components/canvas/Canvas';
import Timer from '../../common/components/Timer';

function Drawer({ socket, currentCanvasData, setRound }) {
    const [prompt, setPrompt] = useState("");
    const [toWait, setToWait] = useState(false);

    useEffect(() => {
        socket.on('game:round:listenForPrompt', ({ prompt }) => {
            setPrompt(prompt);
        })

        return () => {
            socket.off('game:round:listenForPrompt')
        }
    }, [])

    const onFinished = () => {
        let compressedAvatarData = stringifyAndCompress(currentCanvasData);
        socket.emit("game:round:sendDrawing", compressedAvatarData, round => {
            setRound(round);
        });
        setToWait(true);
    }

    if (toWait)
        return <Redirect to="/wait" />

    return (
        <div className="container">
            <div className="columns is-mobile">
                <div className="column is-half is-offset-one-quarter">
                    {!prompt
                        ? <div className="title">Waiting for describer to describe the image</div>
                        : <div className="container">
                            <div className="title">Prompt: {prompt}</div>
                            <Canvas autosave></Canvas>
                            <button onClick={onFinished} className="button is-primary">Finish Drawing</button>
                            <div className="title">
                                <Timer onTimeout={onFinished} time={60} /> seconds remaining
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    socket: state.appReducer.socket,
    currentCanvasData: state.appReducer.currentCanvasData
})

export default connect(mapStateToProps, { setRound })(Drawer);