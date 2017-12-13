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
    $.ajax({
      url : '/add-card/',
      type : 'POST',
      data: $('#addCardForm').serialize(),
      success : function(data){
        $('#addCardDiv').html(data);
        if ($('#addCardForm').find('.errorlist').html() == undefined){
          console.log("NO ERRORS IN CARD FORM");
          $("#secondary_modal").modal('close');
          $.ajax({
            url : '/get-cards/',
            type : 'GET',
            success : function(data){
              console.log(data);
              $('#all_cards').html(data);
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

  // <div id= {{ card.id }} class="cardnum">
  //   <span class="cardid">{{ card.id }}</span>
  //   <span class="cardtitle">{{ card.title }}</span>
  //   <span class="cardfront">{{ card.front }}</span>
  //   <span class="cardback">{{ card.back }}</span>
  // </div>





});
