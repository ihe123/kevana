import React from 'react';
import '../css/GameRoomCard.css';

const GameRoomCard = props => {
  const { gameRoom, users, joinGame } = props;
  return (
    <div className='game-room-card-outer-container'>
      <div className='game-room-card-inner-container'>
        <div>
          <h3>Room: { gameRoom.substring(gameRoom.length - 5) }</h3>
          <h4>Players in Room:</h4>
          <ul>
            {
              users.map(user => 
                <li key={`${gameRoom}-${user}`}>{user}</li>
              )
            }
          </ul>
        </div>
        <div style={{textAlign: 'center'}}>
          <button className='join-game-button' onClick={() => {joinGame(gameRoom)}}>Join Game Room</button>
        </div>
      </div>
    </div>
  )
}

export default GameRoomCard;