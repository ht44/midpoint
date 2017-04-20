$(document).ready(function(){
  var availableTags = [
  "ActionScript",
  "AppleScript",
  "Asp",
  "BASIC",
  "C",
  "C++",
  "Clojure",
  "COBOL",
  "ColdFusion",
  "Erlang",
  "Fortran",
  "Groovy",
  "Haskell",
  "Java",
  "JavaScript",
  "Lisp",
  "Perl",
  "PHP",
  "Python",
  "Ruby",
  "Scala",
  "Scheme"
];
  $('#people a').click(function(event){
    event.preventDefault()
    $('#group-save').toggle()
  })

  $('#group-selector').click(function(event) {
    event.preventDefault()
    $('#group-menu').toggle()
  })

  $('#group-menu li').click(function(event) {
    event.preventDefault()
    $('#group-selector').text($(this).text())
    $('#group-menu').hide()
    $('#group-menu li').removeClass('selected')
    $(this).addClass('selected')
  })

  $('#step-1-button').click(function(event) {
    event.preventDefault()
    $('.step').hide();
    $('#step-2').show();
    $('#checkmark-2 img').first().show();
    $('#checkmark-2 img').last().hide();
  })

  $('#step-1').show();
  $('#checkmark-2 img').last().show();
  $('#checkmark-3 img').last().show();
})

// receives users (after group is select or users are individually added) from map.ejs
// and then updates the # of people added to display "# people added"
function addUsers(users) {
  $('#people-count').text(users.length);
  // this empties the list "people-count" to start
  $('#people-list').empty();
  users.forEach(function(user) {
    // for every person create a new li
    const person = $(document.createElement('li'));
    // print person's full name to list
    person.text(user.first + ' ' + user.last);
    // append it to the peole-list element
    $('#people-list').append(person);
  })
}
