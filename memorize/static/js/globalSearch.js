$( document ).ready(function(){
    $('#globalSearch').on('click', function(){
        $('#search_modal').openModal({
          ready: function() {
              if($(".lean-overlay").length > 1) {
                  $(".lean-overlay:not(:first)").each(function() {
                      $(this).remove();
                  });
              }
          }, // Callback for Modal open
          complete: function() {
            $(".lean-overlay").each(function() {
                $(this).remove();
            });
          } // Callback for Modal close
        });
        $.ajax({
            url : '/globalSearch/',
            success : function(data) {
                $('#search_modal').find('.modal-content').html(data);
            },
            // handle a non-successful response
            error : function(xhr,errmsg,err) {
                console.log('error')
                window.location.href='/not_authorized'
            } // End first error
        });
      });

    $('#globalSearchForm').on('submit', function(event){
        event.preventDefault();
        $.ajax({
            url : '/globalSearch/',
            type: 'POST',
            data: $('#globalSearchForm').serialize(),
            success : function(data) {
                $('#search_modal').find('.modal-content').html(data);
                if( $('#id_text').val().length > 0 ){
                  $('#searchContainer').hide();
                  $('#search_modal').addClass('modal-fixed-footer');
                  $('#toggle_modal_footer').show();
                }
            },
            // handle a non-successful response
            error : function(xhr,errmsg,err) {
                // add the error
                $('#page_modal').find('.modal-content').html("<div class='alert-box alert radius' data-alert>We have encountered an error");
            }
        });
    });

    $('#toggle').on('click', function(){
      $('#id_text').val('');
      $('#searchContainer').show()
      $('#search_modal').removeClass('modal-fixed-footer');
      $('#toggle_modal_footer').hide();
      $('#searchResults').hide();
    });

    $('.purchaseDetails').on('click', function(){
      $('#search_modal').removeClass('modal-fixed-footer');
      $('#toggle_modal_footer').hide();
      var id = $(this).attr('id')
      $('#search_modal').openModal({
        ready: function() {
            if($(".lean-overlay").length > 1) {
                $(".lean-overlay:not(:first)").each(function() {
                    $(this).remove();
                });
            }
        }, // Callback for Modal open
        complete: function() {
          $(".lean-overlay").each(function() {
              $(this).remove();
          });
        } // Callback for Modal close
      });
      $.ajax({
          url : '/purchasedetails/',
          type: 'GET',
          data: {"purchaseID": id},
          success : function(data) {
              $('#search_modal').find('.modal-content').html(data);
          },
          // handle a non-successful response
          error : function(xhr,errmsg,err) {
              // add the error
              $('#page_modal').find('.modal-content').html("<div class='alert-box alert radius' data-alert>We have encountered an error");
          }
      });
    });

});
