# CampusConnect

CampusConnect is a forum website developed as a web engineering semester project. It allows users to create, view, and interact with topics and comments. The platform is designed to facilitate discussions and knowledge sharing among students and faculty members.

## Features

- **User Authentication**: Secure user registration and login.
- **Profile Management**: Users can edit their profiles, including updating their avatar and cover images.
- **Topic Creation**: Users can create new topics, categorize them into spaces, and tag them for better discoverability.
- **Commenting System**: Users can comment on topics, reply to comments, and upvote or downvote comments.
- **Responsive Design**: The website is fully responsive and works seamlessly on various devices.
- **Email Notifications**: Users receive email notifications for important actions like password resets and email verifications.

## Technologies Used

- **Frontend**: React, Bootstrap, React-Router, Redux
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT, bcrypt
- **Email Service**: Nodemailer
- **File Uploads**: Cloudinary
- **Styling**: CSS

## Demo

<video width="600" controls>
  <source src="https://files.catbox.moe/6auxny.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/ar-assad/campus-connect.git
   cd campus-connect
   ```

2. Install dependencies for both client and server:
   ```sh
   cd client
   npm install
   cd ../server
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the `server` directory based on the `env.example` file.
   - Update the `.env` file with your MongoDB URI, JWT secret, and email service credentials.

4. Start the development server:
   ```sh
   cd server
   npm start
   cd ../client
   npm start
   ```

## Usage

1. Register a new account or log in with an existing account.
2. Create new topics and participate in discussions by commenting and replying to comments.
3. Edit your profile to update your personal information and upload a new avatar or cover image.
4. Use the search and filter options to find topics of interest.

---

Feel free to reach out if you have any questions or feedback. Enjoy using CampusConnect!

*A fork of [ONetwork-Forum](https://github.com/ilyasbelfar/ONetwork-Forum)*