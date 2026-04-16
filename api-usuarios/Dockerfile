FROM python:3.13.3-slim


WORKDIR /home/app/


COPY . .

RUN pip install --upgrade pip
RUN pip install -r requirements.txt


EXPOSE 5002


CMD [ "python", "app.py" ]