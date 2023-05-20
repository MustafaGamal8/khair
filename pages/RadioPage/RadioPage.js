

let radiobx = document.getElementById("radiobx");

function GetRadio() {
  radiobx.innerHTML = "";
  Radio.then((radio) => {
    for (let i = 0; i < 10; i++) {
      let temp = document.createElement("div");
      temp.innerHTML = `
            <div id="radioMp3" onclick="PlayRadio(${i})">
                <img src="../../asset/sound (1).png" alt="">
                <div id="radioName">${radio.radios[i].name}</div>
            </div>
            `;
      radiobx.appendChild(temp);
    }
  });
}
GetRadio();

function PlayRadio(n) {
  Radio.then((radio) => {
    src = radio.radios[n].url;
    playQuran(src);
  });
}

// _____________________________________________search
let searchinput = document.getElementById("searchinput");

searchinput.addEventListener("keyup", () => {
  radiobx.innerHTML = "";
  Radio.then((radio) => {
    for (let i = 0; i < radio.radios.length; i++) {
      tempName = removeArabicDiacritics(radio.radios[i].name);
      if (tempName.includes(searchinput.value)) {
        let temp = document.createElement("div");
        temp.innerHTML = `
            <div id="radioMp3" onclick="PlayRadio(${i})">
                <img src="../../asset/sound (1).png" alt="">
                <div id="radioName">${radio.radios[i].name}</div>
            </div>
            `;
        radiobx.appendChild(temp);
      }
    }

    if (searchinput.value == "") {
      GetRadio();
    }
  });
});

function removeArabicDiacritics(text) {
  var diacritics = /[\u064B-\u0652\u06E1\u0670]/g;
  var hamza = /[أ,آ,ٱ,إ]/g;

  // Remove diacritical marks using regular expression
  var newtext = text.replace(diacritics, "");
  newtext = newtext.replace(hamza, "ا");
  return newtext;
}

// __________________________________player

var mp3_player = document.getElementById("mp3-player");
var audio = document.getElementById("audio");
var playButton = document.getElementById("play");
var progressBar = document.getElementById("progress-bar");
var timer = document.getElementById("timer");
let playmood = true;

mp3_player.style.display = "none";

function playQuran(src) {
  plusTimer = 0.1;
  audio.src = "";
  mp3_player.style.display = "flex";
  audio.src = src;
  playmood = true;
  setTimeout(() => {
    temptimer = 0;
    Myplay();
  }, 800);
}

playButton.addEventListener("click", () => {
  Myplay();
});
function Myplay() {
  if (playmood) {
    playButton.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 20h4.571V4H5v16Zm9.143-16v16h4.571V4h-4.571Z" fill="currentColor"></path></svg>
        `;
    audio.play();
    playmood = false;
  } else {
    playButton.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 2v20.364l16-10.182L4 2Z" fill="white"></path></svg>`;
    audio.pause();
    playmood = true;
  }
}
