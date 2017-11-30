
function getNextVisibleFormId(formsetId){
  var forms = document.getElementById(formsetId).children;
  for (form of forms){
    id = getFormId(form);
    if (!form.hasAttribute("data-formset-form-deleted")){
      return [id, form];
    }
  }
  return null;
}

function getFormId(currentForm){

  var idDiv = currentForm.firstElementChild.firstElementChild;

  if (!idDiv.id){
    idDiv = idDiv.nextElementSibling;
  }

  var id = parseInt(idDiv.id.replace(/[^0-9\.]/g, ''), 10);

  return id;
}

function numForms(formsetId){
  var forms = document.getElementById(formsetId).children;
  var aliveForms = 0;
  for (form of forms){
      if (!form.hasAttribute("data-formset-form-deleted")){
        aliveForms+=1;
      }
  }
  return aliveForms;
}

function hideDelBtn(id, tag, prefix){
  var delBtn = getDelBtn(id, tag, prefix);
  delBtn.style.display = "none";
}

function showDelBtn(id, tag, prefix){
  delBtn = getDelBtn(id, tag, prefix);
  delBtn.style.display = "initial";
}

function getDelBtn(id, tag, prefix){
  var delBox = null;
  var delBtn = null;
  if (tag==="formsetId"){
    delBox = document.getElementById(prefix+id+"-DELETE_container");
  }
  else {
    delBox = document.getElementById(prefix+id+'-DELETE');
  }
  delBtn = delBox.parentNode.nextElementSibling;
  return delBtn;
}


function getCurIndex(id){

  var curFormDiv = document.getElementById(id).lastElementChild;

  return getFormId(curFormDiv)
}


function formsetErrors(tag, id){
  var body = document.getElementById(id);
  if ($(tag).find('.errorlist').html() != undefined){
    return true;
  }
  if ($(tag).find('.error').html() === undefined) {
    return false;
  }
  for (row of body.children){
    if ($(row).find(".error").length>0 && row.style.display!="none"){
      return true;
    }
  }
  return false;
}

function updateBalance(id, prefix){
  var balance = 0;
  if (id !==null){
    var forms = document.getElementById(id).children;
    for (form of forms){
      if (!form.hasAttribute("data-formset-form-deleted")){
        id = getFormId(form);
          var amount_div = document.getElementById(prefix+id+"-amount");
          if (amount_div != undefined && amount_div.value != ""){
            balance+=parseFloat(amount_div.value);
        }
      }
    }
  }

  setBalance(balance);
}

function setBalance(cost){
    balanceElem = document.getElementById('balance_id');
    totalElem = document.getElementById('total_id');
    total = $('#total_id').data('total');
    console.log(total)
    if (total == ""){
      total = parseFloat(totalElem.innerText.slice(1));
    }
    var balance = total - cost;
    balance = Math.round(balance*100)/100;
    if (balance===0){
      balanceElem.style.color = "green";
      balanceElem.innerHTML = '$'+balance.toFixed(2);
    }
    else if (balance < 0){
      balanceElem.style.color="red";
      balance = Math.abs(balance);
      balanceElem.innerHTML= '-$'+balance.toFixed(2);
    }
    else {
      balanceElem.style.color="red";
      balance= Math.abs(balance)
      balanceElem.innerHTML= '+$'+balance.toFixed(2);
    }
}
