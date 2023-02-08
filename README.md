# Blogs Application

This application to Handle Blogs to Different Types of Users

### Key Features

- Nestjs Framework and Graphql (Take Benefits of IOC And Typescript)
- Service and Repository Layer (Architecture)
- Abstract Validation Layers
- Error Handling Feature
- Unit Test Using Jest
- Generic Pagination Service
- CRONG Job
- Containerized App Within Docker compose for easy Development Environment
- All Queries built Manually using Query Builders expect the straightforward ones

### Quick Start

#### Run back-end Service & Database

1. Set Environment Variable

```
export APP_ENV=development
```

2. docker-compose up blogs

#### Run Unit tests

```
npm run test
```

![test](https://user-images.githubusercontent.com/55209776/217111954-5b6eee84-8583-4293-81ee-e2c8736ddf17.png)

#### RUN Test Coverage

```
npm run test:cov
```

![testCoverage](https://user-images.githubusercontent.com/55209776/217112046-9251d7d4-8667-49fd-af7a-7563d30bf5f0.png)

### ERD Diagram

![blog drawio (3)](https://user-images.githubusercontent.com/55209776/217027977-88ab0c34-a37a-417a-b8de-1e8a3b5cc752.png)

### Follow Up

- Moving to K8S For Production environment easy scale up Environment
- Having Backup service for DB
- Having Authentication / Authorization Layer ( Add a Layer to Descrypt User token and Get User Data )
- Move Cronjob to K8S to avoid Multiple runs for all Replicas we have
- E2E Test
- Use Sonarqube For Test coverage instead of Jest
- Front-end State management to handle User State
- Having a mechanism for search which is Canceling Previous request if user still typing
- Caching Mechanism for cache post views, posts for the User

### Pircutres

![MainSearch](https://user-images.githubusercontent.com/55209776/217028321-e91725e3-ae9a-4a8d-a715-1f823d4d7f2d.png)
