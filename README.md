# Bank-IO

Bank-IO is a mobile application developed using Expo (React Native) that facilitates food donations to food banks. The app allows users to register, log in, make donations, track their donation history, and view their impact.

## Features

- User authentication (login and registration)
- Create and manage food donations
- Track donation status
- View donation history
- Visualize donation impact
- Reward system for donors

## Tech Stack

- Frontend: React Native with Expo
- UI Components: React Native Paper
- Backend: Node.js with Express.js
- Database: MongoDB with Mongoose
- State Management: (To be specified, e.g., Redux, Context API)

## Prerequisites

- Node.js
- npm or yarn
- Expo CLI
- MongoDB

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/pizzerolaa/Bank-IO.git
   cd Bank-IO
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up your MongoDB database and update the connection string in the backend configuration.

4. Start the backend server:
   ```
   cd backend
   npm start
   ```

5. Start the Expo development server:
   ```
   expo start
   ```

## Project Structure

- `/src`: Contains the React Native application code
  - `/components`: Reusable React components
  - `/screens`: Individual screen components
  - `/navigation`: Navigation configuration
  - `/services`: API and other service functions
  - `/utils`: Utility functions and helpers
- `/backend`: Contains the Node.js/Express backend code
  - `/models`: Mongoose models for MongoDB
  - `/routes`: Express route definitions
  - `/controllers`: Business logic for routes

## Main Screens

1. Login (Login.tsx)
2. Home (Home.tsx)
3. New Donation Form (new_donation.tsx)
4. Donation Confirmation (donation_confirmation.tsx)
5. Donation Tracking (donation_tracking.tsx)
6. Donation Impact (donation_impact.tsx)
7. Previous Donations (prev_donations.tsx)
8. Rewards (see_Rewards.tsx)

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- Thanks to all contributors who have helped shape Bank-IO.
- Special thanks to the food banks and donors who inspire this project.