window.$ = window.jQuery = require('jquery')
window.Bootstrap = require('bootstrap')
const ipcRenderer = require('electron').ipcRenderer;
let json;

function grab_run_info(event) {
    event.preventDefault(); // stop the form from submitting
    let firstname = document.getElementsByName("lastName").value;
    ipcRenderer.send('form-submission', firstname);
}

function start_run(event) {
    event.preventDefault();
}

function toJSONString(form) {
    var obj = {};
    var elements = form.querySelectorAll("input, select, textarea, checkbox");
    for (var i = 0; i < elements.length; ++i) {
        var element = elements[i];
        if (element.type == "checkbox") {
            if (element.checked == false) {
                var name = element.name;
                var value = 'off';
            }else {
                var name = element.name;
                var value = element.value;
            }
        } else {
            var name = element.name;
            var value = element.value;
        }
        if (name) {
            obj[name] = value;
        }
    }
    return JSON.stringify(obj);
}



/* AJAX TO BUTTON - API TEST */

$(function () {
    $('#run').click(function () {
        path = $('.dropzone')[0].dropzone.files[0].path;
        form = document.getElementById("form_configuracoes");
        formData = toJSONString(form) ;
        console.log(formData.type)
        $.ajax({
            url: 'http://localhost:1234/run_augmentation',
            data: {
                rotation: $('#rotation')[0].checked,
                rotation_probability: $('#rotation_probability').val(),
                max_left_rotation: $('#max_left_rotation').val(),
                max_right_rotation: $('#max_right_rotation').val(),

                zoom: $('#zoom')[0].checked,
                zoom_probability: $('#zoom_probability').val(),
                min_factor: $('#min_factor').val(),
                max_factor: $('#max_factor').val(),

                shear: $('#shear')[0].checked,
                shear_probability: $('#shear_probability').val(),
                max_shear_left: $('#max_shear_left').val(),
                max_shear_right: $('#max_shear_right').val(),

                greyscale: $('#greyscale')[0].checked,
                greyscale_probability: $('#greyscale_probability').val(),

                interpolation: $('#interpolation')[0].checked,
                scale_probability: $('#scale_probability').val(),
                scale_factor: $('#scale_factor').val(),

                distortion: $('#distortion')[0].checked,
                distort_probability: $('#distort_probability').val(),
                grid_width: $('#grid_width').val(),
                grid_height: $('#grid_height').val(),
                magnitute: $('#magnitute').val(),
                
                sample: $('#sample').val(),
                name_file: path,
            },
            type: 'POST',
            success: function (response) {
                console.log(response);
            },
            error: function (error) {
                console.log(error);
            }
        });
    });
});

document.addEventListener('drop', function (e) {
    e.preventDefault();
    e.stopPropagation();

    for (let f of e.dataTransfer.files) {
        // console.log(f.path)
        $.getJSON(f.path, function (data) {
            $.each(data, function (key, value) {
                // console.log(value.name, value.value)
                if ($('input[name="' + value.name + '"]')[0].type == "checkbox") {
                    $('input[name="' + value.name + '"]')[0].checked = true;
                }
                $('input[name="' + value.name + '"]').val(value.value);

            });

        });
    }
});

document.addEventListener('dragover', function (e) {
    e.preventDefault();
    e.stopPropagation();
});

/* SALVAR O JSON */
$(function () {
    $('#json_save').click(function () {
        formData = $('#form_configuracoes').serializeArray();
        formData = JSON.stringify(formData);
        console.log(formData)
        $.ajax({
            url: 'http://localhost:1234/save_config',
            data: { form: formData, name_file: JSON.stringify($('#nome_arquivo').val()) },
            type: 'POST',
            success: function (response) {
                console.log("JSON SALVO COM SUCESSO");
                // FUTURO DIÁLOGO (MODAIS) COM SUCESSO .GIF
            },
            error: function (error) {
                console.log(error);
                // FUTURO DIÁLOGO (MODAIS) COM ERRO .GIF
            }
        });
    });
});

/* Enabling Run button */
$(function () {
    $('#okay').click(function () {
        // testo se tem algum form marcado
        form = document.querySelectorAll('#rotation, #zoom, #shear, #shear, #greyscale, #interpolation, #distortion')
        console.log(form)
        flag = true;
        for (i in form) {
            if (form[i].checked === true) {
                flag = false;
            }
        }
        $('#run')[0].disabled = flag;
    })
})

/* MODAL CONFIGURATION-FOR-RUN */
$(document).ready(function () {
    $("#myBtn").click(function () {
        $("#myModal").modal();
    });
});
/* MODAL CONFIGURATION-FOR-SAVE */
$(document).ready(function () {
    $("#myBtn2Save").click(function () {
        $("#myModalToSave").modal();
    });
});

/* TOOLTIP */
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})