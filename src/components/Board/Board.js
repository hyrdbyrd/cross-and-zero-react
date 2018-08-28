import React, { PureComponent } from 'react';
import './style.css';

export default class Board extends PureComponent {
    constructor (props) {
        super(props);
        this.state = {
            board: [
                [null, null, null],
                [null, null, null],
                [null, null, null]
            ],
            turn: true,
            winner: null
        }
    }
    render () {
        const { board, turn, winner } = this.state;

        const table = this.state.board.map((row, y) => 
            <tr className="board-row" key={ y }>
                {
                    row.map((data, x) =>
                        <td 
                            className="board-row__item" 
                            y={y} 
                            x={x}
                            onClick={ board[y][x] ? undefined : this.onClick.bind(this, x, y) }
                            key={ x }
                            style={{ color: data === '0' ? 'red' : 'blue' }}
                        >
                            { data || '' }
                        </td>
                    )
                }
            </tr>
        ) 

        return (
            <div className="game">
                <div className="game__title">
                    {
                        winner ?
                        <div className={ `winner ${winner[0] === 'X' ? 'winner_x' : winner[0] === '0' ? 'winner_0' : 'winner_throw'}` }>
                            <span style={{ color: winner[0] === 'X' ? 'blue' : winner[0] === '0' ? 'red' : 'gray' }}>
                                { winner }
                            </span>
                        </div>
                        :                        
                        <div className="turn">
                            Turn
                            <span style={{ color: turn ? 'blue' : 'red' }}>
                                { turn ? ' X' : ' 0' }
                            </span>
                        </div>
                    }
                    <div className="btn" onClick={ this.reload.bind(this) }>Reload</div>
                </div>
                <table className="board">
                    <tbody>
                        { table }
                    </tbody>
                </table>
            </div>
        )
    }
    onClick (x, y) {
        const { board, turn } = this.state;
        const player = turn ? 'X' : '0';

        board[y][x] = player;

        const winState = {
            board,
            turn,
            winner: `${player} won!`
        };
        
        const throwState = {
            board,
            turn,
            winner: `Throw :(`
        };

        const copy = board.slice();
        copy.reverse();

        // Check diagonal
        if (board.every((row, y) => board[y][y] === player)) {
            return this.setState(winState);
        }

        // Check reversed diagonal
        if (copy.every((row, y) => copy[y][y] === player)) {
            return this.setState(winState);
        }

        // Check row
        if (board.some(row => row.every(e => e === player))) {
            return this.setState(winState);
        }

        // Check column
        if (board.some((row, y) => row.every((e, x) => board[x][y] === player))) {
            return this.setState(winState);
        }


        if (board.every(row => row.every(e => e !== null))) {
            return this.setState(throwState);
        }

        return this.setState({
            board,
            turn: !turn
        })
    }
    reload () {
        return this.setState({
            board: [
                [null, null, null],
                [null, null, null],
                [null, null, null]
            ],
            turn: true,
            winner: null
        })
    }
}