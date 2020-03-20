import React from 'react';
import DisplayCanvas from '../../common/components/DisplayCanvas';

function UserCard(props) {
    console.log("userCard");
    console.log(props.canvasData)

    return (
        <div className="media-content">
            <div className="columns is-vcentered">
                <div className="column is-narrow">
                    <div className="image is-64x64">
                        <DisplayCanvas canvasData={props.canvasData} />
                    </div>
                </div>
                <div className="column">
                    <div className="subtitle">
                        {props.name}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserCard;