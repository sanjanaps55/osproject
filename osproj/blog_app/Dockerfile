
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt /app/
RUN pip install -r requirements.txt


COPY . /app/

ENV FLASK_APP=app:application 


EXPOSE 5000

#CMD ["python", "app.py"]


CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]






