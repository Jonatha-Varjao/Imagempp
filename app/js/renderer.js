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
    var form = document.getElementById( "form_configuracoes" );
    var output = document.getElementById( "output_configuracoes" );
    json = toJSONString( form );
    output.innerHTML = json;
    ipcRenderer.send('teste-disney', json);
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
			url: 'http://localhost:5000/signUpUser',
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

/* SALVAR O JSON */
$(function(){
	$('#json_save').click(function(){
		$.ajax({
			url: 'http://localhost:5000/save_config',
			data: $('#form_configuracoes').serialize(),
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


/* MODAL CONFIG-OPEN */
$(document).ready(function () {
    $("#myBtn").click(function () {
      $("#myModal").modal();
    });
});