
// Login
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
         loadConnections();
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

// Load stream
function loadStream(id) {

$.ajax({
  type: 'GET',
  url: 'http://localhost:1134/api/stream/id/' + id,
  headers: { Authorization: 'Bearer ' + localStorage.token },
  success: function(data){
    ractive.set('stream', data);
    ractive.resetTemplate('#page-stream');
  },
  error: function(xhr, type){
    alert('TBD: feed load failed');
  }
});

}

// Load activity
function loadActivity(id) {

$.ajax({
  type: 'GET',
  url: 'http://localhost:1134/api/stream/activity',
  headers: { Authorization: 'Bearer ' + localStorage.token },
  success: function(data){
    ractive.set('activity', data);
    ractive.resetTemplate('#page-activity');
  },
  error: function(xhr, type){
    alert('TBD: Activity load failed');
  }
});

}

// Load connections
function loadConnections() {

$.ajax({
  type: 'GET',
  url: 'http://localhost:1134/api/connections',
  headers: { Authorization: 'Bearer ' + localStorage.token },
  success: function(data){
    console.log(data);
    ractive.set('connections', data);
    ractive.resetTemplate('#page-connections');
  },
  error: function(xhr, type){
    alert('TBD: Activity load failed');
  }
});

}

var ractive = new Ractive({
  el: '#content'
});

// Start app
Zepto(function($){

  if (localStorage.token && localStorage.id) {
   loadConnections();
  }

  else {
    ractive.resetTemplate('#page-login');
  }

  // Login form submitted
  $('#login').on('submit', function(e) {
      e.preventDefault(); e.stopPropagation();
      login($('#email').val(), $('#password').val());
  });

});