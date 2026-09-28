const buttonOpenLogin = document.getElementById("button_open_login");
const buttonCancelLogin = document.getElementById("button_cancel_login");
const loginOverlay = document.getElementById("login_overlay");

const buttonOpenRegister = document.getElementById("button_open_register");
const buttonCancelRegister = document.getElementById("button_cancel_register");
const registerOverlay = document.getElementById("register_overlay");

const devMessageOverlay = document.getElementById("dev_message_overlay");

devMessageOverlay.classList.remove("hidden");

const overlayList = [loginOverlay, registerOverlay, devMessageOverlay];

function hideOverlays() {
  for (const overlay of overlayList) {
    if (overlay) overlay.classList.add("hidden");
  }
}

if (buttonOpenLogin) {
  buttonOpenLogin.addEventListener("click", (e) => {
    e.preventDefault();
    hideOverlays();
    loginOverlay.classList.remove("hidden");
  });
}

if (buttonCancelLogin) {
  buttonCancelLogin.addEventListener("click", (e) => {
    e.preventDefault();
    hideOverlays();
    loginOverlay.classList.add("hidden");
  });
}

if (buttonOpenRegister) {
  buttonOpenRegister.addEventListener("click", (e) => {
    e.preventDefault();
    hideOverlays();
    registerOverlay.classList.remove("hidden");
  });
}

if (buttonCancelRegister) {
  buttonCancelRegister.addEventListener("click", (e) => {
    e.preventDefault();
    hideOverlays();
    registerOverlay.classList.add("hidden");
  });
}
