$(document).ready(function(){
  $('#saveSong').on('click', function(event){
    console.log("Recognized click");
    event.preventDefault();
    event.stopImmediatePropagation();
    // $('.tooltipped').tooptip('disable');
    $.ajax({
      url : '/add-song/',
      type : 'POST',
      data : $('#addSongForm').serialize(),
      success : function(data){
        $('#modal_content').html(data);
        if ($('#modal_content').find('.error').html() == undefined){
          /*There are no errors, so it is safe to close the modal*/
          $('#moda1').modal('close');
          $.ajax({
            url: '/grab-songs/',
            type: 'GET',
            success : function(data){
              $('#songlist').html(data);
            }
          });
        }
      },
      error : function(xhr, errmsn, err){
        console.log("Failure to load new supplier form")
      }
    });
});

});
