(function() {
  const form = document.userbaseForm;
  const errorMessage = document.getElementById('userbase__login_error');

  form.addEventListener('submit', onSubmit);
  form.userbaseUsername.addEventListener('keydown', onChange);
  form.userbasePassword.addEventListener('keydown', onChange);

  function onSubmit(e) {
    e.preventDefault();

    const url = form.loginSuccessUrl.value;
    const username = form.userbaseUsername.value;
    const password = form.userbasePassword.value;

    const xhr = new XMLHttpRequest();

    xhr.open('POST', 'login');
    xhr.send(JSON.stringify({ username, password }));

    xhr.onload = () => {
      if (xhr.status === 200)
        location.href = url.replace('{jwt}', JSON.parse(xhr.response).jwt);
      else errorMessage.style.display = 'block';
    };
  }

  function onChange() {
    if (errorMessage.style.display === 'block')
      errorMessage.style.display = 'none';
  }
}());
