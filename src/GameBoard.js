import React, { Component } from 'react';
import Cell from './Cell';
import './GameBoard.css';
import data from './BoardData'

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: data,
      activePlayer: 'b',
      isActivePieceKing: false,
      idsToBeat: [],
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
                     activatePiece={this.activatePiece} cellId={v.id} isActive={v.active} isKing={v.type}/>
      } else {
        return <Cell cellColor={'white'} belongsTo={'black'} 
                     activatePiece={this.activatePiece} cellId={v.id} isActive={v.active} isKing={v.type}/>
      }
    } else if(v.player === 'r') {
      if(isBlack) {
        return <Cell cellColor={'black'} belongsTo={'red'} 
                     activatePiece={this.activatePiece} cellId={v.id} isActive={v.active} isKing={v.type}/>
      } else {
        return <Cell cellColor={'white'} belongsTo={'red'} 
                     activatePiece={this.activatePiece} cellId={v.id} isActive={v.active} isKing={v.type}/>
      }
    } else {
      if(isBlack) {
        return <Cell cellColor={'black'} belongsTo={'none'} 
                     activatePiece={this.activatePiece} cellId={v.id} isActive={v.active} isKing={v.type}/>
      } else {
        return <Cell cellColor={'white'} belongsTo={'none'} 
                     activatePiece={this.activatePiece} cellId={v.id} isActive={v.active} isKing={v.type}/>
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

  setPossibleMoves = (board,id1, id2, player) => {
    var empty = [];
    var moves = [];
    var prevPos = [];
    this.setState({possibleMovesIds: empty});
    this.setState({previousPiecePosition: empty});
    this.setState({isActivePieceKing: false});
    // remove active state from previously activated 
    board.map(row => row.map(cell => cell.active = false));
    if(player !== board[id1][id2].player){
      return;
    }
    if(board[id1][id2].player !== 'none'){
      if(player === 'r') {
        if(board[id1][id2].player === 'r') {
          board[id1][id2].active = true;
          prevPos = [...prevPos,id1,id2];
        }
        if(id1 > 0){
          if(id2 > 0 && id2 < 7){
            if(board[id1-1][id2-1].player === 'none') {
              board[id1-1][id2-1].active = true;
              moves = [...moves, id1-1, id2-1];
            } 
            if (board[id1-1][id2+1].player === 'none') {
              board[id1-1][id2+1].active = true;
              moves = [...moves, id1-1, id2+1];
            }
          }
          if(id2 === 0) {
            if (board[id1-1][id2+1].player === 'none') {
              board[id1-1][id2+1].active = true;
              moves = [...moves, id1-1, id2+1];
            }
          }
          if(id2 === 7) {
            if(board[id1-1][id2-1].player === 'none') {
              board[id1-1][id2-1].active = true;
              moves = [...moves, id1-1, id2-1];
            }
          }
        }
      } else if(player === 'b') {
        if(board[id1][id2].player === 'b') {
          board[id1][id2].active = true;
          prevPos = [...prevPos,id1,id2];
        }
        if(id1 < 7){
          if(id2 > 0 && id2 < 7){
            if(board[id1+1][id2-1].player === 'none') {
              board[id1+1][id2-1].active = true;
              moves = [...moves, id1+1, id2-1];
            } 
            if (board[id1+1][id2+1].player === 'none') {
              board[id1+1][id2+1].active = true;
              moves = [...moves, id1+1, id2+1];
            }
          }
          if(id2 === 0) {
            if (board[id1+1][id2+1].player === 'none') {
              board[id1+1][id2+1].active = true;
              moves = [...moves, id1+1, id2+1];
            }
          }
          if(id2 === 7) {
            if(board[id1+1][id2-1].player === 'none') {
              board[id1+1][id2-1].active = true;
              moves = [...moves, id1+1, id2-1];
            }
          }
        }
      }
    }
    this.setState({
      possibleMovesIds: moves,
      previousPiecePosition: prevPos
    })
    return moves;
  }

  setPossibleKingMoves = (board, id1, id2, player) => {
    var empty = [];
    var moves = [];
    var i=0,j=0,k=0;
    this.setState({possibleMovesIds: empty});
    this.setState({previousPiecePosition: empty});
    this.setState({isActivePieceKing: true});
    // remove active state from previously activated 
    board.map(row => row.map(cell => cell.active = false));
    if(player !== board[id1][id2].player){
      return;
    }
    if(board[id1][id2].player !== 'none'){
      if(player === 'r') {
        if(board[id1][id2].player === 'r') {
          board[id1][id2].active = true;
          this.setState(prevState => ({
            previousPiecePosition: [...prevState.previousPiecePosition, id1, id2],
          })); 
        }
        j = id2 + 1;
        k = id2 - 1;
        for(i = id1 - 1; i >= 0; i--) {
          if(j <= 7) {
            if(board[i][j].player === 'none') {
              board[i][j].active = true;
              moves = [...moves, i, j];
            } else {
              j = 8;
            }
          }
          if(k >= 0) {
            if(board[i][k].player === 'none') {
              board[i][k].active = true;
              moves = [...moves, i, k];
            } else {
              k = -1;
            }
          }
          j++;
          k--;
        }
        j = id2 + 1;
        k = id2 - 1;
        for(i = id1 + 1; i <=7; i++) {
          if(j <= 7) {
            if(board[i][j].player === 'none') {
              board[i][j].active = true;
              moves = [...moves, i, j];
            } else {
              j = 8;
            }
          }
          if(k >= 0) {
            if(board[i][k].player === 'none') {
              board[i][k].active = true;
              moves = [...moves, i, k];
            } else {
              k = -1;
            }
          }
          j++;
          k--;
        }
      } else if (player === 'b') {
        board[id1][id2].active = true;
        this.setState(prevState => ({
          previousPiecePosition: [...prevState.previousPiecePosition, id1, id2],
        }));
        j =id2 + 1;
        k = id2 - 1;
        for(i = id1 + 1; i <=7; i++) {
          if(j <= 7) {
            if(board[i][j].player === 'none') {
              board[i][j].active = true;
              moves = [...moves, i, j];
            } else {
              j = 8;
            }
          }
          if(k >= 0) {
            if(board[i][k].player === 'none') {
              board[i][k].active = true;
              moves = [...moves, i, k];
            } else {
              k = -1;
            }
          }
          j++;
          k--;
        }
        j = id2 + 1;
        k = id2 - 1;
        for(i = id1 - 1; i >= 0; i--) {
          if(j <= 7) {
            if(board[i][j].player === 'none') {
              board[i][j].active = true;
              moves = [...moves, i, j];
            } else {
              j = 8;
            }
          }
          if(k >= 0) {
            if(board[i][k].player === 'none') {
              board[i][k].active = true;
              moves = [...moves, i, k];
            } else {
              k = -1;
            }
          }
          j++;
          k--;
        }
      }
    }
    this.setState({possibleMovesIds: moves});
    return moves;
  }

  checkIfBeatingUpAvailable = (board,id1, id2, player) => {
    var empty = [];
    var beatings = [];
    this.setState({isActivePieceKing: false});
    this.setState({availableBeatingsUp: empty});
    if(player !== board[id1][id2].player){
      return;
    }
    if(player === 'r'){
      if(id1 < 6) {
        if(id2 < 2) {
          if(board[id1+1][id2+1].player === 'b') {
            if(board[id1+2][id2+2].player === 'none') {
              board[id1+2][id2+2].active = true;
              beatings = [...beatings,id1+2,id2+2];
            }
          }
        }
        if(id2 > 5){
          if(board[id1+1][id2-1].player === 'b') {
            if(board[id1+2][id2-2].player === 'none') {
              board[id1+2][id2-2].active = true;
              beatings = [...beatings,id1+2,id2-2];
            }
          }
        }
        if(id2 >= 2 && id2 <= 5) {
          if(board[id1+1][id2+1].player === 'b') {
            if(board[id1+2][id2+2].player === 'none') {
              board[id1+2][id2+2].active = true;
              beatings = [...beatings,id1+2,id2+2];
            }
          }
          if(board[id1+1][id2-1].player === 'b') {
            if(board[id1+2][id2-2].player === 'none') {
              board[id1+2][id2-2].active = true;
              beatings = [...beatings,id1+2,id2-2];
            }
          }
        }
      }
    }
    else {
      if(id1 > 1) {
        if(id2 < 2) {
          if(board[id1-1][id2+1].player === 'r') {
            if(board[id1-2][id2+2].player === 'none') {
              board[id1-2][id2+2].active = true;
              beatings = [...beatings,id1-2,id2+2];
            }
          }
        }
        if(id2 > 5){
          if(board[id1-1][id2-1].player === 'r') {
            if(board[id1-2][id2-2].player === 'none') {
              board[id1-2][id2-2].active = true;
              beatings = [...beatings,id1-2,id2-2];
            }
          }
        }
        if (id2 >= 2 && id2 <= 5) {
          if(board[id1-1][id2+1].player === 'r') {
            if(board[id1-2][id2+2].player === 'none') {
              board[id1-2][id2+2].active = true;
              beatings = [...beatings,id1-2,id2+2];
            }
          }
          if(board[id1-1][id2-1].player === 'r') {
            if(board[id1-2][id2-2].player === 'none') {
              board[id1-2][id2-2].active = true;
              beatings = [...beatings,id1-2,id2-2];
            }
          }
        }
      }
    }
    this.setState({availableBeatingsUp: beatings});
    return beatings;
  }

  checkIfBeatingDownAvailable = (board,id1, id2, player) => {
    var empty = [];
    var beatings = [];
    this.setState({isActivePieceKing: false});
    this.setState({availableBeatingsDown: empty});
    if(player !== board[id1][id2].player){
      return;
    }
    if(player === 'r'){
      if(id1 > 1) {
        if(id2 < 2) {
          if(board[id1-1][id2+1].player === 'b') {
            if(board[id1-2][id2+2].player === 'none') {
              board[id1-2][id2+2].active = true;
              beatings = [...beatings,id1-2,id2+2];
            }
          }
        }
        if(id2 > 5){
          if(board[id1-1][id2-1].player === 'b') {
            if(board[id1-2][id2-2].player === 'none') {
              board[id1-2][id2-2].active = true;
              beatings = [...beatings,id1-2,id2-2];
            }
          }
        }
        if(id2 >= 2 && id2 <= 5) {
          if(board[id1-1][id2+1].player === 'b') {
            if(board[id1-2][id2+2].player === 'none') {
              board[id1-2][id2+2].active = true;
              beatings = [...beatings,id1-2,id2+2];
            }
          }
          if(board[id1-1][id2-1].player === 'b') {
            if(board[id1-2][id2-2].player === 'none') {
              board[id1-2][id2-2].active = true;
              beatings = [...beatings,id1-2,id2-2];
            }
          }
        }
      }
    }
    else {
      if(id1 < 6) {
        if(id2 < 2) {
          if(board[id1+1][id2+1].player === 'r') {
            if(board[id1+2][id2+2].player === 'none') {
              board[id1+2][id2+2].active = true;
              beatings = [...beatings,id1+2,id2+2];
            }
          }
        }
        if(id2 > 5){
          if(board[id1+1][id2-1].player === 'r') {
            if(board[id1+2][id2-2].player === 'none') {
              board[id1+2][id2-2].active = true;
              beatings = [...beatings,id1+2,id2-2];
            }
          }
        }
        if (id2 >= 2 && id2 <= 5) {
          if(board[id1+1][id2+1].player === 'r') {
            if(board[id1+2][id2+2].player === 'none') {
              board[id1+2][id2+2].active = true;
              beatings = [...beatings,id1+2,id2+2];
            }
          }
          if(board[id1+1][id2-1].player === 'r') {
            if(board[id1+2][id2-2].player === 'none') {
              board[id1+2][id2-2].active = true;
              beatings = [...beatings,id1+2,id2-2];
            }
          }
        }
      }
    }
    this.setState({availableBeatingsDown: beatings});
    return beatings;
  }

  checkIfKingsBeatingAvailable = (board,id1, id2, player) => {
    var empty = [];
    var beatingsUp = [];
    var beatingsDown = [];
    var positionToDelete = [];
    var i=0,j=0,k=0;
    this.setState({availableBeatingsUp: empty});
    this.setState({availableBeatingsDown: empty})
    this.setState({isActivePieceKing: true});
    if(player !== board[id1][id2].player){
      return;
    }
    if(board[id1][id2].player !== 'none'){
      if(player === 'r') {
        j = id2 + 1;
        k = id2 - 1;
        for(i = id1 - 1; i >= 1; i--) {
          if(j <= 6) {
            if(board[i][j].player === 'b') {
              if(board[i-1][j+1].player === 'none') {
                board[i-1][j+1].active = true;
                beatingsUp = [...beatingsUp, i-1, j+1];
                positionToDelete = [...positionToDelete, i, j];
                i--;
                j++;
                while(i >= 1 && j <= 6) {
                  if(board[i-1][j+1].player === 'none') {
                    board[i-1][j+1].active = true;
                    beatingsUp = [...beatingsUp, i-1, j+1];
                  } else {
                    j = 8;
                  }
                  i--;
                  j++;
                }
                j = 8
              } else {
                j = 8;
              }
            } 
          }
          if(k >= 1) {
            if(board[i][k].player === 'b') {
              if(board[i-1][k-1].player === 'none') {
                board[i-1][k-1].active = true;
                beatingsUp = [...beatingsUp, i-1, k-1];
                positionToDelete = [...positionToDelete, i, k];
                i--;
                k--;
                while(i >= 1 && k >= 1) {
                  if(board[i-1][k-1].player === 'none') {
                    board[i-1][k-1].active = true;
                    beatingsUp = [...beatingsUp, i-1, k-1];
                  } else {
                    k = -1;
                  }
                  i--;
                  k--;
                }
                k = -1;
              } else {
                k = -1;
              } 
            } 
          }
          j++;
          k--;
        }
        j = id2 + 1;
        k = id2 - 1;
        for(i = id1 + 1; i <=6; i++) {
          if(j <= 6) {
            if(board[i][j].player === 'b') {
              if(board[i+1][j+1].player === 'none') {
                board[i+1][j+1].active = true;
                beatingsDown = [...beatingsDown, i+1, j+1];
                positionToDelete = [...positionToDelete, i, j];
                i++;
                j++;
                while(i <= 6 && j <= 6) {
                  if(board[i+1][j+1].player === 'none') {
                    board[i+1][j+1].active = true;
                    beatingsUp = [...beatingsUp, i+1, j+1];
                  } else {
                    j = 8;
                  }
                  i++;
                  j++;
                }
                j = 8;
              } else {
                j = 8;
              }
            } 
          }
          if(k >= 1) {
            if(board[i][k].player === 'b') {
              if(board[i+1][k-1].player === 'none') {
                board[i+1][k-1].active = true;
                beatingsDown = [...beatingsDown, i+1, k-1];
                positionToDelete = [...positionToDelete, i, k];
                i++;
                k--;
                while(i <= 6 && k >= 1) {
                  if(board[i+1][k-1].player === 'none') {
                    board[i+1][k-1].active = true;
                    beatingsUp = [...beatingsUp, i+1, k-1];
                  } else {
                    k = -1;
                  }
                  i++;
                  k--;
                }
                k = -1;
              } else {
                k = -1;
              }
            } 
          }
          j++;
          k--;
        }
      } else if (player === 'b') {
        j =id2 + 1;
        k = id2 - 1;
        for(i = id1 + 1; i <=6; i++) {
          if(j <= 6) {
            if(board[i][j].player === 'r') {
              if(board[i+1][j+1].player === 'none') {
                board[i+1][j+1].active = true;
                beatingsUp = [...beatingsUp, i+1, j+1];
                positionToDelete = [...positionToDelete, i, j];
                i++;
                j++;
                while(i <= 6 && j <= 6) {
                  if(board[i+1][j+1].player === 'none') {
                    board[i+1][j+1].active = true;
                    beatingsUp = [...beatingsUp, i+1, j+1];
                  } else {
                    j = 8;
                  }
                  i++;
                  j++;
                }
                j = 8;
              } else {
                j = 8;
              }
            } 
          }
          if(k >= 1) {
            if(board[i][k].player === 'r') {
              if(board[i+1][k-1].player === 'none') {
                board[i+1][k-1].active = true;
                beatingsUp = [...beatingsUp, i+1, k-1];
                positionToDelete = [...positionToDelete, i, k];
                i++;
                k--;
                while(i <= 6 && k >= 1) {
                  if(board[i+1][k-1].player === 'none') {
                    board[i+1][k-1].active = true;
                    beatingsUp = [...beatingsUp, i+1, k-1];
                  } else {
                    k = -1;
                  }
                  i++;
                  k--;
                }
                k = -1;
              } else {
                k = -1;
              }
            } 
          }
          j++;
          k--;
        }
        j = id2 + 1;
        k = id2 - 1;
        for(i = id1 - 1; i >= 1; i--) {
          if(j <= 6) {
            if(board[i][j].player === 'r') {
              if(board[i-1][j+1].player === 'none') {
                board[i-1][j+1].active = true;
                beatingsDown = [...beatingsDown, i-1, j+1];
                positionToDelete = [...positionToDelete, i, j];
                i--;
                j++;
                while(i >= 1 && j <= 6) {
                  if(board[i-1][j+1].player === 'none') {
                    board[i-1][j+1].active = true;
                    beatingsUp = [...beatingsUp, i-1, j+1];
                  } else {
                    j = 8;
                  }
                  i--;
                  j++;
                }
                j = 8;
              }  else {
                j = 8;
              }
            }
          }
          if(k >= 1) {
            if(board[i][k].player === 'r') {
              if(board[i-1][k-1].player === 'none') {
                board[i-1][k-1].active = true;
                beatingsDown = [...beatingsDown, i-1, k-1];
                positionToDelete = [...positionToDelete, i, k];
                i--;
                k--;
                while(i >= 1 && k >= 1) {
                  if(board[i-1][k-1].player === 'none') {
                    board[i-1][k-1].active = true;
                    beatingsUp = [...beatingsUp, i-1, k-1];
                  } else {
                    k = -1;
                  }
                  i--;
                  k--;
                }
                k = -1; 
              } else {
                k = -1;
              }
            } 
          }
          j++;
          k--;
        }
      }
    }
    this.setState({idsToBeat: positionToDelete});
    this.setState({availableBeatingsUp: beatingsUp});
    this.setState({availableBeatingsDown: beatingsDown});
    return (beatingsUp.concat(beatingsDown));
  }

  didRedWon = () => {
    var redWin = true;
    this.state.board.map(row => row.map(cell => {if(cell.player === 'b'){redWin = false}}));
    return redWin;
  }

  didBlackWon = () => {
    var blackWin = true;
    this.state.board.map(row => row.map(cell => {if(cell.player === 'r'){blackWin = false;}}));
    return blackWin;
  }

  shouldGameEnd = () => {
    var blackWin = this.didBlackWon();
    var redWin = this.didRedWon();
    if(redWin) {
      alert("Congratulations Red Won");
    }
    if(blackWin) {
      alert("Congratulations Black Won");
    }
  }

  activatePiece = (value) => {
    //get id of first and second table from clicked button's id
    this.makeAIMove();
    var id1 = Math.floor(value/10) - 1;
    var id2 = value % 10 - 1;
    this.shouldGameEnd();
    if(this.state.isActivePieceKing) {
      this.setPossibleKingMoves(this.state.board,id1, id2, this.state.activePlayer);
      this.checkIfKingsBeatingAvailable(this.state.board,id1, id2, this.state.activePlayer);
      if( this.state.board[id1][id2].player === 'none' && 
          this.state.possibleMovesIds.length !== 0 && this.state.board[id1][id2].color === 'black'){
        var i, j = 1, isCorrectCell = false;
        for(i = 0; i < this.state.possibleMovesIds.length; i++) {
          if(id1 === this.state.possibleMovesIds[i] && id2 === this.state.possibleMovesIds[j]) {
            isCorrectCell = true;
          }
          i++;
          j = j+2;
        }
        if(isCorrectCell) {
          this.state.board[this.state.previousPiecePosition[0]][this.state.previousPiecePosition[1]].type = 'pon';
          this.state.board[id1][id2].type = 'king';
          this.setState({isActivePieceKing: false});
          this.performMove(this.state.board,id1, id2,true,[]);
          return;
        }
      }
      if (this.state.board[id1][id2].player === 'none' && this.state.board[id1][id2].color === 'black'&&  
      (this.state.availableBeatingsUp.length !== 0 || this.state.availableBeatingsDown.length !==0)) {
        j = 1;
        isCorrectCell = false;
        for(i = 0; i < this.state.availableBeatingsUp.length; i++) {
          if(id1 === this.state.availableBeatingsUp[i] && id2 === this.state.availableBeatingsUp[j]) {
            isCorrectCell = true;
          }
          i++;
          j = j+2;
        }
        j = 1;
        for(i = 0; i < this.state.availableBeatingsDown.length; i++) {
          if(id1 === this.state.availableBeatingsDown[i] && id2 === this.state.availableBeatingsDown[j]) {
            isCorrectCell = true;
          }
          i++;
          j = j+2;
        }
        if(isCorrectCell) {
          var nextTurn = true;
          this.state.board[this.state.previousPiecePosition[0]][this.state.previousPiecePosition[1]].type = 'pon';
          this.state.board[id1][id2].type = 'king';
          this.setState({isActivePieceKing: false});
          this.performBeating(this.state.board,id1, id2,true,[]); 
          this.state.board.map(row => row.map(cell => {if(cell.active === true){nextTurn = false;}}));
          if(nextTurn) {
            this.setState({activePlayer: this.state.activePlayer === 'r' ? 'b' : 'r'});
          } 
          return;
        }
      }
    }
    if(this.state.board[id1][id2].type === 'pon'){
      this.setPossibleMoves(this.state.board,id1, id2, this.state.activePlayer);
      this.checkIfBeatingUpAvailable(this.state.board,id1, id2, this.state.activePlayer);
      this.checkIfBeatingDownAvailable(this.state.board,id1, id2, this.state.activePlayer);
      if( this.state.board[id1][id2].player === 'none' && 
          this.state.possibleMovesIds.length !== 0 && this.state.board[id1][id2].color === 'black'){
        var i, j = 1, isCorrectCell = false;
        for(i = 0; i < this.state.possibleMovesIds.length; i++) {
          if(id1 === this.state.possibleMovesIds[i] && id2 === this.state.possibleMovesIds[j]) {
            isCorrectCell = true;
          }
          i++;
          j = j+2;
        }
        if(isCorrectCell) {
          this.performMove(this.state.board,id1, id2,true,[]);
          if(id1 === 7 && this.state.activePlayer === 'b' || id1 === 0 && this.state.activePlayer === 'r') {
            this.state.board[id1][id2].type = 'king';
          }
          return;
        }
      }
      if (this.state.board[id1][id2].player === 'none' && this.state.board[id1][id2].color === 'black'&&  
      (this.state.availableBeatingsUp.length !== 0 || this.state.availableBeatingsDown.length !==0)) {
        j = 1;
        isCorrectCell = false;
        for(i = 0; i < this.state.availableBeatingsUp.length; i++) {
          if(id1 === this.state.availableBeatingsUp[i] && id2 === this.state.availableBeatingsUp[j]) {
            isCorrectCell = true;
          }
          i++;
          j = j+2;
        }
        j = 1;
        for(i = 0; i < this.state.availableBeatingsDown.length; i++) {
          if(id1 === this.state.availableBeatingsDown[i] && id2 === this.state.availableBeatingsDown[j]) {
            isCorrectCell = true;
          }
          i++;
          j = j+2;
        }
        if(isCorrectCell) {
          var nextTurn = true;
          this.performBeating(this.state.board,id1, id2,true,[]); 
          this.state.board.map(row => row.map(cell => {if(cell.active === true){nextTurn = false;}}));
          if(nextTurn) {
            this.setState({activePlayer: this.state.activePlayer === 'r' ? 'b' : 'r'})
            if(id1 === 7 && this.state.activePlayer === 'b' || id1 === 0 && this.state.activePlayer === 'r') {
              this.state.board[id1][id2].type = 'king';
            }
          } 
        }
      }
    } else {
      this.setPossibleKingMoves(this.state.board,id1, id2, this.state.activePlayer);
      this.checkIfKingsBeatingAvailable(this.state.board,id1, id2, this.state.activePlayer);
    }
  }

  performBeating = (board,id1, id2,isReal,prevPosition) => {
    var prevPos = [id1, id2];
    var tmpBoard = [...board];
    tmpBoard[id1][id2].player = this.state.activePlayer;
    if(isReal){
      tmpBoard[this.state.previousPiecePosition[0]][this.state.previousPiecePosition[1]].player = 'none';
      tmpBoard[this.state.previousPiecePosition[0]][this.state.previousPiecePosition[1]].type = 'pon';
      if(this.state.isActivePieceKing) {
        tmpBoard[this.state.idsToBeat[0]][this.state.idsToBeat[1]].player = 'none';
        tmpBoard[this.state.idsToBeat[0]][this.state.idsToBeat[1]].type = 'pon';
      } else {
        if(id1 > this.state.previousPiecePosition[0]) {
          if(id2 > this.state.previousPiecePosition[1]) {
            tmpBoard[id1-1][id2-1].player = 'none';
            tmpBoard[id1-1][id2-1].type = 'pon';
          } else {
            tmpBoard[id1-1][id2+1].player = 'none';
            tmpBoard[id1-1][id2+1].type = 'pon';
          }
        } else {
          
          if(id2 > this.state.previousPiecePosition[1]) {
            tmpBoard[id1+1][id2-1].player = 'none';
            tmpBoard[id1+1][id2-1].type = 'pon';
          } else {
            tmpBoard[id1+1][id2+1].player = 'none';
            tmpBoard[id1+1][id2+1].type = 'pon';
          }
        }
      }
    } else {
      tmpBoard[prevPosition[0]][prevPosition[1]].player = 'none';
      tmpBoard[prevPosition[0]][prevPosition[1]].type = 'pon';
      if(this.state.isActivePieceKing) {
        tmpBoard[this.state.idsToBeat[0]][this.state.idsToBeat[1]].player = 'none';
        tmpBoard[this.state.idsToBeat[0]][this.state.idsToBeat[1]].type = 'pon';
      } else {
        if(id1 > prevPosition[0]) {
          if(id2 > prevPosition[1]) {
            tmpBoard[id1-1][id2-1].player = 'none';
            tmpBoard[id1-1][id2-1].type = 'pon';
          } else {
            tmpBoard[id1-1][id2+1].player = 'none';
            tmpBoard[id1-1][id2+1].type = 'pon';
          }
        } else {
          
          if(id2 > prevPosition[1]) {
            tmpBoard[id1+1][id2-1].player = 'none';
            tmpBoard[id1+1][id2-1].type = 'pon';
          } else {
            tmpBoard[id1+1][id2+1].player = 'none';
            tmpBoard[id1+1][id2+1].type = 'pon';
          }
        }
      }
    }
    if(this.state.isActivePieceKing) {
      this.checkIfKingsBeatingAvailable(this.state.board,id1,id2, this.state.activePlayer);
    } else {
      this.checkIfBeatingUpAvailable(this.state.board,id1, id2, this.state.activePlayer);
      this.checkIfBeatingDownAvailable(this.state.board,id1, id2, this.state.activePlayer);
    }
    if(isReal) {
      this.setState({
        board: tmpBoard,
        previousPiecePosition: prevPos
      });
      this.renderCells;
    } 
    return tmpBoard;
  }

  performMove = (board,id1, id2,isReal, prevPosition) => {
    var empty = [];
    var tmpBoard = [...board];
    tmpBoard[id1][id2].player = this.state.activePlayer;
    if(isReal) {
      tmpBoard[this.state.previousPiecePosition[0]][this.state.previousPiecePosition[1]].player = 'none';
      this.setState({
        board: tmpBoard,
        activePlayer: this.state.activePlayer === 'r' ? 'b' : 'r',
        previousPiecePosition: empty
      });
      this.renderCells;
    } else {
      tmpBoard[prevPosition[0]][prevPosition[1]].player = 'none';
    }
    return tmpBoard
  }

  getAllMoves = (player,board) => {
    var tmpBoard = JSON.parse(JSON.stringify(board));
    var moves = [];
    var kingMoves = [];
    var beatings = [];
    var kingBeatings = [];
    var nodeArray = [];
    board.map(row => row.map(cell => {if(player === cell.player) {
      var id1 = Math.floor(cell.id/10) - 1;
      var id2 = cell.id % 10 - 1;
      var node = {};
      var i,j=1;
      if(cell.type === 'pon') {
        moves = this.setPossibleMoves(tmpBoard,id1,id2,player);
        beatings = this.checkIfBeatingUpAvailable(tmpBoard,id1,id2,player);
        beatings = beatings.concat(this.checkIfBeatingDownAvailable(tmpBoard,id1,id2,player));
        for(i=0;i<moves.length/2;i++) {
          tmpBoard = this.performMove(tmpBoard,moves[i],moves[j],false,[id1,id2]);
          if(player === 'b') {
            if(moves[i] === 7) {
              node = {
                value:  25,
                board: tmpBoard,
                children: []
              }
            } else {
              node = {
                value:  1,
                board: tmpBoard,
                children: []
              }
            }
          } else {
            if(moves[i] === 0) {
              node = {
                value:  25,
                board: tmpBoard,
                children: []
              }
            } else {
              node = {
                value:  1,
                board: tmpBoard,
                children: []
              }
            }
          }
        j++;
        tmpBoard = JSON.parse(JSON.stringify(board))
        nodeArray = [...nodeArray,node];
        }
        j = 1;
        for(i=0;i<beatings.length/2;i++) {
          tmpBoard = this.performBeating(tmpBoard,beatings[i],beatings[j],false,[id1,id2]);
          node = {
            value: 10,
            children: []  
          }
          j++;
          tmpBoard = JSON.parse(JSON.stringify(board))
          nodeArray = [...nodeArray,node];
        }
      } else {
        kingMoves = this.setPossibleKingMoves(tmpBoard,id1,id2,player);
        kingBeatings = this.checkIfKingsBeatingAvailable(tmpBoard,id1,id2,player);
        for(i=0;i<moves.length/2;i++) {
          tmpBoard = this.performMove(tmpBoard,kingMoves[i],kingMoves[j],false,[id1,id2]);
          node = {
            value: 1,
            children: []
          }
          j++;
          tmpBoard = JSON.parse(JSON.stringify(tmpBoard))
          nodeArray = [...nodeArray,node];
        }
        j = 1;
        for(i=0;i<kingBeatings.length/2;i++) {
          tmpBoard = this.performBeating(tmpBoard,kingBeatings[i],kingBeatings[j],false,[id1,id2]);
          node = {
            value: 10,
            children: []  
          }
          j++;
          tmpBoard = JSON.parse(JSON.stringify(tmpBoard))
          nodeArray = [...nodeArray,node];
        }
      }
    }}));
    board.map(row => row.map(cell => {cell.active = false}));
    return nodeArray;
  }

  createNextTreeLevel = (node, board, player) => {
    node.children.forEach( child => {
      child.children = this.getAllMoves(player,board);
    });
  }

  makeAIMove = () => {
    var tmpBoard = JSON.parse(JSON.stringify(this.state.board));
    console.log(tmpBoard);
    var Node = {
      value: 0,
      board: tmpBoard,
      children: []
    }
    Node.children = this.getAllMoves('b',tmpBoard);
    console.log(Node);
    // this.createNextTreeLevel(Node, data, 'r');
    // console.log(Node);
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
