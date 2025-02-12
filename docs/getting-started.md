# Getting Started with YuVi

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18 or higher
- npm or yarn package manager
- PostgreSQL 14 or higher

## Installation

1. **Clone the Repository**
```bash
git clone https://github.com/yuvi/yuvi.git
cd yuvi
```

2. **Install Dependencies**
```bash
npm install
```

3. **Environment Setup**
```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:
```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=yuvi
DB_USER=your_username
DB_PASSWORD=your_password

# Application Configuration
PORT=3000
NODE_ENV=development
```

4. **Database Setup**
```bash
npm run migrate
```

5. **Start Development Server**
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Configuration

### Database Configuration
- Ensure PostgreSQL is running and accessible
- Create a database named 'yuvi'
- Run migrations to set up the schema

### Environment Variables
| Variable | Description | Default |
|----------|-------------|---------|
| DB_HOST | Database host | localhost |
| DB_PORT | Database port | 5432 |
| DB_NAME | Database name | yuvi |
| DB_USER | Database user | - |
| DB_PASSWORD | Database password | - |
| PORT | Application port | 3000 |
| NODE_ENV | Environment | development |

## Quick Start Guide

1. **Access the Application**
   - Open your browser and navigate to `http://localhost:5173`
   - Log in with default admin credentials (if provided)

2. **Initial Setup**
   - Configure your organization
   - Set up user roles and permissions
   - Configure billing settings

3. **Basic Usage**
   - Create and manage users
   - Set up organization hierarchy
   - Configure spaces and integrations

## Troubleshooting

### Common Issues

1. **Database Connection Issues**
   - Verify PostgreSQL is running
   - Check database credentials
   - Ensure database exists

2. **Build Issues**
   - Clear node_modules and reinstall
   - Update Node.js version
   - Check for conflicting dependencies

3. **Runtime Errors**
   - Check logs in `logs/` directory
   - Verify environment variables
   - Ensure all required services are running

## Next Steps

- Read the [Architecture Documentation](./architecture.md)
- Explore [Features](./features/README.md)
- Review [API Documentation](./api/README.md)