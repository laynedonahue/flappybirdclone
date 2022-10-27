
import './App.css';
import styled from 'styled-components'
import { useEffect, useState } from 'react';

const bird_size = 20;
const game_width = 500;
const game_height = 500;
const gravity = 5;
const jump_height = 100;
const obstacle_width = 40;
const obstacle_gap = 200;



function App() {
  const [birdPosition, setBirdPosition] = useState(250);
  const [gameStart, setGameStart] = useState(false);
  const [obstacleHeight, setObstacleHeight] = useState(100);
  const [obstacleLeft, setObstacleLeft] = useState(game_width - obstacle_width);
  
  const bottomObstacleHeight = game_height - obstacle_gap - obstacleHeight;

  useEffect(() => {
    let timeId;
    if ( gameStart && birdPosition < game_height - bird_size) {
        timeId = setInterval(() => {
        setBirdPosition((birdPosition) => birdPosition + gravity);
      }, 24);
    }
      return() => {
        clearInterval(timeId);
      };
}, [birdPosition, gameStart]);

useEffect (() => {
  let obstacleId;
  if (gameStart && obstacleLeft >=0) {
    obstacleId = setInterval(() => {
      setObstacleLeft((obstacleLeft) => obstacleLeft -2);
  })
  return() => {
    clearInterval(obstacleId);
  }
  }
});


const handleClick = () => {
  let updateBirdPosition = birdPosition - jump_height;

  if(!gameStart) {
    setGameStart(true)
  } else if (updateBirdPosition < 0) {
    updateBirdPosition(0)
  } else {
    setBirdPosition(updateBirdPosition)
  }
};


  return (
    <Div onClick={handleClick}>
      <GameBox height={game_height} width={game_width}>
        <Obstacle 
        top={0}
        width={obstacle_width}
        height={obstacleHeight}
        left={obstacleLeft}
        />

        <Obstacle 
        top={game_height - (obstacleHeight + bottomObstacleHeight)}
        width={obstacle_width}
        height={bottomObstacleHeight}
        left={obstacleLeft}
        />

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

const Obstacle = styled.div`
  position: relative;
  top: ${(props) => props.top}px;
  background-color: grey;
  width:${(props) => props.width}px;
  height: ${(props) => props.height}px;
  left ${(props) => props.left}px;
`;