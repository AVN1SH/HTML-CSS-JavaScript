let isStart = false;
let intervalId;

const timerFunctions = {
  min : 0,
  sec : 0,
  mini : 0,
  count1 : 0,
  count2 : 0,
  strSec : '00',
  strMin : '00',
  strMini : '00',
  lapListHTML : '',

  startTimer () {
    this.count1++;
    this.count2++;
    const setMiniSeconds = document.querySelector('.js-mini-seconds');

    if(setMiniSeconds.innerHTML === `99`)
    this.mini = 0;

    this.mini++;
    if(this.mini < 10) {
      this.strMini  = `0${this.mini}`;
      setMiniSeconds.innerHTML = `${this.strMini}`;
    } 
    else {
      this.strMini  = this.mini;
      setMiniSeconds.innerHTML = `${this.strMini}`;
    }
    
    const setSeconds = document.querySelector('.js-seconds');
    if(setSeconds.innerHTML === `59`)
      this.sec = 0;

    if(this.count1 === 100) {
      this.sec++;
      if(this.sec < 10) {
        this.strSec  = `0${this.sec}`;
        setSeconds.innerHTML = `${this.strSec}`;
        this.count1 = 0;
      } 
      else {
        this.strSec  = this.sec;
        setSeconds.innerHTML = `${this.strSec}`;
        this.count1 = 0;
      }
    }

    const setMinutes = document.querySelector('.js-minutes');
    if(setMinutes.innerHTML === `59`)
    this.min = 0;

    if(this.count2 === 6000) {
      this.min++;
      if(this.min < 10) {
        this.strMin  = `0${this.min}`;
        setMinutes.innerHTML = `${this.strMin}`;
        this.count2 = 0;
      } 
      else {
        this.strMin  = this.min;
        setMinutes.innerHTML = `${this.strMin}`;
        this.count2 = 0;
      }
    }
  },

  pauseTimer() {
    if(isStart === true) {
      clearInterval(intervalId);
      isStart = false;
    }
  },

  stopTimer() {
    const para = document.querySelectorAll('.js-mini-seconds, .js-seconds, .js-minutes');
    para[0].innerHTML = '00';
    para[1].innerHTML = '00';
    para[2].innerHTML = '00';

    this.min = 0;
    this.sec = 0;
    this.mini = 0;
    this.count1 = 0;
    this.count2 = 0;
    this.strSec = '00';
    this.strMin = '00';
    this.strMini = '00';
    this.lapListHTML = '';
    document.querySelector('.js-lap').innerHTML = `${this.lapListHTML}`;
  },

  lapTimer() {
    const timerHTML = `
      <div class = "icon-para">
        <p class = "lap-para">${this.strMin}:${this.strSec}.${this.strMini}</P>
        <img src = "icons/flag.svg" class = "js-flag-icon lap-icon">
      </div> 
    `;

    //just for reversing order of paragraph

    let temp = this.lapListHTML;
    this.lapListHTML = timerHTML;
    this.lapListHTML += temp;
    document.querySelector('.js-lap').innerHTML = `${this.lapListHTML}`;
  }
}

const run = {
  play() {
    const playIcon = document.querySelector('.js-play-icon');

    playIcon.addEventListener('click', () => {
      if(!isStart) {
        intervalId = setInterval(() => {
          timerFunctions.startTimer();
        }, 10);
        isStart = true;
      }

      createIcons.whenPlay();
      run.pause();
      run.lap();
    });
  },

  pause() {
    const pauseIcon = document.querySelector('.js-pause-icon');
    pauseIcon.addEventListener('click', () => {
      timerFunctions.pauseTimer();
      createIcons.whenPause();
      run.stop();
      run.play();
    });
  },

  lap() {
    const flagIcon = document.querySelector('.js-flag-icon');
    flagIcon.addEventListener('click', () => {
      console.log('hello');
      timerFunctions.lapTimer();
    });
  },

  stop() {
    const stopIcon = document.querySelector('.js-stop-icon');
    stopIcon.addEventListener('click', () => {
      timerFunctions.stopTimer();
      createIcons.whenStop();
      run.play();
    });
  }
}

const createIcons = {
  iconHTML : '',

  whenPlay() {
    iconHTML = `
      <img src = "icons/pause.svg" class = "js-pause-icon pause-icon">
      <img src = "icons/flag.svg" class = "js-flag-icon flag-icon">
    `
    document.querySelector('.icons').innerHTML = `${iconHTML}`;
  },

  whenPause() {
    iconHTML = `
      <img src = "icons/stop.svg" class = "js-stop-icon stop-icon">
      <img src = "icons/play.svg" class = 'js-play-icon play-icon'>
    `
    document.querySelector('.icons').innerHTML = `${iconHTML}`;
    
  },

  whenStop() {
    iconHTML = `
      <img src = "icons/play.svg" class = 'js-play-icon play-icon'>
    `
    document.querySelector('.icons').innerHTML = `${iconHTML}`;
  }
}

run.play();