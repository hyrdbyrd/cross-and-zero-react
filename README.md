# Cross and Zero on React
## Что касается кода...
Изучая React, решил побаловаться, результат на лицо (так себе).
## Компененты
### Board.js
В действительности, это и есть игра. Она уместилась в один файл. 
В измененных состояниях, и изменял массив со значениями ("X" || "0").
Т.к. эта доска состояла из 9-и элементов (3x3), то и проверка победы не является универсальной - работает только для одинаковых размеров, при условии того, что нужно поставить такое же количество элементов в ряд (будь то крестики или нолики).
Если выделить всю проверку в одну функцию, это может выглядить так:
```js
function check(player) {
    const { board } = this.state;

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
}
```
Где аргумент "player", является значением "X" или "0".
В целом, это все.