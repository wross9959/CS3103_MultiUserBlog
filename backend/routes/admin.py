#/usr/bin/env python

from flask import request, session, jsonify, abort, make_response
from flask_restful import Resource
from db_util import db_access
import settings
from email_util import send_email


def admin_req():
    if 'is_admin' not in session or not session['is_admin']:
        abort(403, "Access denied")


class Admin(Resource):

    def get(self):
        admin_req()

        try:
            users = db_access('get_all_users')
            return make_response(jsonify(users), 200)
        except Exception as e:
            return make_response(jsonify({"status": "error", "message": str(e)}), 500)
    
class AdminUserById(Resource):
    def get(self, user_id):
        admin_req()
        try:
            user = db_access('get_user_by_id', [user_id])
            if not user:
                abort(404)
            return make_response(jsonify(user[0]), 200)
        except Exception as e:
            return make_response(jsonify({'error': str(e)}), 500)

    def delete(self, user_id):
        admin_req()
        try:
            db_access('delete_user', [user_id])
            return make_response('', 204)
        except Exception as e:
            return make_response(jsonify({'error': str(e)}), 500)
        
def routes(api):
    api.add_resource(Admin, '/api/admin/users')
    api.add_resource(AdminUserById, '/api/admin/users/<int:user_id>')