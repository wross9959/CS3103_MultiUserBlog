#/usr/bin/env python
import sqlite3
from flask import Flask, flash, render_template, request, redirect, url_for
from flask_restful import Resource, Api
import pymsql.cursors
import cgitb
import cgi
import sys
import json
cgitb.enable()
from db_util import db_access
import settings

app = Flask(__name__, static_url_path='../index.html')
api = Api(app)

app.config['SECRET_KEY'] = 'our_secret_key'
app.config['DATABASE'] = 'database.db'

# Error Handling
@app.errorhandler(400)
def not_found(error):
	return make_response(jsonify( { "status": "Bad request" } ), 400)

@app.errorhandler(404)
def not_found(error):
	return make_response(jsonify( { "status": "Resource not found" } ), 404)

# static endpoint
class Root(Resource):
    def get(self):
        return app.send_static_file('index.html')

api.add_resource(Root, '/')


# User Routes

class get_all_users(Resource):
    def get(self):
        return db_access('get_all_users', [])
        
class get_me(Resource):
    def get(self):
        return db_access('get_me', [])

class verify_user(Resource):
    def post(self):
        data = request.get_json()
        user_id = data.get('user_id')
        verification_code = data.get('verification_code')
        return db_access('verify_user', [user_id, verification_code])
    
class get_all_admin(Resource):
    def get(self):
        return db_access('get_all_admin', [])
    
class get_admin(Resource):
    def get(self, admin_id):
        return db_access('get_admin', [admin_id])

class get_user(Resource):
    def get(self, user_id):
        return db_access('get_user', [user_id])

class reset_my_password(Resource):
    def post(self):
        data = request.get_json()
        user_id = data.get('user_id')
        new_password = data.get('new_password')
        return db_access('reset_my_password', [user_id, new_password])


api.add_resource(get_all_users, '/api/users')
api.add_resource(get_me, 'api/users/me')
api.add_resource(verify_user, '/api/users/me/verify')
api.add_resource(get_all_admin, '/api/users/admin')
api.add_resource(get_admin, '/api/users/admin/<int:admin_id>')
api.add_resource(get_user, '/api/users/<int:user_id>')
api.add_resource(reset_my_password, '/api/users/me/reset_password')


class get_all_roles(Resource):
    def get(self):
        return db_access('get_all_roles', [])

class get_role(Resource):
    def get(self, role_id):
        return db_access('get_role', [role_id])

class get_user_role(Resource):
    def get(self, user_id):
        return db_access('get_user_role', [user_id])

api.add_resource(get_all_roles, '/api/roles')
api.add_resource(get_role, '/api/roles/<int:role_id>')
api.add_resource(get_user_role, '/api/users/<int:user_id>/role')


class get_all_blogs(Resource):
    def get(self):
        return db_access('get_all_blogs', [])

class get_blog(Resource):
    def get(self, blog_id):
        return db_access('get_blog', [blog_id])

class get_blog_by_user(Resource):
    def get(self, user_id):
        return db_access('get_blog_by_user', [user_id])

class get_all_blog_comments(Resource):
    def get(self, blog_id):
        return db_access('get_all_blog_comments', [blog_id])

class get_comment_on_blog(Resource):
    def get(self, blog_id, comment_id):
        return db_access('get_comment_on_blog', [blog_id, comment_id])


api.add_resource(get_all_blogs, '/api/blogs')
api.add_resource(get_blog, '/api/blogs/<int:blog_id>')
api.add_resource(get_blog_by_user, '/api/blogs/<int:user_id>')
api.add_resource(get_all_blog_comments, '/api/blogs/<int:blog_id>/comments')
api.add_resource(get_comment_on_blog, '/api/blogs/<int:blog_id>/comments/<int:comment_id>')


class get_all_categories(Resource):
    def get(self):
        return db_access('get_all_categories', [])

class get_category(Resource):
    def get(self, category_id):
        return db_access('get_category', [category_id])



api.add_resource(get_all_categories, '/api/categories')
api.add_resource(get_category, '/api/categories/<int:category_id>')

class user_follows(Resource):
    def get(self, user_id):
        return db_access('user_follows', [user_id])

class get_all_followers(Resource):
    def get(self, user_id):
        return db_access('get_all_followers', [user_id])
    

api.add_resource(user_follows, '/api/users/<int:user_id>/follows')
api.add_resource(get_all_followers, '/api/users/<int:user_id>/followers')

class follow_user(Resource):
    def post(self, user_id, follow_user_id):
        return db_access('follow_user', [user_id, follow_user_id])

class unfollow_user(Resource):
    def post(self, user_id, unfollow_user_id):
        return db_access('unfollow_user', [user_id, unfollow_user_id])


api.add_resource(follow_user, '/api/users/<int:user_id>/follow/<follow_user_id>')
api.add_resource(unfollow_user, '/api/users/<int:user_id>/unfollow/<unfollow_user_id>')

class get_all_activities(Resource):
    def get(self):
        return db_access('get_all_activities', [])

class get_activity(Resource):
    def get(self, activity_id):
        return db_access('get_activity', [activity_id])

api.add_resource(get_all_activities, '/api/activities')
api.add_resource(get_activity, '/api/activities/<activity_id>')


if __name__ == '__main__':
    app.run(host=settings.APP_HOST, port=settings.APP_PORT, debug=settings.DEBUG)