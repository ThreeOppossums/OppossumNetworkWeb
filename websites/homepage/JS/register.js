(() => {
  let messageTimer = null;

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
    const inputUsername = document.getElementById("InputUsernameRegister");
    const inputPassword = document.getElementById("InputPasswordRegister");
    const inputConfirmPassword = document.getElementById(
      "InputConfirmPasswordRegister",
    );

    if (inputUsername) inputUsername.value = "";
    if (inputPassword) inputPassword.value = "";
    if (inputConfirmPassword) inputConfirmPassword.value = "";
  }

  const btnSubmit = document.getElementById("button_submit_register");
  if (btnSubmit) {
    btnSubmit.addEventListener("click", async (e) => {
      e.preventDefault();

      const username = document
        .getElementById("InputUsernameRegister")
        .value.trim();
      const password = document.getElementById("InputPasswordRegister").value;
      const confirmPassword = document.getElementById(
        "InputConfirmPasswordRegister",
      ).value;

      if (!username || !password || !confirmPassword) {
        showMessage("Please fill in all fields.", "ERROR");
        return;
      }

      if (password.length < 8) {
        showMessage("Password must be at least 8 characters long.", "ERROR");
        return;
      }

      if (password !== confirmPassword) {
        showMessage("Passwords do not match.", "ERROR");
        return;
      }

      try {
        showMessage("Processing request...", "THROUGH");
        const response = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          const error = "Registration failed. Lazy developer...";
          showMessage(error, "ERROR");
          console.log(data.error || data.detail)
          return;
        }

        showMessage("Registration successful!", "THROUGH");
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
