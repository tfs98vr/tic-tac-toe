const Game = () => {
    let display = document.getElementById('display');
    let button = document.getElementById('button');
    let randomBtn = document.getElementById('random');
    let invincicleBtn = document.getElementById('invincible');

    let possiblePlay = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let computerPlay = [];
    let playerPlay = [];

    const square = () => {
        let div = document.querySelectorAll('.square');
        let mac = [];
        let i = 1;
        div.forEach(el => {
            el = {div: el, value: i++};
            mac.push(el)
        })
        return mac
    }

    let winComb = [[1,4,7], [2,5,8], [3,6,9], [1,2,3], [4,5,6], [7,8,9], [1,5,9], [3,5,7]];

    let difficulty = 1;
    
    //Reset
    button.addEventListener('click', function() {
        square().forEach(el => {
            el.div.textContent = '';
        })
        checkWin().length = 0;
        playerPlay.length = 0;
        computerPlay.length = 0;
        possiblePlay = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        winComb = [[1,4,7], [2,5,8], [3,6,9], [1,2,3], [4,5,6], [7,8,9], [1,5,9], [3,5,7]];
        ai.length = 0;
        display.textContent = ' ';
    })

    randomBtn.addEventListener('click', function() {
        difficulty = 1;
    })

    invincicleBtn.addEventListener('click', function() {
        difficulty = 2;
    })

    const checkWin = () => {
        let winner = [];
        //Check if computer win;        
        winComb.forEach(el => {
            let checker = () => el.every(v => computerPlay.includes(v));
            if (checker() === true && winner.length === 0) {
                winner.push('You lose.');
            }
        })

        //Check if player win;
        winComb.forEach(el => {
            let checker = () => el.every(v => playerPlay.includes(v));
            if (checker() === true && winner.length === 0) {
                winner.push('You win!');
            }
        })
        display.textContent = winner[0];
        return winner
    }

    const checkTie = () => {
        const allEqual = arr => arr.every(val => val === arr[0]);
        if (allEqual(possiblePlay) === true && checkWin().length === 0) {
            display.textContent = 'Tie';
            return true;
        } else {
            return false;
        };
    };
    
    //Invincible
    let ai = [];
    let pre = [];
    let uniq = [];
    let uniq2 = [];

    const unbeatable = () => {
        checkTie();
        checkWin()
        winComb.forEach(el => {
            pre = el.filter(element => playerPlay.includes(element));
            if(pre.length === 2) {
                let difference = el.filter(x => !pre.includes(x));
                ai.push(parseInt(difference.join('')));
            }
        })
        uniq = [...new Set(ai)];        
        uniq2 = uniq.filter(el => possiblePlay.includes(el));

        if (playerPlay[0] === 5 && playerPlay.length === 1) {
            square()[2].div.textContent = 'O';
            delete possiblePlay[2];
            computerPlay.push(3);
        } else if (playerPlay[0] === 5 && playerPlay.length > 1){
            if (uniq2.length > 0) {
                square()[uniq2[uniq2.length - 1] - 1].div.textContent = 'O';
                computerPlay.push(uniq2[uniq2.length - 1]);
                delete possiblePlay[uniq2[uniq2.length - 1] - 1]
            } else {
                computer()
            }
        }

        if (playerPlay[0] != 5 && playerPlay.length === 1) {
            square()[4].div.textContent = 'O';
            delete possiblePlay[4];
            computerPlay.push(5);
        } else if (playerPlay[0] != 5 && playerPlay.length > 1){
            if (uniq2.length > 0) {
                square()[uniq2[uniq2.length - 1] - 1].div.textContent = 'O';
                computerPlay.push(uniq2[uniq2.length - 1]);
                delete possiblePlay[uniq2[uniq2.length - 1] - 1]
            } else {
                computer()
            }
        }
    }

    const computer = () => {
        const random = square()[Math.floor(Math.random() * square().length)];
        if (possiblePlay.indexOf(random.value) != -1 && checkWin().length === 0) {
            random.div.textContent = 'O';
            delete possiblePlay[random.value - 1];
            computerPlay.push(random.value);
        } else if (possiblePlay.indexOf(random.value) === -1 && checkWin().length === 0 && checkTie() === false) {
            computer();
        }
        return computerPlay;
    }

    const start = () => {
        square().forEach(el => {
            el.div.addEventListener('click', function() {
                if (possiblePlay.indexOf(el.value) != -1 && checkWin().length === 0 && checkTie() === false) {
                    el.div.textContent = 'X';
                    delete possiblePlay[el.value - 1];
                    playerPlay.push(el.value);
                    if (difficulty === 1) {
                        setTimeout(() => {computer()}, 200)
                        ///computer();
                    } else if (difficulty === 2) {
                        unbeatable();
                    }
                    checkWin();
                    checkTie();
                    return computerPlay;
                };
            });
        });
        return
    };

    return {start}
}

const player = Game();

player.start()