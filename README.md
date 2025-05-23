# Project: Content Display and Print System

## Description

This project is a Node.js web application that allows users to submit content (headlines, text, and images) which is then queued and displayed on a webpage. The webpage features a dynamic layout where text segments are interspersed with randomly placed decorative rectangles. The system also includes a browser-based print functionality to print the displayed content. Content submissions are categorized into 'good' or 'evil' queues, and the frontend fetches from these queues to update its display.

## Installation

1.  Clone the repository (if applicable).
2.  Navigate to the project directory.
3.  Install the required dependencies:
    ```bash
    npm install
    ```

## Running the Application

To start the main server, run the following command from the project's root directory:

```bash
node api.js
```

The server will typically start on `http://localhost:8000`.

## API Endpoints

The application exposes the following API endpoints:

### 1. Update Content

*   **Endpoint:** `POST /updateContent`
*   **Description:** Submits new content to be displayed. The content is added to either a 'good' or 'evil' queue based on the `gesinnung` field.
*   **Request Body (JSON):**
    ```json
    {
        "headline": "Your Headline Here",
        "text": "Your descriptive text here.",
        "imageUrl": "URL_to_your_image.jpg",
        "gesinnung": 0 
    }
    ```
    *   `gesinnung`: `0` for 'good' queue, `1` for 'evil' queue.
*   **Response:**
    *   `200 OK`: With text message "Content updated".

### 2. Get Good Content

*   **Endpoint:** `GET /getGood`
*   **Description:** Retrieves the next available item from the 'good' content queue.
*   **Response (JSON):**
    *   If content is available (200 OK):
        ```json
        {
            "data": {
                "headline": "Good Headline",
                "text": "Good text.",
                "imageUrl": "good_image.jpg",
                "gesinnung": 0
            },
            "message": "Content retrieved from good queue"
        }
        ```
    *   If queue is empty (404 Not Found):
        ```json
        {
            "data": null,
            "message": "Good queue is empty"
        }
        ```

### 3. Get Evil Content

*   **Endpoint:** `GET /getEvil`
*   **Description:** Retrieves the next available item from the 'evil' content queue.
*   **Response (JSON):**
    *   If content is available (200 OK):
        ```json
        {
            "data": {
                "headline": "Evil Headline",
                "text": "Evil text.",
                "imageUrl": "evil_image.jpg",
                "gesinnung": 1
            },
            "message": "Content retrieved from evil queue"
        }
        ```
    *   If queue is empty (404 Not Found):
        ```json
        {
            "data": null,
            "message": "Evil queue is empty"
        }
        ```

## Project Structure

*   `api.js`: The main Node.js Express server application. Handles API requests and manages content queues.
*   `index.html`: The main HTML file for the frontend display.
*   `style.css`: Contains all CSS styles for `index.html`, including print-specific styles.
*   `public/`: Directory for static assets.
    *   `mainScript.js`: Client-side JavaScript for `index.html` that handles fetching content, updating the DOM, and triggering print.
    *   `rectangleScript.js`: Client-side JavaScript responsible for generating the dynamic layout of text and rectangles.
    *   Font files (`.woff2`): Custom fonts used in the application.
    *   `test.pdf`: A sample PDF file (purpose might need clarification).
*   `package.json`: Defines project metadata, dependencies, and scripts.
*   `package-lock.json`: Records the exact versions of dependencies.

## Notes on Functionality

*   **Dynamic Layout:** The `public/rectangleScript.js` dynamically arranges text content and inserts decorative black rectangles on the page.
*   **Printing:** The application uses the browser's native print functionality (`window.print()`) triggered via a button on the webpage. Print-specific styling is included in `style.css`.
*   **Content Queues:** The backend maintains two in-memory queues for content ('good' and 'evil'). These queues are reset if the server restarts.
```
