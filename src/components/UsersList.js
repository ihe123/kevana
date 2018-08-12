import React from 'react';
import '../css/UsersList.css';

const UsersList = props => {
  const { users, gameRoom } = props;
  return (
    <div className='users-list'>
      <h2>Players in Game Room: {gameRoom.substring(gameRoom.length - 5)}</h2>
      <ol>
        { users.map( user => (
          <li key={user}>{user}</li>
        )) }
      </ol>
    </div>
  )
}

export default UsersList;