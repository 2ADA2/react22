import React, {useState, useEffect} from 'react'
import './App.css';
import loveImg from './static/Lovepik_com-401112306-pink-letter.png'

function Loading(){
  return (
  <>
    <h1>{"Валентинка от Артёмки Кристиночке)))))"}</h1>
    <img className="gif" src="https://i.pinimg.com/originals/c7/bd/9d/c7bd9d1c6a0031d35c02356325ab081c.gif"></img>
    
  </>
)
}

function App() {
  const [loaded, setLoaded] = useState(false);
  const [time, setTime] = useState (false);
  const [animation, setAnimation] = useState("letter-shower");
  const [letterAnimation, setLetterAnimation] = useState("letter-inner-shower");
  const [modalAnimation, setModalAnimation] = useState(false);

  useEffect(() => {
    const time = setTimeout(() => {
      setTime(true)
    }, 4000);
  }, []);

  return (
    <div className = 'root'
      onClick={() => {
        if (letterAnimation == 'letter-bigger') {
          console.log(1)
          setModalAnimation("modal-shower");
          setLetterAnimation("letter-inner-hide")
        }
      }}>
      {(!(loaded && time)) ? <Loading /> : <></>}
      
      <img 
      className="letter" 
        src='https://free-png.ru/wp-content/uploads/2021/12/free-png.ru-675.png' onLoad={() => setLoaded(!loaded)}
        style={(loaded && time) ? {"animation-name" : animation} : {}}
        onClick = {() => {
          setAnimation("letter-hide");
          setLetterAnimation("letter-bigger");
          }}
      ></img>
      <img 
        src={loveImg}
      className = "letter-inner"
      style={(loaded && time) ? { "animation-name": letterAnimation } : {}}
      ></img>
      <div className="modal" style={(modalAnimation) ? { "display":"flex", "animation-name": modalAnimation } : {}}>
        <div className = "img-container">
        <img src= "https://i.ytimg.com/vi/dWS3jjKgnPE/hqdefault.jpg?sqp=-oaymwEmCOADEOgC8quKqQMa8AEB-AGaBIAC6AKKAgwIABABGGUgXyhWMA8=&rs=AOn4CLAxy_yEh5CFeu6ux7pIZ9YyxbSESg"></img>
        </div>
        <p>Блин ну ты такая киси миси хаги ваги мимимими красивая смушняешб миня) го встр?)))))</p>
      </div>
    </div>
    )
}
export default App;