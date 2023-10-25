# Movie Review API

🎬 **Movie Review API** is an API service where a registered user can give a rating or both rating and review to all available movies. Registered users can also create a movie & update, and delete their created movies
Non-registered users can see all movies and reviews but cannot interact with them.

**DEVELOPMENT STATUS: Movie Review API v1.0.0 (initial)**

### Specification

- [Visit API SRS](https://sakilscode.notion.site/SRS-Software-Requirement-Specification-21bde6565e474f62991b3f700e31aece)

### Entities & Entity Relationship Diagram

- [Visit Models & ERD](https://sakilscode.notion.site/Entities-Entity-Relationship-Diagram-f116ce505652420eb339b0d762073fd4)

### Developer's Notes

- [Rough doc on designing API](https://sakilscode.notion.site/API-Design-Rough-Explanation-b716bf35bca6461fbc35a92da82488e5)

### A High Level presentation of the API

- [Link to the Presentation](https://docs.google.com/presentation/d/1J5pTy4eh5AIlcPWEg_1aEFsNEXT4-kDB_ak5Nq8yNMg)

### Development and Testing Instructions

```bash
# Install All Dependencies
yarn

# Start Docker-compose Services if needed
docker compose up -d

# To stop Docker-compose Services
docker compose stop

# Run Application Locally
yarn run dev
```

**Required Environment Variables (.env)**

```yaml
# Database info
DB_USERNAME=''
DB_PASSWORD=''
DB_CONNECTION_URL=''
DB_NAME=''

# App running port
PORT=4000

# JWT Token Info
ACCESS_TOKEN_SECRET=''
```
