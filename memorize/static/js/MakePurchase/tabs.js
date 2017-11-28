function getActiveTab(){
  var tabs = document.getElementsByClassName("tab");
  for (tab of tabs){
    if (tab.firstChild.className === "active"){
       return tab.id;
    }
  }
}

function checkTarget(self, target){
  if (target === self){
    return false;
  }
  var targetElem = document.getElementById(target);
  if ($(targetElem).hasClass("disabled")){
    return false;
  }
  return true;

}

$(document).ready( function(){

  $('#basicInfoTab').on('click', function(event){
    if (event.originalEvent !== undefined){
      event.preventDefault();
      event.stopImmediatePropagation();
      $.ajax({
        url : '/basic-info/',
        type : 'GET',
        success: function(data){
          $('#basicInfoBody').html(data);
          $('ul.tabs').tabs('select_tab','basicInfo');
          initOptContact();
        },
        error : function(xhr, errmsn, err){
          console.log("Form wasn't created")
        }
      });
    }
  });

  $('#itemDetailsTab').on('click', function(event){
    if (event.originalEvent !== undefined){
      var target = "itemDetailsTab";
      var tab = getActiveTab();
      if (checkTarget(tab, target)){
        event.preventDefault();
        event.stopImmediatePropagation();
        $.ajax({
          url : '/item-details/',
          type : 'GET',
          success: function(data){
            $('#itemDetailsBody').html(data);
            $('ul.tabs').tabs('select_tab','items');
          },
          error : function(xhr, errmsn, err){
            console.log("Form wasn't created")
          }
        });
      }
    }
  });

  $('#paymentTab').on('click', function(event){
    if (event.originalEvent !== undefined){
      var target = "paymentTab";
      var tab = getActiveTab();
      if (checkTarget(tab, target)){
        event.preventDefault();
        event.stopImmediatePropagation();
        $.ajax({
          url:'/payment/',
          type: 'GET',
          success: function(data){
            $('#paymentBody').html(data);
            $('ul.tabs').tabs('select_tab','payment');
          },
          error: function(xhr, errmsg, err){
            console.log("Failure to load Item Detail page");
          }
        });
      }
    }
  });

  $('#reviewTab').on('click', function(event){
    if (event.originalEvent !== undefined){
      if (checkTarget(getActiveTab(), "paymentTab")){
        event.preventDefault();
        event.stopImmediatePropagation();
        $.ajax({
          url:'/review/',
          type: 'GET',
          success: function(data){
            $('#reviewBody').html(data);
            $('ul.tabs').tabs('select_tab','review');
          },
          error: function(xhr, errmsg, err){
            console.log("Failure to load Item Detail page");
          }
        });
      }
    }
  });



});
