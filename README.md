# Backend-devops

# Backend-devops

## Node.js Backend with CI/CD, Docker, and AWS

### Overview

This project is a Node.js backend application that uses Docker for containerization and is deployed to AWS using a CI/CD pipeline with GitHub Actions. The backend application connects to a MySQL database and exposes API endpoints for data management.

### Features

- **Node.js Backend**: Handles API requests and interacts with a MySQL database.
- **Docker**: Containerizes the application for consistent environments across development and production.
- **AWS ECR**: Stores Docker images for deployment.
- **GitHub Actions**: Automates the build, push, and deployment process to AWS EC2 instances.

### Project Structure

- **Dockerfile**: Defines the Docker image for the application.
- **CI/CD Workflow**: GitHub Actions configuration for building, pushing Docker images, and deploying to AWS.
- **Backend Code**: Node.js application code with API endpoints.

### Dockerfile

```dockerfile
FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "index.js"]



### CI/CD Workflow

The GitHub Actions workflow automatically builds, pushes Docker images to Amazon ECR, and deploys them to an AWS EC2 instance.
GitHub Actions Workflow Configuration

yaml

name: Build, publish, and deploy Docker image to EC2

on:
  push:
    branches:
      - dev
      - qa
      - stage
      - production

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ap-southeast-1

      - name: Login to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v1

      - name: Build Docker image
        run: |
          docker build -t kalu-backend .

      - name: Tag Docker image
        run: |
          docker tag kalu-backend:latest 654654282708.dkr.ecr.ap-southeast-1.amazonaws.com/kalu-backend:${{ github.ref_name }}-latest

      - name: Push Docker image to Amazon ECR
        run: |
          docker push 654654282708.dkr.ecr.ap-southeast-1.amazonaws.com/kalu-backend:${{ github.ref_name }}-latest

  deploy:
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: SSH into EC2 and deploy
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ${{ secrets.EC2_USERNAME }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          port: ${{ secrets.EC2_PORT }}
          script: |
            if [ "${{ github.ref_name }}" == "production" ]; then
              sh deploy-bproduction.sh
            elif [ "${{ github.ref_name }}" == "stage" ]; then
              sh deploy-bstage.sh
            elif [ "${{ github.ref_name }}" == "qa" ]; then
              sh deploy-bqa.sh
            elif [ "${{ github.ref_name }}" == "dev" ]; then
              sh deploy-bdev.sh
            fi

### Backend Code

The backend application is implemented using Node.js and Express, and it provides the following API endpoints:

    POST /api/data: Adds a new entry to the data table in MySQL.
    GET /api/data: Retrieves all entries from the data table.
    GET /: Returns a welcome message.

Example Code

javascript

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'bohora',
  password: 'bohora12',
  database: 'mina',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.post('/api/data', async (req, res) => {
  const { name, description } = req.body;
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO data (name, description) VALUES (?, ?)',
      [name, description]
    );
    connection.release();
    res.status(201).json({ message: 'Data added successfully' });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Error inserting data' });
  }
});

app.get('/api/data', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM data');
    connection.release();
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

app.get('/', (req, res) => {
  res.send('Hello, Welcome to my backend server, Enjoy!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

### Getting Started

    Clone the Repository:

    sh

git clone <repository-url>
cd <repository-directory>

Build and Run Locally:

sh

    docker build -t kalu-backend .
    docker run -p 5000:5000 kalu-backend

    Push to GitHub:

    Push changes to the dev, qa, stage, or production branches to trigger the CI/CD pipeline.

### Deployment

The CI/CD pipeline will automatically build the Docker image, push it to Amazon ECR, and deploy it to an AWS EC2 instance based on the branch you push to.
Environment Variables

Make sure to configure the following environment variables on your AWS EC2 instance and GitHub repository secrets:

    AWS_ACCESS_KEY_ID: AWS Access Key ID
    AWS_SECRET_ACCESS_KEY: AWS Secret Access Key
    EC2_HOST: EC2 instance public IP or DNS
    EC2_USERNAME: SSH username for EC2
    SSH_PRIVATE_KEY: SSH private key for EC2 access
    EC2_PORT: SSH port for EC2 (default is 22)

