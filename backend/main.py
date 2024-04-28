from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware 
from sqlalchemy.orm import Session

from models import models
from crud import crud
from schemas import schemas
from config.db import SessionLocal, engine


app = FastAPI()

origins = [
    "http://localhost",
    "http://127.0.0.1:5500",
    
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get('/')
def helloWorld():
    return {'hello': 'world'}

@app.post('/user/', response_model=schemas.User)
def create_user(user: schemas.CreateUser, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, user_email = user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.post_user(db=db ,user=user)

@app.get('/user/', response_model=list[schemas.User])
def read_users(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users