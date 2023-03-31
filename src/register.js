let API_ENDPOINT = "https://641eb708ad55ae01ccae9e69.mockapi.io/user";
let registerName = document.getElementById("register-name");
let registerEmail = document.getElementById("register-email");
let registerPassword = document.getElementById("register-password");
let registerError = document.getElementById("register-error");
let registerButton = document.getElementById("register-button");

let numberRegex = /\d/;
let symbolRegex = /(?=.*?[^\w\s])/;
let emailRegex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

// REGISTER
let checkRegisterName = () => {
  if (
    !/[a-zA-Z]/.test(registerName.value) ||
    numberRegex.test(registerName.value) ||
    symbolRegex.test(registerName.value) ||
    !registerName
  ) {
    registerName.classList.replace("border-gray-200", "border-red-500");
    registerError.innerHTML = "Name must only contain A-Z and a-z";
    registerError.classList.replace("text-gray-400", "text-red-500");
    registerButton.disabled = true;
    return false;
  } else {
    registerName.classList.replace("border-red-500", "border-gray-200");
    registerError.classList.replace("text-red-500", "text-gray-400");
    registerError.innerHTML = "Please enter your name, email, and password";
    registerButton.disabled = false;
    return true;
  }
};

let checkRegisterEmail = () => {
  if (!emailRegex.test(registerEmail.value) || !registerEmail) {
    registerEmail.classList.replace("border-gray-200", "border-red-500");
    registerError.classList.replace("text-gray-400", "text-red-500");
    registerError.innerHTML = "Please enter valid email address";
    registerButton.disabled = true;

    return false;
  } else {
    registerEmail.classList.replace("border-red-500", "border-gray-200");
    registerError.innerHTML = "Please enter your name, email, and password";
    registerError.classList.replace("text-red-500", "text-gray-400");
    registerButton.disabled = false;
    return true;
  }
};

let checkRegisterPassword = () => {
  let registerPassword = document.getElementById("register-password");
  let uppercaseRegex = /[A-Z]/;
  let lowercaseRegex = /[a-z]/;
  let numberRegex = /\d/;
  let symbolRegex = /(?=.*?[^\w\s])/;
  let registerError = document.getElementById("register-error");
  let registerButton = document.getElementById("register-button");
  if (
    !uppercaseRegex.test(registerPassword.value) ||
    !lowercaseRegex.test(registerPassword.value) ||
    !numberRegex.test(registerPassword.value) ||
    symbolRegex.test(registerPassword.value) ||
    !registerPassword
  ) {
    registerPassword.classList.replace("border-gray-200", "border-red-500");
    registerError.classList.replace("text-gray-400", "text-red-500");
    registerError.innerHTML =
      "Password must contain A-Z, a-z, 0-9, & no symbol";
    registerButton.disabled = true;
    return false;
  } else {
    registerPassword.classList.replace("border-red-500", "border-gray-200");
    registerError.innerHTML = "Please enter your name, email, and password";
    registerError.classList.replace("text-red-500", "text-gray-400");
    registerButton.disabled = false;
    return true;
  }
};

let createNewUser = () => {
  fetch(API_ENDPOINT, {
    method: "POST",
    body: JSON.stringify({
      email: `${registerEmail.value}`,
      password: `${registerPassword.value}`,
      name: `${registerName.value}`,
      id: ``,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((user) => console.log(user));
};

let checkEmailExist = () => {
  fetch(API_ENDPOINT)
    .then((response) => response.json())
    .then((user) => {
      let registeredEmail = user.find((e) => e.email === registerEmail.value);

      if (registeredEmail !== undefined) {
        registerError.classList.replace("text-gray-400", "text-red-500");
        registerEmail.classList.replace("border-gray-200", "border-red-500");
        registerError.innerHTML = "Email already registered";
      } else {
        createNewUser();
        alert("Register successful! Redirecting soon...");
        window.location.href = "./login.html";
      }
    });
};

// VALIDATE REGISTER
let validateRegister = (e) => {
  e.preventDefault();

  if (
    !checkRegisterName() ||
    !checkRegisterEmail() ||
    !checkRegisterPassword()
  ) {
    return false;
  } else {
    registerButton.disabled = false;
    checkEmailExist();
  }
};

document
  .getElementById("register-name")
  .addEventListener("input", checkRegisterName);
document
  .getElementById("register-email")
  .addEventListener("input", checkRegisterEmail);
document
  .getElementById("register-password")
  .addEventListener("input", checkRegisterPassword);
document
  .getElementById("register-button")
  .addEventListener("click", validateRegister);

document.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("register-button").click();
  }
});

// Porter93@hotmail.com
// vHThXTwxDocBH9c
