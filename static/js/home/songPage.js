function value_() {
var checkbox = document.getElementById('hidelines');
alert('checkbox value: ' + checkbox.checked);
}

$(document).ready(function(){
  // $('.tap-target').tapTarget('open');
  var numverses = 0;
  var sec30 = new Date().getTime() + 30000;
  var sec45 = new Date().getTime() + 45000;
  var min1 = new Date().getTime() + 60000;
  var time = sec30;
  $(".radios").find("input[type=radio]").on("change",function() {
        var status = $(this).prop('checked');
        if ($(this).attr('id') === 'sec30'){
          console.log("SEC30");
          time = sec30;
        }
        if ($(this).attr('id') === 'sec45'){
          console.log("SEC45");
          time = sec45;
        }
        if ($(this).attr('id') === 'min1'){
          console.log("MIN1");
          time = min1;
        }
  });

  $('#clock').on('click', function(event){
    $('#clock').countdown(time)
    .on('update.countdown', function(event) {
      $(this).html(event.strftime('%M:%S Seconds Left!'));
    })
    .on('finish.countdown', function(event) {
      Materialize.toast('Times Up!', 4000, 'rounded', 'red');
      $(this).html('Timer Start');
    });
  });
  $('.tooltipped').tooltip({delay: 50});

  $('#flashcards').on('click', function(event){
      $('#page_modal').modal('open');
  });

  $('#flashcards_admin').on('click', function(event){
      $('#page_modal_admin').modal('open');
  });
  $("#flashcard").flip({
    axis: 'x',
    trigger: 'click',
    forceHeight: 'true'
  });

  $('#lyrics textarea').each(function(){
    $(this).css({'height': '600px'});
  });

  $('#id_notes').each(function(){
    $(this).css({'height': '300px'});
  });

  $('#lyrics p').each(function(){
    numverses += 1;
    var strnum = String(numverses);
    $(this).attr('id',("verse_" + strnum));

    var $div = $("<option>", {id: strnum, "class": "verse_hide", "value": strnum}).text(strnum);
    $('#selectverse').append($div)
    $(this).contents()
      .filter(function(){
        return this.nodeType === 3;
      })
        .wrap("<span class='line'></span>")
        .end();
  });

  // Hide Everyother line
  $('#hide-lines').on('change', function(){
    var checked = $('#hide-lines-check').prop('checked');
    console.log("HIDE LINES " + checked);
    if (checked){
      var counter=0;
      $('.line').each(function(){
        if (counter % 2 != 0){
          $(this).css({'visibility': 'hidden'});
        }
        counter += 1;
      });
    }
    else {
      var counter=0;
      $('.line').each(function(){
        if (counter % 2 != 0){
          $(this).css({'visibility': 'visible'});
        }
        counter += 1;
      });
    }
  });

  // Hide Random words
  $('#hide-words').on('change', function(){
    var checked = $('#hide-words-check').prop('checked');
    if (checked){

    }
  });



  // Hide Verses
  $('.input-field').on('change', function(){
    var selected = $(this).find("li.selected");
    console.log(selected);
    var value = $(selected).text();
    var verse = '#verse_'+value;
    if ($(selected).hasClass('active')){
      $(verse).css('visibility', 'hidden');
      $(verse + ' span').css('visibility', 'hidden');
    }
    else{
      console.log('show');
      $(verse + ' span').css('visibility', 'visible');
      $(verse).css('visibility', 'visible');
    }
    // console.log("select"+value);
    // if ($(verse).css('visibility') == 'visible'){
    //   console.log('hide');
    // }
    // else {
    //
    // }
  });

  // ALL THE COLOR CODE STUFF
  $('#redcolor').on('click', function(event){
    console.log('clicked red');
    $('#lyrics').css({'cursor': 'pointer'});
    localStorage.setItem("paint_color", '#f44336')
    // document.getElementById('lyrics').style.caret-color = red;
  });
  $('#bluecolor').on('click', function(event){
    console.log('clicked red');
    $('#lyrics').css({'cursor': 'pointer'});
    localStorage.setItem("paint_color", '#2196f3')
    // document.getElementById('lyrics').style.caret-color = red;
  });
  $('#greencolor').on('click', function(event){
    console.log('clicked red');
    $('#lyrics').css({'cursor': 'pointer'});
    localStorage.setItem("paint_color", '#4caf50')
    // document.getElementById('lyrics').style.caret-color = red;
  });
  $('#purplecolor').on('click', function(event){
    console.log('clicked red');
    $('#lyrics').css({'cursor': 'pointer'});
    localStorage.setItem("paint_color", '#9c27b0')
    // document.getElementById('lyrics').style.caret-color = red;
  });
  $('#whitecolor').on('click', function(event){
    $('#lyrics').css({'cursor': 'pointer'});
    localStorage.setItem("paint_color", '#ffffff')
    // document.getElementById('lyrics').style.caret-color = red;
  });
  $('#workzone').dblclick(function(){
      $('#lyrics').css({'cursor': 'auto'});
      localStorage.removeItem('paint_color');
  });

  $('.line').on('click', function(event){
    $this = $(this);
    var clicks = $this.data('clicks');
    if (!clicks){
      if (localStorage.getItem('paint_color')){
        $this.css('color', localStorage.getItem('paint_color'));
      }
    }
    else{
      $this.css('color', 'black');
    }
    $this.data("clicks", !clicks);
  });



// EDIT SONG SUBMIT
$('#saveSongChanges').on('click', function(event){
  console.log("Recognized click");
  event.preventDefault();
  event.stopImmediatePropagation();
  $.ajax({
    url : '/ajax-edit-song/',
    type : 'POST',
    data : $('#editSongForm').serialize(),
    success : function(data){
      $('#ajaxDiv').html(data);
      // console.log(data);
      if ($('#ajaxDiv').find('.errorlist').html() == undefined){
        $('#page_modal_content').html('<div class="center"><h3>Saved!<i class='+
        '"my_inline material-icons prefix large green-text">check</i></h3><a href="/"'+
        'class="btn-large margin-top">Return to Homepage</a></div>');
        $('#page_modal').modal('open')
      }
      else {
        console.log("errors");
      }
    },
    error : function(xhr, errmsn, err){
      console.log("Failure to load new supplier form")
    }
  });
});

});
