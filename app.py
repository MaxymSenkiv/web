import smtplib
from flask import Flask, render_template, request, jsonify, session as ss
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from models import *

app = Flask(__name__)
app.secret_key = 'key'
engine = create_engine('postgresql://postgres:29.03.2002@localhost/Web')


Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session = Session()


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        if request.form['username'] == "" or request.form['password'] == "":
            return jsonify({'message': 'Invalid data'})
        try:
            temp = session.query(User).filter(User.username == request.form['username']).first()
            if temp.password == request.form['password']:
                ss['username'] = request.form['username']
                ss['password'] = request.form['password']
                ss['id'] = temp.id
                return jsonify({'message': 'Success'})
        except Exception as e:
            return jsonify({'message': 'User not found'})
        return jsonify({'message': 'Enter correct name/password'})
    return render_template('login_index.html')

@app.route('/log_out',methods=['POST'])
def log_out():
    ss['username'] = None
    ss['password'] = None
    ss['id'] = None
    return jsonify({'message': 'Success'})


@app.errorhandler(404)
def page_not_found(e):
    return jsonify({'message': 'error'})


@app.errorhandler(405)
def page_not_found(e):
    return jsonify({'message': 'error'})


@app.route('/menu')
def menu():
    if ss['username']:
        temp = session.query(User).filter(User.username == ss['username']).first()
        return render_template('menu_index.html', username=temp.username)
    else:
        return render_template('login_index.html')


@app.route('/sign_up', methods=['GET', 'POST'])
def sign_up():
    if request.method == 'POST':
        try:
            username = request.form['username']
            email = request.form['email']
            password1 = request.form['password1']
            password2 = request.form['password2']
            if username == '' or email == '' or password1 == '' or password2 == '':
                return jsonify({'message': 'Invalid Data'})
            if password1 != password2:
                return jsonify({'message': 'Different passwords'})
            # if sum(c.isdigit() for c in password1) < 3:
            #     return jsonify({'message': 'Should be at least 3 numbers in password'})
            # if len(password1) < 8:
            #     return jsonify({'message': 'Should be at least 8 signs in password'})
            # if password1.islower():
            #     return jsonify({'message': 'No upper character in password!'})
            # if not email.find('@'):
            #     return jsonify({'message': 'Invalid email'})

            if session.query(User).filter(User.username == request.form['username']).first() != None:
                return jsonify({'message': 'Username Occupied'})
            temp_user = User(username=username, email=email, password=password1)
            session.add(temp_user)
            ss['id'] = session.query(User).filter(User.username == request.form['username']).first().id
            session.commit()
            return jsonify({'message': 'Success'})
        except Exception as e:
            return jsonify({'message': 'Error'})
    return render_template('sign_up_index.html')

if __name__ == "__main__":
    app.run(debug=True, threaded=True)
