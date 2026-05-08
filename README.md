🏙️ CivicBridge – Smart Civic Grievance Reporting Platform

CivicBridge is a full-stack web platform that enables citizens to report civic issues (garbage, potholes, streetlights, etc.) with precise 3-word grid-based location identification, making it easier for government officials to locate and resolve problems quickly.

🚀 Problem Statement

In cities like Visakhapatnam, citizens often struggle to describe the exact location of civic issues using traditional addresses or map pins. This leads to:

Delayed issue resolution

Miscommunication

Inefficient field navigation

💡 Solution

CivicBridge divides the city map into small grid blocks, where each block is uniquely identified by a combination of 3 English words (similar to a what3words-style approach).

This ensures:

Precise, human-readable locations

Faster navigation for officials

Reduced ambiguity and time waste

✨ Key Features
👤 Citizen Portal

Select exact location using interactive map

Automatically generated 3-word location address

Capture or upload photo of the issue

Categorize grievance (Garbage, Potholes, etc.)

Submit grievance in real-time

🛠️ Admin Dashboard

View all grievances fetched directly from MongoDB

Interactive map with markers for each issue

Click markers to view details

Navigate from admin’s current location to grievance location

View images, category, description, and 3-word address

🗺️ Map & Location System

City divided into grid blocks

Grid appears only at higher zoom levels

Each grid cell mapped to a unique 3-word identifier

Click on grid → get block name → submit issue

🧑‍💻 Tech Stack
Frontend

React + TypeScript

Vite

Leaflet.js (Maps)

Tailwind CSS

Backend

Flask (Python)

REST API

CORS enabled

🎯 Use Case Impact

Faster civic issue resolution

Improved government response efficiency

Clear navigation using 3-word addresses

Citizen-friendly reporting system

🏆 Hackathon Value

Solves a real civic problem

Combines GIS + UX + Backend

Scalable to any city

Minimal learning curve for users

📌 Future Enhancements

Status tracking (Pending / In Progress / Resolved)

Role-based authentication

Mobile app support

Analytics dashboard for authorities

SMS / Email notifications

👨‍💻 Author

Bhavesh Nellimarla
Manepalli Venkata Rishab
Ch Harshita
Pemmadi Ashrita
K Saatwika
Built as part of a 24-hour Hackathon Project

⭐ Acknowledgements

OpenStreetMap

Leaflet.js

MongoDB Atlas

React & Flask communities
Database

MongoDB Atlas (Cloud)
