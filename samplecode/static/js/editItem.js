$( document ).ready(function(){
    $('#editItemForm').on('submit', function(event){
        event.preventDefault();
        var itemPK = $('.ITEMPK').attr('id');
        var editURL = '/editItem/' + itemPK + '/';
        $.ajax({
            url : editURL,
            type: 'POST',
            data: $('#editItemForm').serialize(),
            success : function(data) {
                $('#page_modal').find('.modal-content').html(data);
            },
            // handle a non-successful response
            error : function(xhr,errmsg,err) {
                // add the error
                // $('#page_modal').find('.modal-content').html("<div class='alert-box alert radius' data-alert>We have encountered an error");
                $('#page_modal').closeModal();
                location.reload();
            }
        });
    });
});
