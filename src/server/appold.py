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

@app.route('/')
def index():
    conn = sqlite3.connect(app.config['DATABASE'])

# User Routes

def users(Resource):

    def get(self):
        users = db_access('get_users', [])
        return jsonify(users)
    
    def post(self):
        data = request.get_json()
        username = data['username']
        password = data['password']
        email = data['email']
        first_name = data['first_name']
        last_name = data['last_name']

        db_access('add_user', [username, password, email, first_name, last_name])
        return jsonify({'status': 'User added successfully'})
    
api.add_resource(users, '/users')

def users_id(Resource):

    def get(self, user_id):
        user = db_access('get_user_by_id', [user_id])
        if not user:
            return jsonify({'status': 'User not found'})
        return jsonify(user)
    
    def put(self, user_id):
        data = request.get_json()
        username = data['username']
        password = data['password']
        email = data['email']
        first_name = data['first_name']
        last_name = data['last_name']

        db_access('update_user', [user_id, username, password, email, first_name, last_name])
        return jsonify({'status': 'User updated successfully'})
    
    def delete(self, user_id):
        db_access('delete_user', [user_id])
        return jsonify({'status': 'User deleted successfully'})

api.add_resource(users_id, '/users/<int:user_id>')

def users_verify(Resource):

    def get(self, user_id):
        user = db_access('get_user_by_id', [user_id])
        if not user:
            return jsonify({'status': 'User not found'})
        return jsonify(user)

    def post(self, user_id):
        data = request.get_json()
        username = data['username']
        password = data['password']

        user = db_access('verify_user', [username, password])
        if not user:
            return jsonify({'status': 'Invalid credentials'})
        return jsonify(user)

api.add_resource(users_verify, '/users/<int:user_id>/verify')

def users_resetPassword(Resource):

    def get(self, user_id):
        user = db_access('get_user_by_id', [user_id])
        if not user:
            return jsonify({'status': 'User not found'})
        return jsonify(user)

    def post(self, user_id):
        data = request.get_json()
        new_password = data['new_password']

        db_access('reset_password', [user_id, new_password])
        return jsonify({'status': 'Password reset successfully'})

api.add_resource(users_resetPassword, '/users/<int:user_id>/resetPassword')

def roles(Resource):

    def get(self):
        roles = db_access('get_roles', [])
        return jsonify(roles)
    
    def post(self):
        data = request.get_json()
        role_name = data['role_name']

        db_access('add_role', [role_name])
        return jsonify({'status': 'Role added successfully'})
    
api.add_resource(roles, '/roles')

def roles_id(Resource):
    def get(self, role_id):
        role = db_access('get_role_by_id', [role_id])
        if not role:
            return jsonify({'status': 'Role not found'})
        return jsonify(role)
    
    def delete(self, role_id):
        db_access('delete_role', [role_id])
        return jsonify({'status': 'Role deleted successfully'})

api.add_resource(roles_id, '/roles/<int:role_id>')

def roles_users(Resource):

    def get(self, role_id):
        users = db_access('get_users_by_role', [role_id])
        return jsonify(users)

    def post(self, role_id):
        data = request.get_json()
        user_id = data['user_id']

        db_access('assign_user_to_role', [user_id, role_id])
        return jsonify({'status': 'User assigned to role successfully'})

api.add_resource(roles_users, '/roles/<int:role_id>/users')

def role_user_change(Resource):

    def delete(self, role_id, user_id):
        db_access('remove_user_from_role', [user_id, role_id])
        return jsonify({'status': 'User removed from role successfully'})

api.add_resource(role_user_change, '/roles/<int:role_id>/users/<int:user_id>')


def blog(Resource):

    def get(self):
        blogs = db_access('get_blogs', [])
        return jsonify(blogs)
    
    def post(self):
        data = request.get_json()
        title = data['title']
        content = data['content']
        author_id = data['author_id']

        db_access('add_blog', [title, content, author_id])
        return jsonify({'status': 'Blog added successfully'})

api.add_resource(blog, '/blog')

def blog_id(Resource): 
    
    def get(self, blog_id):
        blog = db_access('get_blog_by_id', [blog_id])
        if not blog:
            return jsonify({'status': 'Blog not found'})
        return jsonify(blog)
    
    def put(self, blog_id):
        data = request.get_json()
        title = data['title']
        content = data['content']
        author_id = data['author_id']
        db_access('update_blog', [blog_id, title, content, author_id])
        return jsonify({'status': 'Blog updated successfully'})
    
    def delete(self, blog_id):  
        db_access('delete_blog', [blog_id])
        return jsonify({'status': 'Blog deleted successfully'})

api.add_resource(blog_id, '/blog/<int:blog_id>')

def blog_userId(Resource):

    def get(self, blog_id):
        users = db_access('get_users_by_blog', [blog_id])
        return jsonify(users)

    def post(self, blog_id):
        data = request.get_json()
        user_id = data['user_id']

        db_access('assign_user_to_blog', [user_id, blog_id])
        return jsonify({'status': 'User assigned to blog successfully'})

api.add_resource(blog_userId, '/blog/<int:blog_id>/users')

def blog_comments(Resource):

    def get(self, blog_id):
        comments = db_access('get_comments_by_blog', [blog_id])
        return jsonify(comments)

    def post(self, blog_id):
        data = request.get_json()
        content = data['content']
        author_id = data['author_id']

        db_access('add_comment', [blog_id, content, author_id])
        return jsonify({'status': 'Comment added successfully'})

api.add_resource(blog_comments, '/blog/<int:blog_id>/comments')

def blog_comments_id(Resource):

    def get(self, comment_id):
        comment = db_access('get_comment_by_id', [comment_id])
        if not comment:
            return jsonify({'status': 'Comment not found'})
        return jsonify(comment)

    def put(self, comment_id):
        data = request.get_json()
        content = data['content']
        author_id = data['author_id']

        db_access('update_comment', [comment_id, content, author_id])
        return jsonify({'status': 'Comment updated successfully'})

    def delete(self, comment_id):
        db_access('delete_comment', [comment_id])
        return jsonify({'status': 'Comment deleted successfully'})

api.add_resource(blog_comments_id, '/blog/comments/<int:comment_id>')


def categories(Resource):

    def get(self):
        categories = db_access('get_categories', [])
        return jsonify(categories)
    
    def post(self):
        data = request.get_json()
        category_name = data['category_name']

        db_access('add_category', [category_name])
        return jsonify({'status': 'Category added successfully'})

api.add_resource(categories, '/categories')

def categories_id(Resource):
    def get(self, category_id):
        category = db_access('get_category_by_id', [category_id])
        if not category:
            return jsonify({'status': 'Category not found'})
        return jsonify(category)
    
    def put(self, category_id):
        data = request.get_json()
        category_name = data['category_name']

        db_access('update_category', [category_id, category_name])
        return jsonify({'status': 'Category updated successfully'})
    
    def delete(self, category_id):
        db_access('delete_category', [category_id])
        return jsonify({'status': 'Category deleted successfully'})

api.add_resource(categories_id, '/categories/<int:category_id>')


def categories_blog(Resource):

    def get(self, category_id):
        blogs = db_access('get_blogs_by_category', [category_id])
        return jsonify(blogs)

    def post(self, category_id):
        data = request.get_json()
        blog_id = data['blog_id']

        db_access('assign_blog_to_category', [blog_id, category_id])
        return jsonify({'status': 'Blog assigned to category successfully'})

api.add_resource(categories_blog, '/categories/<int:category_id>/blogs')


def follows(Resource):

    def get(self):
        follows = db_access('get_follows', [])
        return jsonify(follows)
    
    def post(self):
        data = request.get_json()
        follower_id = data['follower_id']
        followed_id = data['followed_id']

        db_access('add_follow', [follower_id, followed_id])
        return jsonify({'status': 'Follow added successfully'}) 

api.add_resource(follows, '/follows')

def follows_id(Resource):
    def get(self, follow_id):
        follow = db_access('get_follow_by_id', [follow_id])
        if not follow:
            return jsonify({'status': 'Follow not found'})
        return jsonify(follow)
    
    def delete(self, follow_id):
        db_access('delete_follow', [follow_id])
        return jsonify({'status': 'Follow deleted successfully'})
    
api.add_resource(follows_id, '/follows/<int:follow_id>')


def follows_user(Resource):

    def get(self, user_id):
        follows = db_access('get_follows_by_user', [user_id])
        return jsonify(follows)

    def post(self, user_id):
        data = request.get_json()
        followed_id = data['followed_id']

        db_access('add_follow', [user_id, followed_id])
        return jsonify({'status': 'Follow added successfully'})
    
api.add_resource(follows_user, '/follows/<int:user_id>/followed')


def follows_user_id(Resource):
    def get(self, user_id, followed_id):
        follow = db_access('get_follow_by_user', [user_id, followed_id])
        if not follow:
            return jsonify({'status': 'Follow not found'})
        return jsonify(follow)

    def delete(self, user_id, followed_id):
        db_access('delete_follow', [user_id, followed_id])
        return jsonify({'status': 'Follow deleted successfully'})
    
api.add_resource(follows_user_id, '/follows/<int:user_id>/followed/<int:followed_id>')


def activities(Resource):

    def get(self):
        activities = db_access('get_activities', [])
        return jsonify(activities)
    
    def post(self):
        data = request.get_json()
        activity_name = data['activity_name']

        db_access('add_activity', [activity_name])
        return jsonify({'status': 'Activity added successfully'})

api.add_resource(activities, '/activities')








# Account Routes


# Following Routes

# Blog Routes

# Comment Routes



if __name__ == '__main__':
    app.run(host=settings.APP_HOST, port=settings.APP_PORT, debug=settings.DEBUG)

