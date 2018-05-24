import React, { Component } from 'react';
import Cell from './Cell';
import './GameBoard.css';

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [
        ['b','-','b','-','b','-','b','-'],
        ['-','b','-','b','-','b','-','b'],
        ['b','-','b','-','b','-','b','-'],
        ['-','c','-','c','-','c','-','c'],
        ['c','-','c','-','c','-','c','-'],
        ['-','r','-','r','-','r','-','r'],
        ['r','-','r','-','r','-','r','-'],
        ['-','r','-','r','-','r','-','r']],
      activePlayer: 'red'
    };
  }

  whichCell (v, index) {
    console.log(index);
    if(v == 'b') {
      return <Cell cellColor={'black'} belongsTo={'black'}/>
    } else if(v == 'r') {
      return <Cell cellColor={'black'} belongsTo={'red'}/>
    } else {      
      if(v === 'c') {
        return <Cell cellColor={'black'} belongsTo={'none'}/>
      } else {
        return <Cell cellColor={'white'} belongsTo={'none'}/>
      }
    }
  }

  

  render() {
    return (
      <div className="GameBoard-container">
        <div className="GameBoard">
          {this.state.board.map(row => row.map(this.whichCell))}
        </div>
      </div>
    );
  }
}

export default GameBoard;
