# 🏦 Bank-IO

**Empowering Communities Through Food Donation**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React Native](https://img.shields.io/badge/React%20Native-v0.71-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-v48-black.svg)](https://expo.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-v18-green.svg)](https://nodejs.org/)

[Features](#✨-features) • [Tech Stack](#🛠️-tech-stack) • [Getting Started](#🚀-getting-started) • [Project Structure](#📁-project-structure) • [Contributing](#🤝-contributing) • [License](#📄-license)


## 📋 About

Bank-IO is a cutting-edge mobile application developed with Expo (React Native) that bridges the gap between food donors and food banks. Our platform simplifies the process of food donation, allowing users to make a tangible impact on their communities with just a few taps.

## 🏙️ Images

<table>
  <tr>
    <td><img src="https://github.com/pizzerolaa/Bank-IO/blob/main/app/assets/images/demo2.PNG" alt="Login" width="250"/></td>
    <td><img src="https://github.com/pizzerolaa/Bank-IO/blob/main/app/assets/images/demo3.PNG" alt="Donation" width="250"/></td>
    <td><img src="https://github.com/pizzerolaa/Bank-IO/blob/main/app/assets/images/demo4.PNG" alt="Tracking" width="250"/></td>
  </tr>
  <tr>
    <td align="center">Login</td>
    <td align="center">Donation</td>
    <td align="center">Tracking</td>
  </tr>
</table>

## ✨ Features

- 🔐 Secure user authentication (login and registration)
- 🍎 Intuitive donation creation and management
- 📊 Real-time donation status tracking
- 📜 Comprehensive donation history
- 📈 Visual representation of donation impact
- 🏆 Engaging reward system for donors
- 📱 QR code generation and scanning for swift donation retrieval

## 🛠️ Tech Stack

- **Frontend**: React Native with Expo
- **UI Components**: React Native Paper
- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose
- **State Management**: React Hooks
- **Security**: Crypto and Bcrypt
- **Testing**: Jest and ESLint

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Expo CLI
- MongoDB

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/pizzerolaa/Bank-IO.git
   cd Bank-IO
   ```

2. Install dependencies:
   ```bash
   npm install --force
   ```
   or
   ```bash
   npm install --legacy-peer-deps
   ```

3. Set up your MongoDB database and update the connection string in `backend/server.js`.

4. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

5. Launch the Expo development server:
   ```bash
   npm start
   ```

## 📁 Project Structure

```
Bank-IO/
├── app/
│   ├── assets/
│   └── pages/
│       └── home_pages/
├── backend/
│   ├── controllers/
│   ├── models/
│   └── routes/
├── tests/
└── README.md
```

## 📱 Main Screens

1. **Login** (`Login.tsx`)
2. **Home** (`Home.tsx`)
3. **New Donation Form** (`new_donation.tsx`)
4. **Donation Confirmation** (`donation_confirmation.tsx`)
5. **Donation Details** (`donation_detail.tsx`)
6. **Donation Tracking** (`donation_tracking.tsx`)
7. **Donation Impact** (`donation_impact.tsx`)
8. **Previous Donations** (`prev_donations.tsx`)
9. **Rewards** (`see_Rewards.tsx`)
10. **QR Code Scanner** (`qrScanner.tsx`)
11. **QR Code Data** (`codeSuccess.tsx`)

## 🤝 Contributing

We welcome contributions to Bank-IO! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

Bank-IO is open source software [licensed as MIT](LICENSE).

## 🙏 Acknowledgments

- 💖 Heartfelt thanks to all contributors who have helped shape Bank-IO.
- 🍲 Special gratitude to the food banks and donors whose tireless efforts inspire this project.
- 🌟 Shoutout to the open-source community for the amazing tools and libraries that make projects like this possible.

---

Made with ❤️ by Team 27
