(function() {
  const form = document.userbaseForm;
  const errorMessage = document.getElementById('userbase__login_error');

  form.addEventListener('submit', onSubmit);
  form.userbaseUsername.addEventListener('keydown', onChange);
  form.userbasePassword.addEventListener('keydown', onChange);

  function onSubmit(e) {
    e.preventDefault();

    const userbaseUrl = form.userbaseUrl.value;
    const loginSuccessUrl = form.loginSuccessUrl.value;
    const username = form.userbaseUsername.value;
    const password = form.userbasePassword.value;

    const xhr = new XMLHttpRequest();

    xhr.open('POST', userbaseUrl);
    xhr.send(JSON.stringify({ username, password }));

    xhr.onload = () => {
      if (xhr.status === 200)
        location.href = loginSuccessUrl
          .replace('{jwt}', JSON.parse(xhr.response).jwt);
      else errorMessage.style.display = 'block';
    };
  }

  function onChange() {
    if (errorMessage.style.display === 'block')
      errorMessage.style.display = 'none';
  }
}());
