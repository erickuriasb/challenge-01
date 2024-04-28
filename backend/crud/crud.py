from sqlalchemy.orm import Session
from models import models
from schemas import schemas

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_email(db: Session, user_email: str):
    return db.query(models.User).filter(models.User.email == user_email).first()


def post_user(db: Session, user: schemas.CreateUser):
    user_topics = [topic.topic for topic in user.topics]
    user_topics = ", ".join(item for item in user_topics)
    db_user = models.User(name = user.name, email = user.email, topics = user_topics)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_users(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.User).offset(skip).limit(limit).all()