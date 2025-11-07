# Secure Voting Application

A React-based secure digital voting platform with encryption, audit trails, and multiple voting types.

## Features

- **Secure Authentication**: OTP-based login system
- **Multiple Voting Types**: Single choice, ranked choice, approval voting
- **Encrypted Ballots**: Client-side encryption for vote privacy
- **Audit Trails**: Comprehensive logging of all actions
- **Accessibility**: WCAG compliant design
- **Mobile First**: Responsive design for all devices

## Tech Stack

- React 18 + Vite
- TypeScript (types defined)
- CryptoJS for encryption
- React Router for navigation
- Lucide React for icons

## Getting Started

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Start development server:
\`\`\`bash
npm run dev
\`\`\`

3. Run tests:
\`\`\`bash
npm test
\`\`\`

## Project Structure

\`\`\`
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── services/      # API and encryption services
├── contexts/      # React contexts
├── utils/         # Utility functions
├── types/         # TypeScript definitions
└── styles/        # Global styles
\`\`\`

## Security Features

- End-to-end encryption
- One-person-one-vote enforcement
- Secret ballot preservation
- Anti-fraud mechanisms
- Comprehensive audit logging

## License

MIT
