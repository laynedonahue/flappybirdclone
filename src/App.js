
import './App.css';
import styled from 'styled-components'
import { useEffect, useState } from 'react';

const bird_size = 20;
const game_width = 500;
const game_height = 500;
const gravity = 5;
const jump_height =100;

function App() {
  const [birdPosition, setBirdPosition] = useState(250);
  
  useEffect(() => {
    let timeId;
    if (birdPosition < game_height - bird_size) {
        timeId = setInterval(() => {
        setBirdPosition((birdPosition) => birdPosition + gravity);
      }, 24);
    }
      return() => {
        clearInterval(timeId);
      };
});

const handleClick = () => {
  let updateBirdPosition = birdPosition - jump_height;
  if (updateBirdPosition < 0) {
    updateBirdPosition(0)
  }
  else {
    setBirdPosition(updateBirdPosition)
  }
};


  return (
    <Div onClick={handleClick}>
      <GameBox height={game_height} width={game_width}>
      <Bird size={bird_size} top={birdPosition} />
      </GameBox>
    </Div>
  );
}

export default App;


const Bird = styled.div`
position: absolute;
background-color: cyan;
height: ${(props) => props.size}px;
width: ${(props) => props.size}px;
top: ${(props) => props.top}px;
border-radius: 50%;
`;

const Div = styled.div`
display: flex;
width: 100%;
justify-content: center;
`;

const GameBox = styled.div`
height: ${(props) => props.height}px;
width: ${(props) => props.width}px;
background-color: black;
`;