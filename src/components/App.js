import Board from './Board/Board';
import React, { PureComponent } from 'react';

export default class App extends PureComponent {
    constructor (props) {
        super(props);
    }
    render() {
        return <Board />
    }
}