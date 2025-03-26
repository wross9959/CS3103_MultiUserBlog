#/usr/bin/env python

from flask import request, session, jsonify, make_response, abort
from flask_restful import Resource
from db_util import db_access


class BlogComments(Resource):
    def get(self, blog_id):
        
        try:
            comments = db_access('get_comments_by_blog_id', [blog_id])
            if not comments:
                abort(404)
            return make_response(jsonify(comments), 200)
        except Exception as e:
            return make_response(jsonify({"status": "error", "message": str(e)}), 500)
    

    def post(self, blog_id):
        if 'user_id' not in session:
            abort(401)

        data = request.get_json()
        req_fields = ['body']
        if not data or not all(field in data for field in req_fields):
            abort(400)
       
        try:
            db_access('create_comment', [blog_id, session['user_id'], data['body']])
            return make_response(jsonify({"status": "Comment created"}), 201)
        except Exception as e:
            return make_response(jsonify({"status": "error", "message": str(e)}), 500)


class CommentById(Resource):

    def put(self, comment_id):
        if 'user_id' not in session:
            abort(401)
        
        data = request.get_json()
        req_fields = ['body']
        if not data or not all(field in data for field in req_fields):
            abort(400)
        
        try:
            db_access('update_comment', [comment_id, data['body']])
            return make_response(jsonify({"status": "Comment updated"}), 200)
        except Exception as e:
            return make_response(jsonify({"status": "error", "message": str(e)}), 500)
        

    def delete(self, comment_id):
        if 'user_id' not in session:
            abort(401)

        try:
            db_access('delete_comment', [comment_id])
            return make_response('', 204)
        except Exception as e:
            return make_response(jsonify({"status": "error", "message": str(e)}), 500)


def routes(api):
    api.add_resource(BlogComments, '/api/blogs/<int:blog_id>/comments')
    api.add_resource(CommentById, '/api/blogs/comments/<int:comment_id>')
