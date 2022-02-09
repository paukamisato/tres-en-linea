import { useState } from 'react';
import './App.css';
import Board from './components/Board/Board';
import ScoreBoard from './components/ScoreBoard/ScoreBoard';

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const App = () => {

  const [turn, setTurn] = useState('x');
  const [squares, setSquares] = useState(Array(9).fill(null));
  const[winingSquares, setWiningSquares] = useState([]);
  const [score, setScore]= useState({
    x:0,
    o:0,
  });

  const reset = () => {
    setTurn('x');
    setSquares(Array(9).fill(null));
    setWiningSquares([]);
  }

  const checkForWinner = newSquares => {
    for(let i=0; i<winningPositions.length; i++){
      const[a,b,c] = winningPositions[i];
      if (newSquares[a] && newSquares[a] === newSquares[b] && newSquares[a] === newSquares[c]){
        endGame(newSquares[a], winningPositions[i]);
        return
      }
    }
    if(!newSquares.includes(null)){
      endGame(null, Array.from(Array(10).keys()));
      return
    }
    setTurn(turn === 'x' ? 'o' : 'x');
  };

  const handleClick = square => {
    let newSquares = [...squares];
    newSquares.splice(square,1, turn);
    setSquares(newSquares);
    checkForWinner(newSquares);
  }

  const endGame = (result, winningPositions) => {
    setTurn(null);
    if(result !== null){
      setScore({
        ...score,
        [result]:score[result]+1,
      })
    }
    setWiningSquares(winningPositions);
    setTimeout(reset,2000);    
  }

  return (
    <div className="container">
      <Board winingSquares = {winingSquares} turn = {turn} squares = {squares} onClick = {handleClick} />
      <ScoreBoard scoreO={score.o} scoreX={score.x}/>
    </div>
  );
}

export default App;
