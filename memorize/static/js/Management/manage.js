$( document ).ready(function(){
  $('select').material_select();
  $('.modal').modal({
    dismissible: false
  });
  $('.tooltipped').tooltip('enable');

  /* MODALS */

  $('#addChemPreset').off().on('click', function(event){
    event.preventDefault();
    event.stopImmediatePropagation();
    $('.tooltipped').tooltip('disable');
    $.ajax({
      url : '/save-chem-preset/',
      type : 'GET',
      success : function(data){
          $('#page_modal_content').html(data);
          $('#page_modal').modal('open');
        console.log("in ajax");
      },
      error: function(xhr, errmsn, err){
        console.log("Failure to load new chemistry preset form")
      }
    });
  });

   $('.editChemPreset').off().on('click', function(event) {
     event.preventDefault();
     event.stopImmediatePropagation();
     var id = $(this).parent().parent().attr('id');
     console.log(id);
     $.ajax({
       url : '/save-chem-preset/',
       type : 'GET',
       data : { 'id': id },
       success : function(data){
           $('#page_modal_content').html(data);
           $('#page_modal').modal('open');
         console.log("in ajax")
       },
       error: function(xhr, errmsn, err){
         console.log("Failure to load chemistry preset edit form")
       }
     });
   });

   $('#submitChemPreset').off().on('click', function(event){
     console.log("clicked");
     event.preventDefault();
     event.stopImmediatePropagation();
     console.log("submit function");
     $.ajax({
       url : '/save-chem-preset/',
       type : 'POST',
       data: $('#ChemPresetForm').serialize(),
       success: function(data){
         console.log("in ajax");
         $('#page_modal_content').html(data);
         console.log($('#page_modal_content').find('.error').html());
         if ($('#page_modal_content').find('.error').html() == undefined){
           /*There are no errors, so it is safe to close the modal*/
           $('#page_modal').modal('close');
           location.reload();
         };
       },
       error : function(xhr, errmsn, err){
         console.log("Could not save chemistry preset")
       }
     });
   });

  $('.deleteChemPreset').off().on('click', function(event){
    event.preventDefault();
    event.stopImmediatePropagation();
    var id = $(this).parent().parent().attr('id');
    console.log(id);
    $.ajax({
      url : '/delete-chem-preset/',
      type : 'GET',
      data : { 'id': id },
      success : function(data){
        location.reload();
      },
      error: function(xhr, errmsn, err){
        console.log("Failure to delete chemistry preset")
      }
    });
  });

  /****************************************************************************/

  $('#addNonChemPreset').off().on('click', function(event){
    event.preventDefault();
    event.stopImmediatePropagation();
    $('.tooltipped').tooltip('disable');
    $.ajax({
      url : '/save-non-chem-preset/',
      type : 'GET',
      success : function(data){
        $('#page_modal_content').html(data);
        $('#page_modal').modal('open');
        console.log("in ajax");
      },
      error : function(xhr, errmsn, err){
        console.log("Failure to load new non-chemistry preset form")
      }
    });
  });

  $('.editNonChemPreset').off().on('click', function(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    var id = $(this).parent().parent().attr('id');
    console.log(id);
    $.ajax({
      url : '/save-non-chem-preset/',
      type : 'GET',
      data : { 'id': id },
      success : function(data){
          $('#page_modal_content').html(data);
          $('#page_modal').modal('open');
        console.log("in ajax")
      },
      error: function(xhr, errmsn, err){
        console.log("Failure to load non-chemistry preset edit form")
      }
    });
  });

  $('#submitNonChemPreset').off().on('click', function(event){
    console.log("clicked");
    event.preventDefault();
    event.stopImmediatePropagation();
    console.log("submit function");
    $.ajax({
      url : '/save-non-chem-preset/',
      type : 'POST',
      data: $('#NonChemPresetForm').serialize(),
      success: function(data){
        $('#page_modal_content').html(data);
        console.log($('#page_modal_content').find('.error').html());
        if ($('#page_modal_content').find('.error').html() == undefined){
          /*There are no errors, so it is safe to close the modal*/
          $('#page_modal').modal('close');
          location.reload();
        };
      },
      error : function(xhr, errmsn, err){
        console.log("Could not save non-chemistry preset")
      }
    });
  });

  $('.deleteNonChemPreset').off().on('click', function(event){
    event.preventDefault();
    event.stopImmediatePropagation();
    var id = $(this).parent().parent().attr('id');
    $.ajax({
      url : '/delete-non-chem-preset/',
      type : 'GET',
      data : { 'id': id },
      success : function(data){
        location.reload();
      },
      error: function(xhr, errmsn, err){
        console.log("Failure to delete non-chemistry preset")
      }
    });
  });

  /****************************************************************************/

  $('#addSpeedtype').off().on('click', function(event){
    event.preventDefault();
    event.stopImmediatePropagation();
    $('.tooltipped').tooltip('disable');
    $.ajax({
      url : '/add-speedtype/',
      type : 'GET',
      success : function(data){
          $('#page_modal_content').html(data);
          $('#page_modal').modal('open');
        console.log("in ajax");
      },
      error: function(xhr, errmsn, err){
        console.log("Failure to load new speedtype form")
      }
    });
  });

  $('#addSpeedtypeWithin').off().on('click', function(event){
    event.preventDefault();
    event.stopImmediatePropagation();
    $('.tooltipped').tooltip('disable');
    var preset_title = $("#id_preset_title").val();
    var preset_users = $("#id_users").val();
    var preset_subclass = $("#id_subclass").val();
    var dat = {'preset_title':preset_title, 'preset_users':preset_users,
               'preset_subclass':preset_subclass};
    console.log(dat);
    $.ajax({
      url : '/add-speedtype-within/',
      type : 'GET',
      data: dat,
      success : function(data){
          $('#secondary_modal_content').html(data);
          $('#secondary_modal').modal('open');
        console.log("in ajax");
      },
      error: function(xhr, errmsn, err){
        console.log("Failure to load new speedtype form")
      }
    });
  });

  $('.editSpeedtype').off().on('click', function(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    var id = $(this).parent().parent().attr('id');
    console.log(id);
    $.ajax({
      url : '/edit-speedtype/',
      type : 'GET',
      data : { 'id': id },
      success : function(data){
          $('#page_modal_content').html(data);
          $('#page_modal').modal('open');
        console.log("in ajax")
      },
      error: function(xhr, errmsn, err){
        console.log("Failure to load speedtype edit form")
      }
    });
  });

  $('#submitSpeedtype').off().on('click', function(event){
    console.log("clicked");
    event.preventDefault();
    event.stopImmediatePropagation();
    console.log("submit function");
    $.ajax({
      url : '/add-speedtype/',
      type : 'POST',
      data: $('#SpeedtypeForm').serialize(),
      success: function(data){
        $('#page_modal_content').html(data);
        console.log($('#page_modal_content').find('.error').html());
        if ($('#page_modal_content').find('.error').html() == undefined){
          /*There are no errors, so it is safe to close the modal*/
          $('#page_modal').modal('close');
          location.reload();
        };
      },
      error : function(xhr, errmsn, err){
        console.log("Could not add speedtype")
      }
    });
  });

  $('#submitSpeedtypeWithin').off().on('click', function(event){
    console.log("clicked");
    event.preventDefault();
    event.stopImmediatePropagation();
    console.log("submit function");
    $.ajax({
      url : '/add-speedtype-within/',
      type : 'POST',
      data: $('#SpeedtypeForm').serialize(),
      success: function(data){
        $('#secondary_modal_content').html(data);
        console.log($('#secondary_modal_content').find('.error').html());
        if ($('#secondary_modal_content').find('.error').html() == undefined){
          /*There are no errors, so it is safe to close the modal*/
          /* re-call addChemPreset */
          console.log("Before chem modal")
          $.ajax({
            url : '/save-chem-preset/',
            type : 'GET',
            success : function(data){
                $('#page_modal_content').html(data);
              console.log("in ajax");
            },
            error: function(xhr, errmsn, err){
              console.log("Failure to load new chemistry preset form")
            }
          });
          console.log("Left chem modal")
          $('#secondary_modal').modal('close');
        }
      },
      error : function(xhr, errmsn, err){
        console.log("Could not add speedtype")
      }
    });
  });

  $('#submitSpeedtypeEdit').off().on('click', function(event){
    console.log("clicked");
    event.preventDefault();
    event.stopImmediatePropagation();
    console.log("submit function");
    $.ajax({
      url : '/edit-speedtype/',
      type : 'POST',
      data: $('#SpeedtypeForm').serialize(),
      success: function(data){
        $('#page_modal_content').html(data);
        console.log($('#page_modal_content').find('.error').html());
        if ($('#page_modal_content').find('.error').html() == undefined){
          /*There are no errors, so it is safe to close the modal*/
          $('#page_modal').modal('close');
          location.reload();
        };
      },
      error : function(xhr, errmsn, err){
        console.log("Could not edit speedtype")
      }
    });
  });

  $('.deleteSpeedtype').off().on('click', function(event){
    event.preventDefault();
    event.stopImmediatePropagation();
    var id = $(this).parent().parent().attr('id');
    $.ajax({
      url : '/delete-speedtype/',
      type : 'GET',
      data : { 'id': id },
      success : function(data){
        location.reload();
      },
      error: function(xhr, errmsn, err){
        console.log("Failure to delete speedtype")
      }
    });
  });

  /****************************************************************************/

  $('#addSubclass').off().on('click', function(event){
    event.preventDefault();
    event.stopImmediatePropagation();
    $('.tooltipped').tooltip('disable');
    $.ajax({
      url : '/add-subclass/',
      type : 'GET',
      success : function(data){
          $('#page_modal_content').html(data);
          $('#page_modal').modal('open');
        console.log("in ajax");
      },
      error: function(xhr, errmsn, err){
        console.log("Failure to load new subclass form")
      }
    });
  });

  $('#addSubclassWithin').off().on('click', function(event){
    event.preventDefault();
    event.stopImmediatePropagation();
    $('.tooltipped').tooltip('disable');
    var preset_title = $("#id_preset_title").val();
    var preset_users = $("#id_users").val();
    var preset_speedtype = $("#id_speedtype").val();
    var dat = {'preset_title':preset_title, 'preset_users':preset_users,
               'preset_speedtype':preset_speedtype};
    console.log(dat);
    $.ajax({
      url : '/add-subclass-within/',
      type : 'GET',
      data: dat,
      success : function(data){
          $('#secondary_modal_content').html(data);
          $('#secondary_modal').modal('open');
        console.log("in ajax");
      },
      error: function(xhr, errmsn, err){
        console.log("Failure to load new subclass form")
      }
    });
  });

  $('.editSubclass').off().on('click', function(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    var id = $(this).parent().parent().attr('id');
    console.log(id);
    $.ajax({
      url : '/edit-subclass/',
      type : 'GET',
      data : { 'id': id },
      success : function(data){
          $('#page_modal_content').html(data);
          $('#page_modal').modal('open');
        console.log("in ajax")
      },
      error: function(xhr, errmsn, err){
        console.log("Failure to load subclass edit form")
      }
    });
  });

  $('#submitSubclass').off().on('click', function(event){
    console.log("clicked");
    event.preventDefault();
    event.stopImmediatePropagation();
    console.log("submit function");
    $.ajax({
      url : '/add-subclass/',
      type : 'POST',
      data: $('#SubclassForm').serialize(),
      success: function(data){
        $('#page_modal_content').html(data);
        console.log($('#page_modal_content').find('.error').html());
        if ($('#page_modal_content').find('.error').html() == undefined){
          /*There are no errors, so it is safe to close the modal*/
          $('#page_modal').modal('close');
          location.reload();
        };
      },
      error : function(xhr, errmsn, err){
        console.log("Could not add subclass")
      }
    });
  });

  $('#submitSubclassWithin').off().on('click', function(event){
    console.log("clicked");
    event.preventDefault();
    event.stopImmediatePropagation();
    console.log("submit function");
    $.ajax({
      url : '/add-subclass-within/',
      type : 'POST',
      data: $('#SubclassForm').serialize(),
      success: function(data){
        $('#secondary_modal_content').html(data);
        console.log($('#secondary_modal_content').find('.error').html());
        if ($('#secondary_modal_content').find('.error').html() == undefined){
          /*There are no errors, so it is safe to close the modal*/
          /* re-call addChemPreset */
          $.ajax({
            url : '/save-chem-preset/',
            type : 'GET',
            success : function(data){
                $('#page_modal_content').html(data);
              console.log("in ajax");
            },
            error: function(xhr, errmsn, err){
              console.log("Failure to load new chemistry preset form")
            }
          });

          $('#secondary_modal').modal('close');
        };
      },
      error : function(xhr, errmsn, err){
        console.log("Could not add subclass")
      }
    });
  });

  $('#submitSubclassEdit').off().on('click', function(event){
    console.log("clicked");
    event.preventDefault();
    event.stopImmediatePropagation();
    console.log("submit function");
    $.ajax({
      url : '/edit-subclass/',
      type : 'POST',
      data: $('#SubclassForm').serialize(),
      success: function(data){
        $('#page_modal_content').html(data);
        console.log($('#page_modal_content').find('.error').html());
        if ($('#page_modal_content').find('.error').html() == undefined){
          /*There are no errors, so it is safe to close the modal*/
          $('#page_modal').modal('close');
          location.reload();
        };
      },
      error : function(xhr, errmsn, err){
        console.log("Could not edit subclass")
      }
    });
  });

  $('.deleteSubclass').off().on('click', function(event){
    event.preventDefault();
    event.stopImmediatePropagation();
    var id = $(this).parent().parent().attr('id');
    $.ajax({
      url : '/delete-subclass/',
      type : 'GET',
      data : { 'id': id },
      success : function(data){
        location.reload();
      },
      error: function(xhr, errmsn, err){
        console.log("Failure to delete subclass")
      }
    });
  });

  /****************************************************************************/

  $('#addAccount').off().on('click', function(event){
    event.preventDefault();
    event.stopImmediatePropagation();
    $('.tooltipped').tooltip('disable');
    $.ajax({
      url : '/save-account/',
      type : 'GET',
      success : function(data){
          $('#page_modal_content').html(data);
          $('#page_modal').modal('open');
        console.log("in ajax");
      },
      error: function(xhr, errmsn, err){
        console.log("Failure to load new account form")
      }
    });
  });

  $('.editAccount').off().on('click', function(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    var id = $(this).parent().parent().attr('id');
    console.log(id);
    $.ajax({
      url : '/save-account/',
      type : 'GET',
      data : { 'id': id },
      success : function(data){
          $('#page_modal_content').html(data);
          $('#page_modal').modal('open');
        console.log("in ajax")
      },
      error: function(xhr, errmsn, err){
        console.log("Failure to load account edit form")
      }
    });
  });

  $('#submitAccount').off().on('click', function(event){
    console.log("clicked");
    event.preventDefault();
    event.stopImmediatePropagation();
    console.log("submit function");
    $.ajax({
      url : '/save-account/',
      type : 'POST',
      data: $('#AccountForm').serialize(),
      success: function(data){
        $('#page_modal_content').html(data);
        console.log($('#page_modal_content').find('.error').html());
        if ($('#page_modal_content').find('.error').html() == undefined){
          /*There are no errors, so it is safe to close the modal*/
          $('#page_modal').modal('close');
          location.reload();
        };
      },
      error : function(xhr, errmsn, err){
        console.log("Could not save account")
      }
    });
  });

  $('.deleteAccount').off().on('click', function(event){
    event.preventDefault();
    event.stopImmediatePropagation();
    var id = $(this).parent().parent().attr('id');
    $.ajax({
      url : '/delete-account/',
      type : 'GET',
      data : { 'id': id },
      success : function(data){
        location.reload();
      },
      error: function(xhr, errmsn, err){
        console.log("Failure to delete account")
      }
    });
  });

  /****************************************************************************/

  $('#addDepartment').off().on('click', function(event){
    event.preventDefault();
    event.stopImmediatePropagation();
    $('.tooltipped').tooltip('disable');
    $.ajax({
      url : '/add-department/',
      type : 'GET',
      success : function(data){
          $('#page_modal_content').html(data);
          $('#page_modal').modal('open');
        console.log("in ajax");
      },
      error: function(xhr, errmsn, err){
        console.log("Failure to load new department form")
      }
    });
  });

  $('#addDepartmentWithin').off().on('click', function(event){
    event.preventDefault();
    event.stopImmediatePropagation();
    $('.tooltipped').tooltip('disable');
    var preset_title = $("#id_title").val();
    var preset_address1 = $("#id_address1").val();
    var preset_address2 = $("#id_address2").val();
    var preset_city = $("#id_city").val();
    var preset_state = $("#id_state").val();
    var preset_zipcode = $("#id_zipcode").val();
    var preset_phone = $("#id_customer_phone").val();
    var dat = {'preset_title':preset_title,
               'preset_address1':preset_address1, 'preset_address2':preset_address2,
               'preset_city':preset_city, 'preset_state':preset_state,
               'preset_zipcode':preset_zipcode,'preset_phone':preset_phone};
    $.ajax({
      url : '/add-department-within/',
      type : 'GET',
      data: dat,
      success : function(data){
          $('#secondary_modal_content').html(data);
          $('#secondary_modal').modal('open');
        console.log("in ajax");
        console.log(dat);
      },
      error: function(xhr, errmsn, err){
        console.log("Failure to load new department form")
      }
    });
  });

  $('.editDepartment').off().on('click', function(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    var id = $(this).parent().parent().attr('id');
    console.log(id);
    $.ajax({
      url : '/edit-department/',
      type : 'GET',
      data : { 'id': id },
      success : function(data){
          $('#page_modal_content').html(data);
          $('#page_modal').modal('open');
        console.log("in ajax")
      },
      error: function(xhr, errmsn, err){
        console.log("Failure to load department edit form")
      }
    });
  });

  $('#submitDepartment').off().on('click', function(event){
    console.log("clicked");
    event.preventDefault();
    event.stopImmediatePropagation();
    console.log("submit function");
    $.ajax({
      url : '/add-department/',
      type : 'POST',
      data: $('#DepartmentForm').serialize(),
      success: function(data){
        $('#page_modal_content').html(data);
        console.log($('#page_modal_content').find('.error').html());
        if ($('#page_modal_content').find('.error').html() == undefined){
          /*There are no errors, so it is safe to close the modal*/
          $('#page_modal').modal('close');
          location.reload();
        };
      },
      error : function(xhr, errmsn, err){
        console.log("Could not save department")
      }
    });
  });

  $('#submitDepartmentWithin').off().on('click', function(event){
    console.log("clicked");
    event.preventDefault();
    event.stopImmediatePropagation();
    console.log("submit function");
    $.ajax({
      url : '/add-department-within/',
      type : 'POST',
      data: $('#DepartmentForm').serialize(),
      success: function(data){
        $('#secondary_modal_content').html(data);
        console.log($('#secondary_modal_content').find('.error').html());
        if ($('#secondary_modal_content').find('.error').html() == undefined){
          /*There are no errors, so it is safe to close the modal*/
          /* re-call addNonChemPreset */
          console.log("Before chem modal");
          $.ajax({
            url : '/save-non-chem-preset/',
            type : 'GET',
            success : function(data){
                $('#page_modal_content').html(data);
              console.log("in ajax");
            },
            error: function(xhr, errmsn, err){
              console.log("Failure to load new chemistry preset form")
            }
          });
          console.log("After chem modal");
          $('#secondary_modal').modal('close');
        };
      },
      error : function(xhr, errmsn, err){
        console.log("Could not save department")
      }
    });
  });

  $('#submitDepartmentEdit').off().on('click', function(event){
    console.log("clicked");
    event.preventDefault();
    event.stopImmediatePropagation();
    console.log("submit function");
    $.ajax({
      url : '/edit-department/',
      type : 'POST',
      data: $('#DepartmentForm').serialize(),
      success: function(data){
        $('#page_modal_content').html(data);
        console.log($('#page_modal_content').find('.error').html());
        if ($('#page_modal_content').find('.error').html() == undefined){
          /*There are no errors, so it is safe to close the modal*/
          $('#page_modal').modal('close');
          location.reload();
        };
      },
      error : function(xhr, errmsn, err){
        console.log("Could not edit department")
      }
    });
  });

  $('.deleteDepartment').off().on('click', function(event){
    event.preventDefault();
    event.stopImmediatePropagation();
    var id = $(this).parent().parent().attr('id');
    $.ajax({
      url : '/delete-department/',
      type : 'GET',
      data : { 'id': id },
      success : function(data){
        location.reload();
      },
      error: function(xhr, errmsn, err){
        console.log("Failure to delete department")
      }
    });
  });

  /****************************************************************************/

  $('#addCompany').off().on('click', function(event){
    event.preventDefault();
    event.stopImmediatePropagation();
    $('.tooltipped').tooltip('disable');
    $.ajax({
      url : '/save-company/',
      type : 'GET',
      success : function(data){
          $('#page_modal_content').html(data);
          $('#page_modal').modal('open');
        console.log("in ajax");
      },
      error: function(xhr, errmsn, err){
        console.log("Failure to load new company form")
      }
    });
  });

  $('.editCompany').off().on('click', function(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    var id = $(this).parent().parent().attr('id');
    console.log(id);
    $.ajax({
      url : '/save-company/',
      type : 'GET',
      data : { 'id': id },
      success : function(data){
          $('#page_modal_content').html(data);
          $('#page_modal').modal('open');
        console.log("in ajax")
      },
      error: function(xhr, errmsn, err){
        console.log("Failure to load company edit form")
      }
    });
  });

  $('#submitCompany').off().on('click', function(event){
    console.log("clicked");
    event.preventDefault();
    event.stopImmediatePropagation();
    var id = $(this).parent().attr('id');
    console.log("submit function");
    $.ajax({
      url : '/save-company/',
      type : 'POST',
      data: $('#CreateSupplierForm').serialize() + '&id='+id,
      success: function(data){
        $('#page_modal_content').html(data);
        console.log($('#page_modal_content').find('.error').html());
        if ($('#page_modal_content').find('.error').html() == undefined){
          /*There are no errors, so it is safe to close the modal*/
          $('#page_modal').modal('close');
          location.reload();
        };
      },
      error : function(xhr, errmsn, err){
        console.log("Could not save company")
      }
    });
  });

  $('.deleteCompany').off().on('click', function(event){
    event.preventDefault();
    event.stopImmediatePropagation();
    var id = $(this).parent().parent().attr('id');
    $.ajax({
      url : '/delete-company/',
      type : 'GET',
      data : { 'id': id },
      success : function(data){
        location.reload();
      },
      error: function(xhr, errmsn, err){
        console.log("Failure to delete company")
      }
    });
  });

  /****************************************************************************/

  $('#addLocation').off().on('click', function(event){
    console.log("clicked");
    event.preventDefault();
    event.stopImmediatePropagation();
    $('.tooltipped').tooltip('disable');
    $.ajax({
      url : '/save-location/',
      type : 'GET',
      success : function(data){
          $('#page_modal_content').html(data);
          $('#page_modal').modal('open');
        console.log("in ajax");
      },
      error: function(xhr, errmsn, err){
        console.log("Failure to load new location form")
      }
    });
  });

  $('.editLocation').off().on('click', function(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    var id = $(this).parent().parent().attr('id');
    console.log(id);
    $.ajax({
      url : '/save-location/',
      type : 'GET',
      data : { 'id': id },
      success : function(data){
          $('#page_modal_content').html(data);
          $('#page_modal').modal('open');
        console.log("in ajax")
      },
      error: function(xhr, errmsn, err){
        console.log("Failure to load location edit form")
      }
    });
  });

  $('#submitLocation').off().on('click', function(event){
    console.log("clicked");
    event.preventDefault();
    event.stopImmediatePropagation();
    console.log("submit function");
    $.ajax({
      url : '/save-location/',
      type : 'POST',
      data: $('#AddLocationForm').serialize(),
      success: function(data){
        $('#page_modal_content').html(data);
        console.log($('#page_modal_content').find('.error').html());
        if ($('#page_modal_content').find('.error').html() == undefined){
          /*There are no errors, so it is safe to close the modal*/
          $('#page_modal').modal('close');
          location.reload();
        };
      },
      error : function(xhr, errmsn, err){
        console.log("Could not save location")
      }
    });
  });

  $('.deleteLocation').off().on('click', function(event){
    event.preventDefault();
    event.stopImmediatePropagation();
    var id = $(this).parent().parent().attr('id');
    $.ajax({
      url : '/delete-location/',
      type : 'GET',
      data : { 'id': id },
      success : function(data){
        location.reload();
      },
      error: function(xhr, errmsn, err){
        console.log("Failure to delete location")
      }
    });
  });

  /****************************************************************************/

$('.tooltipped').tooltip('enable');
});
