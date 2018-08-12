import React from 'react';

const TriviaFinishedCard = props => {
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh'}}>
      <h2>Congrats on finishing the trivia game!</h2>
      <p>So, what do you want to do next?</p>
      <button onClick={ () => { window.location.href = '/trivia' } }>Play Again</button>
    </div>
  )
}

export default TriviaFinishedCard;