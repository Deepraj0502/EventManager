from django.shortcuts import render
import mysql.connector
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json


# Creating connection to database
mydb=mysql.connector.connect(
    host="localhost",
    user="root",
    password="deep",
    database="eventmanager"
)
cursor=mydb.cursor()

#global variables
email= ""
password=""
yourevents=""
globalevents=""
likedevents=""
    
# login page
@csrf_exempt
def index(request):
    global email,password,yourevents
    message="fail"
    if(request.method=="POST"):
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        email = body['email']
        password = body['password']
        sql="SELECT * FROM user_info WHERE email='"+email+"' AND password='"+password+"'"
        cursor.execute(sql)
        data=cursor.fetchall()
        if(len(data)>0):
            message="success"
    response = JsonResponse({'login': message}) 
    return response

# registration page
@csrf_exempt
def reg(request):
    if(request.method=="POST"):
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        name = body['name']
        email = body['email']
        password = body['password']
        sql="INSERT INTO user_info VALUES(%s,%s,%s)"
        val=(name,email,password)
        cursor.execute(sql,val)
        mydb.commit()
    response = JsonResponse({'login': "success"}) 
    return response

#get mail id for navbar
@csrf_exempt
def getmail(request):
    global email
    response = JsonResponse({'email': email}) 
    return response

# add event to database
@csrf_exempt
def addevent(request):
    global email
    if(request.method=="POST"):
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        name = body['name']
        date = body['date']
        loc = body['loc']
        time=body['time']
        image=body['image']
        sql="INSERT INTO events VALUES(%s,%s,%s,%s,%s,%s,%s)"
        val=(email,name,date,loc,"false",image,time)
        cursor.execute(sql,val)
        mydb.commit()
    response = JsonResponse({'event': "success"}) 
    return response

# get data of your events
@csrf_exempt
def getyourevents(request):
    global events
    sql="SELECT * FROM events WHERE user='"+email+"'"
    cursor.execute(sql)
    yourevents=cursor.fetchall()
    response = JsonResponse({'events': yourevents}) 
    return response

# get data for global events
@csrf_exempt
def getglobalevents(request):
    global events
    sql="SELECT * FROM events"
    cursor.execute(sql)
    globalevents=cursor.fetchall()
    response = JsonResponse({'events': globalevents}) 
    return response

# get liked events by particular user
@csrf_exempt
def getlikedevents(request):
    global events
    sql="SELECT * FROM events WHERE user='"+email+"' AND isliked='true'"
    cursor.execute(sql)
    likedevents=cursor.fetchall()
    response = JsonResponse({'events': likedevents}) 
    return response

# add like in database
@csrf_exempt
def addlike(request):
    if(request.method=="POST"):
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        name = body['name']
        sql='UPDATE events SET isliked="true" WHERE name="'+name+'"'
        cursor.execute(sql)
        mydb.commit()
    response = JsonResponse({'like': "success"}) 
    return response

# remove like in database
@csrf_exempt
def removelike(request):
    if(request.method=="POST"):
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        name = body['name']
        sql='UPDATE events SET isliked="false" WHERE name="'+name+'"'
        cursor.execute(sql)
        mydb.commit()
    response = JsonResponse({'like': "success"}) 
    return response