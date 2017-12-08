$(document).ready(function(){

  function setFocus(fieldId){
    var input = document.getElementById(fieldId)
    input.focus();
  }
  $('.button-collapse').sideNav({
      menuWidth: 300, // Default is 300
      edge: 'left', // Choose the horizontal origin
      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true, // Choose whether you can drag to open on touch screens,
    }
  );
  $('.collapsible').collapsible();
  $('.modal').modal();
  $('select').material_select();

  $('#addSong').on('click', function(event){
      console.log("Recognized click");
      event.preventDefault();
      event.stopImmediatePropagation();
      // $('.tooltipped').tooptip('disable');
      $.ajax({
        url : '/add-song/',
        type : 'GET',
        success : function(data){
          $('#modal_content').html(data);
          $('#modal1').modal('open');
          // setFocus('id_vendor');

        },
        error : function(xhr, errmsn, err){
          console.log("Failure to load new supplier form")
        }
      });
  });

  // $('.button-collapse').sideNav('hide');
});
