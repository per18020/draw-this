import React, { useState, useEffect } from 'react'
import { Redirect } from "react-router-dom"
import { connect } from 'react-redux'
import { decompressAndParse } from '../../common/util';
import { setRound } from '../../redux/actions';
import { useIsGameOwner } from '../../common/effects';

import ScoringCard from './ScoringCard';
import StackGrid from "react-stack-grid";


function Scoring({ socket, roundState, setRound, player }) {
    const [toGame, setToGame] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [canVote, setCanVote] = useState(true);

    const isGameOwner = useIsGameOwner();

    useEffect(() => {
        socket.emit('game:round:get', round => {
            setRound(round);
            setIsLoading(false);
        });

        socket.on('game:round:listenForGoToGame', round => {
            setRound(round);
            setToGame(true);
        });

        socket.on('game:round:listenForScore', round => {
            setRound(round);
        })

        return () => {
            socket.off('game:round:listenForGoToGame');
            socket.off('game:round:listenForScore');
        }
    }, [])

    const onVote = playerID => {
        socket.emit('game:round:sendScore', { playerID }, round => {
            setRound(round);
        });
        setCanVote(false);
    }

    const getScoreHelper = playerID => {
        const index = roundState.scores.findIndex(obj => obj.playerID === playerID);
        if (index <= -1) return 0;
        return roundState.scores[index].score;
    }

    if (toGame)
        return <Redirect to="/game" />

    if (isLoading) {
        return (
            <section className="hero is-fullheight">
                <div className="hero-body">
                    <div className="container">
                        <div className="title">Loading...</div>
                    </div>
                </div>
            </section>
        );
    } else {
        return (
            <div className="container">
                <div className="section">
                    <div className="title">Scoring</div>
                    <StackGrid columnWidth={"33.33%"}>
                        {roundState.drawings.map(obj => {
                            return (
                                <ScoringCard 
                                    key={obj.playerID} 
                                    active={canVote && !(obj.playerID === player)} 
                                    score={getScoreHelper(obj.playerID)} 
                                    onVote={() => onVote(obj.playerID)} 
                                    canvasData={decompressAndParse(obj.data)} 
                                    />
                            )
                        })}
                    </StackGrid>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => ({
    socket: state.appReducer.socket,
    roundState: state.gameReducer.round,
    player: state.gameReducer.player,
})

export default connect(mapStateToProps, { setRound })(Scoring);