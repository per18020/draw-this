import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router';

import { setRound } from '../../redux/actions';

import Timer from '../../common/components/Timer';

function Describer({ socket, setRound }) {
    const [prompt, setPrompt] = useState("");
    const [toWait, setToWait] = useState(false)
    const [imageURL, setImageURL] = useState("");
    const limit = 40;

    useEffect(() => {
        socket.emit('game:round:get', ({ image }) => {
            setImageURL(image);
        });
    }, [])

    const onSendPrompt = () => {
        socket.emit('game:round:sendPrompt', { prompt }, round => {
            setRound(round);
        });
        setToWait(true);
    }

    const onPromptChange = event => {
        if (event.target.value.length > limit) event.target.value = event.target.value.substring(0, limit);
        setPrompt(event.target.value);
    }

    if (toWait)
        return <Redirect to="/wait" />

    return (
        <div className="container">
            <div className="columns is-mobile">
                <div className="column is-half is-offset-one-quarter">
                    <div className="title">
                        Describe this image
                    </div>
                    <div className="field">
                        <figure className="image">
                            <img src={imageURL} alt="To describe" />
                        </figure>
                    </div>
                    <div className="field has-addons">
                        <div className="control is-expanded">
                            <input onChange={onPromptChange} className="input" type="text" placeholder="Write your prompt" />
                        </div>
                        <div className="control">
                            <button onClick={onSendPrompt} className="button is-primary">Send Prompt</button>
                        </div>
                    </div>
                    <div className="field">
                        <p>{prompt.length} of {limit} characters used</p>
                    </div>
                    <div className="field">
                        <div className="title">
                            <Timer onTimeout={onSendPrompt} time={20} /> seconds remaining
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    socket: state.appReducer.socket
})

export default connect(mapStateToProps, { setRound })(Describer);