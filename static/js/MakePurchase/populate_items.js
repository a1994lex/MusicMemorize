$( document ).ready(function(){
  var conditional_fields =$("div.storage", "div.hazardous");
  conditional_fields.hide();

  $(".is_chemical").change(function(){
    if ($(this).prop('checked')==='checked'){
      conditional_fields.show();
    }
    else {
      conditional_fields.hide();
    }
  });//end function
});//end ready
