import React, { Component } from 'react';
import Cell from './Cell';
import './GameBoard.css';
import data from './BoardData'

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: data,
      activePlayer: 'r',
    };
  }

  whichCell = (v) => {
    // render all cells with correct props for them
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
    //get id of first and second table from clicked button's id
    var id1 = Math.floor(value/10) - 1;
    var id2 = value % 10 - 1;
    var tmpObject = [...this.state.board]
    // remove active state from previously activated cells
    tmpObject.map(row => row.map(cell => cell.active = false));
    // activate only current player's pieces
    if(tmpObject[id1][id2].player === this.state.activePlayer) {
      tmpObject[id1][id2].active = true;
      if(tmpObject[id1][id2].player === 'b') {
        if(id1 < 7){
          if(id2 > 0 && id2 < 7){
            if(tmpObject[id1+1][id2-1].player === 'none') {
              tmpObject[id1+1][id2-1].active = true;
            } 
            if (tmpObject[id1+1][id2+1].player === 'none') {
              tmpObject[id1+1][id2+1].active = true;
            }
          }
          if(id2 === 0) {
            if (tmpObject[id1+1][id2+1].player === 'none') {
              tmpObject[id1+1][id2+1].active = true;
            }
          }
          if(id2 === 7) {
            if(tmpObject[id1+1][id2-1].player === 'none') {
              tmpObject[id1+1][id2-1].active = true;
            }
          }
        }
      }
      if(tmpObject[id1][id2].player === 'r') {
        if(id1 > 0){
          if(id2 > 0 && id2 < 7){
            if(tmpObject[id1-1][id2-1].player === 'none') {
              tmpObject[id1-1][id2-1].active = true;
            } 
            if (tmpObject[id1-1][id2+1].player === 'none') {
              tmpObject[id1-1][id2+1].active = true;
            }
          }
          if(id2 === 0) {
            if (tmpObject[id1-1][id2+1].player === 'none') {
              tmpObject[id1-1][id2+1].active = true;
            }
          }
          if(id2 === 7) {
            if(tmpObject[id1-1][id2-1].player === 'none') {
              tmpObject[id1-1][id2-1].active = true;
            }
          }
        }
      }

      this.setState({board: tmpObject});
    }
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
