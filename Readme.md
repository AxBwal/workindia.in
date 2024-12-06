# Train Booking API  

This backend API facilitates train booking operations, allowing users to:  
1. Book seats on available trains.  
2. Retrieve booking details.  

The API is built with **Node.js**, **Express.js**, **Prisma**, and **PostgreSQL**, leveraging modern web technologies for scalability and efficiency.  

### Key Features  
- **Race Condition Handling**:  
  The API ensures reliable seat booking even during simultaneous booking attempts by multiple users. This is achieved using database transactions, leveraging PostgreSQL's ACID (Atomicity, Consistency, Isolation, Durability) properties to prevent double booking and maintain data consistency.  

With this API, train booking is efficient, safe, and robust against concurrency issues, ensuring a smooth user experience.  

---

## Project Structure

```
train-booking-system/
│
├── prisma/                # Prisma schema and migrations
│   ├── schema.prisma      # Database schema
│   └── migrations/        # Migration files
│
├── routes/                # Route files
│   ├── authRoutes.js      # Authentication routes
│   ├── trainRoutes.js     # Train-related routes
│   └── bookingRoutes.js   # Booking-related routes
│
├── controllers/           # Controller functions
│   ├── authController.js
│   ├── trainController.js
│   └── bookingController.js
│
├── middleware/            # Middleware
│   ├── authMiddleware.js  # Authentication middleware
│  
│
├── server.js              # Entry point
├── package.json           # NPM configuration
└── README.md              # Project documentation
```

---

## Features

- **User Authentication** (Sign-up, Login)
- **Book Seats on a Train**
- **Retrieve Booking Details**
- Middleware for Authentication and Error Handling
- **Database Transactions for Consistency**

---

## Tech Stack

- **Backend:** Node.js, Express.js
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Authentication:** JSON Web Tokens (JWT)

---

## Getting Started

### **1. Clone the Repository**
```bash
git clone https://github.com/AxBwal/workindia.in.git
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Set Up Environment Variables**
Create a `.env` file in the project root and add the following variables:

```
DATABASE_URL=your_postgresql_database_url
JWT_SECRET=your_jwt_secret
PORT=3000
```

- Replace `your_postgresql_database_url` with your PostgreSQL connection string.
- Replace `your_jwt_secret` with a strong secret key for JWT.

### **4. Set Up the Database**

#### Run Prisma Migrations:
```bash
npx prisma migrate dev --name init
```

#### Generate Prisma Client:
```bash
npx prisma generate
```

#### (Optional) Seed the Database:
If a seed script is available, run:
```bash
npx prisma db seed
```

### **5. Start the Server**
```bash
npm start
```
The server will run at: `http://localhost:3000`.

---

## API Endpoints

### **Authentication**

#### **User Signup**
- **URL:** `POST /auth/register`
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "USER"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User registered successfully"
  }
  ```

#### **User Login**
- **URL:** `POST /auth/login`
- **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "token": "jwt_token_here"
  }
  ```

---

### **Train Routes**

#### **Add a Train (Admin Only)**
- **URL:** `POST /train/add`
- **Request Body:**
  ```json
  {
    "name": "Express Train",
    "source": "City A",
    "destination": "City B",
    "totalSeats": 100,
    "availableSeats": 100
  }
  ```

  - **Headers:**
  ```json
  {
    "Authorization": "Bearer jwt_token_here"
  }
  ```

- **Response:**
  ```json
  {
    "message": "Train added successfully",
    "train": {  }
  }
  ```

#### **Get Seat Availability**
- **URL:** ` GET /train/availability?source=City A & destination=City B`
- **Response:**
  ```json
  [
    {
        "id": 1,
        "name": "Express Train",
        "source": "City A",
        "destination": "City B",
        "totalSeats": 100,
        "availableSeats": 100
    }
  ]
  ```

---

### **Train Booking Routes**

#### **Book Seats on a Train**
- **URL:** `POST /booking/book?trainId=1`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer jwt_token_here"
  }
  ```
- **Request Body:**
  ```json
  {
    "seatCount": 2
  }
  ```
- **Response:**
  ```json
  {
    "message": "Seats booked successfully",
    "booking": {
      "id": 1,
      "userId": 1,
      "trainId": 1,
      "seatCount": 2,
      "createdAt": "2024-12-05T12:00:00.000Z"
    }
  }
  ```

#### **Get Booking Details**
- **URL:** `GET /booking/1`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer jwt_token_here"
  }
  ```
- **Response:**
  ```json
  {
    "id": 1,
    "userId": 1,
    "trainId": 1,
    "seatCount": 2,
    "createdAt": "2024-12-05T12:00:00.000Z",
    "user": {  },
    "train": {  }
  }
  ```

---

