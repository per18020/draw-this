import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setPlayers } from '../../redux/actions';

import UserCard from './UserCard';

function Pregame({ socket, gameUUID, players, setPlayers }) {
    const [linkInput, setLinkInput] = useState(null);
    const shareURL = window.location.protocol + "//" + window.location.host + "/?join=" + gameUUID;

    useEffect(() => {
        socket.emit('getPlayers', { gameUUID }, response => {
            setPlayers(response);
        });

        socket.on('playerJoined', response => {
            setPlayers(response);
        })

        // Cleanup
        return () => {
            socket.off('playerJoined');
        }
    }, [])

    const handleCopyPress = () => {
        linkInput.select();
        document.execCommand('copy');
    }

    const handleLinkFocus = event => {
        event.target.select();
    }

    return (
        <div className="container">
            <div className="section">
                <div className="box">
                    <label className="label">Copy this link to invite your friends</label>
                    <div className="field has-addons">
                        <div className="control is-expanded">
                            <input 
                                ref={(linkInput) => setLinkInput(linkInput)}
                                onFocus={handleLinkFocus} 
                                className="input" 
                                type="text" 
                                placeholder="Link goes here" 
                                value={shareURL} 
                                readOnly />
                        </div>
                        <div className="control">
                            <button onClick={handleCopyPress} className="button is-link">Copy</button>
                        </div>
                    </div>
                </div>
                <div className="columns">
                    <div className="column">
                        <div className="box">
                            <div className="title">
                                Settings
                            </div>
                            <div className="subtitle">
                                And then settings will be here
                            </div>
                        </div>
                        <div className="button is-primary">Start Game</div>
                    </div>
                    <div className="column">
                        <div className="box">
                            {
                                players.map((player, index) => {
                                    return <UserCard key={index} name={player.nickname}></UserCard>
                                })
                            }
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
        gameUUID: state.gameReducer.gameUUID, 
        players: state.gameReducer.players
    };
}

export default connect(mapStateToProps, { setPlayers })(Pregame);