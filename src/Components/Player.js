import React, { Component } from 'react'

export default class Player extends Component {

    render() {
        return (
            <div className="player">
                <h1 className="player-name">Player {this.props.player} </h1>
                <div className="score">
                    <h2>score</h2>
                    <span className="score-num">{this.props.score}</span>
                </div>
                <div className='current'>
                    <h2>CURRENT</h2>
                    <span className="current-num">{this.props.num}</span>
                </div>
            </div>
        )
    }
}

