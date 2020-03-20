import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

import Timeout from './Timeout';


function TimeoutContainer({ socket }) {
    const [toTimeout, setToTimeout] = useState(false)

    useEffect(() => {
        if (!socket) return;
        socket.on('gameTimedOut', () => {
            setToTimeout(true);
          })
    }, [socket]);

    return (toTimeout) ? <Redirect to="/timeout" /> : null
}

const mapStateToProps = state => ({
    socket: state.appReducer.socket
})

export default connect(mapStateToProps)(TimeoutContainer);