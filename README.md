# AI-Powered CI/CD Documentation Intelligence System

A production-ready automation system that integrates with GitHub to provide AI-powered documentation updates, PR summaries, and release notes generation.

## 🚀 Features

- **Automatic Event Detection**: Monitors GitHub push, pull request, and release events
- **AI-Powered Content Generation**: Uses Google Gemini API for intelligent content creation
- **Documentation Updates**: Automatically updates README and documentation files
- **PR Summaries**: Generates structured pull request summaries
- **Release Notes**: Creates categorized release notes from commit history
- **Real-time Dashboard**: Web interface for monitoring and analytics
- **Comprehensive Logging**: Tracks all AI operations and metrics
- **Error Handling**: Robust retry mechanisms and error recovery

## 🏗️ Architecture

```
GitHub Events → GitHub Actions → Node.js API → Gemini AI → GitHub Updates
                                    ↓
                              MongoDB Database
                                    ↓
                              React Dashboard
```

## 📁 Project Structure

```
├── backend/                 # Node.js API server
│   ├── src/
│   │   ├── controllers/     # API route handlers
│   │   ├── models/         # Database models
│   │   ├── services/       # Business logic
│   │   ├── middleware/     # Express middleware
│   │   ├── utils/          # Helper functions
│   │   └── config/         # Configuration files
│   └── package.json
├── frontend/               # React dashboard
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom hooks
│   │   ├── utils/          # Utility functions
│   │   └── services/       # API services
│   └── package.json
├── .github/workflows/      # GitHub Actions workflows
├── docs/                   # Documentation
├── scripts/                # Utility scripts
└── README.md
```

## 🛠️ Tech Stack

- **Automation**: GitHub Actions
- **Backend**: Node.js + Express.js
- **AI Service**: Google Gemini API
- **Database**: MongoDB
- **Frontend**: React + Tailwind CSS
- **API Integration**: GitHub REST API v4

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- MongoDB
- Google Gemini API key
- GitHub Personal Access Token

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```
3. Set up environment variables
4. Start the services:
   ```bash
   # Backend
   cd backend && npm start
   
   # Frontend
   cd frontend && npm start
   ```

### Environment Variables

Create `.env` files in both `backend` and `frontend` directories:

**Backend .env:**
```
PORT=3001
MONGODB_URI=mongodb://localhost:27017/ai-docs
GEMINI_API_KEY=your_gemini_api_key
GITHUB_TOKEN=your_github_token
WEBHOOK_SECRET=your_webhook_secret
```

**Frontend .env:**
```
REACT_APP_API_URL=http://localhost:3001
```

## 📊 Dashboard Features

- **Event History**: View all GitHub events processed
- **Documentation Updates**: Track AI-generated documentation changes
- **PR Summaries**: Monitor pull request summaries
- **Release Notes**: Browse generated release notes
- **Analytics**: Success/failure metrics and AI usage statistics
- **Real-time Updates**: Live dashboard updates

## 🔧 Configuration

### GitHub Actions Setup

1. Create GitHub App or Personal Access Token
2. Set up repository secrets:
   - `GEMINI_API_KEY`
   - `GITHUB_TOKEN`
   - `WEBHOOK_SECRET`
3. Enable workflows in repository settings

### MongoDB Schema

The system uses MongoDB to store:
- Event logs
- AI operation results
- Documentation updates
- Analytics data
- Error logs

## 🔒 Security Considerations

- Encrypted API key storage
- Webhook signature verification
- Rate limiting implementation
- Input validation and sanitization
- Audit logging for all operations

## 📈 Scaling

- Horizontal scaling with containerization
- Database indexing for performance
- Caching layer for frequent requests
- Queue system for AI processing
- Load balancing for API endpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please open an issue in the repository.
