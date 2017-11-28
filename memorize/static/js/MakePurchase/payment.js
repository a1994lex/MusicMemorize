const PREFIX = "id_payment_set-";
/* Changes the display of the form depending on the current payment method selected */
function changePayOption(idInt, curOption){
  var approvalPerson = document.getElementById(PREFIX+idInt+"-approval_person_container");
  var account = document.getElementById(PREFIX+idInt+"-account_container");
  // The first method is represented by '0' and it means that the user will pay
  if (curOption === 'Request'){
    approvalPerson.style.display = "initial";
    account.style.display = "none";
  }
  // The second method is represented by '1' and it means that another user will pay
  else {
    approvalPerson.style.display = "none";
    account.style.display = "initial";
  }
}

/* When given a select-dropdown element, this function returns the selected value */
function getCurOption(selectDropdownElem){
  return selectDropdownElem.options[selectDropdownElem.selectedIndex].value;
}

function setAutomaticCost(id){
  if ($("#ajaxPayBody").length ==0){
    var val = document.getElementById(PREFIX+id+"-amount")
    var label= val.nextElementSibling;
    label.click();
    var costDue = document.getElementById("Total").innerHTML;
    val.value = costDue;
  }
}


function initPayMethod(curIndex){
    var methodElem = document.getElementById(PREFIX+curIndex+"-payment_method");
    changePayOption(curIndex, getCurOption(methodElem));
    // Set a method change listener for the form being added
    $("#"+PREFIX+curIndex+"-payment_method").change(function(){
      changePayOption(curIndex, getCurOption(this));
    });
}


// ****************************************************************************
// ****************************************************************************
const ID = "formsetId";
$( document ).ready(function(){
  jQuery(function($) {
    $("#formset").formset({
      animateForms:true
    });
  });
  // initialize();
  var init = 0;
  var hiddenIndex = null;

  /* This is called every time a user adds a payment form */
  $('#formset').on('formAdded', function(event) {

    // Makes it possible for the dropdowns to show up
    $('select').material_select();

    // Find the index of the current form being added
    var curIndex = getCurIndex(ID);


    if ((init === 0) && (curIndex != 0)){
      for (i=curIndex-1; i>=0; i--){
        initPayMethod(i);
      }
    }
    /*When the initial payment form is created, we want to automatically charge
    the total cost to that payment and hide the delete button*/
    if (numForms(ID) === 1){
      // set an automatic amount for the first form
      setAutomaticCost(getNextVisibleFormId('formsetId')[0]);
      // hide the delete button

      hideDelBtn(curIndex, ID, PREFIX);
      hiddenIndex = curIndex;
    }
    else if (hiddenIndex!=null){
      //if there is a hidden index (i)
      showDelBtn(hiddenIndex, ID, PREFIX);
    }

    // Initialize visible payment method
    initPayMethod(curIndex);
    init += 1;


    // Set an listener for any amount change
    $('#'+PREFIX+curIndex+"-amount").focusout(function(){
        updateBalance(ID, PREFIX);
    });

    //Updates the user's payment balance on screen
    updateBalance(ID, PREFIX);

  });

  $('#formset').on('formDeleted', function(event){
    var formID = getNextVisibleFormId(ID);
    var id = null;
    if (formID){
      id=formID[0];
    }

    if (numForms(ID) === 1 && id!==null){

      setAutomaticCost(id);
      //hide the delete button
      hideDelBtn(id, ID, PREFIX);
      hiddenIndex = id;
    }
    updateBalance(ID, PREFIX);
  });


  $('#paymentSubmit').on('click', function(){
    event.preventDefault();
    event.stopImmediatePropagation();

    $.ajax({
      url:'/ajax-payment/',
      type: 'POST',
      data: $('#paymentForms').serialize(),
      success: function(data){
        $('#paymentBody').html(data);
        // If there are no errors, payment is loaded into the main div

        if (!formsetErrors('#ajaxPayBody', 'formsetId'))
          {
            $.ajax({
              url:'/review/',
              type: 'GET',
              success: function(data){
                $('#payment').removeClass('active');
                $('#reviewTab').removeClass('disabled');
                $('#review').addClass('active');
                $('#reviewBody').html(data);
                $('ul.tabs').tabs('select_tab','review');
                $('#paymentTab').addClass('grey lighten-2');
              },
              error: function(xhr, errmsg, err){
                console.log("Failure to load Item Detail page");
              }
            });
        }
      },
      error : function(xhr, errmsn, err){
        console.log("Form wasn't submitted");
      }
    });
  });
});
