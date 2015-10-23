'use strict';

(function() {

    var apiUrl = 'https://clementine-standard-brandonl.c9.io/api/todo';


    function hideEditBtns() {
        $('#edit-buttons').hide();
        $('#add-button').show();
    }

    function showEditBtns() {
        $('#edit-buttons').show();
        $('#add-button').hide();
    }

    function resetInputFields() {
        $('#title').val("");
        $('#message').val("");
        $('#id-holder').val("");
    }


    //add new 
    function postTodo() {

        var title = $('#title').val();
        var message = $('#message').val();

        if (title != "" && message != "") {
            var todoData = {
                title: title,
                message: message
            };

            $.post(apiUrl, todoData)
                .done(function(data) {
                    getTodo();
                    resetInputFields();
                });
        }

    }

    //get all
    function getTodo() {
        $.get(apiUrl).done(function(data) {
            displayTodos(data);
        });
    }

    //delete one
    function deleteTodo(id) {
        $.ajax({
            url: apiUrl,
            type: 'DELETE',
            data: {
                id: id
            }
        }).done(function(data) {
            getTodo();
        });
    }

    //update edited 
    function putTodo() {
        var todoData = {
            title: $('#title').val(),
            message: $('#message').val(),
            id: $('#id-holder').val()
        };

        $.ajax({
            url: apiUrl,
            type: 'PUT',
            data: todoData
        }).done(function(data) {
            getTodo();
            resetInputFields();
            hideEditBtns();
        });
    }

    function displayTodos(data) {
        $('.todos').empty();
        data.forEach(function(todo) {
            var title = todo.title;
            var message = todo.message;
            var id = todo._id;

            var output = "<dl data-id='" + id + "' ><dt class='title'>" + title +
                "</dt><dd class='message'>" + message +
                "</dd><button class='btn btn-info edit-todo' data-id='" + id +
                "' >Edit</button><button class='btn btn-warning delete-todo' data-id='" + id +
                "' >Delete</button></dl>";

            $(".todos").append(output);
        });
    }

    //adding new 
    $('#submit').on('click', function() {
        postTodo();
    });

    //selecting to edit and populating form
    $(document).on('click', '.edit-todo', function() {
        var todoId = $(this).data('id');
        var title = $(this).siblings("dt.title").text();
        var message = $(this).siblings("dd.message").text();

        $('#title').val(title);
        $('#message').val(message);
        $('#id-holder').val(todoId);

        showEditBtns();
        $(this).closest("dl").hide();
    });

    //submitting the edit
    $('#edit').on('click', function() {
        putTodo();
    });

    //cancel edit 
    $('#cancel').on('click', function() {
        var todoId = $('#id-holder').val();
        $('dl[data-id=' + todoId + ']').show();
        hideEditBtns();
        resetInputFields();
    });

    //delete 
    $(document).on('click', '.delete-todo', function() {
        var todoId = $(this).data('id');
        deleteTodo(todoId);
    });


    hideEditBtns();
    resetInputFields();
    getTodo();


})();