
let QuranData = fetch("https://api.alquran.cloud/v1/quran/quran-uthmani")
  .then((Quran) => Quran.json())
  .then((Quran) => (Quran = Quran.data.surahs))
  // .catch((erorr)=>console.log(erorr))
  // .then((Quran) =>  console.log(Quran));

// API DATA
//  number
//  name
//  englishName
// englishNameTranslation
// revelationType
// ayahs

// ___________________________GET surah details

let surahbx = document.getElementById("surahbx");

function firstcheck() {
  surahbx.innerHTML = "";
  for (let i = 0; i < 12; i++) {
    checksurah(i);
  }
}
firstcheck();

function checksurah(n) {
  QuranData.then((Quran) => {
    let temp = document.createElement("div");
    temp.innerHTML = `
    <div class="surah" onclick="Opensurah(${n})">
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

// ______________________________________Search in suarhs--
let searchinput = document.getElementById("searchinput");
function search() {
  surahbx.innerHTML = "";
  let mylist = [];

  QuranData.then((Quran) => {
    for (let i = 0; i < 114; i++) {
      let temp = removeArabicDiacritics(Quran[i].name);

      if (temp.includes(searchinput.value) && searchinput.value != "") {
        checksurah(i);
      }
    }
  });
  if (searchinput.value == "") {
    firstcheck();
  }
}

// ___________________________fun to open surah

let ayatbx = document.getElementById("ayatbx");

function Opensurah(n) {
  ayatbx.classList.add("ayatanimation");
  var Nsurahnumber = n;
  QuranData.then((Quran) => {
    ayatbx.innerHTML = `    
    <main>
    <nav class=" secnav">
      <div id="darkmode" onclick="changeMode()">
        <span></span>
      </div>
      <div id="arrow" onclick="closesurahtbx()">
        <h1>↓</h1>
      </div>
      
      <button id="tashkel" onclick="tashkel(${Nsurahnumber})">التشكيل</button>
    </nav>

    <h1 id="ayahname">${removeArabicDiacritics(Quran[n].name)}</h1>
    <div id="ayat"><h2 id="temp"></h2>
    </div>

    <div class="arrows">
    <div id="arrow1" onclick="loadmore(${n})" ><span>&#10140</span></div>
    <div id="arrow2" onclick="loadless(${n})" ><span>&#10140</span></div>
  </div>
  </main>
    `;

    let temp = document.getElementById("temp");
    for (let i = 0; i < 10; i++) {
      temp.innerHTML += `
       ${Quran[n].ayahs[i].text}
        <p id="numberofaya"><span>${Quran[n].ayahs[i].numberInSurah}</span></p>
      `;
    }
  });
}

function closesurahtbx() {
  ayatbx.classList.add("ayatanimation2");
  setTimeout(() => {
    ayatbx.classList.remove("ayatanimation2", "ayatanimation");
    ayatbx.innerHTML = "";
  }, 2000);
}

function removeArabicDiacritics(text) {
  var diacritics = /[\u064B-\u0652\u06E1\u0670]/g;
  var hamza = /[أ,آ,ٱ,إ]/g;

  // Remove diacritical marks using regular expression
  var newtext = text.replace(diacritics, "");
  newtext = newtext.replace(hamza, "ا");
  return newtext;
}
let tashkelmode = "true";
function tashkel(n) {
  QuranData.then((Quran) => {
    ayatbx.innerHTML = `    
    <main>
    <nav class=" secnav">
      <div id="darkmode" onclick="changeMode()">
        <span></span>
      </div>
      <div id="arrow" onclick="closesurahtbx()">
        <h1>↓</h1>
      </div>
      
      <button id="tashkel" onclick="tashkel(${n})">التشكيل</button>
    </nav>

    <h1 id="ayahname">${removeArabicDiacritics(Quran[n].name)}</h1>
    <div id="ayat"><h2 id="temp"></h2>
    </div>

    <div class="arrows">
    <div id="arrow1" onclick="loadmore(${n})" ><span>&#10140</span></div>
    <div id="arrow2" onclick="loadless(${n})" ><span>&#10140</span></div>
  </div>
  </main>
    `;
    

    let temp = document.getElementById("temp");

    if (tashkelmode == "true") {
      tashkelmode = "false";
      for (let i = sectemp - 10; i < sectemp; i++) {
        temp.innerHTML += `
      ${removeArabicDiacritics(Quran[n].ayahs[i].text)}
       <p id="numberofaya"><span>${Quran[n].ayahs[i].numberInSurah}</span></p>
     `;
      }
    } else if (tashkelmode == "false") {
      tashkelmode = "true";
      for (let i = sectemp - 10; i < sectemp ; i++) {
        console.log(Quran[n].ayahs.length)
        temp.innerHTML += `
      ${Quran[n].ayahs[i].text}
       <p id="numberofaya"><span>${Quran[n].ayahs[i].numberInSurah}</span></p>
     `;
      }
    }
  });
}


let sectemp = 10
function loadmore(n) {
  
  QuranData.then((Quran)=>{
    if (sectemp < Quran[n].ayahs.length) {
    sectemp = sectemp + 10
    let temp = document.getElementById("temp");
    temp.innerHTML = ""
    for (let i = sectemp -10; i < sectemp; i++) {
      temp.innerHTML += `
    ${Quran[n].ayahs[i].text}
     <p id="numberofaya"><span>${Quran[n].ayahs[i].numberInSurah}</span></p>
   `;}
  }
  })
  
}

function loadless(n) {
  QuranData.then((Quran)=>{
    if (sectemp < Quran[n].ayahs.length && sectemp -10 > 0 ){
      sectemp = sectemp - 10
    let temp = document.getElementById("temp");
    temp.innerHTML = ""
    console.log(sectemp)
    for (let i = sectemp - 10; i < sectemp; i++) {
      temp.innerHTML += `
    ${Quran[n].ayahs[i].text}
     <p id="numberofaya"><span>${Quran[n].ayahs[i].numberInSurah}</span></p>
   `;} 
   }
  })
}
