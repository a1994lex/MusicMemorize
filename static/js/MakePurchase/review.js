$(document).ready(function(){
  $('#submit-warning-id').on('click', function(event){
    event.preventDefault();
    event.stopImmediatePropagation();
    $.ajax({
      url : '/submit-warning/',
      type : 'GET',
      success: function(data){
        $('#page_modal_content').html(data);
        $('#page_modal').modal('open');
        $('#reviewTab').addClass('grey lighten-2');
      },
      error: function(xhr, errmsn, err){
        console.log("Form wasn't created")
      }
    });
  });

  $('#close-modal').on('click', function(event){
    $('#page_modal').modal('close');
  });
});
