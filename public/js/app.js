console.log("Client side javascript file is loaded!");

const formData = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

formData.addEventListener("submit", (e) => {
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  e.preventDefault();
  const location = search.value;
  fetch("/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.errorMessage || data.error) {
          messageOne.textContent = data.errorMessage || data.error;
        } else {
          messageOne.textContent = data.forecast;
          messageTwo.textContent = data.location;
        }
      });
    },
    (errorMessage) => {
      messageOne.textContent = errorMessage;
    }
  );
});
