# Simple 3 Tier Application.

## 1. Running on the System/ Docker StandAlone

- ***See the README files in the respective folders to run the application.***
    ### Flow of the Application
    - Start Postgres on Your System or Run a Postgres Container
    - Start the Backend
    - Start the Frontend

</br>

---
</br>


## 2. Running with Docker Compose

- Make Sure you have `docker` and `docker-compose` installed on your system
- Run  the following command from the root directory of the project
- `docker-compose up -d --build`

    ### This will do the followings:
    - Creates a Postgres container with the database credentials specified in the compose file.
    - Creates a Backend container which will be accissible at `http://localhost:3001`
    - Creates a Frontend container which will be accissible at `http://localhost:80`

</br>

---
</br>
