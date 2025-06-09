
# Topaz

> The future of meme coin, built on Solana's high-performance blockchain.

## Overview

Topaz is a revolutionary meme cryptocurrency project built on the Solana blockchain. This repository contains the official website for Topaz, featuring a modern, responsive design that showcases the project's features, tokenomics, and community.

## 🚀 Features

- **Modern Design**: Clean, professional interface with gradient accents and smooth animations
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Interactive Elements**: 
  - Animated hero section with floating elements
  - Interactive tokenomics chart using Chart.js
  - Smooth scrolling navigation
  - Button ripple effects
- **Community Integration**: Direct links to Discord, Telegram, Twitter, and GitHub
- **Buy Integration**: Modal with multiple purchase options (Pump.fun, Phantom, Bitget)
- **Legal Compliance**: Privacy Policy and Terms of Service modals

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with CSS Variables for theming
- **Charts**: Chart.js for tokenomics visualization
- **Icons**: Font Awesome for consistent iconography
- **Fonts**: Inter font family from Google Fonts

## 📁 Project Structure

```
topaz-website/
├── assets/
│   ├── topaz-logo.svg         # Project logo
│   └── topaz-mascot.svg       # Mascot character
├── index.html                 # Main HTML file
├── styles.css                 # All CSS styles
├── script.js                  # JavaScript functionality
├── package.json               # Project dependencies
└── README.md                  # This file
```

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js (for package management)
- A modern web browser

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Topaz-For-Us/topaz-website.git
cd topaz-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The website will be available at `http://localhost:5000`

### On Replit

1. Fork this repository to your Replit workspace
2. Click the "Run" button
3. The website will be automatically served and accessible via the provided URL

## 📊 Tokenomics

Topaz features a transparent and sustainable token distribution:

- **Total Supply**: 1,000,000,000 TPZ
- **Public Sale**: 50% (500M TPZ)
- **Development**: 20% (200M TPZ)
- **Marketing**: 10% (100M TPZ)
- **Team**: 10% (100M TPZ)
- **Reserve**: 10% (100M TPZ)

## 🔗 Contract Information

- **Contract Address**: `82YJmgGX88nBoT1nMqFzq5mC7zRmNk2p1xxvz8V7pump`
- **Blockchain**: Solana
- **Network**: Mainnet

## 🛒 How to Buy

You can purchase Topaz through multiple platforms:

1. **Pump.fun**: Direct trading platform
2. **Phantom Wallet**: Popular Solana wallet with built-in DEX
3. **Bitget Wallet**: Multi-chain wallet with trading features

Or use the contract address with any Solana-compatible DEX or wallet.

## 🌐 Community Links

- **Twitter**: [@Topaz_For_Us](https://x.com/Topaz_For_Us)
- **Discord**: [Join our server](https://discord.gg/AZ2FGGsDEz)
- **Telegram**: [Community chat](https://t.me/topaz_for_us)
- **GitHub**: [Development hub](https://github.com/Topaz-For-Us)

## 🎨 Customization

### Color Scheme

The website uses CSS custom properties for easy theming:

```css
:root {
  --primary-color: #DB1A50;
  --primary-hover: #B8154A;
  --primary-light: #FF6B9D;
  --primary-lighter: #FFB5C5;
  /* ... more variables */
}
```

### Adding New Sections

1. Add HTML structure in `index.html`
2. Style with CSS in `styles.css`
3. Add JavaScript functionality in `script.js` if needed

## 🔧 Development

### File Structure

- **index.html**: Main page structure and content
- **styles.css**: All styling including responsive design
- **script.js**: Interactive functionality including:
  - Navigation handling
  - Chart initialization
  - Modal management
  - Animation controls
  - Legal content handling

### Key JavaScript Functions

- `initTokenomicsChart()`: Creates the interactive pie chart
- `initBuyModal()`: Handles the buy token modal
- `initLegalModals()`: Manages privacy policy and terms modals
- `observeElements()`: Handles scroll animations

## 📱 Responsive Design

The website is fully responsive with breakpoints at:
- Desktop: 1024px+
- Tablet: 768px - 1023px
- Mobile: 320px - 767px

## 🚀 Deployment

### On Replit

The project is configured to run automatically on Replit using Python's built-in HTTP server:

```bash
python -m http.server 5000
```

### Manual Deployment

For other platforms, you can serve the static files using any web server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (with serve package)
npx serve .

# Using PHP
php -S localhost:8000
```

## 📄 Legal

This project includes comprehensive legal documentation:

- **Privacy Policy**: Details on data collection and usage
- **Terms of Service**: User agreement and risk disclosures

Both documents are accessible via modal windows in the footer.

## ⚠️ Disclaimer

Topaz is a meme cryptocurrency. Please note:

- Cryptocurrency investments carry significant risks
- Digital assets are highly volatile and speculative
- You may lose part or all of your investment
- Always do your own research before investing

## 🤝 Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

This project is open source. Please check the license terms before use.

## 🆘 Support

For support or questions:

- Join our [Discord community](https://discord.gg/AZ2FGGsDEz)
- Follow us on [Twitter](https://x.com/Topaz_For_Us)
- Open an issue on [GitHub](https://github.com/Topaz-For-Us)

---

**Built with 💎 by the Topaz community**

*Remember: This is a meme coin. Invest responsibly and never invest more than you can afford to lose.*
