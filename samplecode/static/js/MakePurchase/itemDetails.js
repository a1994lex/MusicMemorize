const PREFIX = "id_item_set-";
/* This function is only used to shift the element of focus from the unit field
element to the total element found in a <small></small> tag */
function getTotalElement(element){
  var inbetween = element.nextElementSibling;
  return inbetween.nextElementSibling;
}

/* When given an element in a table, it gives the element in the next column
over, it is typically used to access the storage field from the chemical field */
function getNextTableElem(elem){
  let parent = elem.parentNode;
  let nextElem = parent.nextElementSibling;
  var storageElem = nextElem.firstChild.nextSibling;
  return storageElem;
}

/* There is an item total for each form in the formset. When given a formset id
for a given item, this function determines it's total by multiplying it's
quantity and unit price. */
function getItemTotal(id){
  //Find the id's for the fields we need
  let unitID = PREFIX+id+"-unit_cost";
  let quantityID = PREFIX+id+"-quantity";

  //Access the elements through their id's
  var uElem = document.getElementById(unitID);
  var qElem = document.getElementById(quantityID);

  // Return the product of the element's values
  return (uElem.value*qElem.value).toFixed(2);
}

/* For the template, there is a subtotal value, or the totals of all the items
plus any additional costs like hazardous fees and shipping fees. This function
updates that value in the template */
function updateTotal(){
  // Start with a total set to 0
  var total= 0;
  // Parse through all the 'total' values for each item and add them together
  var allItems = document.getElementsByClassName('item_total_cost');
  for(item of allItems){
    var toAdd = parseFloat(item.innerText.slice(1));
    total = (total+toAdd);
  }
  // Access additional fees by id
  var handleStr = document.getElementById('id_handling').value;
  var hazardStr = document.getElementById('id_hazardous').value;
  // If the fee's are not empty strings, add them to the total
  if (handleStr!=""){
    var handleCost = parseFloat(handleStr);
    total = (total+handleCost);
  }
  if (hazardStr!=""){
    var hazardCost = parseFloat(hazardStr);
    total = (total+hazardCost);
  }
  // Set the subtotal element's inner HTML to the new calculated total.
  document.getElementById('total_id').innerHTML = '$'+total.toFixed(2);
  valueRex = new RegExp('\\d+');
  $('#total_id').data('total', total)
  var balanceTrigger = null;
  if (!$('#paymentTab').hasClass('disabled')){
    balanceTrigger = 'formsetId';
  }
  updateBalance(balanceTrigger, PREFIX);
}

/* By default the hazardous fee is not visibible on the template.
This function checks if a chemical is being purchased, and either sets the
display as visible or none. If the display is none, than it sets the value of
the element to null */
function setHazFee(){
  var labelElem = document.getElementById("id_hazardous_container");
  if (labelElem != null) {
    if (checkIsChem()){
      labelElem.style.display="initial";
    }
    else {
      labelElem.style.display="none";
      var inputElem = labelElem.firstChild.nextSibling.nextSibling;
      inputElem.value=0;
    }
  }
}

/* This function returns true if there is an item that is a chemical*/
function checkIsChem(){
  var chemicalFieldList = document.getElementsByClassName("chemicalClass");
  var isChem=false;
  for (var item of chemicalFieldList){
    if (item.checked){
      isChem=true;
    }
  }
  return isChem;
}

const ERRORMSG = '<ul class="errorlist">'+
                      '<li>This field is requred.</li>'+
                  '</ul>';

function firstFormErrors(){
 descript=document.getElementById(PREFIX+'0-description');
 price=document.getElementById(PREFIX+'0-unit_cost')
 descriptErrorContainer = descript.nextElementSibling;
 priceErrorContainer = price.nextElementSibling.nextElementSibling.nextElementSibling;
 if (descript.innerHTML =="" && !descriptErrorContainer.hasChildElements) {
    descriptErrorContainer.innerHTML = ERRORMSG;
 }
 if (price.value =="" && !priceErrorContainer.hasChildElements){
    priceErrorContainer.innerHTML = ERRORMSG;
  }
}

function formsetErrors(tag){

  var formset = document.getElementById("item_form_table");
  var body = formset.lastElementChild;

  if ($(tag).find('.errorlist').html() === undefined){
    return false;
  }
  var error = document.getElementsByClassName("errorlist");
  error = error[0];
  var isError= false;
  for (row of body.children){
    if (row.style.display!=="none" && !isError){
      isError = jQuery.contains(row, error);
    }
  }
  return isError;
}

function setClassName(name, elem){
  if (elem.className != name){
    elem.className += name;
  }
}

// ***************************************************************************
/* Beginning of the template */
$( document ).ready(function(){

  /* The following regular expression variables represent different fields in
   the formset that need to be focused on. */
  var chemicalRegex = new RegExp('(id_item_set)-(\\d+)-(is_chemical)')
  var unitRegex = new RegExp('(id_item_set)-(\\d+)-(unit_cost)')
  var quantityRegex = new RegExp('(id_item_set)-(\\d+)-(quantity)')

    /* Due to the table set up in item_detail.html, the checkboxes need to be wired
     to appear in each form. */
  $('input[type=checkbox]').each(function() {
    // Find the checkbox elements, add class in order to set up listener
    var string = this.id;
    if (chemicalRegex.test(string)){
      var d = document.getElementById(this.id),
          room = getNextTableElem(d),
          building = getNextTableElem(room),
          $roomLabel = $('#roomLabel'),
          $buildingLabel = $('#buildingLabel');
      setClassName("chemicalClass", d);
      /* Storage is initially hidden, if by ajax, chemical is clicked and storage
       needs to be visible, we check this. */
      if (d.checked){
        room.type="text";
        building.type="text";
      }
      else {
        $roomLabel.hide();
        $buildingLabel.hide()
      }
    }
    // Make checkbox visible by adding a label element
    if (this.nextSibling == null){
      $(this).after('<label for="'+this.id+'"></label>')
    }
    else if (this.nextSibling.nodeName != 'label' ) {
      $(this).after('<label for="'+this.id+'"></label>')
    }
    setHazFee();
  });

    /* Creates a class for all unit cost and quantity fields in order to set
     up a listener */
    $('input[type=number]').each(function(){
      var string = this.id;
      if (unitRegex.test(string)){
        var d = document.getElementById(this.id);
        setClassName("unitCostClass", d);
      }
      else if (quantityRegex.test(string)) {
        var d = document.getElementById(this.id);
        setClassName("quantityClass", d);
      }
    });

    // Sets a listener for unit cost input
    $('.unitCostClass').focusout(this, function(event){
      var idInt = parseInt(this.id.replace(/[^0-9\.]/g, ''), 10);
          totalNum = getItemTotal(idInt);
          total = getTotalElement(document.getElementById(PREFIX+idInt+"-unit_cost"));
      total.innerHTML = '$'+totalNum;
      updateTotal();
    });

    // Sets a listener for quantity input
    $('.quantityClass').focusout(this, function(event){
      var idInt = parseInt(this.id.replace(/[^0-9\.]/g, ''), 10);
          totalNum = getItemTotal(idInt);
          total = getTotalElement(document.getElementById(PREFIX+idInt+"-unit_cost"));
      total.innerHTML = '$'+totalNum;
      updateTotal();
    });

    // Sets a listener for the shipping and handling fee input
    $('#id_handling').focusout(this, function(event){
      updateTotal();
    });

    // Sets a listener for the hazardous fee input
    $('#id_hazardous').focusout(this, function(event){
      updateTotal();
    });



    /* Sets a listener for all is_chemical checkboxes which
    contain class = chemicalClass */
    $('.chemicalClass').on('click', function(event){
      // console.log($(event.target));
        var element = event.target,
            roomElem = getNextTableElem(element),
            buildingElem = getNextTableElem(roomElem),
            roomLabel = roomElem.nextElementSibling,
            buildingLabel = buildingElem.nextElementSibling,
            roomError = roomLabel.nextElementSibling,
            buildingError = buildingLabel.nextElementSibling;

        if (element.checked){
            roomElem.type="text";
            buildingElem.type="text";

            $(roomLabel).show();
            $(buildingLabel).show();
        }
        else {
          roomElem.type="hidden";
          buildingElem.type="hidden";


          $(roomLabel).hide();
          $(roomError).hide();
          $(buildingLabel).hide();
          $(buildingError).hide();
        }
        setHazFee()
    });

    // Sets up the formset plugin
    $('#item_form_table').formset({
      uiText: {
        addPrompt: '<i class="material-icons">add</i>',
        removePrompt: '<i class="material-icons">clear</i>',
      },
      prefix: "item_set",
      callbacks: {
        /* When a form is deleted, totals are recalculated */
        onRemove: function(row){
          updateTotal();
          for (i=0;i<8;i++){
            var elem = $(row).children()[i];
            var errMsg = elem.getElementsByClassName("errorlist")[0];
            if (errMsg!=null ){
              elem.innerHTML = "";
            }
            // console.log(elem);
          }
        },
      },

    });



  /* Sets up a click listener for the unit button, which calls ajax to
   put displayUnits.html in a modal so user can see possible units for the form */
  $('#unitListAccess').on('click', function(event){
    event.preventDefault();
    event.stopImmediatePropagation();
    $('.tooltipped').tooltip('disable');
    $.ajax({
      url : '/unit-list/',
      type : 'GET',
      success : function(data){
        $('#page_modal_content').html(data);
        $('#page_modal').modal('open');
      },
      error : function(xhr, errmsn, err){
        console.log("Failure to load new supplier form")
      }
    });
  });



  // Validates the formset and form using ajax.
  $('#submit-item').on('click', function(event){
    event.preventDefault();
    event.stopImmediatePropagation();
    $.ajax({
      url:'/ajax-item-details/',
      type: 'POST',
      data: $('#itemDetailsForm, #purchase_form').serialize(),
      success: function(data){
        $('#itemDetailsBody').html(data);

        firstFormErrors();
        // If there are no errors, payment is loaded into the main div
        if (!formsetErrors('#itemDetailsBody')){

            //The payment div must be loaded, it has not yet been accessed
            $.ajax({
              url:'/payment/',
              type: 'GET',
              success: function(data){
                // console.log("saving");
                $('#itemDetails').removeClass('active');
                $('#paymentTab').removeClass('disabled');
                $('#payment').addClass('active');
                $('#paymentBody').html(data);
                $('ul.tabs').tabs('select_tab','payment');
                $('#itemDetailsTab').addClass('grey lighten-2');
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
