// fetch("http://api.alquran.cloud/v1/edition ")
// .then((sound)=>sound.json())
// .then((sound)=> console.log(sound))

// _________________________________DARK MODE

let mood = "dark";

let root = document.documentElement;
function changeMode() {
  let darkmode = document.getElementById("darkmode").firstElementChild;
  console.log(darkmode);
  if (mood == "dark") {
    darkmode.classList.remove("lightmode");
    setTimeout(() => {
      darkmode.classList.add("darkmode");
      root.style.setProperty("--maindark", "#e3e4e8");
      root.style.setProperty("--lightyellow", "#e6b539");
      root.style.setProperty("--white", "#0f172a");
      document.body.style.color = "black";
    }, 0.1);
    mood = "light";
  } else {
    darkmode.classList.remove("darkmode");
    setTimeout(() => {
      darkmode.classList.add("lightmode");
      root.style.setProperty("--maindark", "#0f172a");
      root.style.setProperty("--lightyellow", "#ffe197");
      root.style.setProperty("--white", "white");
      document.body.style.color = "white";
    }, 0.1);
    mood = "dark";
  }
}

// _________________________________MenuBar
let menu_icon = document.getElementById("menu_icon");
let menu = document.getElementById("menu");
let menu_bar = document.getElementById("menu_bar");
let menu_mood = "true";
menu_icon.addEventListener("click", () => {
  if (menu_mood == "true") {
    menu_bar.classList.remove("menubaranimation2");
    menu.classList.remove("menuanimation2");
    menu.classList.add("menuanimation");
    menu_bar.classList.add("menubaranimation");
    menu_bar.style.display = "flex";
    menu_mood = "false";
  } else {
    menu_bar.classList.remove("menubaranimation");
    menu.classList.remove("menuanimation");
    setTimeout(() => {
      menu.classList.add("menuanimation2");
      menu_bar.classList.add("menubaranimation2");
      setTimeout(() => {
        menu_bar.style.display = "none";
        menu_bar.classList.remove("menubaranimation2");
        menu.classList.remove("menuanimation2");
      }, 700);
    }, 0.1);
    menu_mood = "true";
  }

});
window.addEventListener('resize', function() {
  const currentWidth = window.innerWidth;
  // Check if the width is equal to 100 pixels
  if (currentWidth > 1200 ) {
    menu_bar.style.display = "flex";
  }else{
    menu_bar.style.display = "none";
  }
});





