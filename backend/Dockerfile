FROM python:3
ENV PYTHONUNBUFFERED=1
WORKDIR /code

# COPY <path-from> <path-to>
COPY requirements.txt /code/
RUN pip install -r requirements.txt

COPY . /code/

ENV AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
ENV AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
ENV POSTGRES_PW=$POSTGRES_PW

EXPOSE 8000
CMD ["python", "backend/manage.py", "runserver", "0.0.0.0:8000"]