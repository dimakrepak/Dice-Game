import React, { Component } from 'react'
import Dice from './Dice'
import Player from './Player'

const initialState = {
    display: 'none',
    btn: false,
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
    finalScore: 100,
    backColor: 'rgb(255, 245, 238)'
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

    handleChange = (e) => {
        this.setState({ finalScore: e.target.value })
    }

    winner = () => {
        if (this.state.firstPlayerScore >= this.state.finalScore) {
            this.setState({
                playerWin: true,
                firstWinner: 'WINNER 🏆🎉',
                secondWinner: 'LOOSER 💩',
                btn: true,
                size: '2.7rem'

            })
        } else if (this.state.secondPlayerScore >= this.state.finalScore) {
            this.setState({
                playerWin: true,
                secondWinner: 'WINNER 🏆🎉',
                firstWinner: 'LOOSER 💩',
                btn: true,
                size: '2rem'
            })
        }
    }
    componentDidUpdate = () => {
        if (this.state.playerWin === false) {
            this.winner()
        }
    }
    newGameClick = (e) => {
        console.log(e.target);
        this.setState({ ...initialState })
    }

    render() {
        return (
            <div className="board">
                <Player
                    player={`1 ${this.state.firstWinner}`}
                    globalScore={this.state.firstPlayerScore}
                    roundScore={this.state.firstPlayerRoundScore}
                    backColor={this.state.firstPlayerTurn ? this.state.backColor : 'white'}

                />
                <div className="centr-dice">
                    <button
                        className='new-game'
                        onClick={this.newGameClick}
                        style={{
                            fontSize: `${this.state.size}`
                        }}
                    >
                        New Game
                    </button>
                    <Dice
                        cube={this.state.cube1}
                        display={this.state.display}
                    />
                    <Dice
                        cube={this.state.cube2}
                        display={this.state.display}
                    />

                    <button
                        onClick={this.rollClick}
                        disabled={this.state.btn ? true : false}
                    >
                        ROLL DICE
                    </button>

                    <button
                        disabled={this.state.btn ? true : false}
                        onClick={this.holdClick}
                    >
                        HOLD
                    </button>

                    <input
                        type="text"
                        value={this.state.finalScore === 100 ? '' : this.state.finalScore}
                        onChange={this.handleChange}
                        placeholder='INPUT FINAL SCORE'
                    >
                    </input>

                </div>
                <Player
                    player={`2 ${this.state.secondWinner}`}
                    globalScore={this.state.secondPlayerScore}
                    roundScore={this.state.secondPlayerRoundScore}
                    backColor={this.state.firstPlayerTurn ? 'white' : this.state.backColor}
                />
            </div>
        )
    }
}

function getRandom() {
    return Math.floor(Math.random() * 6) + 1
}