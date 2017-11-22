function resetHeaders(curElem){
  console.log("SETTING CARETS");
  console.log("ALL MY HEADER:");
  // console.log($(curElem));
  headers = $('i.sort-icon');
  headers.each(function(index){
    $(this).innerHTML = 'swap_vert';
  });
  // console.log(headers);
  // for (header in headers.each()){
  //
  //   if (header.lastChild){
  //     if (curElem != header.lastChild) {
  //       header.lastChild.innerHTML = 'swap_vert';
  //     }
  //     else {
  //       console.log("HEY WE found a similar curElem");
  //       console.log(curElem);
  //     }
  //   }
  //
  // }
}

function setCarets(elem){

  var image_str = elem.innerHTML;
  if (image_str == 'keyboard_arrow_down')
  {
    elem.innerHTML = 'keyboard_arrow_up';
    return false; // We want the order to ascend
  }
  else if (image_str == 'keyboard_arrow_up' || image_str == 'swap_vert')
  {

    elem.innerHTML = 'keyboard_arrow_down';
    return true; // We want the order to be in descedning order
  }

}

function configureDescAsc(sortid, descending){
  if (descending){
    return ('-'+sortid);
  }
  return sortid;
}

$(document).ready(function(){
  var defaultSortCol = "last_mod";

  if (localStorage.getItem("icon_setting") && localStorage.getItem("column_id")) {
    var default_elem = document.getElementById(defaultSortCol);
    default_elem.lastChild.innerHTML = "swap_vert";
    var elem = document.getElementById(localStorage.getItem("column_id"));
    var icon = elem.lastChild;
    icon.innerHTML = localStorage.getItem("icon_setting");
  }

  $(".sortClick").on('click', function(event){

    var sortid = event.target.id,
        descend_default = true,
        icon_elem = null;
        icon_inner = null;

    if (sortid === ""){
      // In this case the icon was recognized, and not its parent (the parent)
      // has the id.
      icon_elem = event.target;
      sortid = event.target.parentNode.id;
    }
    else {
      icon_elem = event.target.lastChild;
    }
    descend_default = setCarets(icon_elem);
    localStorage.setItem("icon_setting", icon_elem.innerHTML);
    localStorage.setItem("column_id", sortid);
    sortid = configureDescAsc(sortid, descend_default);
    var data = {'sortid' : sortid};
    event.preventDefault();
    event.stopImmediatePropagation();
    $.ajax({
      url:'/table-sort/',
      type: 'GET',
      data: data,
      success: function(data){
        $("#tableSort").html(data);
        console.log(icon_elem);


      },
      error : function(xhr, errmsn, err){
        console.log("Form wasn't created")
      }
    });

  });



});
