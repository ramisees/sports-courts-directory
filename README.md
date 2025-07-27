# Sports Courts Directory Platform

## 🎯 Project Overview

A comprehensive platform for discovering and booking sports courts, featuring:

- Smart court discovery and booking system
- AI-powered recommendations via Courty AI
- Integrated affiliate marketing (CJ.com, Amazon)
- Real-time court availability tracking
- Interactive mapping interface

## 📊 Current Status

- ✅ Basic application structure implemented
- 🎨 Lovart design system integration in progress
- 🔧 TypeScript refinements pending
- 🚀 Ready for affiliate program integration

## 💡 Business Model

- 🏷️ Affiliate commissions from sports equipment sales
- ⭐ Premium court listing opportunities
- 🤖 AI-driven gear recommendations
- 📊 Data-driven court analytics

## 🛠 Tech Stack

### Core Technologies
- **Next.js 14**
  - App Router architecture
  - Server-side rendering
  - API routes infrastructure

- **Database & ORM**
  - PostgreSQL
  - Prisma ORM
  - Data migration system

- **Infrastructure**
  - Docker containerization
  - Microservices architecture
  - CI/CD pipeline

### APIs & Services
- **Google Maps Integration**
  - Real-time location services
  - Court mapping visualization
  - Distance calculations

- **Firecrawl API**
  - Automated data scraping
  - Court information updates
  - Availability tracking

- **Courty AI Service**
  - Court recommendations
  - Equipment suggestions
  - Usage pattern analysis

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Docker and Docker Compose
- PostgreSQL database
- API Keys:
  - Google Maps API
  - Firecrawl API (`fc-f958e894f9c742b69b41ac3b168f3800`)
  - CJ.com Affiliate API
- Redis (optional, for caching)

### Environment Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/ramisees/sports-courts-directory.git
   cd sports-courts-directory
   ```

2. Create a `.env` file with the following variables:
   ```env
   # Database
   DATABASE_URL="postgresql://..."
   
   # APIs
   GOOGLE_MAPS_API_KEY="AIzaSyDUsmAa5CVGF9iN_vwwVyUYluJ0-4Ht_dE"
   FIRECRAWL_API_KEY="fc-f958e894f9c742b69b41ac3b168f3800"
   CJ_AFFILIATE_KEY="your-cj-key"
   
   # Auth & Cache
   NEXTAUTH_SECRET="your-secret"
   NEXTAUTH_URL="http://localhost:3000"
   REDIS_URL="redis://..."
   
   # AI Service
   COURTY_AI_ENDPOINT="http://localhost:5000"
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Initialize the database:
   ```bash
   npm run db:generate
   npm run db:migrate
   npm run seed:sample
   ```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at http://localhost:3000

### Docker Development

Use Docker for development:
```bash
docker-compose up
```

## 📚 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run test` - Run tests
- `npm run test:e2e` - Run E2E tests
- `npm run db:studio` - Open Prisma Studio
- `npm run db:migrate` - Run database migrations
- `npm run seed:sample` - Seed database with sample data

## 🗄️ Project Structure

```
sports-courts-directory/
├── components/         # React components
│   ├── chatbot/       # Courty AI chat interface
│   ├── courts/        # Court-related components
│   ├── maps/          # Mapping components
│   ├── search/        # Search interface
│   └── ui/            # Shared UI components
├── context/           # React context providers
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
│   ├── api/          # API integrations
│   ├── db/           # Database utilities
│   └── utils/        # Helper functions
├── pages/             # Next.js pages and API routes
├── prisma/            # Database schema and migrations
├── public/            # Static files
├── services/          # Microservices
│   ├── courty-ai/    # AI recommendation service
│   ├── data-processor/# Data processing service
│   └── scraper/      # Firecrawl integration
├── src/               # Source files
└── styles/            # CSS styles
```

### Key Directories

- `components/chatbot/`: Courty AI chat interface components
- `services/courty-ai/`: AI recommendation service implementation
- `services/scraper/`: Firecrawl API integration for data collection
- `lib/api/`: Integration with CJ.com and Amazon affiliate programs

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.
