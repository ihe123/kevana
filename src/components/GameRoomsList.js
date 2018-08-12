import React, { Component } from 'react';
import { firestore } from '../services/firebaseConstants';
import GameRoomCard from './GameRoomCard';
import '../css/GameRoomsList.css';

class GameRoomsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      existingGameRooms: [],
      existingGameRoomsUsers: []
    };
  }

  componentDidMount() {
    this.unsubFromGamerooms = firestore.collection('gameRooms').onSnapshot(snapshot => {
      let existingGameRooms = [];
      let existingGameRoomsUsers = [];
      snapshot.forEach(doc => {
        existingGameRooms.push(doc.id);
        existingGameRoomsUsers.push([doc.data().users]);
      });
      this.setState({
        existingGameRooms,
        existingGameRoomsUsers
      });
    })
  }

  componentWillUnmount() {
    this.unsubFromGamerooms();
  }

  render() {
    const { existingGameRooms, existingGameRoomsUsers } = this.state;
    const { joinGame } = this.props;
    return (
      <div className='game-rooms-container'>
        { existingGameRooms.map( (gameRoom, index) => (
          <GameRoomCard key={gameRoom} gameRoom={gameRoom} users={existingGameRoomsUsers[index][0]} joinGame={joinGame}/>
        )) }
      </div>
    )
  }
}

export default GameRoomsList;