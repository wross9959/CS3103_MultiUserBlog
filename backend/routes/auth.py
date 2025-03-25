#/usr/bin/env python

from flask import request, session, make_response, jsonify, abort
from flask_restful import Resource
from db_util import db_access



class SignIn(Resource):

    def post(self):

        data = request.get_json()
        if not data or 'email' not in data or 'password' not in data:
           abort(400, 'Invalid input') 


        try:
            user = db_access('login_user', [data['email'], data['password']])
            if user:
                user = user[0]
                session['user_id'] = user['id']
                session['username'] = user['username']
                session['email'] = user['email']
                session['is_admin'] = user['admin']

                response = {'status': 'success', 'user': user}
                responseCode = 200
            else:
                response = {'status': 'Invalid Credentials'}
                responseCode = 403
        
        except Exception as e:
            response = {'status': 'error', 'message': str(e)}
            responseCode = 500
        
        return make_response(jsonify(response), responseCode)


    def get(self):
        if 'username' in session:
            return make_response(jsonify({"status": "success"}), 200)
        else:
            return make_response(jsonify({"status": "fail"}), 403)

    def delete(self):
        if 'username' in session:
            session.clear()
            return make_response(jsonify({"status": "Success"}), 200)
        else:
            return make_response(jsonify({"status": "Access denied"}), 403)



class SignOut(Resource):

    def delete(self):
        if 'username' in session:
            session.clear()
            return make_response(jsonify({"status": "Success"}), 200)
        else:
            return make_response(jsonify({"status": "Failed logout"}), 403)


class Me(Resource):

    def get(self):
        if 'username' in session:
            user = {
                'user_id': session['user_id'],
                'username': session['username'],
                'email': session['email'],
                'is_admin': session['is_admin']
            }
            return make_response(jsonify({"status": "success", "user": user}), 200)

        else:
            return make_response(jsonify({"status": "fail"}), 403)

def routes(api):
    api.add_resource(SignIn, '/api/signin')
    api.add_resource(SignOut, '/api/signout')
    api.add_resource(Me, '/api/users/me') 
