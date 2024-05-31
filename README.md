# To-Do-App

Prerequisites
•	Node.js and npm are installed on your machine.
•	A MongoDB Atlas account.


1. sDownload the zip folder and unzip the folder and files. Place the provided folder onto your computer. Then, open Visual Studio Code and enter the command npm install in the terminal to install the necessary dependencies.
2. Setup MongoDB Atlas:
3. Go to MongoDB Atlas.
4. Create an account and sign in.
5. Create a new cluster.
6. Create a database named To-Do-App and a collection named users, and tasks.
7. Make sure to add your IP address in the Network Access section of MongoDB Atlas.
8. Connect MongoDB with the application:
9. Update the connection string in src/backend/.env:
10. mongoose.connect('your-mongodb-connection-string');
11. Run the front-end application: Navigate to the project root directory and start the React app:
12. npm run start
13. Run the server: Open another terminal, navigate to the server folder, and run the server:
14. cd src/backend node server.js

Signup with username, email and password
Then login to the account
Add Task and reload the page. The added task will show up on tasks page.

