  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  document.forms.kb.username.value=""
  document.forms.kb.username.removeAttribute('disabled')
  document.getElementById('signout').style.display = "none"
  document.getElementById('signin').style.display = "block"
  }

  function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
//   alert(profile.getName())
  document.forms.kb.username.value=profile.getName()
  document.forms.kb.username.disabled="true"
  document.getElementById('signout').style.display = "block"
  document.getElementById('signin').style.display = "none"
} 
