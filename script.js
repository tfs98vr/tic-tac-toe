const Game = () => {

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

    const checkWin = () => {
        let winner = [];
        //Check if computer win;        
        winComb.forEach(el => {
            let checker = () => el.every(v => computerPlay.includes(v));
            if (checker() === true && winner.length === 0) {
                winner.push('O computador Venceu');
                return
            }
        })

        //Check if player win;
        winComb.forEach(el => {
            let checker = () => el.every(v => playerPlay.includes(v));
            if (checker() === true && winner.length === 0) {
                winner.push('Você venceu!');
                return
            }
        })
        return winner
    }

    const computer = () => {
        const random = square()[Math.floor(Math.random() * square().length)];
        if (possiblePlay.indexOf(random.value) != -1 && checkWin().length === 0) {
            random.div.textContent = 'O';
            delete possiblePlay[random.value - 1];
            computerPlay.push(random.value);
            console.log(possiblePlay);
            console.log(computerPlay);
        } else if (possiblePlay.indexOf(random.value) === -1 && checkWin().length === 0) {
            computer();
        }
    }

    const rois = () => {
        square().forEach(el => {
            el.div.addEventListener('click', function() {
                if (possiblePlay.indexOf(el.value) != -1 && checkWin().length === 0) {
                    el.div.textContent = 'X';
                    delete possiblePlay[el.value - 1];
                    playerPlay.push(el.value)
                    console.log(possiblePlay)
                    console.log(playerPlay)
                    computer();
                }
            })
        })
    }
    return {rois}
}

const player = Game();

player.rois()

