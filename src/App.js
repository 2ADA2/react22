import './App.css';
import React from 'react';
import Users from "./users.json"
let users = Users.users;
users.map((elem) => elem.offer = true);

function User(props){
  return (
    <div className = "user">
      <img  className = "user-ava" src= "https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_square.jpg"></img>
      <div className = 'info'>
        <p className = 'userName'>{props.name}</p>
        <p className = 'userMail'>{props.email}</p>
      </div>
      {(props.inList) ? 
        <button className = 'offer' onClick = {() => {props.changeStatus(props.num)}}>
        {(props.offer) ? '+' : '-'}
        </button> : <></>
      }
      
    </div>
  )
}

function CreateList(props){
  let list = [];
  let num = 0;
  props.users.forEach((user) => {
    if (user.name.toLowerCase().includes(props.search.toLowerCase())) {
      list.push(<User 
      name = {user.name} 
      email = {user.email} 
      offer = {user.offer}
      num = {num}
      inList = {props.inList}
      changeStatus = {(user) => { props.changeStatus(user)}}
      />)
    }
    num += 1;
  })
  return list;
}

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      users : users,
      search : '',
      isSend : false
    }
  }


  send(){
      this.setState((state) => ({isSend : !state.isSend}))
  }
  changeStatus (user){
    const users = this.state.users;
    users[user].offer = !users[user].offer;
    this.setState ({users : users});
  }

  render(){
    if(this.state.isSend) {

      let sendUsers = [];
      this.state.users.forEach(user => {
        console.log(user.offer);
        if(user.offer == false) sendUsers.push(user);
      });
      console.log(sendUsers);

      return (
        <div className = 'users-list isSend'>
          <div>Приглашения отправлены:</div>
          <div className = 'list'>
            <CreateList
            inList = {false}
            users={sendUsers}
            search={''}
            />
          </div>
          <button className='send' onClick={() => this.send()}>Назад</button>
        </div>
      )
    }

    return (
      <div className = 'users-list'>
        <div className = 'search-container' >
          <img src= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyi_CVTmoL1ITHFxQkfLwvj93hcsgA1Olkhg&usqp=CAU" className='search-img' />
          <input 
          type='text' 
          className="user-search" 
          placeholder="Найти пользователя"
          onChange = {(e) => this.setState({search : e.target.value})}
          value={this.state.search}
          ></input>

        </div>
        <div className='list'>
        <CreateList 
        users = {this.state.users} 
        search = {this.state.search}
        inList = {true}
        changeStatus = {(user) => {this.changeStatus(user)}}
          />
            
        </div>
        <button className = 'send' onClick = {() => this.send()}>Отправить приглашение</button>
      </div>
      )
  }
}

export default App;
