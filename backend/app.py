#/usr/bin/env python

from flask import Flask, jsonify, make_response
from flask_restful import Api
from flask_session import Session
import settings

import cgitb
import cgi
import sys
cgitb.enable()

app = Flask(__name__, static_url_path='/static', static_folder='../frontend')
app.secret_key = settings.SECRET_KEY
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_COOKIE_NAME'] = 'The Cookie Monster'
app.config['SESSION_COOKIE_DOMAIN'] = settings.APP_HOST
Session(app)

api = Api(app)

# Error handling 
@app.errorhandler(400)
def bad_request(error):
    return make_response(jsonify({'status': 'Bad request'}), 400)

@app.errorhandler(401)
def unauthorized(error):
    return make_response(jsonify({'status': 'Unauthorized'}), 401)

@app.errorhandler(403)
def forbidden(error):
    return make_response(jsonify({'status': 'Forbidden'}), 403)

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'status': 'Resource not found'}), 404)

# serve the index.html file on the root route
@app.route('/', methods=['GET'])
def index():
    return app.send_static_file('index.html')

# import all the routes 
from routes import (
    auth,
    users,
    verify,
    reset,
    admin,
    roles,
    blogs,
    comments,
    categories,
    follows,
    activities
)

# all routes
auth.routes(api)
users.routes(api)
verify.routes(api)
reset.routes(api)
admin.routes(api)
roles.routes(api)
blogs.routes(api)
comments.routes(api)
categories.routes(api)
follows.routes(api)
activities.routes(api)


# main for app
if __name__ == '__main__':
    context = ('cert.pem', 'key.pem')
    app.run(host=settings.APP_HOST, port=settings.APP_PORT, debug=settings.APP_DEBUG, ssl_context=context)
