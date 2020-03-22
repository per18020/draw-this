import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router';

function Describer({ socket }) {
    const [prompt, setPrompt] = useState("");
    const [toWait, setToWait] = useState(false)
    const limit = 40;

    const onSendPrompt = () => {
        socket.emit('game:sendPrompt', { prompt });
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
                            <img src="https://bulma.io/images/placeholders/800x480.png" alt="to describe" />
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
                        <p className="">{prompt.length} of {limit} characters used</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    socket: state.appReducer.socket
})

export default connect(mapStateToProps)(Describer);