import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { setDescriber } from '../../redux/actions';

import Describer from './Describer';
import Drawer from './Drawer';

function Game({ socket, player, setDescriber }) {
    const [isDescriber, setIsDescriber] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        socket.emit('game:getDescriber', describer => {
            if (describer.id === player) setIsDescriber(true);
            setDescriber(describer);
            setIsLoading(false);
        })
    }, [])

    if (!isLoading) {
        return (
            <div className="container">
                <div className="section">
                    {isDescriber
                        ? <Describer></Describer>
                        : <Drawer></Drawer>
                    }
                </div>
            </div>
        );
    } else {
        return null;
    }
}

const mapStateToProps = state => ({
    socket: state.appReducer.socket,
    player: state.gameReducer.player
})


export default connect(mapStateToProps, { setDescriber })(Game);