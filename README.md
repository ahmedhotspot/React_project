# Hot Spot - Financial Services App

A comprehensive React Native financial services application that provides an easy-to-use interface for submitting financing requests and managing personal accounts.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Running](#running)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Translation and Language Support](#translation-and-language-support)
- [Dark Mode](#dark-mode)
- [Building the App](#building-the-app)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Complete Authentication System**: Login, registration, password recovery
- **Financial Request Management**: Submit and track financing requests
- **Multi-language Interface**: Support for Arabic and English with RTL/LTR
- **Dark/Light Mode**: Support for dark and light themes
- **Smart Forms**: Multi-step forms for submitting requests
- **Notifications**: Notification system for users
- **Ticket System**: Ticket management and technical support
- **Profile Management**: Update personal information and password
- **Offers Display**: View available financing offers
- **Eligibility Check**: Check eligibility before submitting a request

## Requirements

Before starting, make sure you have the following requirements installed:

- **Node.js**: Version 14 or higher
- **npm** or **yarn**: For package management
- **Expo CLI**: For management and development
- **Android Studio**: To run the app on Android emulator (optional)
- **Xcode**: To run the app on iOS simulator (optional - macOS only)

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd "New folder"
```

### 2. Install Dependencies

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

### 3. Install Expo CLI (if not already installed)

```bash
npm install -g expo-cli
```

## Running

### Running on Android

1. Make sure the Android emulator is running from Android Studio
2. Run the command:

```bash
npm run android
```

Or

```bash
yarn android
```

### Running on iOS

1. Make sure the iOS simulator is running from Xcode
2. Run the command:

```bash
npm run ios
```

Or

```bash
yarn ios
```

### Running with Expo

```bash
npm start
```

Then press:
- `a` to open on Android
- `i` to open on iOS
- `w` to open in browser

### Running on a Physical Device

1. Install the Expo Go app from the app store
2. Run `npm start`
3. Scan the QR code using Expo Go

## Project Structure

```
.
├── App.js                      # Main application entry point
├── app.json                    # Expo configuration
├── package.json                # Project dependencies
├── babel.config.js             # Babel configuration
├── assets/                     # Images and resources
│   ├── Icon.png
│   ├── splash.png
│   └── ...
├── components/                  # Reusable components
│   ├── Button.js
│   ├── InputField.js
│   ├── Dropdown.js
│   ├── DatePicker.js
│   ├── LanguageSwitcher.js
│   └── ...
├── screens/                    # Application screens
│   ├── LoginScreen.js
│   ├── RegistrationScreen.js
│   ├── HomeScreen.js
│   ├── ProfileScreen.js
│   ├── ApplicationFormScreen.js
│   └── formSteps/              # Form steps
│       ├── PersonalInfoStep.js
│       ├── IncomeInfoStep.js
│       ├── WorkInfoStep.js
│       └── ...
├── styles/                     # Style files
│   ├── App.styles.js
│   ├── LoginScreen.styles.js
│   └── ...
├── locales/                    # Translation files
│   ├── ar.js                   # Arabic translation
│   ├── en.js                   # English translation
│   └── index.js
└── contexts/                   # React Contexts
    └── ThemeContext.js         # Dark/Light mode management
```

## Technologies Used

- **React Native**: 0.72.6
- **Expo**: ~49.0.0
- **React**: 18.2.0
- **React Native SVG**: ^13.4.0
- **AsyncStorage**: @react-native-async-storage/async-storage
- **FontAwesome**: @fortawesome/react-native-fontawesome
- **Expo Image Picker**: ~14.3.2
- **Expo Document Picker**: ~11.5.4

## Translation and Language Support

The application supports both Arabic and English with full RTL/LTR support:

- **Arabic**: Full support for right-to-left interface
- **English**: Full support for left-to-right interface
- **Language Switching**: Language can be switched from any screen

### Adding a New Language

1. Create a new file in the `locales/` folder (e.g., `fr.js`)
2. Add the required translations
3. Update `locales/index.js` to add the new language

## Dark Mode

The application supports dark and light modes:

- **Automatic Switching**: Automatic switching can be enabled based on system settings
- **Manual Switching**: Users can manually switch the mode from app settings
- **Persistence**: User preferences are automatically saved

## Building the App

### Building APK for Android

```bash
eas build --platform android
```

### Building IPA for iOS

```bash
eas build --platform ios
```

### EAS Configuration

Build settings are managed through the `eas.json` file.

## Contributing

We welcome your contributions! Please follow these steps:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Standards

- Use ESLint to check code quality
- Follow React Native standards
- Add comments for complex code
- Write clear variable and function names

## Important Notes

- Make sure the Android/iOS emulator is running before starting the app
- If you encounter installation issues, delete `node_modules` and `package-lock.json` then reinstall
- For development on a physical device, make sure the device and computer are on the same network

## Reporting Issues

If you encounter any issues, please:

1. Verify that all requirements are installed correctly
2. Check Node.js and npm versions
3. Open an issue in the repository with a detailed description of the problem

## License

This project is private and owned by Hot Spot company.

## Support

For support, please contact us through:

- Email: support@hotspot.com
- App: Use the contact screen in the app

---

**Developed by**: Hot Spot Team  
**Version**: 1.0.0  
**Last Updated**: 2026
