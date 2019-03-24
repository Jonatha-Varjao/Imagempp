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

function toJSONString( form ) {
    var obj = {};
    var elements = form.querySelectorAll( "input, select, textarea, checkbox" );
    for( var i = 0; i < elements.length; ++i ) {
        var element = elements[i];
        if (element.type == "checkbox") {
            var name = element.name;
            var value = element.checked;
        }else {
            var name = element.name;
            var value = element.value;
        }
        if( name ) {
            obj[ name ] = value;
        }
    }

    return JSON.stringify( obj );
}

/* AJAX TO BUTTON - API TEST */
$(function(){
	$('#register').click(function(){
		$.ajax({
			url: 'http://localhost:1234/signUpUser',
			data: $('form').serialize(),
			type: 'POST',
			success: function(response){
				console.log(response);
			},
			error: function(error){
				console.log(error);
			}
		});
	});
});

/* CARREGAR O JSON */
// $.getJSON('url_to_file', function(data) {
//     for (var i in data) {
//         if ($('input[name="'+i+'"]').type == "checkbox")
//         {
//             $('input[name="'+i+'"]').checked = true;
//         }
//         $('input[name="'+i+'"]').val(data[i]);
//     }
// });

/* SALVAR O JSON */
$(function(){
	$('#json_save').click(function(){
        formData = $('#form_configuracoes').serializeArray();
        formData = JSON.stringify(formData);
        console.log(formData)
        $.ajax({
			url: 'http://localhost:1234/save_config',
			data: {form: formData, name_file: $('#nome_arquivo').val() },
			type: 'POST',
			success: function(response){
                console.log("JSON SALVO COM SUCESSO");
                // FUTURO DIÁLOGO (MODAIS) COM SUCESSO .GIF
			},
			error: function(error){
                console.log(error);
                // FUTURO DIÁLOGO (MODAIS) COM ERRO .GIF
			}
		});
	});
});

/* Enabling functions arg */
$(function(){
    $('#rotation').change(function(){
        $('.rotation1')[0].disabled = ! this.checked;
        $('.rotation2')[0].disabled = ! this.checked; 
        $('.rotation3')[0].disabled = ! this.checked; 
    })
})

$(function(){
    $('#zoom').click(function(){
        $('.zoom1')[0].disabled = ! this.checked;
        $('.zoom2')[0].disabled = ! this.checked; 
        $('.zoom3')[0].disabled = ! this.checked; 
    })
})

$(function(){
    $('#shear').click(function(){
        $('.shear1')[0].disabled = ! this.checked;
        $('.shear2')[0].disabled = ! this.checked; 
        $('.shear3')[0].disabled = ! this.checked; 
    })
})

$(function(){
    $('#greyscale').click(function(){
        $('.greyscale1')[0].disabled = ! this.checked; 
    })
})

$(function(){
    $('#interpolation').click(function(){
        $('.interpolation1')[0].disabled = ! this.checked; 
        $('.interpolation2')[0].disabled = ! this.checked; 
    })
})

$(function(){
    $('#random_distortion').click(function(){
        $('.random_distortion1')[0].disabled = ! this.checked; 
        $('.random_distortion2')[0].disabled = ! this.checked; 
        $('.random_distortion3')[0].disabled = ! this.checked; 
        $('.random_distortion4')[0].disabled = ! this.checked; 
    })
})

/* */


/* MODAL CONFIG-OPEN */
$(document).ready(function () {
    $("#myBtn").click(function () {
      $("#myModal").modal();
    });
});

$(document).ready(function () {
    $("#myBtn2").click(function () {
      $("#myModal2").modal();
    });
});
