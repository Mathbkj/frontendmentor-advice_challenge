window.addEventListener("DOMContentLoaded", () => {
  const divider = document.getElementById("divider");
  const btn = document.getElementById("dice");
  let interval;

  switch (window.matchMedia("(max-width:767px)").matches) {
    case true:
      divider.innerHTML = `<img src="./assets/pattern-divider-mobile.svg" alt="divider-mobile.svg" />`;
      break;
    default:
      divider.innerHTML = `<img src="./assets/pattern-divider-desktop.svg" alt="divider-desktop.svg" />`;
      break;
  }

  btn.addEventListener("click", function (ev) {
    fetchAdvice();

    function fetchAdvice() {
      interval && clearInterval(interval);
      const response = fetch("https://api.adviceslip.com/advice");

      response
        .then((res) => res.json())
        .then((data) => {
          btn.setAttribute("disabled", true);
          interval = setInterval(() => {
            btn.removeAttribute("disabled");
          }, 1000);
          const title = document.getElementById("advice_title");
          const content = document.getElementById("advice_content");
          content.textContent = data.slip.advice;
          title.textContent = `ADVICE #${data.slip.id}`;
        })
        .catch((error) => {
          console.error("Error fetching advice:", error);
          return;
        });
    }
  });
});
