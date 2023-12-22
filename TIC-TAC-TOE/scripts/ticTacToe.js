let crossClick = false;
let circleClick = false;
let icon = '';
let userMove = false;
let computerMove = false;

const ChooseEvent = {
  selectIcon(iconType) {
    document.querySelector(`.js-${iconType}-icon`).addEventListener('click', () => {
      if (!crossClick && !circleClick) {
        crossClick = iconType === 'cross';
        circleClick = iconType === 'circle';
        icon = iconType;
        BoxesFunctions.removeIcon();
        BoxesFunctions.addDescription(0);
        BoxesEvent.byUser();
      }
    });
  }
};

const BoxesEvent = {
  userMoveArr : [],
  computerMoveArr : [],
  allMovesArr : [],
  pattern : [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8]
  ],

  byUser() {
    if(Check.isComputerWins()) {
      BoxesFunctions.addDescription(1);
      BoxesFunctions.addPlayAgainButton();
    }

    const boxArr = document.querySelectorAll('.js-boxes div');
    if(crossClick === true || circleClick === true) {
      boxArr.forEach((box, index) => {
        box.addEventListener('click', () => {
          if(!Check.isComputerWins()) {
            const check = !this.allMovesArr.includes(index);
            if(check) {
              if(!userMove) {
                userMove = true;
                this.userMoveArr.push(index);
                this.allMovesArr.push(index);
                BoxesFunctions.addIcon(index);
                computerMove = false;
                if(this.allMovesArr.length === 9) {
                  computerMove = true;
                  BoxesFunctions.addDescription(3);
                  BoxesFunctions.addPlayAgainButton();
                }
                this.byComputer();
              }
            }
            this.removeUserEventListeners();
          }
        });
      });
    } 
  },

  removeUserEventListeners() {
    const boxArr = document.querySelectorAll('.js-boxes div');
    boxArr.forEach((box, index) => {
      box.removeEventListener('click', this.byUser);
    });
  },

  byComputer() {
    if(computerMove) {
      return;
    }
    if(Check.isUserWins()) {
      BoxesFunctions.addDescription(2);
      BoxesFunctions.addPlayAgainButton();
      return;
    }

    if(userMove) {
      const computerWinObj = Check.isComputerWinning();
      if(computerWinObj.winning) {
        let check = false;
        for(let i = 0; i < this.pattern[computerWinObj.patternIndex].length; i++) {
          for(let j = 0; j < this.computerMoveArr.length; j++) {
            if(this.pattern[computerWinObj.patternIndex][i] === this.computerMoveArr[j]) {
              check = true;
            }
          }
          if(!check) {
            const intervalId = setInterval(() => {
              if(icon === 'cross') {
                icon = 'circle';
              }
              else if(icon === 'circle') {
                icon = 'cross';
              }
              computerMove = true;
              BoxesFunctions.addIcon(this.pattern[computerWinObj.patternIndex][i]);
              this.computerMoveArr.push(this.pattern[computerWinObj.patternIndex][i]);
              this.allMovesArr.push(this.pattern[computerWinObj.patternIndex][i]);
              userMove = false;
              if(icon === 'cross') {
                icon = 'circle';
              }
              else if(icon === 'circle') {
                icon = 'cross';
              }
              this.byUser();
              clearInterval(intervalId);
            }, 500);
            break;
          } else {check = false;}
        }
        return;
      }
      const userWinObj = Check.isUserWinning();
      if(userWinObj.winning) {
        let check = false;
        for(let i = 0; i < this.pattern[userWinObj.patternIndex].length; i++) {
          for(let j = 0; j < this.userMoveArr.length; j++) {
            if(this.pattern[userWinObj.patternIndex][i] === this.userMoveArr[j]) {
              check = true;
            }
          }
          if(!check) {
            const intervalId = setInterval(() => {
              if(icon === 'cross') {
                icon = 'circle';
              }
              else if(icon === 'circle') {
                icon = 'cross';
              }
              computerMove = true;
              BoxesFunctions.addIcon(this.pattern[userWinObj.patternIndex][i]);
              this.computerMoveArr.push(this.pattern[userWinObj.patternIndex][i]);
              this.allMovesArr.push(this.pattern[userWinObj.patternIndex][i]);
              userMove = false;
              if(icon === 'cross') {
                icon = 'circle';
              }
              else if(icon === 'circle') {
                icon = 'cross';
              }
              this.byUser();
              clearInterval(intervalId);
            }, 500);
            break;
          } else {check = false;}
        }
        return;
      }
    
      const rndNum = Math.random();
      let tempNum = 0;
      for(let i = 0; i < this.pattern.length; i++, tempNum += 1/8) {
        if(rndNum >= tempNum && rndNum <= tempNum + (1/8)) {
          const rndIndex = Math.random();
          let tempIndex = 0;
          for(let j = 0; j < this.pattern[i].length; j++, tempIndex += 1/3) {
            if(rndIndex >= tempIndex && rndIndex <= tempIndex + 1/3) {

              //if(Check.box()) {
              //  this.byComputer();
              //}
              let check = false;
              for(let k = 0; k < this.allMovesArr.length; k++) {
                if(this.pattern[i][j] === this.allMovesArr[k]) {
                  check = true;
                  break;
                }
              }
              if(check) {
                this.byComputer();
              }
              else {
                const intervalId = setInterval(() => {
                  if(icon === 'cross') {
                    icon = 'circle';
                  }
                  else if(icon === 'circle') {
                    icon = 'cross';
                  }
                  computerMove = true;
                  BoxesFunctions.addIcon(this.pattern[i][j]);
                  this.computerMoveArr.push(this.pattern[i][j]);
                  this.allMovesArr.push(this.pattern[i][j]);
                  userMove = false;
                  if(icon === 'cross') {
                    icon = 'circle';
                  }
                  else if(icon === 'circle') {
                    icon = 'cross';
                  }
                  this.byUser();
                  clearInterval(intervalId);
                }, 500);
              }
            }
          }
        }
      }
    }
  },

  playAgain() {
    document.querySelector('.js-play-again-button').addEventListener('click', () => {
      location.reload();
    });
  }
}

const BoxesFunctions = {
  addIcon(boxIndex) {
    document.querySelectorAll('.js-boxes div').forEach((box, index) => {
      if(boxIndex === index) {
        crossIconHTML = `
        <svg class = 'svg-icon-cross' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
        `;

        circleIconHTML = `
          <svg class = 'svg-icon-circle' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
        `;

        box.innerHTML = icon === 'cross' ? crossIconHTML : circleIconHTML;
      }
    });
  },
  
  removeIcon() {
    document.querySelectorAll('.js-icons, .js-para').forEach((elements) => {
      elements.innerHTML = '';
    });
  },

  addDescription(index) {
    paraHTML = [
        `Very well, Enjoy..!`,
        `You lose, Better luck next time..!`, 
        `You win, Nice played..!`,
        `Tied, Click play again`
      ];
    document.querySelector('.js-para').innerHTML = paraHTML[index];
  },

  addPlayAgainButton() {
    document.querySelector('.js-icons').innerHTML = `
      <button class = 'play-again-button js-play-again-button'>Play Again</button>
    `;
    BoxesEvent.playAgain();
  }
}

const Check = {
  box() {
    return BoxesEvent.pattern.some(pattern => pattern.every(cell => BoxesEvent.allMovesArr.includes(cell)));
  },

  isUserWinning () {
    return Check.isWinning('user');
  }, 

  isComputerWinning() {
    return Check.isWinning('computer');
  },

  isWinning(player) {
    const winValues = {
      winning : false,
      patternIndex : 0
    }

    const movesArr = player === 'user' ? BoxesEvent.userMoveArr : BoxesEvent.computerMoveArr;

    for(let i = 0; i < BoxesEvent.pattern.length; i++) {
      let count = 0;
      for(let j = 0; j < 3; j++) {
        if (movesArr.includes(BoxesEvent.pattern[i][j])) {
          count++;
        }
      }
      if(count === 2) {
        let check = false;
        for(let temp = 0; temp < 3; temp++) {
          if (BoxesEvent[movesArr === BoxesEvent.userMoveArr ? 'computerMoveArr' : 'userMoveArr'].includes(BoxesEvent.pattern[i][temp])) {
            check = true;
          }
        }
        if(!check) {
          winValues.winning = true;
          winValues.patternIndex = i;
          break;
        } else {continue;}
        
      } else {count = 0;}
    }
    
    return winValues;
  },

  isUserWins() {
    return Check.isWins('user');
  },

  isComputerWins() {
    return Check.isWins('computer');
  },

  isWins(player) {
    const movesArr = player === 'user' ? BoxesEvent.userMoveArr : BoxesEvent.computerMoveArr;
    
    for (let i = 0; i < BoxesEvent.pattern.length; i++) {
      let count = 0;
      for (let j = 0; j < 3; j++) {
        if (movesArr.includes(BoxesEvent.pattern[i][j])) {
          count++;
        }
      }

      if (count === 3) {
        return true;
      }
    }

    return false;
  }
}

ChooseEvent.selectIcon('cross');
ChooseEvent.selectIcon('circle');