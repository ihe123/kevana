import React from 'react';

const TriviaChoices = props => {
  const { choices, handleRadioSelection, selectedChoice } = props;
  return (
    <div>
      {choices.map((choice, index) => (
        <div key={index}>
          <label htmlFor={`question-choice${index}`}>
            <input 
              type="radio" 
              id={`question-choice${index}`} 
              name="trivia-question" 
              value={choice} 
              onChange={handleRadioSelection}
              checked={selectedChoice === choice}
            />
            {choice}
          </label>
        </div>
      ))}
    </div>
  )
}

export default TriviaChoices;