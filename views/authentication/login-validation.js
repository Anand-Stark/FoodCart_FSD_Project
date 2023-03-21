const form = document.querySelector('form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const usernameError = document.getElementById('username-error');
const passwordError = document.getElementById('password-error');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  checkInputs();
});

function checkInputs() {
  const usernameValue = usernameInput.value.trim();
  const passwordValue = passwordInput.value.trim();
   // Username validation
   if (usernameValue === '') {
    setError(usernameInput, usernameError, 'Username is required');
  } else {
    setSuccess(usernameInput, usernameError);
  }

  // Password validation
  if (passwordValue === '') {
    setError(passwordInput, passwordError, 'Password is required');
  } else {
    setSuccess(passwordInput, passwordError);
  }

  // Submit form if all inputs are valid
  if (usernameValue !== '' && passwordValue !== '') {
    form.submit();
  }
}

function setError(input, error, message) {
  input.classList.add('error');
  error.textContent = message;
}

function setSuccess(input, error) {
  input.classList.remove('error');
  error.textContent = '';
}