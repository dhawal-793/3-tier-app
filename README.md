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


## 3. Running in Docker Swarm

### Prerequisite
- Make Sure you have `docker` installed on your system.
- You have already created and pushed the images for frontend and backend to the Image Artifactory (In this case Docker Hub)
- Volume Mounting should be done on each node at /mnt/pgdata

### Setting up docker swarm:
- Run these commands on master node:
    - Initialize docker swarm. `docker swarm init --advertise-addr <master node IP>`
    - Get the join token `docker swarm join-token manager` or `docker swarm join-token worker`
- Run this command on worker nodes to join the swarm: `docker swarm join --token <token>`

### Setting up compose file for docker swarm.
- Update the image names in the `docker-compose-swarm.yml` file with your images.
- Add the Public Ip, or your domain name on which you want the app to be accessible at
- If not provided, the application will not be accessible externally.
- Copy the `docker-compose-swarm.yml` file to your docker swarm manager node.

### Deploy the app on the swarm
- Run this command on your manager node at the directory where compose file is present
- `docker stack deploy --compose-file docker-compose-swarm.yml <stack-name>`

</br>

---
</br>


## 4. Running in Kubernates (locally)

### Prerequisite
- Make Sure You have setup kubernates running on your system.
- Your cluster have the following nodeports open:
    - 30001 (For Acessing the frontend)
    - 30002 (For Acessing the backend)
- You have already created and pushed the images for frontend and backend to the Image Artifactory (In this case Docker Hub)
- Change the image_names in the config files for frontend and backend with your images.

### Running the Application
- Change the directory to k8s inside the project directory.
- Create the config-map by running `kubectl apply -f configs.yml`
- Create the database deployment and service by running `kubectl apply -f db.yml`
- Create the backend deployment and service by running `kubectl apply -f backend.yml`
- Create the frontend deployment and service by running `kubectl apply -f frontend.yml`
- Access your application at `http://localhost:30001`

</br>

---
</br>


## 5. Running with Portainer

- Add the `portainer-compose.yml` file to your Portainer dashboard. 
- Assuming you have load balancer, domains and ssl certificates are setup.
- The compose uses Aure File Share for volume mounting, if you want to use another service you can change the compose and envs accordingly.
- Add the Envs specified in `portainer-env.list` with appropriate values in your stack.
- Deploy the app.
- Access your application at your domain.
</br>

---
</br>
