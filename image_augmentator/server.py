from __future__ import print_function
import time
from datetime import datetime
from flask import Flask, render_template, request, json

app = Flask(__name__)

"""
    Rotas da API com as chamadas em AJAX (front)
"""

def parse_json(request):
    """
        THIS IS UGLY AS HELL.....but works
        TODO: 
            - Create a better json structure
            - Parse it, Beatifully
    """
    string_builder_exec = []
    string_builder_exec.append(f'import Augmentor\n')
    
    path_url = request.form['name_file']
    path_list = path_url.split('/')
    relative_path = '/'.join(path_list[:-1])
    string_builder_exec.append(f'p = Augmentor.Pipeline("{relative_path}/")\n')
    print(request.form)
    if request.form['rotation'] == 'true':
        rotation_probability = request.form['rotation_probability']
        rotation_max_left = request.form['max_left_rotation']
        rotation_max_right = request.form['max_right_rotation']
        # rotation_args = [rotation, rotation_probability, rotation_max_left, rotation_max_right]
        string_builder_exec.append(f'p.rotate(probability={rotation_probability}, max_left_rotation={rotation_max_left}, max_right_rotation={rotation_max_right})\n')
    
    if request.form['zoom'] == 'true':
        zoom_probability = request.form['zoom_probability']
        zoom_min_factor = request.form['min_factor']
        zoom_max_factor = request.form['max_factor']
        # zoom_args = [zoom, zoom_probability, zoom_min_factor, zoom_max_factor]
        string_builder_exec.append(f'p.zoom(probability={zoom_probability}, min_factor={zoom_min_factor}, max_factor={zoom_max_factor})\n')
    
    if request.form['shear'] == 'true':
        shear_probability = request.form['shear_probability']
        shear_max_left = request.form['max_shear_left']
        shear_max_right = request.form['max_shear_right']
        # shear_args = [shear, shear_probability, shear_max_left, shear_max_right]
        string_builder_exec.append(f'p.shear(probability={shear_probability}, max_shear_left={shear_max_left}, max_shear_right={shear_max_right})\n')
    
    if request.form['greyscale'] == 'true':
        greyscale_probability = request.form['greyscale_probability']
        # greyscale_args = [greyscale, greyscale_probability]
        string_builder_exec.append(f'p.greyscale(probability={greyscale_probability})\n')
    if request.form['interpolation'] == 'true':
        scale_probability = request.form['scale_probability']
        scale_factor = request.form['scale_factor']
        # scale_args = [scale, scale_probability, scale_factor]        
        string_builder_exec.append(f'p.scale(probability={scale_probability}, scale_factor={scale_factor})\n')
    if request.form['distortion'] == 'true':
        distortion_probability = request.form['distort_probability']
        distortion_grid_width = request.form['grid_width']
        distortion_grid_height = request.form['grid_height']
        distortion_maginitude = request.form['magnitute']
        # distortion_args = [distortion, distortion_probability, distortion_grid_width, distortion_grid_height, distortion_maginitude]    
        string_builder_exec.append(f'p.random_distortion(probability={distortion_probability}, grid_width={distortion_grid_width}, grid_height={distortion_grid_height}, magnitude={distortion_maginitude})\n')
    string_builder_exec.append(f'p.sample(int({request.form["sample"]}))')
    exe = ''.join(string_builder_exec)
    return exe

@app.route('/run_augmentation', methods=['GET','POST'])
def run_augmentation():
    if request.method == 'POST':
        exec(parse_json(request))
        return json.dumps({'status': 'OK'})

@app.route('/signUpUser', methods=['GET','POST'])
def signUpUser():
    if request.method == 'POST':
        user =  request.form['username']
        password = request.form['password']
        return json.dumps({'status':'OK','user':user,'pass':password})

"""
    Save json config to populate the form aplied on the run
"""
@app.route('/save_config', methods=['GET','POST'])
def save_config():
    if request.method == 'POST':
        actual_time = datetime.now()
        file_name = request.form['name_file']
        form = request.form['form']
        with open('image_augmentator/saved_configs/'+str(file_name)+'.json', 'w+') as file:
            file.write(form)
        return json.dumps(actual_time)
        

if __name__ == "__main__":
    app.run(host='localhost', port=1234, threaded=True)


"""
    TODO: 
        - check one open port and fire the http server
"""    