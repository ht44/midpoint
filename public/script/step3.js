$(document).ready(function(){

  $('#step-3-back-button').click(function(event) {
    event.preventDefault()
    $('#step-3').hide();
    $('#step-2').show();
    $('#checkmark-3 img').first().show();
    $('#checkmark-3 img').last().hide();
  });
});
