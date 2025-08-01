const imageFilenames = ["vincebus_eruptum.png", "dopethrone.png", "volume_4.png", "master_of_reality.png", "holy_mountain.png"];
const imageAlts = {
  "vincebus_eruptum.png": "Blue Cheer's first album",
  "dopethrone.png": "Electric Wizard's third album",
  "volume_4.png": "Black Sabbath's fourth album",
  "master_of_reality.png": "Black Sabbath's third album",
  "holy_mountain.png": "Sleep's second album"
};

const thumbBar = document.querySelector(".thumb-bar");
const displayedImg = document.querySelector(".displayed-img");
const overlay = document.querySelector(".overlay");
const btn = document.querySelector("button");

for (const filename of imageFilenames) {
  const newImage = document.createElement("img");
  newImage.src = `images/${filename}`;
  newImage.alt = imageAlts[filename] || "";
  thumbBar.appendChild(newImage);

  newImage.addEventListener("click", () => {
    displayedImg.src = newImage.src;
    displayedImg.alt = newImage.alt;
  });
}

btn.addEventListener("click", () => {
  if (btn.getAttribute("class") === "dark") {
    btn.setAttribute("class", "light");
    btn.textContent = "Lighten";
    overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
  } else {
    btn.setAttribute("class", "dark");
    btn.textContent = "Darken";
    overlay.style.backgroundColor = "rgba(0,0,0,0)";
  }
});