#/usr/bin/env python

from flask import request, session, jsonify, abort, make_response
from flask_restful import Resource, reqparse
from utils.db_util import db_access
from werkzeug.security import generate_password_hash



class Users(Resource):

    def get(self):
        try:
            users = db_access('get_all_users')
            response = users
            responseCode = 200
        except Exception as e:
            response = {'status': 'fail'}
            responseCode = 403
        
        return make_response(jsonify(response), responseCode)

    def post(self):
        
        data = request.get_json()
        if not data:
            return make_response(jsonify({
            'status': 'fail',
            'message': 'Missing request body.'
            }), 400)


        req_fields = ['username', 'password', 'email', 'first_name', 'last_name']

        if not all(field in data for field in req_fields):
            return make_response(jsonify({
                'status': 'fail',
                'message': 'Missing required fields.'
            }), 400)

        
        try:
            hash_pwd = generate_password_hash(data['password'])
            result = db_access('create_user', [
                data['username'],
                data['email'],
                data['first_name'],
                data['last_name'],
                hash_pwd,
                False, # note for store procedure this is account active, not true until verify
                False, # note this is admin same as above ^
            ]);

            if result is None:
                return make_response(jsonify({
                    'status': 'fail',
                    'message': 'User already exists.'
                }), 400);
            
            response = {'status': 'User created'}
            responseCode = 201

        except Exception as e:
            response = {'status': 'fail', 'message': str(e)}
            responseCode = 400
        
        return make_response(jsonify(response), responseCode)

   
class CurrentUser(Resource):

    def get(self):
        if 'user_id' not in session:
            abort(401)
        
        try: 
            user = db_access('get_user_by_id', [session['user_id']])
            response = user
            responseCode = 200
        except Exception as e:
            response = {'status': 'fail', 'message': str(e)}
            responseCode = 403
        
        return make_response(jsonify(response), responseCode)
    
    def put(self):

        if 'user_id' not in session:
            abort(401)
        
        data = request.get_json()
        
        if not data:
            abort(400)
        
        
        req_fields = ['username', 'email', 'first_name', 'last_name']

        if not all(field in data for field in req_fields):
            abort(400)

        try:
            db_access('update_user', [
                session['user_id'],
                data['username'],
                data['email'],
                data['first_name'],
                data['last_name'],
                True,  
                session['is_admin']
            ])
            response = {'status': 'User updated'}
            responseCode = 200
        except Exception as e:
            response = {'status': 'fail', 'message': str(e)}
            responseCode = 400
        
        return make_response(jsonify(response), responseCode)

    def delete(self):
        if 'user_id' not in session:
            abort(401)
        
        try:
            db_access('delete_user', [session['user_id']])
            session.clear()
            response = {'status': 'User removed'}
            responseCode = 200
        except Exception as e:
            response = {'status': 'fail', 'message': str(e)}
            responseCode = 403
        
        return make_response(jsonify(response), responseCode)

class getUserById(Resource):

    def get(self, user_id):
        
        
        try:
            user = db_access('get_user_by_id', [user_id])
            if not user:
                abort(404, 'User not found')
            
            response = user[0]
            responseCode = 200
        except Exception as e:
            response = {'status': 'fail', 'message': str(e)}
            responseCode = 403
        
        return make_response(jsonify(response), responseCode)
    
    def put(self, user_id):

        data = request.get_json()
        if not data:
            abort(400)
        
        req_fields = ['username', 'email', 'first_name', 'last_name', 'active', 'is_admin']

        if not all(field in data for field in req_fields):
            abort(400, 'Missing required fields')
        
        try: 
            db_access('update_user', [
                user_id,
                data['username'],
                data['email'],
                data['first_name'],
                data['last_name'],
                data['active'],
                data['is_admin']
            ])
            response = {'status': 'User updated'}
            responseCode = 200
        except Exception as e:
            response = {'status': 'fail', 'message': str(e)}
            responseCode = 400

        return make_response(jsonify(response), responseCode)
        
    def delete(self, user_id):

        try:
            db_access('delete_user', [user_id])
            response = {'status': 'success', 'message': 'User deleted successfully'}
            responseCode = 200
        except Exception as e:
            response = {'status': 'fail', 'message': str(e)}
            responseCode = 403
        
        return make_response(jsonify(response), responseCode)




def routes(api):
    api.add_resource(Users, '/api/users')
    api.add_resource(CurrentUser, '/api/users/me')
    api.add_resource(getUserById, '/api/users/<int:user_id>')
 
