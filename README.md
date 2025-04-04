# TableMate

TableMate is a prototype web application designed to centralize and streamline resource management within companies. The application allows employees to efficiently book desks, conference rooms, and parking spots, as well as order food and IT equipment through a unified platform.

## Project Overview

- **Prototype developed using Next.js**
- **Originally generated with [Enterprise Architect](https://github.com/sebo21cc21/EnterpriseArchitect)**
- **Developed as part of a project at Politechnika Warszawska**
- **Deployed at:** [TableMate on Vercel](https://tablemate-gules.vercel.app/)

## Features

### Reservation Management
- Create, edit, and cancel reservations for desks, meeting rooms, and parking spots.
- Automatic resource assignment based on availability and predefined priorities.

### Reservation Search
- Check availability for resources on a selected date and time.
- Apply filters for desks, rooms, and parking spots.

### Food & IT Equipment Ordering
- Order meals and necessary IT equipment with delivery to your desk.
- Minimize work disruptions during busy hours.

### Notifications
- Receive confirmations and updates for bookings and orders.

## Installation & Setup

To run the project locally:

### Prerequisites
- Node.js (v16 or later)
- npm or yarn

### Steps
1. Clone the repository:
   ```sh
   git clone git@github.com:frogalo/tablemate.git
   ```
2. Navigate to the project directory:
   ```sh
   cd tablemate
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

4. Set up environment variables:

- Create a .env file in the root directory.
- Add the following line to configure the PostgreSQL database:
   ```dotenv
   DATABASE_URL=your_postgres_connection_string
   ```

5. Run the development server:
   ```sh
   npm run dev
   ```


* Open http://localhost:3000 in your browser.

## Deployment
This project is currently hosted on Vercel. To deploy your own version:
- Fork the repository.
- Connect your fork to Vercel.
- Configure the necessary environment variables if required.

## Technologies Used
- **Next.js** - Framework for building the application.
- **Tailwind CSS** - Styling.
- **Font Awesome** - Icons.

## Contributing
Contributions are welcome


---
For more details, visit the live project: [TableMate](https://tablemate-gules.vercel.app/)  