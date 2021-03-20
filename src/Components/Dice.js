import React, { Component } from 'react'

export default class Dice extends Component {
    render() {
        return (
            <div>
                <img src={`./Dice-img/dice${this.props.cube}.png`} alt="" style={{ display: `${this.props.display}` }}></img>
            </div>
        )
    }
}
