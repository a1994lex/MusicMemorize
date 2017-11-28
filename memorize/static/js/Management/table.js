$( document ).ready(function(){
  $('select').material_select();


  /* TABLE SORT */


  $("table").stupidtable();


  /* TABLE PAGINATION */


  $('#preset-table').after('<div id="p-nav"></div>');
         var rowsShown = 10;
         var rowsTotal = $('#preset-table tbody tr').length;
         var numPages = rowsTotal/rowsShown;
         if(numPages > 1){
           for(i = 0; i < numPages; i++) {
               var pageNum = i + 1;
               $('#p-nav').append('<a href="#" rel="'+i+'">'+pageNum+'</a> ');
           }
         }
         $('#preset-table tbody tr').hide();
         $('#preset-table tbody tr').slice(0, rowsShown).show();
         $('#p-nav a:first').addClass('active');
         $('#p-nav a').bind('click', function(){

             $('#p-nav a').removeClass('active');
             $(this).addClass('active');
             var currPage = $(this).attr('rel');
             var startItem = currPage * rowsShown;
             var endItem = startItem + rowsShown;
             $('#preset-table tbody tr').css('opacity','0.0').hide().slice(startItem, endItem).
                     css('display','table-row').animate({opacity:1}, 300);
         });

   $('#non-chem-preset-table').after('<div id="nc-nav"></div>');
          var rowsShown = 10;
          var rowsTotal = $('#non-chem-preset-table tbody tr').length;
          var numPages = rowsTotal/rowsShown;
          if(numPages > 1){
            for(i = 0; i < numPages; i++) {
                var pageNum = i + 1;
                $('#nc-nav').append('<a href="#" rel="'+i+'">'+pageNum+'</a> ');
            }
          }
          $('#non-chem-preset-table tbody tr').hide();
          $('#non-chem-preset-table tbody tr').slice(0, rowsShown).show();
          $('#nc-nav a:first').addClass('active');
          $('#nc-nav a').bind('click', function(){

              $('#nc-nav a').removeClass('active');
              $(this).addClass('active');
              var currPage = $(this).attr('rel');
              var startItem = currPage * rowsShown;
              var endItem = startItem + rowsShown;
              $('#non-chem-preset-table tbody tr').css('opacity','0.0').hide().slice(startItem, endItem).
                      css('display','table-row').animate({opacity:1}, 300);
          });

  $('#speedtype-table').after('<div id="sp-nav"></div>');
         var rowsShown = 10;
         var rowsTotal = $('#speedtype-table tbody tr').length - $('#speedtype-table tbody tr table tr').length;
         var numPages = rowsTotal/rowsShown;
         if(numPages > 1){
           for(i = 0; i < numPages; i++) {
               var pageNum = i + 1;
               $('#sp-nav').append('<a href="#" rel="'+i+'">'+pageNum+'</a> ');
           }
         }
         $('#speedtype-table tbody tr').hide();
         $('#speedtype-table tbody tr').slice(0, rowsShown).show();
         $('#sp-nav a:first').addClass('active');
         $('#sp-nav a').bind('click', function(){

             $('#sp-nav a').removeClass('active');
             $(this).addClass('active');
             var currPage = $(this).attr('rel');
             var startItem = currPage * rowsShown;
             var endItem = startItem + rowsShown;
             $('#speedtype-table tbody tr').css('opacity','0.0').hide().slice(startItem, endItem).
                     css('display','table-row').animate({opacity:1}, 300);
         });

  $('#subclass-table').after('<div id="sc-nav"></div>');
        var rowsShown = 10;
        var rowsTotal = $('#subclass-table tbody tr').length;
        var numPages = rowsTotal/rowsShown;
        if(numPages > 1){
          for(i = 0; i < numPages; i++) {
              var pageNum = i + 1;
              $('#sc-nav').append('<a href="#" rel="'+i+'">'+pageNum+'</a> ');
          }
        }
        $('#subclass-table tbody tr').hide();
        $('#subclass-table tbody tr').slice(0, rowsShown).show();
        $('#sc-nav a:first').addClass('active');
        $('#sc-nav a').bind('click', function(){

            $('#sc-nav a').removeClass('active');
            $(this).addClass('active');
            var currPage = $(this).attr('rel');
            var startItem = currPage * rowsShown;
            var endItem = startItem + rowsShown;
            $('#subclass-table tbody tr').css('opacity','0.0').hide().slice(startItem, endItem).
                    css('display','table-row').animate({opacity:1}, 300);
        });

  $('#account-table').after('<div id="a-nav"></div>');
       var rowsShown = 10;
       var rowsTotal = $('#account-table tbody tr').length;
       var numPages = rowsTotal/rowsShown;
       if(numPages > 1){
         for(i = 0; i < numPages; i++) {
             var pageNum = i + 1;
             $('#a-nav').append('<a href="#" rel="'+i+'">'+pageNum+'</a> ');
         }
       }
       $('#account-table tbody tr').hide();
       $('#account-table tbody tr').slice(0, rowsShown).show();
       $('#a-nav a:first').addClass('active');
       $('#a-nav a').bind('click', function(){

           $('#a-nav a').removeClass('active');
           $(this).addClass('active');
           var currPage = $(this).attr('rel');
           var startItem = currPage * rowsShown;
           var endItem = startItem + rowsShown;
           $('#account-table tbody tr').css('opacity','0.0').hide().slice(startItem, endItem).
                   css('display','table-row').animate({opacity:1}, 300);
       });

  $('#department-table').after('<div id="d-nav"></div>');
      var rowsShown = 10;
      var rowsTotal = $('#department-table tbody tr').length;
      var numPages = rowsTotal/rowsShown;
      if(numPages > 1){
        for(i = 0; i < numPages; i++) {
            var pageNum = i + 1;
            $('#d-nav').append('<a href="#" rel="'+i+'">'+pageNum+'</a> ');
        }
      }
      $('#department-table tbody tr').hide();
      $('#department-table tbody tr').slice(0, rowsShown).show();
      $('#d-nav a:first').addClass('active');
      $('#d-nav a').bind('click', function(){

          $('#d-nav a').removeClass('active');
          $(this).addClass('active');
          var currPage = $(this).attr('rel');
          var startItem = currPage * rowsShown;
          var endItem = startItem + rowsShown;
          $('#department-table tbody tr').css('opacity','0.0').hide().slice(startItem, endItem).
                  css('display','table-row').animate({opacity:1}, 300);
      });

  $('#vendor-table').after('<div id="v-nav"></div>');
     var rowsShown = 10;
     var rowsTotal = $('#vendor-table tbody tr').length;
     var numPages = rowsTotal/rowsShown;
     if(numPages > 1){
       for(i = 0; i < numPages; i++) {
           var pageNum = i + 1;
           $('#v-nav').append('<a href="#" rel="'+i+'">'+pageNum+'</a> ');
       }
     }
     $('#vendor-table tbody tr').hide();
     $('#vendor-table tbody tr').slice(0, rowsShown).show();
     $('#v-nav a:first').addClass('active');
     $('#v-nav a').bind('click', function(){

         $('#v-nav a').removeClass('active');
         $(this).addClass('active');
         var currPage = $(this).attr('rel');
         var startItem = currPage * rowsShown;
         var endItem = startItem + rowsShown;
         $('#vendor-table tbody tr').css('opacity','0.0').hide().slice(startItem, endItem).
                 css('display','table-row').animate({opacity:1}, 300);
     });

 $('#location-table').after('<div id="l-nav"></div>');
    var rowsShown = 10;
    var rowsTotal = $('#location-table tbody tr').length;
    var numPages = rowsTotal/rowsShown;
    if(numPages > 1){
      for(i = 0; i < numPages; i++) {
          var pageNum = i + 1;
          $('#l-nav').append('<a href="#" rel="'+i+'">'+pageNum+'</a> ');
      }
    }
    $('#location-table tbody tr').hide();
    $('#location-table tbody tr').slice(0, rowsShown).show();
    $('#l-nav a:first').addClass('active');
    $('#l-nav a').bind('click', function(){

        $('#l-nav a').removeClass('active');
        $(this).addClass('active');
        var currPage = $(this).attr('rel');
        var startItem = currPage * rowsShown;
        var endItem = startItem + rowsShown;
        $('#location-table tbody tr').css('opacity','0.0').hide().slice(startItem, endItem).
                css('display','table-row').animate({opacity:1}, 300);
    });


   /* ROW CLICK */

   $('#preset-table tbody tr').off().on('click', function(event) {
     event.preventDefault();
     event.stopImmediatePropagation();
     var id = $(this).attr('id');
     console.log(id);
     $.ajax({
       url : '/edit-chem-preset/',
       type : 'GET',
       data : { 'id': id },
       success : function(data){
           $('#page_modal_content').html(data);
           $('#page_modal').modal('open');
         console.log("in ajax")
       },
       error: function(xhr, errmsn, err){
         console.log("Failure to load chemistry preset edit form")
       }
     });
   });

   $('#non-chem-preset-table tbody tr').off().on('click', function(event) {
     event.preventDefault();
     event.stopImmediatePropagation();
     var id = $(this).attr('id');
     console.log(id);
     $.ajax({
       url : '/edit-non-chem-preset/',
       type : 'GET',
       data : { 'id': id },
       success : function(data){
           $('#page_modal_content').html(data);
           $('#page_modal').modal('open');
         console.log("in ajax")
       },
       error: function(xhr, errmsn, err){
         console.log("Failure to load non-chemistry preset edit form")
       }
     });
   });

   $('#speedtype-table tbody tr').off().on('click', function(event) {
     event.preventDefault();
     event.stopImmediatePropagation();
     var id = $(this).attr('id');
     console.log(id);
     $.ajax({
       url : '/edit-speedtype/',
       type : 'GET',
       data : { 'id': id },
       success : function(data){
           $('#page_modal_content').html(data);
           $('#page_modal').modal('open');
         console.log("in ajax")
       },
       error: function(xhr, errmsn, err){
         console.log("Failure to load speedtype edit form")
       }
     });
   });

   $('#subclass-table tbody tr').off().on('click', function(event) {
     event.preventDefault();
     event.stopImmediatePropagation();
     var id = $(this).attr('id');
     console.log(id);
     $.ajax({
       url : '/edit-subclass/',
       type : 'GET',
       data : { 'id': id },
       success : function(data){
           $('#page_modal_content').html(data);
           $('#page_modal').modal('open');
         console.log("in ajax")
       },
       error: function(xhr, errmsn, err){
         console.log("Failure to load subclass edit form")
       }
     });
   });

   $('#account-table tbody tr').off().on('click', function(event) {
     event.preventDefault();
     event.stopImmediatePropagation();
     var id = $(this).attr('id');
     console.log(id);
     $.ajax({
       url : '/edit-account/',
       type : 'GET',
       data : { 'id': id },
       success : function(data){
           $('#page_modal_content').html(data);
           $('#page_modal').modal('open');
         console.log("in ajax")
       },
       error: function(xhr, errmsn, err){
         console.log("Failure to load account edit form")
       }
     });
   });

   $('#department-table tbody tr').off().on('click', function(event) {
     event.preventDefault();
     event.stopImmediatePropagation();
     var id = $(this).attr('id');
     console.log(id);
     $.ajax({
       url : '/edit-department/',
       type : 'GET',
       data : { 'id': id },
       success : function(data){
           $('#page_modal_content').html(data);
           $('#page_modal').modal('open');
         console.log("in ajax")
       },
       error: function(xhr, errmsn, err){
         console.log("Failure to load department edit form")
       }
     });
   });

   $('#vendor-table tbody tr').off().on('click', function(event) {
     event.preventDefault();
     event.stopImmediatePropagation();
     var id = $(this).attr('id');
     console.log(id);
     $.ajax({
       url : '/edit-vendor/',
       type : 'GET',
       data : { 'id': id },
       success : function(data){
           $('#page_modal_content').html(data);
           $('#page_modal').modal('open');
         console.log("in ajax")
       },
       error: function(xhr, errmsn, err){
         console.log("Failure to load vendor edit form")
       }
     });
   });

   $('#location-table tbody tr').off().on('click', function(event) {
     event.preventDefault();
     event.stopImmediatePropagation();
     var id = $(this).attr('id');
     console.log(id);
     $.ajax({
       url : '/edit-location/',
       type : 'GET',
       data : { 'id': id },
       success : function(data){
           $('#page_modal_content').html(data);
           $('#page_modal').modal('open');
         console.log("in ajax")
       },
       error: function(xhr, errmsn, err){
         console.log("Failure to load location edit form")
       }
     });
   });

});
