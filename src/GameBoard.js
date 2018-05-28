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
      previousPiecePosition: [],
      possibleMovesIds: [],
      availableBeatingsUp: [],
      availableBeatingsDown: [] 
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

  setPossibleMoves = (id1, id2, player) => {
    var empty = [];
    this.setState({possibleMovesIds: empty});
    this.setState({previousPiecePosition: empty});
    // remove active state from previously activated 
    this.state.board.map(row => row.map(cell => cell.active = false));
    if(this.state.activePlayer !== this.state.board[id1][id2].player){
      return;
    }
    if(this.state.board[id1][id2].player !== 'none'){
      if(player === 'r') {
        if(this.state.board[id1][id2].player === 'r') {
          this.state.board[id1][id2].active = true;
          this.setState(prevState => ({
            previousPiecePosition: [...prevState.previousPiecePosition, id1, id2],
          })); 
        }
        if(id1 > 0){
          if(id2 > 0 && id2 < 7){
            if(this.state.board[id1-1][id2-1].player === 'none') {
              this.state.board[id1-1][id2-1].active = true;
              this.setState(prevState => ({
                possibleMovesIds: [...prevState.possibleMovesIds, id1-1, id2-1]
              }));
            } 
            if (this.state.board[id1-1][id2+1].player === 'none') {
              this.state.board[id1-1][id2+1].active = true;
              this.setState(prevState => ({
                possibleMovesIds: [...prevState.possibleMovesIds, id1-1, id2+1]
              }));
            }
          }
          if(id2 === 0) {
            if (this.state.board[id1-1][id2+1].player === 'none') {
              this.state.board[id1-1][id2+1].active = true;
              this.setState(prevState => ({
                possibleMovesIds: [...prevState.possibleMovesIds, id1-1, id2+1]
              }));
            }
          }
          if(id2 === 7) {
            if(this.state.board[id1-1][id2-1].player === 'none') {
              this.state.board[id1-1][id2-1].active = true;
              this.setState(prevState => ({
                possibleMovesIds: [...prevState.possibleMovesIds, id1-1, id2-1]
              }));
            }
          }
        }
      } else if(player === 'b') {
        if(this.state.board[id1][id2].player === 'b') {
          this.state.board[id1][id2].active = true;
          this.setState(prevState => ({
            previousPiecePosition: [...prevState.previousPiecePosition, id1, id2]
          })); 
        }
        if(id1 < 7){
          if(id2 > 0 && id2 < 7){
            if(this.state.board[id1+1][id2-1].player === 'none') {
              this.state.board[id1+1][id2-1].active = true;
              this.setState(prevState => ({
                possibleMovesIds: [...prevState.possibleMovesIds, id1+1, id2-1]
              }));
            } 
            if (this.state.board[id1+1][id2+1].player === 'none') {
              this.state.board[id1+1][id2+1].active = true;
              this.setState(prevState => ({
                possibleMovesIds: [...prevState.possibleMovesIds, id1+1, id2+1]
              }));
            }
          }
          if(id2 === 0) {
            if (this.state.board[id1+1][id2+1].player === 'none') {
              this.state.board[id1+1][id2+1].active = true;
              this.setState(prevState => ({
                possibleMovesIds: [...prevState.possibleMovesIds, id1+1, id2+1]
              }));
            }
          }
          if(id2 === 7) {
            if(this.state.board[id1+1][id2-1].player === 'none') {
              this.state.board[id1+1][id2-1].active = true;
              this.setState(prevState => ({
                possibleMovesIds: [...prevState.possibleMovesIds, id1+1, id2-1]
              }));
            }
          }
        }
      }
    }
  }

  checkIfBeatingUpAvailable = (id1, id2) => {
    var empty = [];
    this.setState({availableBeatingsUp: empty});
    if(this.state.activePlayer === 'r'){
      if(id1 < 6) {
        if(id2 < 2) {
          if(this.state.board[id1+1][id2+1].player === 'b') {
            if(this.state.board[id1+2][id2+2].player === 'none') {
              this.state.board[id1+2][id2+2].active = true;
              this.setState(prevState => ({
                availableBeatingsUp: [...prevState.availableBeatingsUp, id1+2, id2+2]
              }));
            }
          }
        }
        if(id2 > 5){
          if(this.state.board[id1+1][id2-1].player === 'b') {
            if(this.state.board[id1+2][id2-2].player === 'none') {
              this.state.board[id1+2][id2-2].active = true;
              this.setState(prevState => ({
                availableBeatingsUp: [...prevState.availableBeatingsUp, id1+2, id2-2]
              }));
            }
          }
        }
        if(id2 >= 2 && id2 <= 5) {
          if(this.state.board[id1+1][id2+1].player === 'b') {
            if(this.state.board[id1+2][id2+2].player === 'none') {
              this.state.board[id1+2][id2+2].active = true;
              this.setState(prevState => ({
                availableBeatingsUp: [...prevState.availableBeatingsUp, id1+2, id2+2]
              }));
            }
          }
          if(this.state.board[id1+1][id2-1].player === 'b') {
            if(this.state.board[id1+2][id2-2].player === 'none') {
              this.state.board[id1+2][id2-2].active = true;
              this.setState(prevState => ({
                availableBeatingsUp: [...prevState.availableBeatingsUp, id1+2, id2-2]
              }));
            }
          }
        }
      }
    }
    else {
      if(id1 > 1) {
        if(id2 < 2) {
          if(this.state.board[id1-1][id2+1].player === 'r') {
            if(this.state.board[id1-2][id2+2].player === 'none') {
              this.state.board[id1-2][id2+2].active = true;
              this.setState(prevState => ({
                availableBeatingsUp: [...prevState.availableBeatingsUp, id1-2, id2+2]
              }));
            }
          }
        }
        if(id2 > 5){
          if(this.state.board[id1-1][id2-1].player === 'r') {
            if(this.state.board[id1-2][id2-2].player === 'none') {
              this.state.board[id1-2][id2-2].active = true;
              this.setState(prevState => ({
                availableBeatingsUp: [...prevState.availableBeatingsUp, id1-2, id2-2]
              }));
            }
          }
        }
        if (id2 >= 2 && id2 <= 5) {
          if(this.state.board[id1-1][id2+1].player === 'r') {
            if(this.state.board[id1-2][id2+2].player === 'none') {
              this.state.board[id1-2][id2+2].active = true;
              this.setState(prevState => ({
                availableBeatingsUp: [...prevState.availableBeatingsUp, id1-2, id2+2]
              }));
            }
          }
          if(this.state.board[id1-1][id2-1].player === 'r') {
            if(this.state.board[id1-2][id2-2].player === 'none') {
              this.state.board[id1-2][id2-2].active = true;
              this.setState(prevState => ({
                availableBeatingsUp: [...prevState.availableBeatingsUp, id1-2, id2-2]
              }));
            }
          }
        }
      }
    }
  }

  checkIfBeatingDownAvailable = (id1, id2) => {
    var empty = [];
    this.setState({availableBeatingsDown: empty});
    if(this.state.activePlayer === 'r'){
      if(id1 > 1) {
        if(id2 < 2) {
          if(this.state.board[id1-1][id2+1].player === 'b') {
            if(this.state.board[id1-2][id2+2].player === 'none') {
              this.state.board[id1-2][id2+2].active = true;
              this.setState(prevState => ({
                availableBeatingsDown: [...prevState.availableBeatingsDown, id1-2, id2+2]
              }));
            }
          }
        }
        if(id2 > 5){
          if(this.state.board[id1-1][id2-1].player === 'b') {
            if(this.state.board[id1-2][id2-2].player === 'none') {
              this.state.board[id1-2][id2-2].active = true;
              this.setState(prevState => ({
                availableBeatingsDown: [...prevState.availableBeatingsDown, id1-2, id2-2]
              }));
            }
          }
        }
        if(id2 >= 2 && id2 <= 5) {
          if(this.state.board[id1-1][id2+1].player === 'b') {
            if(this.state.board[id1-2][id2+2].player === 'none') {
              this.state.board[id1-2][id2+2].active = true;
              this.setState(prevState => ({
                availableBeatingsDown: [...prevState.availableBeatingsDown, id1-2, id2+2]
              }));
            }
          }
          if(this.state.board[id1-1][id2-1].player === 'b') {
            if(this.state.board[id1-2][id2-2].player === 'none') {
              this.state.board[id1-2][id2-2].active = true;
              this.setState(prevState => ({
                availableBeatingsDown: [...prevState.availableBeatingsDown, id1-2, id2-2]
              }));
            }
          }
        }
      }
    }
    else {
      if(id1 < 6) {
        if(id2 < 2) {
          if(this.state.board[id1+1][id2+1].player === 'r') {
            if(this.state.board[id1+2][id2+2].player === 'none') {
              this.state.board[id1+2][id2+2].active = true;
              this.setState(prevState => ({
                availableBeatingsDown: [...prevState.availableBeatingsDown, id1+2, id2+2]
              }));
            }
          }
        }
        if(id2 > 5){
          if(this.state.board[id1+1][id2-1].player === 'r') {
            if(this.state.board[id1+2][id2-2].player === 'none') {
              this.state.board[id1+2][id2-2].active = true;
              this.setState(prevState => ({
                availableBeatingsDown: [...prevState.availableBeatingsDown, id1+2, id2-2]
              }));
            }
          }
        }
        if (id2 >= 2 && id2 <= 5) {
          if(this.state.board[id1+1][id2+1].player === 'r') {
            if(this.state.board[id1+2][id2+2].player === 'none') {
              this.state.board[id1+2][id2+2].active = true;
              this.setState(prevState => ({
                availableBeatingsDown: [...prevState.availableBeatingsDown, id1+2, id2+2]
              }));
            }
          }
          if(this.state.board[id1+1][id2-1].player === 'r') {
            if(this.state.board[id1+2][id2-2].player === 'none') {
              this.state.board[id1+2][id2-2].active = true;
              this.setState(prevState => ({
                availableBeatingsDown: [...prevState.availableBeatingsDown, id1+2, id2-2]
              }));
            }
          }
        }
      }
    }
  }

  activatePiece = (value) => {
    //get id of first and second table from clicked button's id
    var id1 = Math.floor(value/10) - 1;
    var id2 = value % 10 - 1;
    this.setPossibleMoves(id1, id2, this.state.activePlayer);
    this.checkIfBeatingUpAvailable(id1, id2);
    this.checkIfBeatingDownAvailable(id1, id2);
    if( this.state.board[id1][id2].player === 'none' && 
        this.state.possibleMovesIds.length !== 0 && this.state.board[id1][id2].color === 'black'){
      this.performMove(id1, id2);
      return;
    }
  }

  performMove = (id1, id2) => {
    var empty = [];
    var tmpBoard = [...this.state.board];
    tmpBoard[id1][id2].player = this.state.activePlayer;
    tmpBoard[this.state.previousPiecePosition[0]][this.state.previousPiecePosition[1]].player = 'none';
    this.setState({
      board: tmpBoard,
      activePlayer: this.state.activePlayer === 'r' ? 'b' : 'r',
      previousPiecePosition: empty
    });
    this.renderCells;
  }

  

  render() {
    return (
      <div className="GameBoard-container">
        {this.renderCells()}
      </div>
    );
  }
}

export default GameBoard;
