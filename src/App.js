import './App.css';
import React, {useState} from 'react';

function Modal(props){
  return(
    <div className = 'modal-background'>
      <div className = 'modal'>
        <div className = 'cross' onClick = {props.onClick}>X</div>
        <img src= 'https://www.icegif.com/wp-content/uploads/icegif-2013.gif' alt = 'chika fujivara' className = 'modal-img'></img>
      </div>
    </div>
  )
}


function ModalButton (props){
    return( <button 
      onClick = {props.onClick}
      className='modal-button button'>модальное окно<img 
      className = 'button-widget ' 
          src= 'https://w1.pngwing.com/pngs/804/103/png-transparent-star-symbol-logo-award-yellow-symmetry.png'
      ></img>
      </button>)
}

function App() {
  const [modal, setModal] = useState(false);
  const window = (modal) ? <Modal onClick = {() => setModal(false)}/>: console.log(1);
  return (
    <>
      <ModalButton onClick={() => setModal(true)}></ModalButton>
      {window}
    </>
  )
  
}

export default App;
