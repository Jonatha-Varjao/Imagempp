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
    /* - chamar o python-shell e rodar as configurações -  */
    event.preventDefault();
    var form = document.getElementById( "test" );
    var output = document.getElementById( "output" );
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
