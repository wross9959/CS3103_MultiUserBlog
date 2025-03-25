#/usr/bin/env python

from flask import request, session, jsonify, abort, make_response
from flask_restful import Resource
from db_util import db_access
import settings
from email_util import send_email



    

class verify(Resource):

    def get(self):

        if 'user_id' not in session:
            abort(400)

        try:
            user_id = session['user_id']
            email = session['email']
            first_name = session.get('first_name', 'user')
            result = db_access('send_verification', [user_id, email])

            if not result or 'token'  not in result[0]:
                abort(400)

            appURL = settings.APP_HOST
            appPort = settings.APP_PORT
            appURL = f"http://{appURL}:{appPort}/verify/{result[0]['token']}"

            token = result[0]['token']
            subject = "UNB Blog Verfiy your account"
            body = f"""
Hi {first_name}, 

Your verification code is:
{token}
Click the link to verify your account: {appURL}
            
Thanks, 
UNB Blog Support
            
This is an automated message, please do not response
"""

            send_email(email, subject, body)
            
            return make_response(jsonify({"status": "success"}), 200)
            
            
        except Exception as e:
            return make_response(jsonify({"status": "error", "message": str(e)}), 500)
        
    def post(self):
        
        if 'user_id' not in session:
            abort(400)
        
        data = request.get_json()

        if not data or 'token' not in data:
            abort(400)
        
        try:
            result = db_access('verify_user', [session['user_id'], data['token']])


            if result and result[0]['status'] == 'success':
                return make_response(jsonify({"status": "Verified"}), 200)
            else:
                return make_response(jsonify({"status": "Invalid token"}), 400)
        except Exception as e:
            return make_response(jsonify({"status": "error", "message": str(e)}), 500)
        

def routes(api):
    api.add_resource(verify, '/api/users/me/verify')

