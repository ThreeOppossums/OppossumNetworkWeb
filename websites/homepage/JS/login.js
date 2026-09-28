(() => {
  let messageTimer = null;
  let logged_in = false;

  function showMessage(text, type, duration = 4000) {
    const messageDisplays = document.getElementsByClassName("messageDisplay");
    const colorDisplay = type === "ERROR" ? "aqua" : "lightgreen";

    for (const display of messageDisplays) {
      display.innerText = text;
      display.style.color = colorDisplay;
    }

    if (messageTimer) clearTimeout(messageTimer);

    messageTimer = setTimeout(() => {
      for (const display of messageDisplays) {
        display.innerText = ".";
        display.style.color = "#232323";
      }
    }, duration);
  }

  function resetInputFields() {
    // KORREKTUR: const verwendet (keine impliziten globalen Variablen)
    const inputUsername = document.getElementById("InputUsernameLogin");
    const inputPassword = document.getElementById("InputPasswordLogin");

    if (inputUsername) inputUsername.value = "";
    if (inputPassword) inputPassword.value = "";
  }

  const btnSubmit = document.getElementById("button_submit_login");
  if (btnSubmit) {
    btnSubmit.addEventListener("click", async (e) => {
      e.preventDefault();

      const username = document
        .getElementById("InputUsernameLogin")
        .value.trim();
      const password = document.getElementById("InputPasswordLogin").value;

      if (!username || !password) {
        showMessage("Please fill in all fields.", "ERROR");
        return;
      }

      try {
        showMessage("Processing Request...", "THROUGH");
        const response = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          const error = data.error || "Login failed. Lazy developer...";
          showMessage(error, "ERROR");
          return;
        }

        showMessage("Login successful!!", "THROUGH");
        logged_in = true;
        resetInputFields();
      } catch {
        showMessage(
          "Can't establish connection to server, please try again later.",
          "ERROR",
        );
      }
    });
  }
})();
