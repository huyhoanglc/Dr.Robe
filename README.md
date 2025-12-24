# ![Dr.Robe](https://img.shields.io/badge/Dr.Robe-Ecosystem-6DB33F?style=for-the-badge&logo=spring&logoColor=white)

<p align="center">
  <img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" />
  <img src="https://img.shields.io/badge/Spring_Cloud-6DB33F?style=for-the-badge&logo=springcloud&logoColor=white" />
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
  <img src="https://img.shields.io/badge/Kafka-231F20?style=for-the-badge&logo=apache-kafka&logoColor=white" />
</p>

**Dr.Robe** is a high-end medical and aesthetic service management ecosystem built on a Microservices architecture. The project follows a modern **Fullstack Decoupled** model, strictly separating the Frontend (Client) and Backend (Server) for optimal scalability.

---

### ![Architecture](https://img.shields.io/badge/Architecture-Overview-blue?style=flat-square&logo=gitbook&logoColor=white)  Project Structure (Monorepo)

The project is organized into clear directories to streamline development and deployment workflows:

* **`client/`**: Modern Frontend application built with **React + Vite**, focusing on high-performance user experience.
* **`server/`**: Robust Backend system consisting of **11 Microservices** (Spring Boot) handling business logic, JWT security, and data orchestration.

---

### ![Services](https://img.shields.io/badge/Registry-Full_Services-success?style=flat-square&logo=serverfault&logoColor=white) Service Registry & Port Configuration

The system operates with 17 containers (Infrastructure + Services) maintained in a healthy state:

| Category | Service | Port | Database Schema |
| :--- | :--- | :--- | :--- |
| **Frontend** | **Web Client** | `5173` | Local Storage |
| **Gateway** | **API Gateway** | `8080` | - |
| **Registry** | **Discovery Server** | `8761` | Eureka Registry |
| **Security** | **Auth Service** | `9000` | `dr_robe_auth` |
| **Trading** | **Trading Service** | `8081` | `dr_robe_trading` |
| **Retail** | **Shop Service** | `8082` | `dr_robe_shop` |
| **Medical** | **Clinic Service** | `8083` | `dr_robe_clinic` |
| **Booking** | **Hotel Service** | `8084` | `dr_robe_hotel` |
| **Beauty** | **Spa Service** | `8085` | `dr_robe_spa` |
| **HR** | **Staff Service** | `8086` | `dr_robe_staff` |
| **Finance** | **Payment Service** | `8091` | `dr_robe_payment` |
| **Event** | **Notification** | `8090` | Kafka Broker |

---

### ![Deployment](https://img.shields.io/badge/Deployment-Get_Started-orange?style=flat-square&logo=docker&logoColor=white) Detailed Getting Started Guide

#### **Step 1: Clone the Repository**
```bash

git clone [https://github.com/huyhoanglc/Dr.Robe.git](https://github.com/huyhoanglc/Dr.Robe.git)
cd Dr.Robe
```
#### **Step 2: Backend & Infrastructure Setup (Server)**
```bash

# Navigate to the server directory
cd server

# Launch full infrastructure (Database, Kafka, Discovery) and 11 Services
# Ensure Docker Desktop is running
docker-compose up -d

```
Verification: Access the Eureka Dashboard to confirm all 11 services are registered and healthy.
#### **Step 3: Frontend Setup (Client)**
```bash

# Navigate to the client directory
cd client

# Install necessary dependencies
npm install

# Launch the React + Vite application
npm run dev
```
Access: The UI will be available at http://localhost:5173.
### ![Admin](https://img.shields.io/badge/Administration-Tools-blueviolet?style=flat-square&logo=adminer&logoColor=white) Administration Tools

| Tools                 | Access address                                 | Account                 |
|:----------------------|:-----------------------------------------------|:------------------------|
| **Service Discovery** | [http://localhost:8761](http://localhost:8761) | Eureka UI               |
| **Database UI**       | [http://localhost:8088](http://localhost:8088) | `username` / `password` |
| **API Entry Point**   | [http://localhost:8080](http://localhost:8080) | Gateway                 |

---

### ![Security](https://img.shields.io/badge/Security-Protection-red?style=flat-square&logo=googlecloud&logoColor=white) Security & Resources
* **Environment**: Sensitive credentials in `.env` files are strictly protected via `.gitignore`.
* **Performance**: The ecosystem is optimized for high efficiency (~3.7% CPU utilization).

---
<p align="center">
 <b>Developed and maintained by <a href="mailto:huypg7645@gmail.com">huyhoanglc</a></b><br>
  Copyright © 2025 Dr.Robe
</p>