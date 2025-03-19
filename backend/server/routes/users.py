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
