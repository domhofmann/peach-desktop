// Configure Nunjucks
nunjucks.configure('views', { autoescape: true });

// Authorization function
function login(email, password) {
  $.ajax({
    type: 'POST',
    url: 'http://localhost:1134/api/login',
    data: JSON.stringify({email: email, password: password}),
    contentType: 'application/json',
    success: function(data){
      if (data.data.streams) {
         localStorage.id = data.data.streams[0].id;
         localStorage.token = data.data.streams[0].token;
         loadView('connections');
      }
      else {
        alert('TBD: login failed / retry');
      }
    },
    error: function(xhr, type) {
      alert('TBD: login failed / retry');
    }
  });
}

// Load view function
function loadView(view) {

  $.ajax({
  type: 'GET',
  url: 'http://localhost:1134/api/' + view,
  headers: { Authorization: 'Bearer ' + localStorage.token },
  success: function(data){
    console.log(data);
    $('#content').html(nunjucks.render(view + '.html', { [view]: data }));
  },
  error: function(xhr, type){
    alert('TBD: Load failed');
  }
});

}

// Start app
Zepto(function($){

  // If authorization token exists, default to connections view
  if (localStorage.token && localStorage.id) {
   loadView('connections');
  }

  // If the token doesn't exist, render the login page
  else {
    $('#content').html(nunjucks.render('login.html'));
  }

  // Bind login form submission
  $('#login').on('submit', function(e) {
      e.preventDefault(); e.stopPropagation();
      login($('#email').val(), $('#password').val());
  });

});