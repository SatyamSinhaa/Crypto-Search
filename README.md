# Cryptocurrency Search App
A React.js application to search and display details about various cryptocurrencies using the CoinGecko API.

## Features
- Search for cryptocurrencies by name.
- Displays:
  - Cryptocurrency name
  - Symbol
  - Current price in Indian Rupees (₹) and US Dollars ($)
  - Description
  - Homepage link
  - Logo of the cryptocurrency
- Caching of search results for faster repeated lookups.
- Debounced input handling to reduce unnecessary API calls.

## Tech Stack
- Frontend: React.js, Bootstrap
- Backend API: CoinGecko API
- Other Libraries: Axios, lodash.debounce

## How to Use
1. Enter the name of a cryptocurrency in the input field (e.g., "bitcoin").
2. Click Submit or wait for the input to debounce and process.
3. The application will display details of the cryptocurrency if found:
- Cryptocurrency logo
- Name and symbol
- Price in INR and USD
- Description
- Homepage link

## Screenshots
![Screenshot 2024-11-28 164922](https://github.com/user-attachments/assets/a6382230-40bc-43f4-b545-dc117520df08)

## Error Handling
- If the cryptocurrency is not found, an error message is displayed: "Cryptocurrency not found. Please check the name and try again."
- If there's an issue with the API or network, a generic error message is shown: "An error occurred. Please try again later."

## Optimizations
- Debounced Input : Reduces unnecessary API calls by waiting for 500ms after the user stops typing.
- Caching : Previously searched cryptocurrency data is stored in memory to avoid redundant API requests.

