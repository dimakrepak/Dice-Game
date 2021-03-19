import React, { Component } from 'react'
import Dice from './Dice'
import Player from './Player'

export default class Board extends Component {
    state = {
        display: 'none',
        cube1: 0,
        cube2: 0,
        players: [
            {
                playerName: '1',
                score: 0,

            },
            {
                playerName: '2',
                score: 0,
            },
        ]
    }
    rollClick = (e) => {
        this.setState({
            cube1: getRandom(),
            cube2: getRandom()
        })

    }

    render() {
        return (
            <div className="board">
                <Player
                    player={this.state.players[0].playerName}
                    score={this.state.players[0].score}
                    num={3}
                />
                <div className="centr-dice">
                    <Dice cube={this.state.cube1} />
                    <Dice />
                    <button onClick={this.rollClick}>ROLL DICE</button>
                    {console.log(this.state.cube1)}
                    {console.log(this.state.cube2)}
                </div>
                <Player
                    player={this.state.players[1].playerName}
                    score={this.state.players[1].score}
                    num={3}
                />
            </div>
        )
    }
}

function getRandom() {
    return Math.floor(Math.random() * 6) + 1
}