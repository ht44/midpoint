$(document).ready(function(){
  $('#step-2-button').click(function(event) {
    event.preventDefault()
    $('.step').hide();
    $('#step-3').show();
    $('#checkmark-3 img').first().show();
    $('#checkmark-3 img').last().hide();
  })
  $('#step-2-back-button').click(function(event) {
    event.preventDefault()
    $('#step-2').hide();
    $('#step-1').show();
    $('#checkmark-3 img').first().show();
    $('#checkmark-3 img').last().hide();
  });
});
