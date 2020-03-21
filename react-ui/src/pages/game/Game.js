import React from 'react'

import Describer from './Describer';
import Drawer from './Drawer';

function Game() {
    return (
        <div className="container">
            <div className="section">
                <Describer></Describer>
                <Drawer></Drawer>
            </div>
        </div>
    );
}

export default Game;