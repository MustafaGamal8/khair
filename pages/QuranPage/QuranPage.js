async function fetchQuranData() {
  try {
    const response = await fetch("https://api.alquran.cloud/v1/surah");
    const Quran = await response.json();
    return Quran.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


async function fetchSurahData(numberOfSurah) {
  try {
    const response = await fetch(
      `https://api.alquran.cloud/v1/surah/${numberOfSurah}/ar.asad`
    );
    const surah = await response.json();
    return surah.data;
  } catch (error) {
    console.error(error);
    throw error;
  }  
}
// ___________________________GET surah details

let surahbx = document.getElementById("surahbx");

async function firstcheck() {
  surahbx.innerHTML = "";
  try {
    const Quran = await fetchQuranData();
    for (let i = 0; i < 12; i++) {
      checksurah(i, Quran);
    }
  } catch (error) {
    console.error(error);
  }
}
firstcheck();

async function checksurah(n, Quran) {
  let temp = document.createElement("div");
  temp.innerHTML = `
    <div class="surah" onclick="Opensurah(${n +1})">
      <div class="surahNamberbx"><p class="surahNamber">${Quran[n].number}</p></div>
      <div class="surahNamebx">
        <h1 class="surahNameAr">${Quran[n].name}</h1>
        <p class="surahNameEn">${Quran[n].englishName}</p>
      </div>
      <div class="ayahtNumbersbx">
        <p class="ayahtNumbers">${Quran[n].numberOfAyahs}<p>
        <p>Ayat</p>
      </div>
    </div>
    `;
  surahbx.appendChild(temp);
}

// ______________________________________Search in suarhs--

let searchinput = document.getElementById("searchinput");
async function search() {
  surahbx.innerHTML = "";
  let mylist = [];
  try {
    const Quran = await fetchQuranData();
    for (let i = 0; i < 114; i++) {
      let temp = removeArabicDiacritics(Quran[i].name);
      if (temp.includes(searchinput.value) && searchinput.value != "") {
        checksurah(i, Quran);
      }
    }
    if (searchinput.value == "") {
      await firstcheck();
    }
  } catch (error) {
    console.error(error);
  }
}

// ___________________________fun to open surah

let ayatbx = document.getElementById("ayatbx");
let surah
async function Opensurah(n) {
  ayatbx.classList.add("ayatanimation");
  var Nsurahnumber = n;
   surah = await fetchSurahData(Nsurahnumber);
  try {
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

    <h1 id="ayahname">${removeArabicDiacritics(surah.name)}</h1>
    <div id="ayat"><h2 id="temp"></h2>
    </div>

    <div class="arrows">
    <div id="arrow1" onclick="loadmore()" ><span>&#10140</span></div>
    <div id="arrow2" onclick="loadless()" ><span>&#10140</span></div>
  </div>
  </main>
    `;

    let temp = document.getElementById("temp");
    for (let i = 0; i < 10; i++) {
      temp.innerHTML += `
       ${surah.ayahs[i].text}
        <p id="numberofaya"><span>${surah.ayahs[i].numberInSurah}</span></p>
      `;
    }
  } catch (error) {
    console.error(error);
  }
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
async function tashkel(n) {
  try {
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

    <h1 id="ayahname">${removeArabicDiacritics(surah.name)}</h1>
    <div id="ayat"><h2 id="temp"></h2>
    </div>

    <div class="arrows">
    <div id="arrow1" onclick="loadmore()" ><span>&#10140</span></div>
    <div id="arrow2" onclick="loadless()" ><span>&#10140</span></div>
  </div>
  </main>
    `;
    

    let temp = document.getElementById("temp");

    if (tashkelmode == "true") {
      tashkelmode = "false";
      for (let i = sectemp - 10; i < sectemp; i++) {
        temp.innerHTML += `
      ${removeArabicDiacritics(surah.ayahs[i].text)}
       <p id="numberofaya"><span>${surah.ayahs[i].numberInSurah}</span></p>
     `;
      }
    } else if (tashkelmode == "false") {
      tashkelmode = "true";
      for (let i = sectemp - 10; i < sectemp ; i++) {
        temp.innerHTML += `
      ${surah.ayahs[i].text}
       <p id="numberofaya"><span>${surah.ayahs[i].numberInSurah}</span></p>
     `;
      }
    }
  } catch (error) {
    console.error(error);
  }
}


let sectemp = 10
 function loadmore() {
  try {
    if (sectemp < surah.ayahs.length) {
      sectemp = sectemp + 10
      let temp = document.getElementById("temp");
      temp.innerHTML = ""
      for (let i = sectemp -10; i < sectemp; i++) {
        temp.innerHTML += `
      ${surah.ayahs[i].text}
       <p id="numberofaya"><span>${surah.ayahs[i].numberInSurah}</span></p>
     `;}
    }
  } catch (error) {
    console.error(error);
  }
}

async function loadless() {
  try {
    if (sectemp < surah.ayahs.length && sectemp -10 > 0 ){
      sectemp = sectemp - 10
      let temp = document.getElementById("temp");
      temp.innerHTML = ""
      for (let i = sectemp - 10; i < sectemp; i++) {
        temp.innerHTML += `
      ${surah.ayahs[i].text}
       <p id="numberofaya"><span>${surah.ayahs[i].numberInSurah}</span></p>
     `;} 
     }
  } catch (error) {
    console.error(error);
  }
}
