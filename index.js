if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./worker.js');
};

window.addEventListener("DOMContentLoaded", (event) => {
  const metaThemeColor = document.querySelector("meta[name=theme-color]");
  const btnTheme = document.querySelector("#btn-theme");
  const btnStart = document.querySelector("#btn-start");
  const countElm = document.querySelector("#count");
  const timeElm = document.querySelector("#time");

  let baseTime = 15;
  let time = 15;
  let count = 0;
  let interval = null;
  let dark = localStorage.getItem("dark");

  if (
    (dark === undefined || dark === null) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    localStorage.setItem("dark", true);
  }
  dark = JSON.parse(localStorage.getItem("dark"));

  if (dark) {
    document.documentElement.classList.add("dark");
    metaThemeColor.setAttribute("content", "#000");
  }

  btnTheme.addEventListener("click", () => {
    const dark = document.documentElement.classList.toggle("dark");

    localStorage.setItem("dark", dark);
    if (dark) {
      metaThemeColor.setAttribute("content", "#000");
    } else {
      metaThemeColor.setAttribute("content", "#e5e7eb");
    }
  });

  btnStart.addEventListener("click", () => {
    if (interval) {
      clearInterval(interval);
      interval = null;

      time = baseTime;
      count = 0;

      countElm.textContent = count;
      timeElm.value = time;
      btnStart.textContent = "start";
      timeElm.disabled = false;
    } else {
      baseTime = timeElm.value;
      time = baseTime;

      timeElm.disabled = true;

      interval = setInterval(() => {
        time = time - 1;

        if (time === 0) {
          count = count + 1;
          time = baseTime;

          countElm.textContent = count;
        }

        timeElm.value = time;
      }, 1000);

      btnStart.textContent = "reset";
    }
  });
});
