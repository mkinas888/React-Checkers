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

  setPossibleMoves = (id1, id2, player) => {
    var empty = [];
    this.setState({possibleMovesIds: empty});
    this.setState({previousPiecePosition: empty});
    this.setState({isActivePieceKing: false});
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

  setPossibleKingMoves = (id1, id2, player) => {
    var empty = [];
    var moves = [];
    var i=0,j=0,k=0;
    this.setState({possibleMovesIds: empty});
    this.setState({previousPiecePosition: empty});
    this.setState({isActivePieceKing: true});
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
        j = id2 + 1;
        k = id2 - 1;
        for(i = id1 - 1; i >= 0; i--) {
          if(j <= 7) {
            if(this.state.board[i][j].player === 'none') {
              this.state.board[i][j].active = true;
              moves = [...moves, i, j];
            } else {
              j = 8;
            }
          }
          if(k >= 0) {
            if(this.state.board[i][k].player === 'none') {
              this.state.board[i][k].active = true;
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
            if(this.state.board[i][j].player === 'none') {
              this.state.board[i][j].active = true;
              moves = [...moves, i, j];
            } else {
              j = 8;
            }
          }
          if(k >= 0) {
            if(this.state.board[i][k].player === 'none') {
              this.state.board[i][k].active = true;
              moves = [...moves, i, k];
            } else {
              k = -1;
            }
          }
          j++;
          k--;
        }
      } else if (player === 'b') {
        this.state.board[id1][id2].active = true;
        this.setState(prevState => ({
          previousPiecePosition: [...prevState.previousPiecePosition, id1, id2],
        }));
        j =id2 + 1;
        k = id2 - 1;
        for(i = id1 + 1; i <=7; i++) {
          if(j <= 7) {
            if(this.state.board[i][j].player === 'none') {
              this.state.board[i][j].active = true;
              moves = [...moves, i, j];
            } else {
              j = 8;
            }
          }
          if(k >= 0) {
            if(this.state.board[i][k].player === 'none') {
              this.state.board[i][k].active = true;
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
            if(this.state.board[i][j].player === 'none') {
              this.state.board[i][j].active = true;
              moves = [...moves, i, j];
            } else {
              j = 8;
            }
          }
          if(k >= 0) {
            if(this.state.board[i][k].player === 'none') {
              this.state.board[i][k].active = true;
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
  }

  checkIfBeatingUpAvailable = (id1, id2, player) => {
    var empty = [];
    this.setState({isActivePieceKing: false});
    this.setState({availableBeatingsUp: empty});
    if(this.state.activePlayer !== this.state.board[id1][id2].player){
      return;
    }
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

  checkIfBeatingDownAvailable = (id1, id2, player) => {
    var empty = [];
    this.setState({isActivePieceKing: false});
    this.setState({availableBeatingsDown: empty});
    if(this.state.activePlayer !== this.state.board[id1][id2].player){
      return;
    }
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

  checkIfKingsBeatingAvailable = (id1, id2, player) => {
    var empty = [];
    var beatingsUp = [];
    var beatingsDown = [];
    var positionToDelete = [];
    var i=0,j=0,k=0;
    this.setState({availableBeatingsUp: empty});
    this.setState({availableBeatingsDown: empty})
    this.setState({isActivePieceKing: true});
    if(this.state.activePlayer !== this.state.board[id1][id2].player){
      return;
    }
    if(this.state.board[id1][id2].player !== 'none'){
      if(player === 'r') {
        j = id2 + 1;
        k = id2 - 1;
        for(i = id1 - 1; i >= 1; i--) {
          if(j <= 6) {
            if(this.state.board[i][j].player === 'b') {
              if(this.state.board[i-1][j+1].player === 'none') {
                this.state.board[i-1][j+1].active = true;
                beatingsUp = [...beatingsUp, i-1, j+1];
                positionToDelete = [...positionToDelete, i, j];
                i--;
                j++;
                while(i >= 1 && j <= 6) {
                  if(this.state.board[i-1][j+1].player === 'none') {
                    this.state.board[i-1][j+1].active = true;
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
            if(this.state.board[i][k].player === 'b') {
              if(this.state.board[i-1][k-1].player === 'none') {
                this.state.board[i-1][k-1].active = true;
                beatingsUp = [...beatingsUp, i-1, k-1];
                positionToDelete = [...positionToDelete, i, k];
                i--;
                k--;
                while(i >= 1 && k >= 1) {
                  if(this.state.board[i-1][k-1].player === 'none') {
                    this.state.board[i-1][k-1].active = true;
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
            if(this.state.board[i][j].player === 'b') {
              if(this.state.board[i+1][j+1].player === 'none') {
                this.state.board[i+1][j+1].active = true;
                beatingsDown = [...beatingsDown, i+1, j+1];
                positionToDelete = [...positionToDelete, i, j];
                i++;
                j++;
                while(i <= 6 && j <= 6) {
                  if(this.state.board[i+1][j+1].player === 'none') {
                    this.state.board[i+1][j+1].active = true;
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
            if(this.state.board[i][k].player === 'b') {
              if(this.state.board[i+1][k-1].player === 'none') {
                this.state.board[i+1][k-1].active = true;
                beatingsDown = [...beatingsDown, i+1, k-1];
                positionToDelete = [...positionToDelete, i, k];
                i++;
                k--;
                while(i <= 6 && k >= 1) {
                  if(this.state.board[i+1][k-1].player === 'none') {
                    this.state.board[i+1][k-1].active = true;
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
            if(this.state.board[i][j].player === 'r') {
              if(this.state.board[i+1][j+1].player === 'none') {
                this.state.board[i+1][j+1].active = true;
                beatingsUp = [...beatingsUp, i+1, j+1];
                positionToDelete = [...positionToDelete, i, j];
                i++;
                j++;
                while(i <= 6 && j <= 6) {
                  if(this.state.board[i+1][j+1].player === 'none') {
                    this.state.board[i+1][j+1].active = true;
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
            if(this.state.board[i][k].player === 'r') {
              if(this.state.board[i+1][k-1].player === 'none') {
                this.state.board[i+1][k-1].active = true;
                beatingsUp = [...beatingsUp, i+1, k-1];
                positionToDelete = [...positionToDelete, i, k];
                i++;
                k--;
                while(i <= 6 && k >= 1) {
                  if(this.state.board[i+1][k-1].player === 'none') {
                    this.state.board[i+1][k-1].active = true;
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
            if(this.state.board[i][j].player === 'r') {
              if(this.state.board[i-1][j+1].player === 'none') {
                this.state.board[i-1][j+1].active = true;
                beatingsDown = [...beatingsDown, i-1, j+1];
                positionToDelete = [...positionToDelete, i, j];
                i--;
                j++;
                while(i >= 1 && j <= 6) {
                  if(this.state.board[i-1][j+1].player === 'none') {
                    this.state.board[i-1][j+1].active = true;
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
            if(this.state.board[i][k].player === 'r') {
              if(this.state.board[i-1][k-1].player === 'none') {
                this.state.board[i-1][k-1].active = true;
                beatingsDown = [...beatingsDown, i-1, k-1];
                positionToDelete = [...positionToDelete, i, k];
                i--;
                k--;
                while(i >= 1 && k >= 1) {
                  if(this.state.board[i-1][k-1].player === 'none') {
                    this.state.board[i-1][k-1].active = true;
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
    var id1 = Math.floor(value/10) - 1;
    var id2 = value % 10 - 1;
    this.shouldGameEnd();
    if(this.state.isActivePieceKing) {
      this.setPossibleKingMoves(id1, id2, this.state.activePlayer);
      this.checkIfKingsBeatingAvailable(id1, id2, this.state.activePlayer);
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
          this.performMove(id1, id2);
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
          this.performBeating(id1, id2); 
          this.state.board.map(row => row.map(cell => {if(cell.active === true){nextTurn = false;}}));
          if(nextTurn) {
            this.setState({activePlayer: this.state.activePlayer === 'r' ? 'b' : 'r'});
          } 
          return;
        }
      }
    }
    if(this.state.board[id1][id2].type === 'pon'){
      this.setPossibleMoves(id1, id2, this.state.activePlayer);
      this.checkIfBeatingUpAvailable(id1, id2, this.state.activePlayer);
      this.checkIfBeatingDownAvailable(id1, id2, this.state.activePlayer);
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
          this.performMove(id1, id2);
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
          this.performBeating(id1, id2); 
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
      this.setPossibleKingMoves(id1, id2, this.state.activePlayer);
      this.checkIfKingsBeatingAvailable(id1, id2, this.state.activePlayer);
    }
  }

  performBeating = (id1, id2) => {
    var prevPos = [id1, id2];
    var tmpBoard = [...this.state.board];
    tmpBoard[id1][id2].player = this.state.activePlayer;
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
    if(this.state.isActivePieceKing) {
      this.checkIfKingsBeatingAvailable(id1,id2, this.state.activePlayer);
    } else {
      this.checkIfBeatingUpAvailable(id1, id2, this.state.activePlayer);
      this.checkIfBeatingDownAvailable(id1, id2, this.state.activePlayer);
    }
    this.setState({
      board: tmpBoard,
      previousPiecePosition: prevPos
    });
    this.renderCells;
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
