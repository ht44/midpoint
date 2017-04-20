$(document).ready(function(){
  $('#step-2-button').click(function(event) {
    event.preventDefault()
    $('.step').hide();
    $('#step-3').show();
    $('#checkmark-3 img').first().show();
    $('#checkmark-3 img').last().hide();
  })
});
