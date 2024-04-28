from sqlalchemy import Column, Integer, String

from config.db import Base, engine

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    email = Column(String)
    topics = Column(String)


Base.metadata.create_all(bind= engine)