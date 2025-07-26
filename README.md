# ✍️ PenCraft - Advanced Blogging Platform

A comprehensive **MERN Stack** blogging platform with WebGL effects, advanced authentication, community features, real-time interactions, and modern responsive UI design.

![Project Status](https://img.shields.io/badge/Status-Production_Ready-green)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 📚 Documentation

| Document | Description | Audience |
|----------|-------------|----------|
| **[📖 README.md](README.md)** | Project overview, installation & setup guide | Users & Contributors |
| **[🎓 LEARNING-GUIDE.md](LEARNING-GUIDE.md)** | Complete technical deep dive & learning resource | Students & Developers |

> **👨‍🎓 For Students**: Check out our comprehensive [**Learning Guide**](LEARNING-GUIDE.md) to understand every technology and feature in detail!

---

## 🚀 Quick Navigation

- **🏠 [Project Overview](#-key-features)** - Main features and capabilities
- **⚙️ [Installation Guide](#-installation--setup)** - Setup instructions  
- **🎓 [Learning Guide](LEARNING-GUIDE.md)** - Complete technical documentation
- **💻 [Running the App](#-running-the-application)** - How to start the project
- **📊 [Tech Stack](#-complete-tech-stack)** - Technologies used
- **🔧 [API Documentation](#-api-documentation)** - Backend endpoints

---

## 🌟 Key Features

### 🔐 **Authentication & Security**
- **User Registration & Login** with secure JWT authentication
- **Password encryption** using bcrypt hashing
- **Protected routes** with authentication middleware
- **Session management** with React Context API
- **Role-based access control** for different user types

### ✍️ **Advanced Blogging System**
- **Rich text editor** with markdown support
- **Draft management** with auto-save functionality
- **Blog categorization** and tagging system
- **SEO optimization** with meta tags and descriptions
- **Social sharing** integration for major platforms

### 🌐 **Community Features**
- **Community creation** and management
- **Member roles** and permissions
- **Discussion threads** and commenting system
- **User following** and notification system
- **Content moderation** tools for community admins

### 🎨 **Modern User Interface**
- **WebGL particle effects** for immersive experience
- **Responsive design** compatible with all devices
- **Dark/Light theme** toggle with system preference detection
- **Smooth animations** using Framer Motion
- **Modern card-based layout** with glassmorphism effects

### 🚀 **Performance & Features**
- **Real-time notifications** using WebSocket connections
- **Image upload** with compression and optimization
- **Search functionality** with full-text search
- **Pagination** and infinite scroll
- **PWA support** for mobile installation

---

## 🛠️ Complete Tech Stack

### **Frontend Technologies**
| Technology | Version | Purpose |
|------------|---------|---------|
| **React.js** | ^18.2.0 | Core frontend framework |
| **React Router DOM** | ^6.8.0 | Client-side routing |
| **Framer Motion** | ^10.0.0 | Animations and transitions |
| **Three.js** | ^0.150.0 | WebGL effects and 3D graphics |
| **Tailwind CSS** | ^3.3.0 | Utility-first CSS framework |
| **Axios** | ^1.6.0 | HTTP requests |
| **React Context API** | Built-in | State management |

### **Backend Technologies**
| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | Latest | Runtime environment |
| **Express.js** | ^4.18.0 | Web application framework |
| **MongoDB** | Latest | NoSQL database |
| **Mongoose** | ^8.0.0 | MongoDB object modeling |
| **JWT** | ^9.0.0 | Authentication tokens |
| **bcrypt** | ^2.4.3 | Password hashing |
| **Multer** | ^1.4.5 | File upload handling |
| **CORS** | ^2.8.5 | Cross-origin requests |

### **Development Tools**
- **React Scripts** ^5.0.1 - Build and development tools
- **Git** - Version control
- **npm** - Package management
- **VS Code** - Development environment
- **Concurrently** ^8.2.2 - Run multiple scripts

---

## 🚀 Installation & Setup

### **Prerequisites**
- Node.js (v16.0.0 or higher)
- MongoDB (v5.0.0 or higher)
- npm or yarn package manager
- Git for version control

### **1. Clone Repository**
```bash
git clone https://github.com/akashlathiya16/PenCraft.git
cd PenCraft
```

### **2. Backend Configuration**
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
touch .env
```

**Configure `.env` file:**
```env
# Database Configuration (MongoDB Atlas - Recommended)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pencraft
# Or use local MongoDB
# MONGODB_URI=mongodb://localhost:27017/pencraft

# Authentication
JWT_SECRET=your_super_secure_jwt_secret_key_here_pencraft_2024

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=http://localhost:3000

# File Upload Configuration
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=jpg,jpeg,png,gif,webp
```

### **MongoDB Atlas Setup (Recommended)**
1. Create account at [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a new cluster (free tier available)
3. **Network Access**: Add your IP address OR use `0.0.0.0/0` (allow from anywhere)
4. Create database user with read/write permissions
5. Replace the MONGODB_URI with your Atlas connection string

### **⚠️ Important for Multiple PCs:**
- **Option A**: Add each PC's IP to MongoDB Atlas Network Access
- **Option B**: Use `0.0.0.0/0` in Network Access (allows any IP)
- **Always create `.env` file** in `backend/` folder on each new setup

### **3. Frontend Configuration**
```bash
# Navigate back to root directory
cd ..

# Navigate to frontend directory
cd frontend

# Install frontend dependencies
npm install
```

---

## 💻 New PC Setup (Clone & Run)

### **Quick Setup for Additional PCs:**

#### **Step 1: Clone Repository**
```bash
git clone https://github.com/akashlathiya16/PenCraft.git
cd PenCraft
```

#### **Step 2: Install Dependencies**
```bash
# Install all dependencies at once
npm run install-all
```

#### **Step 3: Create Environment File**
```bash
# Create .env file in backend folder
# Copy these contents:
```
```env
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@your-cluster.mongodb.net/?retryWrites=true&w=majority&appName=PenCraft
JWT_SECRET=your_super_secure_jwt_secret_key_here_pencraft_2024
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=jpg,jpeg,png,gif,webp
```

#### **Step 4: One-Click Start**
```bash
# Start both frontend and backend servers
npm run dev
```

### **🌍 Multi-PC Database Sharing:**
- ✅ **Same Database**: All PCs connect to same MongoDB Atlas cluster
- ✅ **User Isolation**: Each user's data is separate and secure  
- ✅ **Real-time Sync**: Register on any PC, login from anywhere
- ✅ **Content Storage**: Create blogs from any location, access from anywhere

---

## 🖥️ Running the Application

### **Method 1: One-Click Startup (Recommended 🚀)**

**Windows Users - Double-click the batch file:**
```bash
# Simply double-click this file:
start-project.bat
```
✅ **Automatically starts both servers**  
✅ **Backend**: `http://localhost:5000`  
✅ **Frontend**: `http://localhost:3000`  
✅ **Auto-opens browser**
✅ **Checks dependencies and configuration**

**Or use npm command:**
```bash
npm run dev
```  

### **Method 2: Manual Development Mode**

**Terminal 1 - Backend Server:**
```bash
npm run server
```
✅ Backend runs on: `http://localhost:5000`

**Terminal 2 - Frontend Development Server:**
```bash
npm run client
```
✅ Frontend runs on: `http://localhost:3000`

### **Method 3: Production Build**
```bash
# Build frontend for production
npm run build

# Start production backend
npm start
```

---

## 📋 Complete Feature Overview

### **🔑 Authentication System**
- **Real-time Authentication**: Secure user validation with JWT
- **Registration**: Create new user accounts with email validation
- **Login**: Secure authentication with persistent sessions
- **Logout**: Clean session termination
- **Protected Routes**: Automatic redirection for unauthorized access
- **Password Security**: bcrypt hashing with salt rounds
- **JWT Middleware**: Bearer token validation for API endpoints

### **✍️ Blog Management**
- **Rich Text Editor**: Advanced markdown support with preview
- **Draft System**: Auto-save and draft management
- **Image Upload**: Multiple image support with optimization
- **Categories & Tags**: Organize content effectively
- **SEO Features**: Meta descriptions and URL slugs
- **Social Sharing**: Built-in sharing for major platforms

### **🌐 Community Features**
- **Community Creation**: Users can create and manage communities
- **Member Management**: Role-based permissions and moderation
- **Discussion Threads**: Nested comments and replies
- **User Profiles**: Customizable profiles with bio and avatar
- **Following System**: Follow users and communities
- **Notification System**: Real-time updates and alerts

### **🎨 Visual Effects**
- **WebGL Particles**: Interactive particle systems
- **Smooth Animations**: Framer Motion powered transitions
- **Theme System**: Dark/Light mode with custom themes
- **Responsive Design**: Mobile-first responsive layout
- **Modern UI**: Card-based design with glassmorphism

---

## 📂 Detailed Project Structure

```
PenCraft/
├── 📁 backend/                            # Backend Application
│   ├── 📁 src/                            # Source Code
│   │   ├── 📄 index.js                    # Main server file
│   │   └── 📁 routes/                     # API Routes
│   │       ├── 📄 auth.js                 # Authentication endpoints
│   │       ├── 📄 blogs.js                # Blog management endpoints
│   │       ├── 📄 communities.js          # Community endpoints
│   │       └── 📄 users.js                # User management endpoints
│   ├── 📄 .env                            # Environment variables
│   └── 📄 package.json                    # Backend dependencies
├── 📁 frontend/                           # Frontend Application
│   ├── 📁 src/                            # Source Code
│   │   ├── 📄 App.jsx                     # Main app component
│   │   ├── 📄 index.js                    # React entry point
│   │   ├── 📁 components/                 # Reusable Components
│   │   │   ├── 📁 common/                 # Common Components
│   │   │   │   ├── 📄 Galaxy.jsx          # WebGL galaxy effect
│   │   │   │   ├── 📄 MagicBackground.jsx # Animated background
│   │   │   │   ├── 📄 Particles.jsx       # Particle system
│   │   │   │   ├── 📄 Particles.css       # Particle styling
│   │   │   │   ├── 📄 TargetCursor.jsx    # Custom cursor
│   │   │   │   ├── 📄 Notifications.jsx   # Notification system
│   │   │   │   └── 📄 ProtectedRoute.jsx  # Route protection
│   │   │   └── 📁 layout/                 # Layout Components
│   │   │       ├── 📄 Layout.jsx          # Main layout wrapper
│   │   │       └── 📄 Navbar.jsx          # Navigation component
│   │   ├── 📁 pages/                      # Page Components
│   │   │   ├── 📄 Home.jsx                # Landing page
│   │   │   ├── 📄 Explore.jsx             # Content discovery
│   │   │   ├── 📄 Communities.jsx         # Community listing
│   │   │   ├── 📄 CreateCommunity.jsx     # Community creation
│   │   │   ├── 📄 Profile.jsx             # User profile
│   │   │   ├── 📄 Settings.jsx            # User settings
│   │   │   ├── 📄 Notifications.jsx       # Notification center
│   │   │   ├── 📄 SavedPosts.jsx          # Saved content
│   │   │   ├── 📄 Search.jsx              # Search functionality
│   │   │   ├── 📁 auth/                   # Authentication Pages
│   │   │   │   ├── 📄 Login.jsx           # Login interface
│   │   │   │   └── 📄 Register.jsx        # Registration interface
│   │   │   └── 📁 blog/                   # Blog Pages
│   │   │       ├── 📄 BlogPost.jsx        # Blog post view
│   │   │       └── 📄 CreatePost.jsx      # Blog creation
│   │   ├── 📁 contexts/                   # React Contexts
│   │   │   └── 📄 ThemeContext.jsx        # Theme management
│   │   ├── 📁 services/                   # API Services
│   │   │   └── 📄 api.js                  # API configuration
│   │   ├── 📁 store/                      # State Management
│   │   │   └── 📄 index.js                # Redux store
│   │   └── 📁 utils/                      # Utility Functions
│   │       └── 📄 colors.js               # Color utilities
│   ├── 📄 package.json                    # Frontend dependencies
│   ├── 📄 tailwind.config.js              # Tailwind configuration
│   ├── 📄 postcss.config.js               # PostCSS configuration
│   └── 📄 tsconfig.json                   # TypeScript configuration
├── 📄 package.json                        # Root package configuration
├── 📄 start-project.bat                   # One-click startup (Windows)
├── 📄 .gitignore                          # Git ignore rules
├── 📄 README.md                           # Project documentation
└── 📄 LEARNING-GUIDE.md                   # Learning resource
```

---

## 🌐 API Documentation

### **Authentication Endpoints**
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "User Name",
  "email": "user@example.com",
  "password": "securePassword123"
}
```

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

### **Blog Management Endpoints**
```http
POST /api/blogs/create
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Blog Title",
  "content": "Blog content in markdown",
  "category": "Technology",
  "tags": ["react", "javascript", "web-development"]
}
```

```http
GET /api/blogs
Authorization: Bearer <jwt_token>
```

### **Community Endpoints**
```http
POST /api/communities/create
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "name": "Community Name",
  "description": "Community description",
  "isPrivate": false
}
```

```http
GET /api/communities
Authorization: Bearer <jwt_token>
```

### **User Management Endpoints**
```http
GET /api/users/profile
Authorization: Bearer <jwt_token>
```

```http
PUT /api/users/profile
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "name": "Updated Name",
  "bio": "User biography"
}
```

---

## 🎯 How to Use the Application

### **Step 1: Account Setup**
1. Open `http://localhost:3000` in your browser
2. Click "Register" to create a new account
3. Fill in your details and submit
4. Login with your credentials

### **Step 2: Create Your First Blog**
1. Navigate to the Dashboard
2. Click "Create Post" button
3. Write your blog content using the rich text editor
4. Add categories and tags
5. Publish or save as draft

### **Step 3: Explore Communities**
1. Visit the Communities page
2. Browse existing communities or create your own
3. Join communities that interest you
4. Participate in discussions

### **Step 4: Customize Your Experience**
1. Update your profile with bio and avatar
2. Configure notification preferences
3. Switch between dark/light themes
4. Follow other users and communities

---

## 🚀 Deployment

### **Frontend Deployment (Netlify/Vercel)**
```bash
cd frontend
npm run build
# Deploy 'build' folder to hosting service
```

### **Backend Deployment (Heroku/Railway)**
```bash
# Add Procfile for Heroku
echo "web: node backend/src/index.js" > Procfile

# Set environment variables on hosting platform
MONGODB_URI=<your_production_mongodb_uri>
JWT_SECRET=<your_production_jwt_secret>
PORT=5000
```

---

## 🛡️ Security Features

- **JWT Authentication** with secure token handling
- **Password Encryption** using bcrypt with salt rounds
- **Input Validation** for all user inputs
- **File Upload Security** with type and size validation
- **CORS Configuration** for secure cross-origin requests
- **Environment Variables** for sensitive configuration
- **Protected Routes** with authentication middleware
- **Rate Limiting** to prevent abuse

---

## 🔧 Troubleshooting

### **Common Issues & Solutions**

**1. MongoDB Connection Error**
```bash
# Check MongoDB Atlas connection string
# Ensure IP address is whitelisted
# Verify database credentials
```

**2. Port Already in Use**
```bash
# Find process using port 3000 or 5000
netstat -ano | findstr :3000
taskkill /PID <process_id> /F
```

**3. Package Installation Issues**
```bash
# Clear npm cache
npm cache clean --force
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**4. WebGL Effects Not Working**
```bash
# Ensure browser supports WebGL
# Check browser console for Three.js errors
# Update graphics drivers if necessary
```

**5. Batch File Issues (Windows)**
```bash
# If start-project.bat doesn't work:
# 1. Run as Administrator
# 2. Check if Node.js is in PATH
# 3. Ensure you're in project root directory
# 4. Run manually: npm run dev
```

---

## 👨‍💻 Developer Information

**Akash Lathiya**
- 🌐 GitHub: [@akashlathiya16](https://github.com/akashlathiya16)
- 📧 Email: [akashweb016@gmail.com](mailto:akashweb016@gmail.com)
- 💼 LinkedIn: [Connect with me](https://www.linkedin.com/in/akash-lathiya-0981a8240/)
- 🌟 Portfolio: [View Projects](https://akashlathiya16.github.io)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🔄 Version History

- **v1.0.0** (Current) - Initial release with core blogging and community features
- **v0.9.0** - Beta release with WebGL effects and theme system
- **v0.8.0** - Community features and user management
- **v0.7.0** - Blog creation and management system
- **v0.6.0** - Authentication and user registration

### **What's New in v1.0.0:**
- ✅ **Complete MERN Stack**: Full-featured blogging platform
- ✅ **WebGL Effects**: Immersive visual experience with particles
- ✅ **Community System**: Create and manage communities
- ✅ **Rich Text Editor**: Advanced markdown support
- ✅ **Real-time Features**: Notifications and live updates
- ✅ **Modern UI/UX**: Responsive design with dark/light themes

---

## 🌟 Future Enhancements

- 📱 **Mobile App**: React Native companion app
- 🔍 **Advanced Search**: Elasticsearch integration
- 📊 **Analytics Dashboard**: Blog performance metrics
- 🤖 **AI Integration**: Content suggestions and auto-tagging
- 🎨 **Custom Themes**: User-defined color schemes
- 📧 **Email Notifications**: Newsletter and updates

---

**⭐ If you find this project helpful, please give it a star on GitHub!**

**PenCraft** - Where stories come to life ✨ 