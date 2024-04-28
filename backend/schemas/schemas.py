from pydantic import BaseModel


class Topic(BaseModel):
    topic: str


class CreateUser(BaseModel):
    name: str
    email: str
    topics: list[Topic] = []


class User(BaseModel):
    id: int
    name: str
    email: str
    topics: str

    class Config:
        from_attributes = True