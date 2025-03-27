#/usr/bin/env python
from flask import session, make_response, jsonify, abort
from flask_restful import Resource
from db_util import db_access


class Following(Resource):
    def get(self, user_id):
        try:
            result = db_access('get_user_follows', [user_id])
            return make_response(jsonify(result), 200)
        except Exception as e:
            return make_response(jsonify({"status": "error", "message": str(e)}), 500)

class Followers(Resource):
    def get(self, user_id):
        try:
            result = db_access('get_user_followers', [user_id]) 
            return make_response(jsonify(result), 200)
        except Exception as e:
            return make_response(jsonify({"status": "error", "message": str(e)}), 500)



class FollowUser(Resource):
    def post(self, user_id, follow_id):
        if 'user_id' not in session or session['user_id'] != user_id:
            abort(403)

        try:
            db_access('follow_user', [user_id, follow_id])
            return make_response(jsonify({"status": "user followed"}), 200)
        except Exception as e:
            return make_response(jsonify({"status": "error", "message": str(e)}), 500)
    
    def delete(self, user_id, follow_id):
        if 'user_id' not in session or session['user_id'] != user_id:
            abort(403)

        try:
            db_access('unfollow_user', [user_id, follow_id])
            return make_response(jsonify({"status": "user unfollowed"}), 200)
        except Exception as e:
            return make_response(jsonify({"status": "error", "message": str(e)}), 500)


def routes(api):
    api.add_resource(Following, '/api/users/<int:user_id>/follows')
    api.add_resource(FollowUser, '/api/users/<int:user_id>/follows/<int:follow_id>')
    api.add_resource(Followers, '/api/users/<int:user_id>/followers')