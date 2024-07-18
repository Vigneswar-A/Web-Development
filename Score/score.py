from base64 import urlsafe_b64decode
from flask import Flask, request, render_template
import re
from secrets import token_hex
from collections import defaultdict

app = Flask(__name__)
app.config['TEMPLATES_AUTO_RELOAD'] = True

# student class
class Student:
    def __init__(self, name, roll, marks, description=''):
        self.name = name
        self.roll = roll
        self.marks = marks
        self.description = description

# generate tokens to maintain session
def generate_random_token(length=32):
    return token_hex(length // 2)

students = defaultdict(list)

@app.route('/')
def index():
    return render_template('index.html')

# validate user inputs
name_pattern = re.compile(r'[a-zA-Z\.]{,20}')
roll_pattern = re.compile(r'\d{9}')
marks_pattern = re.compile(r'(\d{,3},)*(\d{,3})')

# store student information
@app.route('/store', methods=['POST'])
def store():
    try:
        name = request.form.get('name')
        roll = request.form.get('roll')
        marks = request.form.get('marks')
        description = request.form.get('description') or ''
        assert name_pattern.fullmatch(name.replace(' ', '')) 
        assert roll_pattern.fullmatch(roll)
        assert marks_pattern.fullmatch(marks.replace(' ', ''))
        assert len(description) < 200
        marks_list = eval(marks)
        if isinstance(marks_list, tuple):
            assert all(0 <= mark <= 100 for mark in marks_list)
            marks = sum(marks_list)//len(marks_list)
        else:
            marks = int(marks)
            assert 0 <= marks <= 100
        if 'token' in request.form and request.form.get('token') in students:
            token = request.form.get('token')
        else:
            token = generate_random_token()
        student = Student(name, roll, marks, description)
        students[token].append(student)
        return render_template('score.html', students=students[token], token=token)
    except AssertionError:
        return render_template('index.html', message="Invalid Details!")
    

# display student information
@app.route('/load', methods=['GET'])
def load():
    token = request.args.get('token')
    if token in students:
        return render_template('score.html', students=students[token], token=token)
    else:
        return render_template('index.html', message="Invalid Token! You need to create a student first!")

# api to store
@app.route('/store_api', methods=['POST'])
def store_api():
    if 'token' in request.form and request.form.get('token') in students:
        token = request.form.get('token')
    else:
        token = generate_random_token()
    from pickle import loads
    student = loads(urlsafe_b64decode(request.form.get('student')))
    students[token].append(student)
    return render_template('score.html', students=students[token], token=token)

# run the server
if __name__ == '__main__':
    app.run(host='0.0.0.0', use_reloader=True)
