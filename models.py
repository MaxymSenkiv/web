from datetime import timedelta
from flask import Flask, render_template, request, jsonify, session as ss, json
from sqlalchemy import Column, Integer, String, ForeignKey, Table
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.ext.mutable import Mutable
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.orm import relationship


Base = declarative_base()
playlist = Table('playlist', Base.metadata,
                     Column('user_id', Integer, ForeignKey('users.id')),
                     Column('song_id', Integer, ForeignKey('songs.id'))
                     )
                
class User(Base):
    __tablename__ = "users"

    id = Column('id', Integer, primary_key=True)
    username = Column('name', String)
    email = Column('email', String)
    password = Column('password', String)
    playlist = relationship("Song", secondary=playlist)


    def __init__(self, username=None, email=None, password=None):
        self.username = username
        self.email = email
        self.password = password

class Song(Base):
    __tablename__ = "songs"

    id = Column('id', Integer, primary_key=True)
    title = Column('title', String)


    def __init__(self, title=None):
        self.title = title