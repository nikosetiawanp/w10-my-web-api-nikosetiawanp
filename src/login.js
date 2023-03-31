let API_ENDPOINT = "https://641eb708ad55ae01ccae9e69.mockapi.io/user";
let loginButton = document.getElementById("login-button");
let loginEmail = document.getElementById("login-email");
let loginPassword = document.getElementById("login-password");
let loginError = document.getElementById("login-error");

// Porter93@hotmail.com
// vHThXTwxDocBH9c

let checkEmptyEmail = () => {
  if (!loginEmail.value) {
    loginError.innerHTML = "Don't leave email / password blank";
    loginError.classList.replace("text-gray-400", "text-red-500");
    loginEmail.classList.replace("border-gray-200", "border-red-500");
    return false;
  } else {
    loginEmail.classList.replace("border-red-500", "border-gray-200");
    return true;
  }
};
let checkEmptyPassword = () => {
  if (!loginPassword.value) {
    loginError.innerHTML = "Don't leave email / password blank";
    loginError.classList.replace("text-gray-400", "text-red-500");
    loginPassword.classList.replace("border-gray-200", "border-red-500");
    return false;
  } else {
    loginPassword.classList.replace("border-red-500", "border-gray-200");
    return true;
  }
};

let checkUserExist = () => {
  fetch(API_ENDPOINT)
    .then((response) => response.json())
    .then((user) => {
      let registeredEmail = user.find((e) => e.email === loginEmail.value);
      let registeredPassword = user.find(
        (e) => e.password === loginPassword.value
      );
      let userID = registeredEmail.id;
      let userName = registeredEmail.name;

      console.log(registeredEmail.id);
      if (registeredEmail === undefined || registeredPassword === undefined) {
        loginError.innerHTML = "Invalid Email / Password";
        loginError.classList.replace("text-gray-400", "text-red-500");
      } else if (registeredEmail !== registeredPassword) {
        loginError.innerHTML = "Invalid Email / Password";
        loginError.classList.replace("text-gray-400", "text-red-500");
      } else {
        localStorage.setItem("userID", `${userID}`);
        localStorage.setItem("userName", `${userName}`);
        alert("Login successful! Redirecting soon...");
        window.location.href = "./notes.html";
      }
    });
};
let authenticateLogin = () => {
  checkEmptyEmail();
  checkEmptyPassword();
  if (checkEmptyEmail() === false || checkEmptyPassword === false) {
    console.log(false);
  } else checkUserExist();
};
loginButton.addEventListener("click", authenticateLogin);

// ENTER TO LOGIN
document.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("login-button").click();
  }
});
// Porter93@hotmail.com
// vHThXTwxDocBH9c
