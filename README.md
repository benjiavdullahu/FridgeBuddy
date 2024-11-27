# FoodStorage: Smart Food Management & Recipe Discovery


<div align="center">
  <hr>
  <strong>🍔 A Mobile App for Efficient Food Storage Management 🍕</strong>
  <hr>
</div>


<div align="center">
    [PLACEHOLDER: Add screenshot/demo of your food storage app main interface]
</div>

## Introduction
FoodStorage helps users track their stored food items, manage expiration dates, and discover recipes based on available ingredients. The app combines practical food management with recipe inspiration to reduce food waste and enhance meal planning.

## Key Features

- **Food Item Management**: 
  - Capture food items through the device camera
  - Store detailed information including expiry dates and descriptions
  - Visual tracking with image storage capabilities

- **Smart Notifications**:
  - Automated expiry date reminders
  - Configurable notification schedule (7, 5, 3, and 1 day before expiry)
  - Helps prevent food waste through timely alerts

- **Recipe Discovery**:
  - Instant recipe suggestions based on stored ingredients
  - Detailed cooking instructions with images
  - Pagination system for easy recipe browsing

- **Technology Stack**: Built with React Native, Expo, SQLite for local storage, and integrates with TheMealDB API. Features include:
  - Camera integration for food item capture
  - Local database for offline capability
  - Push notifications system
  - RESTful API integration for recipes

## Local Development
- **Prerequisites**: Ensure you have Node.js, npm, and Expo CLI installed.
- **Setup**:
  1. Clone the repository
  2. Install dependencies: `npm install`
  3. Start the Expo development server: `npm start`
  4. Use Expo Go app on your mobile device or an emulator to run the application

## Database Schema
The app uses SQLite for local storage with the following structure:
```sql
CREATE TABLE items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    expiry_date TEXT NOT NULL,
    image_uri TEXT,
    category TEXT,
    notes TEXT
);
```

## API Integration
Recipe data is fetched from TheMealDB API:
```javascript
const fetchRecipesByIngredients = async (ingredients) => {
    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`
    );
    return await response.json();
};
```

<div align="center">
    [PLACEHOLDER: Add screenshot of recipe view interface]
</div>
