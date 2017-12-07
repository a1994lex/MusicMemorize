$(document).ready(function(){
  // $('.tap-target').tapTarget('open');
  var sec30 = new Date().getTime() + 30000;
  var sec45 = new Date().getTime() + 45000;
  var min1 = new Date().getTime() + 60000;
  var time = sec30;
  $(".radios").find("input[type=radio]").on("change",function() {
        var status = $(this).prop('checked');
        if ($(this).attr('id') === 'sec30'){
          console.log("SEC30");
          time = sec30;
        }
        if ($(this).attr('id') === 'sec45'){
          console.log("SEC45");
          time = sec45;
        }
        if ($(this).attr('id') === 'min1'){
          console.log("MIN1");
          time = min1;
        }
  });

  $('#clock').on('click', function(event){
    $('#clock').countdown(time)
    .on('update.countdown', function(event) {
      var $this = $(this);
      $(this).html(event.strftime('%M:%S Seconds Left!'));
    })
    .on('finish.countdown', function(event) {
      Materialize.toast('Times Up!', 4000, 'rounded', 'red');
      $(this).html('Timer Start');
    });
  });

  $('#flashcards').on('click', function(event){
      $('#page_modal').modal('open');
  });
  $("#flashcard").flip({
    axis: 'x',
    trigger: 'click',
    forceHeight: 'true'
  });

});
