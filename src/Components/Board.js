import React, { Component } from 'react'
import Dice from './Dice'
import Player from './Player'

const initialState = {
    display: 'none',
    cube1: 0,
    cube2: 0,
    firstPlayerTurn: true,
    firstWinner: '',
    secondWinner: '',
    playerWin: false,
    firstPlayerScore: 0,
    secondPlayerScore: 0,
    firstPlayerRoundScore: 0,
    secondPlayerRoundScore: 0,
    finalScore: 20
}

export default class Board extends Component {

    state = { ...initialState }

    rollClick = (e) => {
        const cube1 = getRandom()
        const cube2 = getRandom()
        const total = cube1 + cube2


        this.setState({
            display: 'block',
            cube1: cube1,
            cube2: cube2,

        })
        if (this.state.firstPlayerTurn) {
            this.setState(prev => ({
                firstPlayerRoundScore: prev.firstPlayerRoundScore + total,
            }))
        } else {
            this.setState(prev => ({
                secondPlayerRoundScore: prev.secondPlayerRoundScore + total
            }))
        }
        if (cube1 === cube2) {
            this.setState({
                firstPlayerTurn: !this.state.firstPlayerTurn,
                firstPlayerRoundScore: 0,
                secondPlayerRoundScore: 0,

            })
        }
    }
    holdClick = (e) => {
        this.setState({
            firstPlayerTurn: !this.state.firstPlayerTurn
        })
        if (this.state.firstPlayerTurn) {
            this.setState(prev => ({
                firstPlayerScore: prev.firstPlayerScore + this.state.firstPlayerRoundScore,
                firstPlayerRoundScore: 0,
            }))
        } else {
            this.setState(prev => ({
                secondPlayerScore: prev.secondPlayerScore + this.state.secondPlayerRoundScore,
                secondPlayerRoundScore: 0,
            }))

        }

    }
    winner = () => {
        if (this.state.firstPlayerScore >= this.state.finalScore) {
            this.setState({
                playerWin: true,
                firstWinner: 'WINNER'
            })
        } else if (this.state.secondPlayerScore >= this.state.finalScore) {
            this.setState({
                playerWin: true,
                secondWinner: 'WINNER'
            })
        }
    }
    componentDidUpdate = () => {
        if (this.state.playerWin === false) {
            this.winner()
        }


    }

    render() {
        return (
            <div className="board">
                <Player
                    player={`1 ${this.state.firstWinner}`}
                    globalScore={this.state.firstPlayerScore}
                    roundScore={this.state.firstPlayerRoundScore}

                />
                <div className="centr-dice">
                    <Dice
                        cube={this.state.cube1}
                        display={this.state.display}
                    />
                    <Dice
                        cube={this.state.cube2}
                        display={this.state.display}
                    />

                    <button onClick={this.rollClick}>ROLL DICE</button>
                    <button onClick={this.holdClick}>HOLD</button>

                </div>
                <Player
                    player={`2 ${this.state.secondWinner}`}
                    globalScore={this.state.secondPlayerScore}
                    roundScore={this.state.secondPlayerRoundScore}
                />
            </div>
        )
    }
}

function getRandom() {
    return Math.floor(Math.random() * 6) + 1
}