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
    $('#group-selector').text($(this).text())
    $('#group-menu').hide()
    $('#group-menu li').removeClass('selected')
    $(this).addClass('selected')
  })
})
