const SignUpButton = document.getElementById("SignUp");
const SignInButton = document.getElementById("SignIn");
const container = document.getElementById("container");

SignUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active")
});

SignInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active")
});


const externalSignUpButton = document.getElementById("ExternalSignUp");
externalSignUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});