FROM python:3.8.6-buster

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt
COPY . .
COPY ./images/unnamed.jpg /home/cuzkov/www.m-skull.ru/users/
COPY ./images/unnamed.jpg /home/cuzkov/www.m-skull.ru/users/home/cuzkov/www.m-skull.ru/users/unnamed.jpg


CMD ["uwsgi", "--emperor", "*/uwsgi.ini"]
