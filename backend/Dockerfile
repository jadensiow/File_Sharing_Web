FROM python:3
ENV PYTHONUNBUFFERED=1
WORKDIR /code

# COPY <path-from> <path-to>
COPY requirements.txt /code/
RUN pip install -r requirements.txt

RUN python -m venv new-env
RUN ./new-env/Scripts/activate
RUN python backend/manage.py makemigrations accounts
RUN python backend/manage.py makemigrations videos
RUN python backend/manage.py migrate videos
RUN python backend/manage.py migrate accounts

COPY . /code/

EXPOSE 8000
CMD ["python", "backend/manage.py", "runserver", "0.0.0.0:8000"]