let Quranmp3 =fetch("https://www.mp3quran.net/api/v3/reciters?language=ar")
.then((sound)=>sound.json())
.then((sound)=> sound=sound.reciters)

Quranmp3.then((sound)=> {
    // console.log(sound[86])
    // console.log(sound[86].name)
    // console.log(sound[86].moshaf[0])
    // console.log(sound[86].moshaf[0].server)
    // console.log(sound[86].moshaf[0].surah_list)
})

// let QuranData = fetch("https://api.alquran.cloud/v1/quran/quran-uthmani")
//   .then((Quran) => Quran.json())
//   .then((Quran) => (Quran = Quran.data.surahs))

//   QuranData.then((Quran) =>{
//     console.log(Quran [13 -1].name)
//   })




// Quranmp3.then((sound)=> {
//     let reciterSurhs = sound[86].moshaf[0].surah_list.split(",")
//     for (let i = 0; i < reciterSurhs.length; i++) {
//         console.log(sound[86].moshaf[0].server + reciterSurhs[i].padStart(3,"0") + ".mp3")
//     }
// })


// ____________________________________Get reciter for first time
let reciterS = document.getElementById("reciterS")


function GetreciterFT(n) {
    
    for (let i = 0; i < n; i++) {
        Getreciter(i)
    }
}
GetreciterFT(10)





// ____________________________________Get reciter
function Getreciter(i){
    Quranmp3.then((sound)=> {
    
            let reciter = document.createElement("div")
            reciter.innerHTML=`
            <div class="reciterbx">
              <div class="reciterContent">
              <img src="../../asset/headphones.png" alt="" id="headphoneicon">
              <h2 id="reciterName">${sound[i].name}</h2>
              <p id="moshaf">${sound[i].moshaf[0].name}</p>
              <p id="surahsNumbers">${sound[i].moshaf[0].surah_total}</p>
              </div>
            </div>
            `
            reciterS.appendChild(reciter)
    })
}

// ______________________________________Search in suarhs--
let searchinput = document.getElementById("searchinput");
function search() {
    reciterS.innerHTML = ""

  Quranmp3.then((sound)=> {
    for (let i = 0; i < sound.length; i++) {
        let temp = removeArabicDiacritics(sound[i].name);
        if (temp.includes(searchinput.value)&& searchinput.value != "") {
            Getreciter(i)
        }
        
    }
  })
  if (searchinput.value == "") {
    GetreciterFT(10)
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
let numberOfreciter = 10 
function addmorereciter() {
    numberOfreciter = numberOfreciter +10
    GetreciterFT(numberOfreciter)

}