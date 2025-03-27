#/usr/bin/env python

from flask import request, jsonify, make_response, abort
from flask_restful import Resource
from utils.db_util import db_access


class RoleList(Resource):
    def get(self):
        try:
            roles = db_access('get_all_roles')
            return make_response(jsonify(roles), 200)
        except Exception as e:
            return make_response(jsonify({"status": "error", "message": str(e)}), 500)
        
    def post(self):
        data = request.get_json()
        if not data or 'role' not in data:
            abort(400)

        try:
            db_access('create_role', [data['role']])
            return make_response(jsonify({"status": "Role created"}), 201)
        except Exception as e:
            return make_response(jsonify({"status": "error", "message": str(e)}), 500)

class RoleById(Resource):
    def get(self, role_id):
        try:
            role = db_access('get_role_by_id', [role_id])

            if not role:
                abort(404)
            
            return make_response(jsonify(role[0]), 200)
        
        except Exception as e:
            return make_response(jsonify({"status": "error", "message": str(e)}), 500)
        
    def delete(self, role_id):
        
        try:
            db_access('delete_role', [role_id])
            return make_response('', 204)
        except Exception as e:
            return make_response(jsonify({"status": "error", "message": str(e)}), 500)
        

class UserRoles(Resource):
  
    def get(self, user_id):
        try:
            roles = db_access('get_user_roles', [user_id])
            return make_response(jsonify(roles), 200)
        except Exception as e:
            return make_response(jsonify({"status": "error", "message": str(e)}), 500)

    def post(self, user_id):
        data = request.get_json()
        if not data or 'role_id' not in data:
            abort(400)

        try:
            db_access('add_role_to_user', [user_id, data['role_id']])
            return make_response(jsonify({"status": "Role added"}), 201)
        except Exception as e:
            return make_response(jsonify({"status": "error", "message": str(e)}), 500)

class RemoveUserRole(Resource):
    def delete(self, user_id, role_id):
        try:
            db_access('remove_role_from_user', [user_id, role_id])
            return make_response('', 204)
        except Exception as e:
            return make_response(jsonify({"status": "error", "message": str(e)}), 500)


def routes(api):
    api.add_resource(RoleList, '/api/roles')
    api.add_resource(RoleById, '/api/roles/<int:role_id>')
    api.add_resource(UserRoles, '/api/roles/<int:user_id>')
    api.add_resource(RemoveUserRole, '/api/roles/<int:user_id>/<int:role_id>')
