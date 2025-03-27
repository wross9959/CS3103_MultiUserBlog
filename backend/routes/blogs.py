#/usr/bin/env python

from flask import request, session, jsonify, make_response, abort
from flask_restful import Resource
from werkzeug.utils import secure_filename
from utils.db_util import db_access



class BlogList(Resource):

    def get(self):

        try:
            blogs = db_access('get_all_blogs')
            return make_response(jsonify(blogs), 200)
        
        except Exception as e:
            return make_response(jsonify({"status": "error", "message": str(e)}), 500)
    
    def post(self):

        if 'user_id' not in session:
            abort(401)
        
        data = request.get_json()
        req_fields = ['title', 'body', 'status']

        if not data or not all(field in data for field in req_fields):
            abort(400)

        image_url = data.get('image_url')

        try: 
            db_access('create_blog', [data['title'], data['body'], session['user_id'], data['status'], image_url])
            return make_response(jsonify({"status": "Blog created"}), 201)
        except Exception as e:
            return make_response(jsonify({"status": "error", "message": str(e)}), 500)
        
class BlogById(Resource):

    def get(self, blog_id):

        if not blog_id:
            abort(400)

        try:
            blog = db_access('get_blog_by_id', [blog_id])

            if not blog:
                abort(404)
            
            return make_response(jsonify(blog[0]), 200)
        except Exception as e:
            return make_response(jsonify({"status": "error", "message": str(e)}), 500)
    
    def put(self, blog_id):
        if 'user_id' not in session:
            abort(401)

        data = request.get_json()
        req_fields = ['title', 'body', 'status']

        if not data or not all(field in data for field in req_fields):
            abort(400)

        image_url = data.get('image_url')

        try:
            db_access('update_blog', [blog_id, data['title'], data['body'], data['status'], image_url])
            return make_response(jsonify({"status": "Blog updated"}), 200)
        except Exception as e:
            return make_response(jsonify({"status": "error", "message": str(e)}), 500)

    def delete(self, blog_id):
        if 'user_id' not in session:
            abort(401)

        if not blog_id:
            abort(400)

        try:
            db_access('delete_blog', [blog_id])
            return make_response(jsonify({"status": "Blog deleted"}), 200)
        except Exception as e:
            return make_response(jsonify({"status": "error", "message": str(e)}), 500)

class UserBlogs(Resource):

    def get(self, user_id):
        if not user_id:
            abort(400)

        try:
            blogs = db_access('get_user_blogs', [user_id])
            return make_response(jsonify(blogs), 200)
        except Exception as e:
            return make_response(jsonify({"status": "error", "message": str(e)}), 500)




def routes(api):
    api.add_resource(BlogList, '/api/blogs')
    api.add_resource(BlogById, '/api/blogs/<int:blog_id>')
    api.add_resource(UserBlogs, '/api/users/<int:user_id>/blogs')
