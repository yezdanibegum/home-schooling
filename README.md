# Modern Check-in/Check-out System

This project is a modern check-in/check-out system for managing attendance. It allows admins to add new attendees, check them in and out, and view their profiles.

## Features

- Add new attendees
- Check-in and check-out functionality
- View profile details
- Data persistence using MongoDB

## How to Run

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/modern-checkin-system.git
    ```

2. Navigate to the backend directory and install dependencies:
    ```bash
    cd modern-checkin-system/backend
    npm install
    ```

3. Create a `.env` file in the backend directory and add your MongoDB URI and secret key:
    ```
    MONGODB_URI=mongodb+srv://yezdanibegum:SpR8B7ebeQtKgbD0@homeschooling.g3kxw.mongodb.net/?retryWrites=true&w=majority&appName=HomeSchooling
    ACCESS_TOKEN_SECRET=your-secret-key
    ```

4. Start the backend server:
    ```bash
    npm start
    ```

5. Navigate to the frontend directory and open `index.html` in your browser.

## Future Improvements

- Integrate with a backend database for more robust data management
- Add authentication for admin access
- Generate monthly timesheets
