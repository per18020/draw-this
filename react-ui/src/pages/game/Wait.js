import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { Redirect } from 'react-router'

function Wait({ socket }) {
    const [toScoring, setToScoring] = useState(false);

    useEffect(() => {
        socket.on('game:round:listenForGoToScoring', () => {
            setToScoring(true);
        });

        return () => {
            socket.off('game:round:listenForGoToScoring');
        }
    }, [])

    if (toScoring)
        return <Redirect to="/scoring" />
        
    return (
        <section className="hero is-fullheight">
            <div className="hero-body">
                <div className="container">
                    <div className="title">Wait until everyone has finished drawing</div>
                </div>
            </div>
        </section>
    );
}

const mapStateToProps = state => ({
    socket: state.appReducer.socket
})

export default connect(mapStateToProps)(Wait);