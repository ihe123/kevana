import React, { Component } from 'react';
import { OrdinalFrame } from 'semiotic';
import TriviaChoices from './TriviaChoices';

class TriviaGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      answerFrequencyData: []
    };
  }

  getTextWidth = (text, font) => {
    var canvas = this.getTextWidth.canvas || (this.getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
}

  render() {
    const { number, choices, question, handleRadioSelection, handleSubmitAnswer, answerFrequencyData, selectedChoice } = this.props;
    const axis = {
      orient: "left",
      label: {
        name: "Answers Chosen by Others So Far",
        position: { anchor: "end" },
        locationDistance: -215
      },
      ticks: 1
    };
    const colors = ['#C3E5DA', '#F48788', '#F9DFD5', '#EAADAD', '#FBBEA7'];

    const maxTextWidth = Math.max(...choices.map(choice => {
      return this.getTextWidth(choice, '12pt georgia')
    }))

    return (
      <div>
        <div style={{display: 'flex', justifyContent: 'end'}}>
          <OrdinalFrame 
            data={answerFrequencyData}
            rAccessor={'count'}
            oAccessor={'answer'}
            style={ (d, i) => ({ fill: colors[i] })}
            axis={axis}
            size={[ Math.min(500, window.innerWidth), 300 ]}
            projection={'horizontal'}
            type={'bar'}
            margin={{ left: maxTextWidth + 10, top: 50, bottom: 50, right: 10 }}
            oPadding={10}
            renderMode={ 'sketchy'}
            oLabel={d => <text fontSize='0.9rem' textAnchor='end'>{d}</text> }
          />
        </div>
        <div style={{padding: '1rem'}}>
          <h1>Question #{number}</h1>
          <p>{question}</p>
          <form>
            <TriviaChoices selectedChoice={selectedChoice} choices={choices} handleRadioSelection={handleRadioSelection}/>
            <div style={{textAlign: 'center'}}>
              <input className="form-submit-button" type="submit" value="Submit" 
                onClick={ event => {
                  handleSubmitAnswer(event);
                }} 
              />
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default TriviaGame;