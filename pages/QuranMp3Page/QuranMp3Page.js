
let Quranmp3 = fetch("https://www.mp3quran.net/api/v3/reciters?language=ar")
  .then((sound) => sound.json())
  .then((sound) => (sound = sound.reciters))
  .catch((error)=>{console.log(error)})
  
  
let QuranData = fetch("https://api.alquran.cloud/v1/quran/quran-uthmani")
.then((Quran) => Quran.json())
.then((Quran) => (Quran = Quran.data.surahs));

// ____________________________________Get reciter for first time
let reciterS = document.getElementById("reciterS");

function GetreciterFT(n) {
  for (let i = 0; i < n; i++) {
    Getreciter(i);
  }
}
GetreciterFT(10);

// ____________________________________Get reciter
function Getreciter(i) {
  Quranmp3.then((sound) => {
    let reciter = document.createElement("div");
    reciter.innerHTML = `
            <div class="reciterbx" onclick="checksurah(${i})">
              <div class="reciterContent">
              <img src="../../asset/headphones.png" alt="" id="headphoneicon">
              <h2 id="reciterName">${sound[i].name}</h2>
              <p id="moshaf">${sound[i].moshaf[0].name}</p>
              <p id="surahsNumbers">${sound[i].moshaf[0].surah_total}</p>
              </div>
            </div>
            `;
    reciterS.appendChild(reciter);
  });
}

// ______________________________________Search in reciters--
let searchinput = document.getElementById("searchinput");
function search() {
  reciterS.innerHTML = "";

  Quranmp3.then((sound) => {
    for (let i = 0; i < sound.length; i++) {
      let temp = removeArabicDiacritics(sound[i].name);
      if (temp.includes(searchinput.value) && searchinput.value != "") {
        Getreciter(i);
      }
    }
  });
  if (searchinput.value == "") {
    GetreciterFT(10);
  }
}

function removeArabicDiacritics(text) {
  var diacritics = /[\u064B-\u0652\u06E1\u0670]/g;
  var hamza = /[أ,آ,ٱ,إ]/g;

  // Remove diacritical marks using regular expression
  var newtext = text.replace(diacritics, "");
  newtext = newtext.replace(hamza, "ا");
  return newtext;
}

//   ________________________________________addmorereciter
let numberOfreciter = 10;
function addmorereciter() {
  numberOfreciter = numberOfreciter + 10;
  GetreciterFT(numberOfreciter);
}

// _______________________________show surah

// QuranData.then((Quran) => {
//   console.log(Quran[13 - 1]);
// });

// QuranData.then((Quran) =>{
//   console.log(Quran)
// })

let surahbx = document.getElementById("surahbx");
let playerpage = document.getElementById("playerpage");
let publicReciter;
function checksurah(z) {
  closebx();
  surahbx.innerHTML = "";
  publicReciter = z;

  Quranmp3.then((sound) => {
    var reciterSurhs = sound[z].moshaf[0].surah_list.split(",");
    QuranData.then((Quran) => {
      for (let i = 0; i < sound[z].moshaf[0].surah_total; i++) {
        let n = reciterSurhs[i] - 1;

        let surahSrc =
          sound[z].moshaf[0].server + reciterSurhs[i].padStart(3, "0") + ".mp3";
        AddSurahToBoxes(n, surahSrc);
      }
    });
  });
}

// _________________________________surah search
let surahSearchinput = document.getElementById("surahSearchinput");

surahSearchinput.addEventListener("keyup", () => {
  let z = publicReciter;
  surahbx.innerHTML = "";

  Quranmp3.then((sound) => {
    var reciterSurhs = sound[z].moshaf[0].surah_list.split(",");
    QuranData.then((Quran) => {
      for (let i = 0; i < sound[z].moshaf[0].surah_total; i++) {
        let n = reciterSurhs[i] - 1;
        let tempSurahName = removeArabicDiacritics(Quran[n].name);
        if (tempSurahName.includes(surahSearchinput.value)) {
          let surahSrc =
            sound[z].moshaf[0].server +
            reciterSurhs[i].padStart(3, "0") +
            ".mp3";
          AddSurahToBoxes(n, surahSrc);
        }
      }
    });
  });
});
// ______________________________

function AddSurahToBoxes(n, surahsrc) {
  QuranData.then((Quran) => {
    let temp = document.createElement("div");
    temp.innerHTML = `
<div class="surah" onclick="playQuran('${surahsrc}')">
  <div class="surahNamberbx"><p class="surahNamber">${Quran[n].number}</p></div>
  <div class="surahNamebx">
    <h1 class="surahNameAr">${Quran[n].name}</h1>
    <p class="surahNameEn">${Quran[n].englishName}</p>
  </div>
  <div class="ayahtNumbersbx">
    <p class="ayahtNumbers">${Quran[n].ayahs.length}<p>
    <p>Ayat</p>
  </div>
</div>
`;
    surahbx.appendChild(temp);
  });
}

// ______________________________

// ________________close box
let openmood = "close";
function closebx() {
  if (openmood == "close") {
    playerpage.classList.remove("playerpageanimation2");
    playerpage.style.display = "flex";
    setTimeout(() => {
      playerpage.classList.add("playerpageanimation");
    }, 0.1);

    openmood = "open";
  } else {
    playerpage.classList.remove("playerpageanimation");
    setTimeout(() => {
      playerpage.classList.add("playerpageanimation2");
    }, 0.1);
    setTimeout(() => {
      playerpage.style.display = "none";
    }, 1100);
    openmood = "close";
  }
}

// __________________________________player

var mp3_player = document.getElementById("mp3-player");
var audio = document.getElementById("audio");
var playButton = document.getElementById("play");
var progressBar = document.getElementById("progress-bar");
var timer = document.getElementById("timer");
var Mp3time = document.getElementById("Mp3time");
var download_btn = document.getElementById("download_btn");
let playmood = true;

mp3_player.style.display = "none";

function playQuran(src) {
  plusTimer = 0.1;
  audio.src = "";
  mp3_player.style.display = "flex";
  audio.src = src;
  playmood = true;
  download_btn.download = src;
  setTimeout(() => {
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
  Mp3time.innerText =
    Math.floor(audio.duration / 60) + ":" + Math.floor(audio.duration % 60);
}

let i = 0;
audio.addEventListener("timeupdate", function () {
  var progress = (audio.currentTime / audio.duration) * 100;
  seconds = Math.floor(progress / 60);
  minutes = Math.floor(progress % 60);
  timer.innerText =
    (seconds < 10 ? "0" : "") +
    seconds +
    ":" +
    ((minutes < 10 ? "0" : "") + minutes);
  progressBar.firstElementChild.style.width = progress + "%";
});

// Change music based on progress
progressBar.addEventListener("click", function (event) {
  var maxProgress = progressBar.clientWidth;
  var progressClicked = event.offsetX;
  var progress = (progressClicked / maxProgress) * 100;
  audio.currentTime = (progress / 100) * audio.duration;
});

let before = document.getElementById("before");
let next = document.getElementById("next");
let plusTimer = 0.1;
next.addEventListener("click", () => {
  plusTimer = audio.currentTime / audio.duration + 0.1;
  audio.currentTime = audio.duration * plusTimer;
});

before.addEventListener("click", () => {
  plusTimer = audio.currentTime / audio.duration - 0.1;
  audio.currentTime = audio.duration * plusTimer;
});

function download_quran() {
  let url = download_btn.download;

  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      // Create a temporary anchor element
      const a = document.createElement("a");
      a.style.display = "none";

      // Create a Blob URL for the audio file
      const blobUrl = URL.createObjectURL(blob);
      a.href = blobUrl;
      a.download = url.substring(url.lastIndexOf("/") + 1);

      // Append the anchor element to the document body
      document.body.appendChild(a);

      // Trigger a click event on the anchor element
      a.click();

      // Remove the temporary anchor element
      document.body.removeChild(a);

      // Revoke the Blob URL to free up memory
      URL.revokeObjectURL(blobUrl);
    })
    .catch((error) => {
      console.error("An error occurred during the download:", error);
    });
}
