$(document).ready(function(){

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
    $('#group-selector span').text($(this).text())
    $('#group-menu').hide()
    $('#group-menu li').removeClass('selected')
    $(this).addClass('selected')
  })

  $('#group-menu a').click(event => {
    // $('#group-menu').toggle();
    $('#people-list').empty();
    $('#people-count').text('0');
  });

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
function addUsersToCount(users) {
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

function addUserToCount(firstName, lastName) {
  // $('#people-count').text(users.length);
  var peopleCount = $('#people-count').text();
  peopleCount = parseInt(peopleCount, 10);
  ++peopleCount;
  $('#people-count').text(peopleCount);
  console.log(peopleCount, typeof peopleCount);
  var person = $(document.createElement('li'));
  person.text(firstName + ' ' + lastName);
  $('#people-list').append(person);
}

function removeUserFromCount() {
  var peopleCount = $('#people-count').text();
  peopleCount = parseInt(peopleCount, 10);
  --peopleCount;
  $('#people-count').text(peopleCount);
  $('#people-list li:last').remove();
}
