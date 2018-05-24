import React, { Component } from 'react';
import './Cell.css';

class Cell extends Component {
    render () {
        return (
            <div className={'cell-'+this.props.cellColor}>
                <button className={`gamePiece-${this.props.belongsTo}`}/>
            </div>
        );
    }
}

export default Cell;