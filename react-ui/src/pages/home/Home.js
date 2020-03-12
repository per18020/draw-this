import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import socketIOClient from "socket.io-client";

function Home() {
    const [toPregame, setToPregame] = useState(false);

    useEffect(() => {
        const socket = socketIOClient();
        socket.on('test', data => console.log(data));
    }, [])

    const handleCreateGame = () => {
        axios.get("/api/createGame").then((res) => {            
            setToPregame(true);
        })
    }

    if (toPregame) return <Redirect to='/pregame' />

    return (
        <section className="hero is-info is-fullheight">
            <div className="hero-body">
                <div className="container">
                    <button className="button" onClick={handleCreateGame}>Create Game</button>
                </div>
            </div>
        </section>
    );
}

export default Home;