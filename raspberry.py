# Проверка бд на изменения с заданным интервалом (CHECK_INTERVAL)
# При изменениях отправляет запрос на arduino (ARDUINO_URL)
import threading
from peewee import *
import requests

CHECK_INTERVAL = 1
CURRENT_ID = 0

DATABASE = 'songs_db'
DB_USER = 'root'
DB_SECRET = 'secret'
DB_HOST = '192.168.137.1'
DB_PORT = 3306

ARDUINO_URL = 'http://127.0.0.1:3030/test'

mysql_db = MySQLDatabase(DATABASE,
                         host=DB_HOST,
                         port=DB_PORT,
                         user=DB_USER,
                         password=DB_SECRET)


class BaseModel(Model):
    class Meta:
        database = mysql_db


class Song(BaseModel):
    id = IntegerField(primary_key=True)
    name = CharField()
    author = CharField()
    play = BooleanField()

    class Meta:
        db_table = 'songs'


def set_interval(func, sec):
    def func_wrapper():
        set_interval(func, sec)
        func()

    t = threading.Timer(sec, func_wrapper)
    t.start()
    return t


def check_db():
    global CURRENT_ID
    new_id = 0
    for song in Song.select():
        if song.play:
            new_id = song.id
    print('current id: ' + str(new_id))

    if new_id != CURRENT_ID:
        req_params = {'id': new_id}
        r = requests.get(ARDUINO_URL, params=req_params)
        print('status: ' + str(r.status_code))
        CURRENT_ID = new_id
    return


set_interval(check_db, CHECK_INTERVAL)
