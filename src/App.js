import './App.css';
import React from 'react';
import data from "./data.json";
const categories = ['Все', 'Море','Горы','Архитектура', 'Города']

function CreateFilter(props){
  const buttons = categories.map(elem => <button className={(props.active != categories.indexOf(elem)) ? "button filter" : "button filter filter-active"}>{elem}</button>)
  return buttons;
}

function PagesControl(props){
  let pages = [];
  for (let i = 0; i <= props.num-1; i++){
    pages.push(<button className = 'button filter page-button' onClick = {() => props.changePage(i)}>{i+1}</button>)
  }
  return pages;
}

function CreateGallery(props) {
  let gallery = data.map (elem => {
    if (elem.name.toLowerCase().includes(props.search.toLowerCase()) && (props.category == 0 || props.category == elem.category )){
      return <CreatePhotoes id = {data.indexOf(elem)
    }
  />}});
  gallery = gallery.filter((elem) => elem != undefined)
  let page;
  if (props.page+1 * 4 > gallery.length) {
    page = Math.ceil(gallery.length/4-1);
  } else {
    page = props.page*4;
  }
  return gallery.slice(page, page + 4);
}

function CreatePhotoes (props){
  const id = props.id;
  return (
    <div className = "photo-container">
      <img className = 'photo' src = {data[id].photoes[0]}></img>
      <div className = 'bottom-container'>
        <div className = 'small-photo-container'>
          <img className='photo small-photo' src={data[id].photoes[1]}></img>
          <img className='photo small-photo' src={data[id].photoes[2]}></img>
        </div>
        <h3 className = 'photo-name'>{data[id].name}</h3>
      </div>
    </div>
  )
}

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      filter : 0,
      search: '',
      page : 0,
      pages : Math.ceil(data.length/4),
      count : data.length
    }
  }

  filterControl(target){
    if (target.parentNode.className == "control") {
      new Promise ((resolve) => {
        this.setState ({filter : categories.indexOf(target.innerHTML)});
        resolve();
      })
    }
  }

  render(){
    const state = this.state
    return ( 
    <div className = 'gallery-container'>
      <h2>Моя коллекция фотографий</h2>
      <div className="filter-control">
        <div className='control' onClick={e => this.filterControl(e.target)}>
          <CreateFilter active = {state.filter}/>
        </div>
        <input type = 'text' className = 'gallery-search' placeholder='поиск' value = {state.search} onChange = {(e) => this.setState({search : e.target.value})}></input>
      </div>
      <div className = 'photoes-container'>
          <CreateGallery 
            page={state.page} 
            search={state.search} 
            setPages = {(pages) => this.setState({pages:pages})}
            category = {this.state.filter}
            />
      </div>
        <PagesControl num = {state.pages} changePage = {(i) => this.setState({page:i})}/>
    </div>
  )}
}

export default App;