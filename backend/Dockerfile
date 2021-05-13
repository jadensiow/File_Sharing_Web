FROM python:3
ENV PYTHONUNBUFFERED=1
WORKDIR /code

# COPY <path-from> <path-to>
COPY requirements.txt /code/
RUN pip install -r requirements.txt

COPY . /code/

EXPOSE 8000
CMD ["python", "backend/manage.py", "runserver", "0.0.0.0:8000"]