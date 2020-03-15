import React from 'react';

function UserCard(props) {
    return (
        <div className="media-content">
            <div className="columns is-vcentered">
                <div className="column is-narrow">
                    <p className="image is-64x64">
                        <img src="https://bulma.io/images/placeholders/128x128.png" alt="User Icon" />
                    </p>
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