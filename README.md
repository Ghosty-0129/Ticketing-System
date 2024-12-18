# Ticketing-System


Ticketing System for Service Providers and Consumers
This project is a ticketing system built with Express for the backend and React for the frontend. It enables service providers and consumers to manage and track tickets for various services without the use of a traditional database. The system leverages Object-Oriented Programming (OOP) principles for structuring and managing data and functionality.

Features:
Service Providers & Consumers: The system allows service providers to manage incoming tickets, assign tickets to themselves. Consumers can submit new tickets, view ticket statuses.

Object-Oriented Programming (OOP): The project is designed using OOP concepts to organize the code. Classes and objects are used to represent tickets, users (service providers and consumers), and their actions. The use of OOP helps ensure clean, modular, and maintainable code.

No Database: Instead of relying on a database, the system uses in-memory storage to manage tickets and users. This approach simplifies the system and makes it lightweight, suitable for small-scale or demo purposes.

Workflow:
Frontend (React): The frontend allows consumers to submit new tickets with essential details, such as the issue description, priority, and contact information. Service providers can view the tickets, assign themselves, and update the status of the tickets.

Backend (Express): The backend API handles requests from the frontend and performs operations like creating new tickets, retrieving ticket lists, and updating the status of tickets. Since the system is designed without a database, all data is temporarily stored in memory during the session.

Object-Oriented Structure: The system uses OOP to define entities such as:

Ticket class for handling ticket information (ID, status, priority, etc.).
User class to define service providers and consumers, each with specific methods to interact with tickets.
A controller class to manage the logic of assigning, updating, and querying tickets.
Technologies Used:
Frontend: React.js, JavaScript, HTML, CSS
Backend: Express.js (Node.js)
OOP Concepts: Classes, objects, methods, inheritance, encapsulation
This project demonstrates how to build a simple ticketing system with modern web development technologies using OOP principles for structure and logic. By not relying on a database, the system is kept lightweight, offering a clear example of how state can be managed in memory. This system could be further expanded by integrating a database or adding more advanced features such as user authentication, ticket prioritization, and notifications.
