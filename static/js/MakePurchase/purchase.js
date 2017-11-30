$(document).ready(function(){

  if ($('#basicInfoTab').children().hasClass("active")){

    $.ajax({
      url : '/basic-info/',
      type : 'GET',
      success: function(data){
        $('#basicInfoBody').html(data);
      },
      error : function(xhr, errmsn, err){
        console.log("Form wasn't created")
      }
    });
  }


  var switch_tab = $('.switch_tab').attr('value');
  switch (switch_tab){
    case "reviewTab":
      $('#itemDetailsTab').removeClass('disabled');
      $('#paymentTab').removeClass('disabled');
      $('#reviewTab').removeClass('disabled');
      $('#basicInfoTab').addClass('grey lighten-2');
      $('#itemDetailsTab').addClass('grey lighten-2');
      $('#paymentTab').addClass('grey lighten-2');
      document.getElementById('reviewTab').click();
      break;
    case "paymentTab":
      $('#itemDetailsTab').removeClass('disabled');
      $('#paymentTab').removeClass('disabled');
      $('#basicInfoTab').addClass('grey lighten-2');
      $('#itemDetailsTab').addClass('grey lighten-2');
      document.getElementById('paymentTab').click();
      break;
    case "itemDetailsTab":
      $('#itemDetailsTab').removeClass('disabled');
      $('#basicInfoTab').addClass('grey lighten-2');
      document.getElementById('itemDetailsTab').click();
  }




});
