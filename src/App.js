
import './App.css';
import styled from 'styled-components'
import { useEffect, useState } from 'react';

const bird_size = 20;
const game_width = 500;
const game_height = 500;

function App() {
  const [birdPosition, setBirdPosition] = useState(250);
  useEffect(() => {

})


  return (
    <Div>
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