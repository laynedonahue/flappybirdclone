
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
  const [score, setScore] = useState(-2)
  
  const bottomObstacleHeight = game_height - obstacle_gap - obstacleHeight;

  useEffect(() => {
    let timeId;
    if (gameStart && birdPosition < game_height - bird_size) {
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
  if (gameStart && obstacleLeft >= -obstacle_width) {
    obstacleId = setInterval(() => {
      setObstacleLeft((obstacleLeft) => obstacleLeft -5);
  }, 24);
  return() => {
    clearInterval(obstacleId);
  };
}
  else {
    setObstacleLeft(game_width - obstacle_width);
    setObstacleHeight(Math.floor(Math.random() * (game_height - obstacle_gap)));
    console.log(score)
    setScore(score => score + 1);
    console.log(score)
  }
}, [gameStart, obstacleLeft]); 

useEffect(() => {
  const obstacleHasCollidedTop = birdPosition >= 0 && birdPosition < obstacleHeight;
  const obstacleHasCollidedBottom = birdPosition <= 500 && birdPosition >= 500 - bottomObstacleHeight;
  if (obstacleLeft >= 0 && obstacleLeft <= obstacle_width && (obstacleHasCollidedTop || obstacleHasCollidedBottom)) {
    setGameStart(false);
    setScore(score => score - 2 - score);
  }
}, [birdPosition, obstacleHeight, bottomObstacleHeight, obstacleLeft]
);





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
      <span> {score} </span>
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
& span{
  color: white;
  font-size: 24px;
  position: absolute;
}
`;

const GameBox = styled.div`
height: ${(props) => props.height}px;
width: ${(props) => props.width}px;
background-color: black;
overflow: hidden;
`;

const Obstacle = styled.div`
  position: relative;
  top: ${(props) => props.top}px;
  background-color: grey;
  width:${(props) => props.width}px;
  height: ${(props) => props.height}px;
  left ${(props) => props.left}px;
`;