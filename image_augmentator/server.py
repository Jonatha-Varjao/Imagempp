from __future__ import print_function
import time
from datetime import datetime
from flask import Flask, render_template, request, json

app = Flask(__name__)

"""
    Rotas da API com as chamadas em AJAX (front)
"""

@app.route('/signUpUser', methods=['GET','POST'])
def signUpUser():
    if request.method == 'POST':
        user =  request.form['username'];
        password = request.form['password'];
        return json.dumps({'status':'OK','user':user,'pass':password});

"""
    Save json config to populate the form aplied on the run
"""
@app.route('/save_config', methods=['GET','POST'])
def save_config():
    if request.method == 'POST':
        actual_time = datetime.now()
        form = request.form
        with open('image_augmentator/saved_configs/'+str(actual_time)+'.json', 'w+') as file:
            file.write(str(form))
        return json.dumps(actual_time)
        

if __name__ == "__main__":
    app.run(host='localhost', port=5000)


"""
    TODO: 
        - check one open port and fire the http server
"""    