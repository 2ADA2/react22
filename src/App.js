import './App.css';
import React from 'react';
import questions from './questions.json'


const progress = React.createRef();

function Answer(props){
  return <button className='Quiz-answer button' 
    onClick={() => props.click(props.question)}
  >{props.question}</button>
}

function Question(props){
  const finished = props.finished + '%';
  return (
    <div className = 'Quiz-section'>
      <div className = "Quiz-container">
        <div className = 'progressBar'>
          <div className = 'progress' ref = {progress} style = {{width: finished}}></div>
        </div>
        <div className = 'question'>{props.question}</div>
        <div className = 'Quiz-answers'>
          <Answer question={props.questions[0]} click = {(answ) => props.click(answ)}/>
          <Answer question={props.questions[1]} click = {(answ) => props.click(answ)} />
          <Answer question={props.questions[2]} click = {(answ) => props.click(answ)} />
        </div>
      </div>

      <div id = 'section-decoration1' className = 'section-decoration'>
        <div id = 'section-decoration2' className = 'section-decoration'></div>
      </div>
    </div>
  )
}

function End (props) {
  props.finish()
  return (
    <div className='Quiz-section'>
      <div className="Quiz-container">
        <div className='progressBar'>
          <div className='progress progress-end' ref={progress} style = {{width:`${props.finished + '%'}`}}></div>
        </div>
        <div className = 'result-container'>
          <h2>Результат:</h2>
          <div className = 'result'>{props.result}%</div>
        </div>
      </div>
      <div id='section-decoration1' className='section-decoration'>
        <div id='section-decoration2' className='section-decoration'></div>
      </div>
    </div>
  )
}

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      stage : 'stage1',
      result : 0,
      finished: 0,
      len : Object.keys(questions).length,
      end : false
    }
  }

  checkAnswer(answ){
    const stageNow = questions[this.state.stage]
    let result = stageNow[stageNow.answer] == answ;
    (result) ? result = 1 : result = 0;
    this.setState((state) => ({
      stage : Object.keys(questions)[state.finished+1],
      finished : state.finished + 1,
      result : state.result + result,
    }))
    console.log(this.state.finished, '  ', this.state.result);
    if (this.state.finished == this.state.len-1) this.setState({end : true});
  }

  render(){
    if (this.state.end) return (
      <End 
      result={this.state.result / this.state.finished * 100} 
      finished={(this.state.finished-1) / this.state.len * 100}
        finish={() => setTimeout(() => progress.current.style.width = '100%', 10)}
      />
      );
    const stage = questions[this.state.stage];
    const qstns = [stage[1],stage[2],stage[3]];
    return <Question 
      click = {(answ) => this.checkAnswer(answ)} 
      question={stage.question}
      questions = {qstns}
      finished = {this.state.finished/this.state.len*100}
    />
  }
}

export default App;
