
## Creating Docker Image

#### Prerequisite
- Docker must be installed on the system.

### 1. **With Nginx**

Run the following command in root directory of the project

``` bash
docker build -t <your_image_name> --build-arg VITE_HOST=<your_backend_host_url> .
```

### 2. **Without Nginx**

Run the following command in root directory of the project
``` bash
docker build -t <your_image_name> .
```

> Env variable `VITE_HOST` must be provided when running the image build using this Step.

---
</br> </br>

## Running the Application

## 1. Standalone

#### Prerequisite
- Make sure you have nodeJs installed on your system.
- Your Backend is accessible at `http://localhost:3001`.

#### **Run the following commands in the root directory of the project.**
- Install Dependencies  `npm run install`
- Start the Application  `npm run dev`
- Build the Application  `npm run build`
- Run the Build  `npm run preview`
- Your App will be running at `http://localhost:3000`



## 2. In Docker

#### Prerequisite
- Make sure you have Docker installed on the system.
- Your Backend is accessible by your frontend.
- Create the networks, if not exist: 
    - **For Frontend <--> Backend Connection:** `docker network create network-frontend` 


#### Run the Docker image

- Using Nginx Setup `docker run -itd -p 80:80 --network network-frontend --name app <your_image-name>`

- Without Nginx Setup `docker run -itd -p 3000:3000 -e VITE_HOST=<your_backend_url> --network network-frontend --name app <your_image-name>`


---
</br> </br>