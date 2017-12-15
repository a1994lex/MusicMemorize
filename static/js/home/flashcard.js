$(document).ready(function(){
  console.log("loaded flashcards");
  $cards = $('#all_cards').children();
  // if ($cards.length == 0) {
  //   console.log("EMPTY LIST");
  //   $('#flashcard').html('<h1 class="grey-text text-lighten-2">EMPTY</h1>');
  // }
  $cards.each(function(){
    console.log(this);
  });

  $('#newCard').on('click', function(){
    $.ajax({
      url : '/add-card/',
      type : 'GET',
      success : function(data){
        $('#secondary_modal_content').html(data);
        $('#secondary_modal').modal('open');
      },
      error : function(xhr, errmsn, err){
        console.log("Failure to load new card form")
      }
    });
  });

  $('#saveCard').on('click', function(){
    console.log("SAVING THE CARD");
    var edit = localStorage.getItem('edit');
    if (edit === 'true') {
      var editId = localStorage.getItem('editId');
      data = $('#addCardForm').serialize()+'&edit='+editId;
      console.log("EDIT ID" + editId);
    }
    else {
      data = $('#addCardForm').serialize();
    }
    console.log("EDIT IS " + edit);
    $.ajax({
      url : '/add-card/',
      type : 'POST',
      data: data,
      success : function(data){
        $('#addCardDiv').html(data);
        if ($('#addCardForm').find('.errorlist').html() == undefined){
          localStorage.removeItem('edit');
          localStorage.removeItem('editId');
          $("#secondary_modal").modal('close');
          $.ajax({
            url : '/get-cards/',
            type : 'GET',
            success : function(data){
              $('#all_cards').html(data);
              setIds();
            },
            error : function(xhr, errmsn, err){
              console.log("Failure to load new card form")
            }
          });
        }
      },
      error : function(xhr, errmsn, err){
        console.log("Failure to load new card form")
      }
    });
  });

  $('.deleteCard').on('click', function(){
    var delId = $(this).parent().parent().attr('id');
    $.ajax({
      url : '/delete-card/',
      type : 'GET',
      data : {'deleteId': delId },
      success : function(data){
        $('#all_cards').html(data);
        setIds();
      },
      error : function(xhr, errmsn, err){
        console.log("Failure to load new card form");
      }
    });
  });


  $('.editCard').on('click', function(){
    var editId = $(this).parent().parent().attr('id');
    localStorage.setItem("edit", true);
    localStorage.setItem("editId", editId);
    $.ajax({
      url : '/add-card/',
      type : 'GET',
      data : {'edit': editId },
      success : function(data){
        $('#secondary_modal_content').html(data);
        $('#secondary_modal').modal('open');
      },
      error : function(xhr, errmsn, err){
        console.log("Failure to load new card form")
      }
    });
  });


  // <div id= {{ card.id }} class="cardnum">
  //   <span class="cardid" value={{ card.id }}>{{ card.id }}</span>
  //   <span class="cardfront" value={{ card.front }}></span>
  //   <span class="cardback" value={{ card.back }}></span>
  // </div>
  var index = 0;
  var cur_index = 0;
  var ctotal = $('#ctotal').text();
  $('.cardnum').each(function(){
    $(this).value = index;
    $($(this).children()[0]).attr('id', index+'_id');
    $($(this).children()[1]).attr('id', index+'_front');
    $($(this).children()[2]).attr('id', index+'_back');
    // $('#fc-id').html($($(this).children()[0]).text());
    // $('#fc-front').html($($(this).children()[1]).text());
    // $('#fc-back').html($($(this).children()[2]).text());

    index += 1;
  });
  if (cur_index == 0) {
    $('#fc-id').html($('#'+cur_index+'_id').text());
    $('#fc-front').html($('#'+cur_index+'_front').text());
    $('#fc-back').html($('#'+cur_index+'_back').text());
  }

  $('#nextCard').on('click', function(){
    if ((cur_index+1) == ctotal){
      cur_index = 0;
    }
    else {
      cur_index += 1;
    }
    $('#fc-id').html($('#'+cur_index+'_id').text());
    $('#fc-front').html($('#'+cur_index+'_front').text());
    $('#fc-back').html($('#'+cur_index+'_back').text());
  });


});

function setIds() {
  ctotal = $('#ctotal').text();
  var index = 0;
  $('.cardnum').each(function(){
    $(this).value = index;
    $($(this).children()[0]).attr('id', index+'_id');
    $($(this).children()[1]).attr('id', index+'_front');
    $($(this).children()[2]).attr('id', index+'_back');
    // $('#fc-id').html($($(this).children()[0]).text());
    // $('#fc-front').html($($(this).children()[1]).text());
    // $('#fc-back').html($($(this).children()[2]).text());
    index += 1;
  });

}
