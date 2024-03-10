# React Native Leaderboard App with Fuzzy Search

This React Native application functions as a leaderboard with functionalities like sorting and fuzzy search (bonus feature).

## Features:

- Manages a list of users with attributes like name, rank, and number of bananas.
- Displays user data in a table format.
- Sorts the table by different columns (name, rank, bananas) in ascending or descending order.
- Implements a fuzzy search functionality to search users based on their names (case-insensitive).

## Setup

1. Install dependencies using `npm install` 
2. Run the application using `npx expo start`
3. Press `i` to open iOS simulator

## Usage:

1. The application will display the search bar and an empty results list initially.
2. Use the search bar to enter a search query for user names. The fuzzy search will identify users whose names partially match the query.
3. Click on the table headers (name, rank, bananas) to sort the data by that column in ascending or descending order.

## Additional Notes:

- The application utilizes Redux (not Redux Toolkit) for state management.
- The code leverages TypeScript for type safety.
- While the developer has 9 years of experience with Angular, this is their first attempt at building a React Native application. The code strives to adhere to common best practices and familiar programming patterns from the developer's Angular background.

I hope this README provides a clear overview of the application's purpose, functionalities, and usage. Feel free to explore the codebase for a deeper understanding of the implementation.