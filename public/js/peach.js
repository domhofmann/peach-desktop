// Configure Nunjucks
var env = nunjucks.configure('views', { autoescape: true });

// Add moment.js filter to Nunjucks
env.addFilter('fromNow', function(dts) {
      if (!dts) {
        return 'a while ago';
      }
      var s = moment.unix(dts).fromNow();
      return s;
    });

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
         loadView('connections', '/connections');
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
function loadView(view, endpoint) {

  $.ajax({
  type: 'GET',
  url: 'http://localhost:1134/api' + endpoint,
  headers: { Authorization: 'Bearer ' + localStorage.token },
  success: function(data){
    console.log(data);
    $('#content').html(nunjucks.render(view + '.html', { [view]: data }));
    window.scrollTo(0,0);
  },
  error: function(xhr, type){
    alert('TBD: Load failed');
  }
  });

}

// Like post

function likePost(id) {

  $.ajax({
  type: 'POST',
  url: 'http://localhost:1134/api/like',
  headers: { Authorization: 'Bearer ' + localStorage.token },
  data: JSON.stringify({postId: id}),
  contentType: 'application/json',
  success: function(data){
    console.log(data);
    return true;
  },
  error: function(xhr, type){
    alert('TBD: Load failed');
    return false;
  }
  });

}

// Start app
Zepto(function($){

  // If authorization token exists, default to connections view
  if (localStorage.token && localStorage.id) {
   loadView('connections','/connections');
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