$( document ).ready(function() {

  $('#myModal-button, #myModal-button2').on('click', function() {
    $('#login_modal').openModal({
      ready: function() {
          if($(".lean-overlay").length > 1) {
              $(".lean-overlay:not(:first)").each(function() {
                  $(this).remove();
              });
          }
      }, // Callback for Modal open
      complete: function() {
        $(".lean-overlay").each(function() {
            $(this).remove();
        });
      } // Callback for Modal close
    });
    modal_ajax();
  });// end click

  function modal_ajax(demo, order, title){
    $.ajax({
      url: '/login',
      success: function(data) {
        $('#login_modal').find('.modal-content').html(data);
      },//success
    });//ajax
  }; //end modal_ajax
});
