FROM python:3
ENV PYTHONUNBUFFERED=1
WORKDIR /code

# COPY <path-from> <path-to>
COPY requirements.txt /code/
CMD[("python", "-m", "venv ", "new-env");
RUN pip install -r requirements.txt
CMD[("./new-env/Scripts/activate");
CMD[("python", "backend/manage.py", "makemigrations", "accounts");
CMD[("python", "backend/manage.py", "makemigrations", "videos")];
CMD[("python", "backend/manage.py", "migrate", "accounts")];
CMD[("python", "backend/manage.py", "migrate", "videos")]
COPY . /code/

EXPOSE 8000
CMD ["python", "backend/manage.py", "runserver", "0.0.0.0:8000"]