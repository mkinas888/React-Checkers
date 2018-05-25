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
      possibleMovesIds: [] 
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

  setPossibleMoves = (id1, id2, player, board) => {
    var a = [];
    this.setState({possibleMovesIds: a});
    this.setState({previousPiecePosition: a});
    // remove active state from previously activated 
    board.map(row => row.map(cell => cell.active = false));
    if(board[id1][id2].player !== 'none'){
      if(player === 'r') {
        if(board[id1][id2].player === 'r') {
          board[id1][id2].active = true;
          this.setState(prevState => ({
            previousPiecePosition: [...prevState.previousPiecePosition, id1, id2]
          })); 
        }
        if(id1 > 0){
          if(id2 > 0 && id2 < 7){
            if(board[id1-1][id2-1].player === 'none') {
              board[id1-1][id2-1].active = true;
              this.setState(prevState => ({
                possibleMovesIds: [...prevState.possibleMovesIds, id1-1, id2-1]
              }));
            } 
            if (board[id1-1][id2+1].player === 'none') {
              board[id1-1][id2+1].active = true;
              this.setState(prevState => ({
                possibleMovesIds: [...prevState.possibleMovesIds, id1-1, id2+1]
              }));
            }
          }
          if(id2 === 0) {
            if (board[id1-1][id2+1].player === 'none') {
              board[id1-1][id2+1].active = true;
              this.setState(prevState => ({
                possibleMovesIds: [...prevState.possibleMovesIds, id1-1, id2+1]
              }));
            }
          }
          if(id2 === 7) {
            if(board[id1-1][id2-1].player === 'none') {
              board[id1-1][id2-1].active = true;
              this.setState(prevState => ({
                possibleMovesIds: [...prevState.possibleMovesIds, id1-1, id2-1]
              }));
            }
          }
        }
      } else if(player === 'b') {
        if(board[id1][id2].player === 'b') {
          board[id1][id2].active = true;
          this.setState(prevState => ({
            previousPiecePosition: [...prevState.previousPiecePosition, id1, id2]
          })); 
        }
        if(id1 < 7){
          if(id2 > 0 && id2 < 7){
            if(board[id1+1][id2-1].player === 'none') {
              board[id1+1][id2-1].active = true;
              this.setState(prevState => ({
                possibleMovesIds: [...prevState.possibleMovesIds, id1+1, id2-1]
              }));
            } 
            if (board[id1+1][id2+1].player === 'none') {
              board[id1+1][id2+1].active = true;
              this.setState(prevState => ({
                possibleMovesIds: [...prevState.possibleMovesIds, id1+1, id2+1]
              }));
            }
          }
          if(id2 === 0) {
            if (board[id1+1][id2+1].player === 'none') {
              board[id1+1][id2+1].active = true;
              this.setState(prevState => ({
                possibleMovesIds: [...prevState.possibleMovesIds, id1+1, id2+1]
              }));
            }
          }
          if(id2 === 7) {
            if(board[id1+1][id2-1].player === 'none') {
              board[id1+1][id2-1].active = true;
              this.setState(prevState => ({
                possibleMovesIds: [...prevState.possibleMovesIds, id1+1, id2-1]
              }));
            }
          }
        }
      }
    }
    return board;
  }

  activatePiece = (value) => {
    //get id of first and second table from clicked button's id
    var id1 = Math.floor(value/10) - 1;
    var id2 = value % 10 - 1;
    this.setPossibleMoves(id1, id2, this.state.activePlayer, this.state.board);
    if( this.state.board[id1][id2].player === 'none' && this.state.possibleMovesIds.length !== 0){
      this.performMove(id1, id2);
      return;
    }
  }

  performMove = (id1, id2) => {
    var a = [];
    var tmpBoard = [...this.state.board];
    tmpBoard[id1][id2].player = this.state.activePlayer;
    tmpBoard[this.state.previousPiecePosition[0]][this.state.previousPiecePosition[1]].player = 'none';
    this.setState({
      board: tmpBoard,
      activePlayer: this.state.activePlayer === 'r' ? 'b' : 'r',
      previousPiecePosition: a
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
