import React, { Component } from 'react';
import Cell from './Cell';
import './GameBoard.css';
import data from './BoardData'

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: data,
      activePlayer: 'red',
    };
  }

  whichCell = (v) => {
    var isBlack = v.color === 'black' ? true : false;
    if(v.player === 'b') {
      if(isBlack) {
        return <Cell cellColor={'black'} belongsTo={'black'} 
                     activatePiece={this.activatePiece} cellId={v.id} isActive={v.active}/>
      } else {
        return <Cell cellColor={'white'} belongsTo={'black'} 
                     activatePiece={this.activatePiece} cellId={v.id} isActive={v.active}/>
      }
    } else if(v.player === 'r') {
      if(isBlack) {
        return <Cell cellColor={'black'} belongsTo={'red'} 
                     activatePiece={this.activatePiece} cellId={v.id} isActive={v.active}/>
      } else {
        return <Cell cellColor={'white'} belongsTo={'red'} 
                     activatePiece={this.activatePiece} cellId={v.id} isActive={v.active}/>
      }
    } else {
      if(isBlack) {
        return <Cell cellColor={'black'} belongsTo={'none'} 
                     activatePiece={this.activatePiece} cellId={v.id} isActive={v.active}/>
      } else {
        return <Cell cellColor={'white'} belongsTo={'none'} 
                     activatePiece={this.activatePiece} cellId={v.id} isActive={v.active}/>
      }
    }
  }

  renderCells = () => {
    return (
      <div className="GameBoard">
        {this.state.board.map(row => row.map(this.whichCell))}
      </div>
    );
  } 

  activatePiece = (value) => {
    var id1 = Math.floor(value/10) - 1;
    var id2 = value % 10 - 1;
    var tmpObject = [...this.state.board]
    tmpObject.map(row => row.map(cell => cell.active = false));
    tmpObject[id1][id2].active = true;
    this.setState({board: tmpObject});
  }

  

  render() {
    console.log(this.state.board[1][2]);
    return (
      <div className="GameBoard-container">
        {this.renderCells()}
      </div>
    );
  }
}

export default GameBoard;
