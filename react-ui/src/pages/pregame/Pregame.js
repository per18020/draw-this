import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setPlayers } from '../../redux/actions';
import { decompressAndParse } from '../../common/util';
import { useIsGameOwner, useShareLink } from '../../common/effects';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'

import UserCard from './UserCard';
import { Redirect } from 'react-router';

function Pregame({ socket, gameUUID, players, setPlayers, player }) {
    const [linkInput, setLinkInput] = useState(null);
    const [toGame, setToGame] = useState(null);
    
    const shareURL = useShareLink(gameUUID);
    const isGameOwner = useIsGameOwner(player, players);

    useEffect(() => {
        socket.emit('getPlayers', { gameUUID }, response => {
            setPlayers(response);
        });

        socket.on('playerJoined', response => {
            setPlayers(response);
        })

        socket.on('playerLeft', response => {
            setPlayers(response);
        })

        socket.on('gameStarted', () => {
            setToGame(true);
        })

        // Cleanup
        return () => {
            socket.off('playerJoined');
            socket.off('playerLeft');
            socket.off('gameStarted');
        }
    }, [])

    const handleCopyPress = () => {
        linkInput.select();
        document.execCommand('copy');
    }

    const handleLinkFocus = event => {
        event.target.select();
    }

    const handleStartGame = () => {
        socket.emit('startGame');
    }

    const canStartGame = () => {
        return players.length > 1;
    }

    if (toGame)
        return <Redirect to="/game" />

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
                            <button onClick={handleCopyPress} className="button is-link">
                                <span className="icon">
                                    <FontAwesomeIcon icon={faCopy} />
                                </span>
                                <span>Copy</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="columns">
                    <div className="column">
                        {/* <div className="box">
                            <div className="title">
                                Settings
                            </div>
                            <div className="subtitle">
                                And then settings will be here
                            </div>
                        </div> */}
                        <button onClick={handleStartGame} className="button is-primary" disabled={!isGameOwner || !canStartGame()}>Start Game</button>
                    </div>
                    <div className="column">
                        <div className="box">
                            {
                                players.map((player, index) => {
                                    return <UserCard
                                        key={index}
                                        name={player.nickname}
                                        canvasData={decompressAndParse(player.compressedAvatarData)}
                                        gameOwner={player.gameOwner} />
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    socket: state.appReducer.socket,
    gameUUID: state.gameReducer.gameUUID,
    players: state.gameReducer.players,
    player: state.gameReducer.player
})

export default connect(mapStateToProps, { setPlayers })(Pregame);