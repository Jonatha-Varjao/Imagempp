# Imagem++ < subject to changes >

Imagem++ is a dekstop software powered by electron and flask web server, the object is to apply data augmentation on images databases, the data-augmentation procedures used were implemented by the [Augmentator](https://github.com/mdbloice/Augmentor)
[![PyPI](https://img.shields.io/badge/Augmentor-v0.2.3-blue.svg?maxAge=2592000)](https://pypi.python.org/pypi/Augmentor) [![Supported Python Versions](https://img.shields.io/badge/python-%203+-blue.svg)](https://pypi.python.org/pypi/Augmentor) [![License](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat)](LICENSE.md)

### Instalation
Imagem++ uses [Electron](https://electronjs.org/) and [Python](https://www.python.org/), the repository has a Pipfile, for python dev depencies, and a package.json for node modules dependency, the software still available only on development status.

#### Python dependecy
```shellscript
$user@hostname:~$<path-to-clonned-repo> pipenv install
```
#### Running local server
```shellscript
$(virtual_env)user@hostname:~$<path-to-clonned-repo> uvicorn main:app --reload 
```
#### Node dependency
```
$user@hostname:~$<path-to-clonned-repo> npm install
```

#### Start the Application
```
$user@hostname:~$<path-to-clonned-repo> npm start
```

### TODO's
Feel free to open a issue or propose a pull request, all the TODOs will be displayed at the issue tracker.