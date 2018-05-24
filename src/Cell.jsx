import React, { Component } from 'react';
import './Cell.css';

class Cell extends Component {

    // get button id so as to know which one was clicked
    handleOnClick = (e) => {
        this.props.activatePiece(e.target.value);
    }

    render () {
        return (
            <div className={`cell-${this.props.cellColor}-${this.props.isActive}`}>
                <button className={`gamePiece-${this.props.belongsTo}`} 
                        onClick={this.handleOnClick} value={this.props.cellId}/>
            </div>
        );
    }
}

export default Cell;