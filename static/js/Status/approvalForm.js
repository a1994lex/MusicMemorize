function nthChildElement(elem, n){
  if (elem==undefined){
    return undefined;
  }
  children = elem.children
  return children[n-1]
}

function getTargets(event){
  var formTarget = event.currentTarget.parentNode.parentNode.parentNode,
      targetDiv = formTarget.parentNode,
      payment_id = $(targetDiv).prev().attr('id');
  return [formTarget, payment_id, targetDiv];
}

function disableButtons(parent){
    for (child of parent.children){
      $(child).addClas('disabled');
    }
}
function check_redirect(){
  if (document.getElementById('submitted')){
    console.log("SUBMITTED!!!!!");
    window.location.href = '';
  }
}
$(document).ready(function(){
  if (document.getElementById('msg')){
    Materialize.toast('Payment has been approved!', 1500)
  }



  payments = document.getElementsByClassName('pmntId');

  $('select').material_select();
  $('.modal').modal({
      dismissible: false,
  });

  if (payments.length>1){
    var id = 0;
    for (payment of payments){
      newFormId = "form-id-"+id;
      newDivId = "form-div-id-"+id;
      formDiv = payment.parentNode.parentNode.parentNode.parentNode;
      $(formDiv).attr('id', newFormId);
      $(formDiv.parentNode).attr('id',newDivId);
      id = id+1;
      $(payment).html(id);
    }
  }

  $('.approve').on('click', function(event){
    var targets = getTargets(event);
    // targets[0] is the form targeted for this ajax
    // targets[1] is the id of the model related to the target form
    // targets[2] is the html div in which the processed ajax data will be sent
    event.preventDefault();
    event.stopImmediatePropagation();

    $.ajax({
      url:'/ajax-approval-status/',
      type: 'POST',
      data: $(targets[0]).serialize() + "&payment_id=" + targets[1],
      success: function(data){
        $(targets[2]).html(data);
        check_redirect();
      },
      error : function(xhr, errmsn, err){
        console.log("Form wasn't created")
      }
    });
  });

  $('.split').on('click', function(event){
    var targets = getTargets(event);
    event.preventDefault();
    event.stopImmediatePropagation();
    $.ajax({
      url:'/split-payment/'+targets[1] +'/',
      type: 'GET',
      success: function(data){
        $('#split_payment_modal_content').html(data);
        $('#split_payment_modal').modal('open');
      },
      error : function(xhr, errmsn, err){
        console.log("Form wasn't created")
      }
    });
  });

  $('#paymentSplit').on('click', function(event){
    event.preventDefault();
    event.stopImmediatePropagation();
    id = $('#payment_id').attr('value');
    $.ajax({
      url:'/ajax-split-payment/'+id +'/',
      type: 'POST',
      data: $('#paymentForms').serialize(),
      success: function(data){
        $('#payBody').html(data)
        if (!formsetErrors('#payBody', 'formsetId')){
            $('#page_modal').modal('close');
            location.reload()
          }
      },
      error : function(xhr, errmsn, err){
        console.log("Form wasn't created")
      }
    });
  });

  $('.deny').on('click', function(event){
    event.preventDefault();
    event.stopImmediatePropagation();
    var targets = getTargets(event);
    if ($(event.currentTarget).hasClass('post')){
      $.ajax({
        url:'/deny-approval/',
        type: 'POST',
        data: $(targets[0]).serialize() + "&payment_id=" + targets[1],
        success: function(data){
          location.reload();
        },
        error : function(xhr, errmsn, err){
          console.log("Form wasn't created")
        }
      });
    }
    else if ($(event.currentTarget).hasClass('cancel')){
      $.ajax({
        url:'/ajax-approval-status/',
        type: 'GET',
        data: $(targets[0]).serialize() + "&payment_id=" + targets[1],
        success: function(data){
          location.reload();
        },
        error : function(xhr, errmsn, err){
          console.log("Form wasn't created")
        }
      });
    }
    else{
      $.ajax({
        url:'/deny-approval/',
        type: 'GET',
        data: $(targets[0]).serialize() + "&payment_id=" + targets[1],
        success: function(data){
          $(targets[2]).html(data);
        },
        error : function(xhr, errmsn, err){
          console.log("Form wasn't created");
        }
      });
    }
  });

  $('.forward').on('click', function(event){
    event.preventDefault();
    event.stopImmediatePropagation();
    var targets = getTargets(event);
    $.ajax({
      url:'/forward-approval/'+targets[1] + '/',
      type: 'GET',
      data: $(targets[0]).serialize(),
      success: function(data){
        $('#page_modal_content').html(data);
        $('#page_modal').modal('open');
      },
      error: function(xhr, errmsn, err){
        console.log("Form wasn't created");
      }
    });
  });

  $('#forwardBtn').on('click', function(event){
    var payment_id = event.currentTarget.value;
    event.preventDefault();
    event.stopImmediatePropagation();
    $.ajax({
      url:'/forward-approval/' + payment_id +'/',
      type: 'POST',
      data: $('#forwardForm').serialize(),
      success: function(data){
        location.reload();
      },
      error: function(xhr, errmsn, err){
        console.log("Form wasn't submitted");
      }
    });
  });
});
