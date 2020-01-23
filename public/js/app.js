//AJAX CREATE
$('body').on('click', '.modal-show', function(event) {
    event.preventDefault();

    var me = $(this),
        url = me.attr('href'),
        title = me.attr('title');
        // content = me.attr(ckeditor.instances.content.getData());

        $('#modal-title').text(title);
        // CKEDITOR.replace(content);
        $('#modal-btn-save').removeClass('hide').text(me.hasClass('edit') ? 'Update' : 'Tambah');

        $.ajax({
            url: url,
            dataType: 'html',
            success: function(response) {
                for (instance in CKEDITOR.instances) {
                    CKEDITOR.instances[instance].updateElement();
                }
                $('#modal-body').html(response);
                $('#datatable').DataTable().ajax.reload();
            }
        });
        $('#modal').modal('show');
});

//AJAX UPDATE

$('#modal-btn-save').click(function (event) {
    event.preventDefault();

    var form = $('#modal-body form'),
        url = form.attr('action'),
        method = $('input[name=_method]').val() == undefined ? 'POST' : 'PUT';
        // formData = new FormData($(form)[0]);

    form.find('.help-block').remove();
    form.find('.form-group').removeClass('has-error');



    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $.ajax({
        url : url,
        method : method,
         data : form.serialize(),
        // data: formData,
        // contentType: false,
        // processData: false,
        success: function (response) {
            form.trigger('reset');
            $('#modal').modal('hide');
            $('#datatable').DataTable().ajax.reload();

            swal({
                title: "Berhasil!",
                text: "Data berhasil di Update",
                icon: "success",
                button: "Tutup",
              });
        },
        error : function (xhr) {
            var res = xhr.responseJSON;
            if($.isEmptyObject(res) == false){
                $.each(res.errors, function (key, value) {
                    $('#' + key)
                    .closest('.form-group')
                    .addClass('has-error')
                    .append('<span class="help-block"><strong>' + value + '</strong>')

                });
            }
        }
    })
});



    //Fungsi Delete
    $('body').on('click', '.btn-delete', function (event){
        event.preventDefault();

        var me = $(this),
        url = me.attr('href'),
        title = me.attr('title'),
        csrf_token = $('meta[name="csrf-token"]').attr('content');


        if (confirm("Apa Anda Yakin ???")) {
            $.ajax({
                url: url,
                type: "POST",
                data: {
                    '_method': 'DELETE',
                    '_token': csrf_token
                },
                success:function(data){
                        swal({
                        type: 'success',
                        title: 'Berhasil !',
                        text: 'Data berhasil di hapus   !'
                    });
                    $('#datatable').DataTable().ajax.reload();
                }
            })
        } else {
            return false;
        }
    });

//AJAX SHOW
$('body').on('click', '.btn-show ', function (event) {
    event.preventDefault();

    var me = $(this),
        url = me.attr('href'),
        title = me.attr('title');

    $('#modal-title').text(title);
    $('#modal-btn-save').addClass('hide');

    $.ajax({
        url: url,
        dataType: 'html',
        success: function (response) {
            $('#modal-body').html(response);
        }
    });

    $('#modal').modal('show');
});
