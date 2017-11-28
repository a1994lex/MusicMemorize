$(document).ready(function(){
  $('ul.tabs').tabs();
  $('ul.tabs').tabs('select_tab', 'tab_id');

  var i = 0;
  $('#hide').click(function() {
    if(i==0) {
      // $('#global_nav').fadeOut();
      $('#global_nav').animate({
        height: '0px'
      }, 1000);
      $('#global_nav').hide('1000');
      i++;
    }
    else{
      // $('#global_nav').fadeIn();
      $('#global_nav').show();
      $('#global_nav').animate({
        height: '48px'
      }, 1000);
      i=0;
    }
    $(this).attr('id','show');
  });
});
