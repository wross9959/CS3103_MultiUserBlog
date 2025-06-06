#/usr/bin/env python

from flask import request, session, make_response, jsonify, abort
from flask_restful import Resource
from utils.db_util import db_access
from utils.email_util import send_email
import settings

class resetPassword(Resource):

    def get(self):

        if 'user_id' not in session:
            abort(401)
        
        try:
            user_id = session['user_id']
            email = session['email']
            result = db_access('gen_password_token', [user_id, email])

            if not result or 'token' not in result[0]:
                abort(400)
            
            appURL = settings.APP_HOST
            appPort = settings.APP_PORT
            appURL = f"http://{appURL}:{appPort}/verify/{result[0]['token']}"

            token = result[0]['token']
            subject = "UNB Blog Verfiy your account"
            body = f"Hi, \n\n Your password reset code is: \n {token} \n\n Click the link to change your account: {appURL} \n\n Thanks,\n UNB Blog Support \n\n This is an automated message, please do not response"
            
            if send_email(email, subject, body):
                return make_response(jsonify({"status": "success"}), 200)
            else:
                return make_response(jsonify({"status": "fail"}), 500)
        
        except Exception as e:
            return make_response(jsonify({"status": "error", "message": str(e)}), 500)
        
    def post(self):

        if 'user_id' not in session:
            abort(401)
        
        data = request.get_json()
        if not data or 'token' not in data or 'new_password' not in data:
            abort(400)
        
        try:
            results = db_access('reset_password', [session['user_id'], data['token'], data['new_password']])

            if results and results[0]['status'] == 'success':
                return make_response(jsonify({"status": "Password reset"}), 200)
            else:
                return make_response(jsonify({"status": "fail"}), 500)
        except Exception as e:
            return make_response(jsonify({"status": "error", "message": str(e)}), 500)
        

def routes(api):
    api.add_resource(resetPassword, '/api/users/me/reset-password')
