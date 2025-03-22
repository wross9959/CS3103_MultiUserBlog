#/usr/bin/env python
from flask import request, jsonify, make_response, abort
from flask_restful import Resource
from db_util import db_access


class CategoryList(Resource):
    def get(self):
        try:
            cats = db_access('get_all_categories')
            return make_response(jsonify(cats), 200)
        except Exception as e:
            return make_response(jsonify({"status": "error", "message": str(e)}), 500)
    
    def post(self):
        data = request.get_json()
        if not data or 'name' not in data:
            abort(400, 'Invalid input')

        try:
            db_access('create_category', [data['name'], data.get('description', '')])
            return make_response(jsonify({"status": "Category created"}), 201)
        except Exception as e:
            return make_response(jsonify({"status": "error", "message": str(e)}), 500)
       


class CategoryById(Resource):
    def get(self, category_id):
        try:
            res = db_access('get_category_by_id', [category_id])
            if not res:
                abort(404)
            
            return make_response(jsonify(res[0]), 200)
        except Exception as e:
            return make_response(jsonify({"status": "error", "message": str(e)}), 500)
    
    def put(self, category_id):
        
        data = request.get_json()
        req_fields = ['name']
        if not data or not all(field in data for field in req_fields):
            abort(400)
        
        try:
            db_access('update_category', [category_id, data['name'], data.get('description', '')])
            return make_response(jsonify({"status": "Category updated"}), 200)
        except Exception as e:
            return make_response(jsonify({"status": "error", "message": str(e)}), 500)
        
            
    def delete(self, category_id):
        try:
            db_access('delete_category', [category_id])
            return make_response('', 204)
        except Exception as e:
            return make_response(jsonify({"status": "error", "message": str(e)}), 500)


def routes(api):
    api.add_resource(CategoryList, '/api/categories')
    api.add_resource(CategoryById, '/api/categories/<int:category_id>')
