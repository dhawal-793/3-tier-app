## Running the Postgres Database

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
- Create the networks, if not exist:
    - For Backend <--> DB Connection: `docker network create network-backend` 
- Create docker volume if not exist:
    - `docker volume create pgdata`
#### Run the Docker image

``` bash
docker run --env-file ./env.list -p 5432:5432 -v pgdata:/var/lib/postgresql/data --network network-backend --name demo-db postgres:latest

```
- `docker run -itd -p 3001:3001 --env-file ./env.list <your_image-name>`

---
</br> </br>