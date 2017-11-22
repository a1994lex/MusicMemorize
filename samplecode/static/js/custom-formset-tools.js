
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

  var id = parseInt(idDiv.id.replace(/[^0-9\.]/g, ''), 10);

  return id;
}

function numForms(formsetId){
  var forms = document.getElementById(formsetId).children;
  console.log("forms length "+forms.length);
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
  console.log(id);
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
  console.log(tag + " " + id);
  var body = document.getElementById(id);
  if ($(tag).find('.error').html() === undefined){
    console.log($(tag));
    console.log("no errors found");
    return false;
  }
  for (row of body.children){
    console.log("each row has ");

      console.log(row);

    if ($(row).find(".error").length>0 && row.style.display!="none"){
      console.log("row is:");
      console.log(row.style.display);
      console.log(row);
      return true;
    }
  }
  console.log("return false");
  return false;
}

function updateBalance(id, prefix){
  var balance = 0;
  if (id !==null){
    var forms = document.getElementById(id).children;
    for (form of forms){
      if (!form.hasAttribute("data-formset-form-deleted")){

        id = getFormId(form);
        var amount = document.getElementById(prefix+id+"-amount").value;

        if (amount != ""){
          balance+=parseFloat(amount);
        }
      }
    }
  }

  setBalance(balance);
}

function setBalance(cost){
    balanceElem = document.getElementById('balance_id');
    totalElem = document.getElementById('total_id');
    total = parseFloat(totalElem.innerHTML.slice(1));

    var balance = total - cost;
    balance = Math.round(balance*100)/100;
    // console.log(balance);
    if (balance===0){
      balanceElem.style.color = "green";
      balanceElem.innerHTML = '$'+balance.toFixed(2);
    }
    else if (balance < 0){
      balanceElem.style.color="red";
      balance = Math.abs(balance);
      balanceElem.innerHTML= '+$'+balance.toFixed(2);
    }
    else {
      balanceElem.style.color="red";
      balance= Math.abs(balance)
      balanceElem.innerHTML= '-$'+balance.toFixed(2);
    }
}
