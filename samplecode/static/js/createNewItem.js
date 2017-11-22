$( document ).ready(function(){
    $('#createItemForm').on('submit', function(event){
        event.preventDefault();
            $.ajax({
                url : '/createNewItem/',
                type: 'POST',
                data: $('#createItemForm').serialize(),
                success : function(data) {
                    $('#page_modal').find('.modal-content').html(data);
                    // Update the table
                    $.ajax({
                        url : '/viewInventory/updateTable',
                        success: function(data) {
                            $('#itemTable').html(data);
                        },
                        error: function(xhr,errmsg,err){
                            $('#page_modal').find('.modal-content').html("<div class='alert-box alert radius' data-alert>We have encountered an error");
                        }
                    });
                },
                // handle a non-successful response
                error : function(xhr,errmsg,err) {
                    // add the error
                    $('#page_modal').find('.modal-content').html("<div class='alert-box alert radius' data-alert>We have encountered an error");
                }
            });
        }
    );
});
