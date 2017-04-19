$(document).ready(function(){
  $('#people a').click(function(event){
    event.preventDefault()
    $('#group-save').toggle()
  })
})
