$(document).ready(function(){
  $(".accordion-header > a").click(function(){
    var currentDiv = $(this).next('div');
    $('.accordion-header > div').slideUp();
    currentDiv[currentDiv.is(":visible") ? "slideUp" : "slideDown"]();
  }).next('div').hide();
});


