#/usr/bin/env python

import pymysql
import settings

def db_access(proc_name, params=None):
    params = params or []

    connection = pymysql.connect(
        host=settings.DB_HOST,
        user=settings.DB_USER,
        password=settings.DB_PASSWD,
        database=settings.DB_DATABASE,
        cursorclass=pymysql.cursors.DictCursor
    )

    try:
        with connection.cursor() as cursor:
            cursor.callproc(proc_name, params)
            result = cursor.fetchall()
        connection.commit()
        return result
    except Exception as e:
        print("DB Error:", e)
        return {"error": str(e)}
    finally:
        connection.close()
