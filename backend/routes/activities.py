#/usr/bin/env python

from flask import request, session, jsonify, make_response, abort
from flask_restful import Resource
from utils.db_util import db_access


class ActivityLog(Resource):
    def get(self):
        try:
            Activities = db_access('get_all_activities')
            return make_response(jsonify(Activities), 200)
        except Exception as e:
            return make_response(jsonify({"status": "error", "message": str(e)}), 500)
    def post(self):
        if 'user_id' not in session:
            abort(401)

        data = request.get_json()
        if not data or 'action' not in data:
            abort(400)
        
        try:
            db_access('log_activity', [session['user_id'], data['action']])
            return make_response(jsonify({"status": "Activity logged"}), 201)
        except Exception as e:
            return make_response(jsonify({"status": "error", "message": str(e)}), 500)
    
      
def routes(api):
    api.add_resource(ActivityLog, '/api/activities')