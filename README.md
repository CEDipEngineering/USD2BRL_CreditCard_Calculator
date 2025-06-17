# USD to BRL Credit Card Calculator

A modern web application that helps Brazilian credit card users calculate their expenses in USD with accurate conversion rates, IOF tax, and safety margins.

## 🎯 Purpose

This calculator helps Brazilian users make informed decisions when making purchases in USD with their credit cards by:
- Providing real-time exchange rates
- Calculating IOF (Brazilian tax on foreign transactions)
- Adding a safety margin to account for exchange rate fluctuations
- Showing a detailed breakdown of all costs

## ✨ Features

- **Real-time Exchange Rates**
  - Automatically updated every 30 minutes
  - Cached globally to ensure fast loading
  - No API rate limiting issues
  - Persistent local storage for offline access

- **Smart Calculations**
  - Base USD to BRL conversion
  - IOF tax calculation (default: 3.5%)
  - Customizable safety margin (default: 3%)
  - Detailed cost breakdown

- **User Experience**
  - Clean, modern dark theme interface
  - Responsive design for all devices
  - Real-time calculations
  - Clear cost breakdown
  - No manual exchange rate input needed

## 🛠️ Technical Implementation

- **Frontend**
  - Vanilla JavaScript
  - Modern CSS with CSS variables
  - Responsive design
  - Local storage for caching

- **Exchange Rate Updates**
  - GitHub Actions workflow
  - Automatic updates every 30 minutes
  - Global caching through repository
  - Fallback mechanisms for reliability

## 🚀 Usage

1. Enter the amount in USD
2. The current exchange rate is automatically displayed
3. Adjust IOF rate if needed (default: 3.5%)
4. Adjust safety margin if needed (default: 3%)
5. View the detailed breakdown:
   - Base amount in BRL
   - IOF amount
   - Safety margin amount
   - Total amount

## 🔧 Development

### Local Setup
1. Clone this repository
2. Open `index.html` in your browser
3. Or visit the [GitHub Pages site](https://[your-username].github.io/USD2BRL_CreditCard_Calculator/)

### Exchange Rate Updates
The exchange rate is automatically updated through a GitHub Action that:
- Runs every 30 minutes
- Fetches the latest rate from the API
- Updates the cached rate in the repository
- Can be manually triggered if needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.