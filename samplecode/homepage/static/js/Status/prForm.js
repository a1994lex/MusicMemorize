function getNextTableElem(elem){
  let parent = elem.parentNode;
  let nextElem = parent.nextElementSibling;
  var storageElem = nextElem.firstChild;
  return storageElem;
}

function setReceivedData(date, quantity, id){
  qNeeded = document.getElementById('id_item_set-'+id+'-quantity').value;
  defaultDate = document.getElementById('default_date').value
  date.value = defaultDate;
  quantity.value = qNeeded;
}

$(document).ready(function(){
  $('.tooltipped').tooltip('enable');
  $('.collapsible').collapsible();

  $('input[type=checkbox]').each(function() {
    dateElem = getNextTableElem(this);
    if (dateElem.type == "text"){
      this.checked = true;
    }
  });

  if (document.getElementById('showErrorModal')) {
    $.ajax({
      url:'/pr-view-error/',
      type: 'GET',
      success: function(data){
        $('#page_modal_content').html(data);
        $('#page_modal').modal('open');
      },
      error : function(xhr, errmsn, err){
        console.log("Form wasn't created")
      }
    });
  }


  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year
    close: 'Enter'
  });

  var stat = document.getElementById('statForm'),
      rows = stat.getElementsByClassName('layout-row row'),
      labels = ['Verify Now', "Send Now", "Order Now"],
      values = ['verify', 'send', 'order'],
      editable = $("#editable").attr('value');

  // Insert buttons along side each row on the Order Status card, buttons are
  // only visible to admin
  if (editable=="True"){
    document.getElementById("default_date").valueAsDate = new Date()
    for (var i=0; i<3;i++){
      var html = '<div class="col m4">'+
      '<button class="btn" id="'+values[i]+'">'+
      labels[i] +
      '</button>' +
      '</div>';
      $(html).insertAfter(rows[i+1].firstChild);
    }
  }

  $('#savePF').on('click', function(event){
    console.log("CLICKED");
    event.preventDefault();
    event.stopImmediatePropagation();
    $.ajax({
      url : '/save-transaction/',
      type : 'POST',
      data : $('#numForm').serialize(),
      success : function(data){
        $('#transaction').html(data);
      },
      error : function(data){
        console.log("Error submitting form");
      }
    });
  });

  $('#receive').on('click', function(event){

    event.preventDefault();
    event.stopImmediatePropagation();
    $.ajax({
      url : '/ajax-receive-status/',
      type : 'POST',
      data : $('#statForm').serialize(),
      success : function(data){
        $('#statDiv').html(data);
      },
      error : function(xhr, errmsn, err){
        console.log("Couldn't submit information");
      }
    });
  });

  $('#send').on('click', function(event){

    event.preventDefault();
    event.stopImmediatePropagation();
    $.ajax({
      url : '/ajax-send-status/',
      type : 'POST',
      data : $('#statForm').serialize(),
      success : function(data){
        $('#statDiv').html(data);
      },
      error : function(xhr, errmsn, err){
        console.log("Couldn't submit information");
      }
    });
  });

  $('#order').on('click', function(event){

    event.preventDefault();
    event.stopImmediatePropagation();
    $.ajax({
      url : '/ajax-order-status/',
      type : 'POST',
      data : $('#statForm').serialize(),
      success : function(data){
        $('#statDiv').html(data);
        $.ajax({
          url : '/receive-items/',
          type : 'GET',
          data : $('#receiveItemsForm').serialize(),
          success : function(data){
            $('#receiveItemsDiv').html(data);
          }
        });
      },
      error : function(xhr, errmsn, err){
        console.log("Couldn't submit information");
      }
    });
  });

  $('.markItem').on('click', function(event){
    var element = event.target,
        dateElem = getNextTableElem(element),
        quanElem = getNextTableElem(dateElem),
        saveElem = document.getElementById('saveItemChanges');

    saveElem.style.display = "block";


    if (event.currentTarget.checked){
      dateElem.type="text";
      quanElem.type="text";
      var id = parseInt(dateElem.id.replace(/[^0-9\.]/g, ''), 10);
      setReceivedData(dateElem, quanElem, id);
    }
    else {
      dateElem.type="hidden";
      quanElem.type="hidden";
      dateElem.value="";
      quanElem.value="";
    }

    $('#saveItemChanges').on('click', function(event){
      $.ajax({
        url : '/receive-items/',
        type : 'POST',
        data : $('#receiveItemsForm').serialize(),
        success : function(data){
          $('#receiveItemsDiv').html(data);
          $.ajax({
            url : '/ajax-order-status/',
            type : 'POST',
            data : $('#statForm').serialize(),
            success : function(data){
              $('#statDiv').html(data);
            },
            error : function(xhr, errmsn, err){
              console.log("Couldn't submit information");
            }
          });
        }
      });
    });


  });




















});
