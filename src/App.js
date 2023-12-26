import './App.css';
import React from 'react';
import curs from './currencies.json';
const currencies = curs.currencies.map((elem) => [elem.name, elem.rate]);



function ConvertBlock(props) {
  return (
    <div className = 'convert-block'>
      <input 
      type = 'text' 
      value = {props.value} 
      onChange = {(e) => props.handleChange(e.target.value)}
      ></input>
    </div>
  )
}

function Currency(props) {
  const isChoosen = props.isChoosen ?? false;
  return <button 
  className={(isChoosen) ? 'choose-currency choosen' : 'choose-currency'}
  onClick = {() => props.change(props.num)}
  >{props.name}</button> 
}

function ChangeCurrency(props){
  let curs = currencies.map((elem) => <
    Currency name = {elem[0]} 
    isChoosen = {props.choosen == currencies.indexOf(elem)} 
    num = {currencies.indexOf(elem)}
    change = {(num) => props.change(num)}
    />);
  if (!props.more) {curs = <>{curs.slice(0, 5)} <button className='choose-currency other-currencies' onClick={props.makeMore}>. . .</button></>
  } else {curs = <>{curs} <button className='choose-currency other-currencies' onClick={props.makeMore}>~</button></>}
  
  return(
    <div className = 'change-currency'>
      {curs}
    </div>
  )
}

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      from: 1,
      to: 0,
      fromValue: 0,
      toValue: 0,
      isMore: false
    }
  }

  convert(value, isFrom, from = this.state.from, to = this.state.to){
    if(isFrom){
      this.setState({
        toValue: Math.round(value / currencies[to][1] * currencies[from][1] * 10000)/10000
      })
    } else {
      this.setState({
        fromValue: Math.round(value * currencies[to][1] / currencies[from][1] * 10000) / 10000
      });
    }
  }

  handleChange(value, isFrom){
    if (!Number(value) && Number(value) != 0) return;
    if (isFrom) {this.setState({
      fromValue : value, 
    }); } else this.setState({
      toValue: value,
    });
    this.convert(value, isFrom)


  }

  change(num, isFrom){
  
    const [from,to] = [this.state.from, this.state.to];
    new Promise ((resolve) => {
      if (isFrom) {
        this.setState ({from : num})
      } else {
        this.setState ({to:num})
      }
      if ((to == num) && (isFrom) || (from == num) && (!isFrom)) this.setState({from:to, to:from}); 
      resolve ();  
    }).then (
      result => this.convert(this.state.fromValue, true)
    )
  }

  render(){
    const state = this.state;
    return (
      <div className={(this.state.isMore) ? 'convert-container convert-container-big' : 'convert-container'}>
        <div className = 'currency-control'>
          <ChangeCurrency choosen = {this.state.from} change = {(num) => this.change(num, true)} more = {this.state.isMore} makeMore = {() => this.setState({isMore:!this.state.isMore})}/>
          <ChangeCurrency choosen={this.state.to} change={(num) => this.change(num, false)} more={this.state.isMore} makeMore={() => this.setState({ isMore: !this.state.isMore })} />
        </div>
        <div className = 'input-control'>
          <ConvertBlock 
          value = {state.fromValue} 
          handleChange={(value, isFrom = true) => this.handleChange(value, isFrom)}
          />
          <ConvertBlock
          value={state.toValue}
          handleChange={(value, isFrom = false) => this.handleChange(value, isFrom)}
          />
        </div>
      </div>
    )
  }
}

export default App;
