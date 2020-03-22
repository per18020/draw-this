import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router';

import Canvas from '../../common/components/canvas/Canvas';

function Drawer({ socket }) {
    const [prompt, setPrompt] = useState("");
    const [toWait, setToWait] = useState(false);

    useEffect(() => {
        socket.on('game:listenForPrompt', response => {
            setPrompt(response)
        })

        return () => {
            socket.off('game:listenForPrompt')
        }
    }, [])

    const onFinished = () => {
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
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    socket: state.appReducer.socket
})

export default connect(mapStateToProps)(Drawer);