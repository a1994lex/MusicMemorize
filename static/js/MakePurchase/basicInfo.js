function initOptContact(){
  var show = $("#showContact").attr('value');
  contact_fields = document.getElementsByClassName('optionalContactInfo');

  for (field of contact_fields){
    if (show === undefined || show === 'True'){
        field.parentNode.style.display = "initial";
    }
    else {
      field.parentNode.style.display = "none";
    }
  }
}

function setSupplier(supplier, event){
  if (supplier == "" || supplier == undefined){
    return 1;
  }
  event.preventDefault();
  event.stopImmediatePropagation();
  $.ajax({
    url : '/set-supplier/',
    type: 'GET',
    data: {'supplier':supplier},
    success: function(data) {
      $('#supplierName').html(data);
      $('#stretch_modal').modal('close');
    },
    error: function(xhr, errmsg, err) {
      console.log('Clicking on supplier failed');
    }
  });
  return 0;
}

$( document ).ready(function(){
  if (document.getElementById('id_event-name_of_purchase')){
    setFocus('id_event-name_of_purchase');
  }
  $('.modal').modal({
    dismissible: false
  });

  // $('#id_event-company_container').hide()
  initOptContact();
  /* Resets the select dropdown after an ajax call */
  $('select').material_select();

  /* Sets the date picker for datefield in form*/
  $('.datepicker').pickadate({
    format: "yyyy-mm-dd",
    selectMonths: true, // Creates a dropdown to control month
    close: 'Enter'
  });

  /* Fixes tooltip so it works after ajax call */
  $('.tooltipped').tooltip('enable');

  /* When the submit button is clicked for the basic info form, an ajax call is
  made, and ajax_newPurchase.html is loaded into the basicInfoBody div with any
  errors that there may be after form validation.  */
  $('#basicInfoSubmit').on('click', function(event){
    event.preventDefault();
    event.stopImmediatePropagation();
    supplier = $("#supplierId").attr('value');
    $.ajax({
      url:'/ajax-basic-info/',
      type: 'POST',
      data: $('#basicInfoForm, #contactForm').serialize(),
      success: function(data){
        $('#basicInfoBody').html(data);
        var supplierError = setSupplier(supplier, event);
        /* If there are no errors in the ajax html, then we move on to the next
        tab, and load itemDetail.html, through ajax into the item detail tab. */
        if (supplierError!==1){
          if ($('#basicInfoBody').find('.error').html() == undefined){
              // submitOptContact(event);
              //The itemDetails div must be loaded, it has not yet been accessed
              $.ajax({
                url:'/item-details/',
                type: 'GET',
                success: function(data){
                  $('#basicInfo').removeClass('active');
                  $('#itemDetailsTab').removeClass('disabled');
                  $('#itemDetails').addClass('active');
                  $('#itemDetailsBody').html(data);
                  $('ul.tabs').tabs('select_tab','items');
                  setFocus('id_item_set-0-description');
                  $('#basicInfoTab').addClass('grey lighten-2');
                },
                error: function(xhr, errmsg, err){
                  console.log("Failure to load Item Detail page");
                }
              });
          }
        }
        else{
          //Set up a custom error if supplier has not been chosen
          var error_html = "<small class='red-text error'>Please add a supplier</small>"
          $('#supplierName').append(error_html);
        }
      },
      error : function(xhr, errmsn, err){
        console.log("Form wasn't submitted");
      }
    });
  });

  /* Loads an optional contact form (contactInfo.html) into the page using ajax
   when this button is clicked */
  $('#contactBtn').on('click', function(event){
    // initOptContact();
    $('.tooltipped').tooltip('disable');
    contact_fields = document.getElementsByClassName('optionalContactInfo');

    for (field of contact_fields){
      $(field.parentNode).toggle();
    }

  });

  $('#searchSupplierBtn').on('click', function(event){
    event.preventDefault();
    event.stopImmediatePropagation();
    // $('.tooltipped').tooptip('disable');
    $.ajax({
      url : '/supplier-search/',
      type : 'GET',
      success : function(data){
        $('#stretch_modal_content').html(data);
        $('#stretch_modal').modal('open');
        setFocus('id_vendor');
      },
      error : function(xhr, errmsn, err){
        console.log("Failure to load new supplier form")
      }
    });
  });

  $('#submitVendorSearch').on('click', function(event){
    event.preventDefault();
    event.stopImmediatePropagation();
    $('.tooltipped').tooltip('disable');
    $.ajax({
      url :  '/supplier-result/',
      type : 'POST',
      data : $('#searchSupplier').serialize(),
      success : function(data){
        $('#vendorResults').html(data);
      },
      error : function(xhr, errmsg, err){
        console.log("Failure to load optional contact information");
      }
    });
  });

  /* When this button is clicked, ajax opens a modal with newSupplier.html
  loaded inside of it. */
  $('#addSupplierBtn').on('click', function(event){
    event.preventDefault();
    event.stopImmediatePropagation();
    $('.tooltipped').tooltip('disable');
    $.ajax({
      url : '/add-supplier/',
      type : 'GET',
      success : function(data){
        $('#page_modal_content').html(data);
        $('#page_modal').modal('open');
        setFocus('id_name');
      },
      error : function(xhr, errmsn, err){
        console.log("Failure to load new supplier form")
      }
    });
  });

  $('.supplierResult').on('click', function(event){
    var supplier = $(this).attr('id');
    setSupplier(supplier, event);
  });

  /* This button uses ajax to post a new supplier to the database using the
  serialized info from the form in newSupplier.html */
  $('#submitSupplierBtn').on('click', function(event){
    event.preventDefault();
    event.stopImmediatePropagation();
    var $$ = $(this)
    $.ajax({
      url : '/add-supplier/',
      type : 'POST',
      data: $('#createSupplierForm').serialize(),
      success: function(data){
        $('#page_modal_content').html(data);
        if ($('#page_modal_content').find('.error').html() == undefined){
          /*There are no errors, so it is safe to close the modal*/
          supplier = $('.submittedSupplierId').attr('id');
          setSupplier(supplier, event)
          $('#page_modal').modal('close');
        }
      },
      error : function(xhr, errmsn, err){
        console.log("Form wasn't created")
      }
    });
  });

  /* When this button is clicked, ajax opens a modal with newLocation.html
  loaded inside of it. We also send any info that may have already been
   inputted in the form in json format*/
  $('#addLocationBtn').on('click', function(event){
    var description = $('#id_event-name_of_purchase').val(),
        supplier_id = $('#supplierId').val(),
        opt_name = $('#id_event-contact_name').val(),
        opt_email = $('#id_event-contact_email').val(),
        opt_phone = $('#id_event-contact_phone').val(),
        json = {'description':description, 'supplier_id': supplier_id,
                'opt_name':opt_name, 'opt_email':opt_email,
                'opt_phone':opt_phone};
    event.preventDefault();
    event.stopImmediatePropagation();
    $('.tooltipped').tooltip('disable');
    $.ajax({
      url : '/add-location/',
      type : 'GET',
      data : json,
      success : function(data){
        $('#page_modal_content').html(data);
        $('#page_modal').modal('open');
        setFocus('id_first_name');
      },
      error : function(xhr, errmsn, err){
        console.log("Failure to load new location form")
      }
    });
  });

  /* This button causes ajax to post a new location to the database using the
  serialized info from the form in newLocation.html */
  $('#submitLocationBtn').on('click', function(event){
    event.preventDefault();
    event.stopImmediatePropagation();
    $.ajax({
      url : '/add-location/',
      type : 'POST',
      data: $('#addLocationForm').serialize(),
      success: function(data){
        $('#page_modal_content').html(data);
        if ($('#page_modal_content').find('.error').html() == undefined){
          /*There are no errors, so it is safe to close the modal*/
          $('#page_modal').modal('close');
          location.reload();
        }
      },
      error : function(xhr, errmsn, err){
        console.log("Form wasn't created")
      }
    });
  });
});
