
## Creating Docker Image

#### Prerequisite
- Docker must be installed on the system.
- Run the following command in root directory of the project
    `docker build -t <your_image_name> .`

---
</br> </br>

## Running the Application

## 1. Standalone

#### Prerequisite
- Make sure you have nodeJs installed on your system.
- Your Frontend is running at `http://localhost:3000`.
- Your Postgres Database is accessible at `postgres://demo_user:demo_user@localhost:5432/demo_db`.

#### **Run the following commands in the root directory of the project.**
- Install Dependencies  `npm run install`
- Start the Application  `npm run start`
- Your Backend will be running at `http://localhost:3001`



## 2. In Docker

#### Prerequisite
- Make sure you have Docker installed on the system.
- Your Frontend is accessible by your Backend.
- Your DB is accessible by your Backend.
- Create the networks, if not exist 
    - For Backend <--> DB Connection: `docker network create network-backend` 
    - For Frontend <--> Backend Connection: `docker network create network-frontend` 

#### Start the Backend
``` bash 
docker run -itd -p 3001:3001 --env-file ./env.list --network network-backend --network network-frontend --name api <your_image-name>
```

---
</br> </br>