# Project Documentation

This repository contains a collection of Python scripts and a web-based dashboard for an AI CI/CD Documentation Intelligence system. The Python files demonstrate basic scripting, function definitions, and object-oriented programming, while the HTML file provides a self-contained, backend-served dashboard with dynamic data fetching capabilities using embedded JavaScript.

## Python Components

### `main.py`

This is a simple Python script that prints a standard greeting to the console.

```python
print("hello world")
```

**Functionality:**
*   Outputs the string "hello world" to standard output.

### `test_function.py`

This file contains several Python functions and a class designed for testing and demonstration purposes.

```python
def hello_world():
    """A simple test function for AI documentation generation."""
    print("Hello from AI automation dashboard!")
    return "success"

def calculate_sum(a, b):
    """Calculate the sum of two numbers."""
    return a + b

class TestClass:
    """A test class to demonstrate AI documentation."""
    
    def __init__(self, name):
        self.name = name
    
    def greet(self):
        """Greet the user with the stored name."""
        return f"Hello, {self.name}!"
def new_function(): 
    return 'This is a new function for testing' 
```

**Functions:**

*   **`hello_world()`**
    *   **Description:** A simple test function.
    *   **Behavior:** Prints "Hello from AI automation dashboard!" to the console.
    *   **Returns:** The string `"success"`.

*   **`calculate_sum(a, b)`**
    *   **Description:** Calculates the sum of two numbers.
    *   **Parameters:**
        *   `a`: The first number.
        *   `b`: The second number.
    *   **Returns:** The sum of `a` and `b`.

*   **`new_function()`**
    *   **Behavior:** Returns a predefined string.
    *   **Returns:** The string `'This is a new function for testing'`.

**Classes:**

*   **`TestClass`**
    *   **Description:** A test class to demonstrate AI documentation capabilities.
    *   **Methods:**
        *   **`__init__(self, name)`**
            *   **Description:** Constructor for the `TestClass`.
            *   **Parameters:**
                *   `name`: A string to be stored as an instance attribute.
            *   **Behavior:** Initializes the `name` attribute of the instance.
        *   **`greet(self)`**
            *   **Description:** Greets the user using the stored name.
            *   **Returns:** A formatted string like `"Hello, [name]!"` where `[name]` is the name stored during initialization.

## Frontend Dashboard

### `backend\public\index.html`

This file defines a self-contained HTML document that serves as a dashboard for "AI CI/CD Documentation Intelligence." It includes embedded CSS for styling and embedded JavaScript for dynamic data fetching and display, requiring no separate frontend build process.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>AI CI/CD Docs Intelligence - Dashboard</title>
    <style> /* ... CSS rules ... */ </style>
  </head>
  <body>
    <!-- ... HTML content ... -->
    <script> /* ... JavaScript logic ... */ </script>
  </body>
</html>
```

**HTML Structure:**

The page is structured as follows:

*   **Header:** Displays the title "AI CI/CD Documentation Intelligence" and a subtitle "Backend-served dashboard (no frontend build required)". It also includes a "Refresh" button.
*   **Metric Grid:** A responsive grid showing four key metrics in "card" format:
    *   Events: Total
    *   Event Failures: Total
    *   AI Ops: Total
    *   AI Failures: Total
*   **Recent Activity Tables:** Two side-by-side tables (stacked on smaller screens):
    *   **Recent Events:** Displays event type, repository, status (with `pill` styling), and creation timestamp.
    *   **Recent AI Operations:** Displays prompt type, status (with `pill` styling), input size, and output size.
*   **Usage Analytics:** A section showing "Usage Analytics (last 7d)" with a note that token counts are estimated. The data is displayed as pre-formatted JSON.
*   **API Notes:** Provides information on API endpoints:
    *   GitHub Actions calls `POST /api/process-event` with `Authorization: Bearer API_AUTH_BEARER`.
    *   `/health` can be used for health checks.

**CSS Styling:**

The embedded `<style>` block provides a dark-themed, responsive design for the dashboard. Key styles include:

*   **Typography:** Uses `system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif` font stack.
*   **Layout:** Utilizes CSS Grid for the metric cards (`.grid`) and recent activity tables (`.row`), with responsiveness handled by a media query for screens up to `1000px`.
*   **Components:** Defines styles for headers, wrappers, cards, muted text, tables, and specifically styled "pill" elements for status indication (`.ok` for success, `.bad` for failure).
*   **Interactive Elements:** Provides styling for the "Refresh" button, including a hover effect.
*   **Code Display:** `<code>` tags have a distinct teal color.

**JavaScript Logic:**

The embedded `<script>` block handles data fetching, processing, and rendering for the dashboard.

*   **`getJson(path)` function:**
    *   **Description:** An asynchronous utility function to fetch JSON data from a specified API path.
    *   **Behavior:** Uses the `fetch` API. Throws an error if the HTTP response is not `ok`.
    *   **Parameters:**
        *   `path`: The URL path to fetch JSON from.
    *   **Returns:** A Promise that resolves to the parsed JSON data.

*   **`fmtDate(d)` function:**
    *   **Description:** Formats a date string into a localized string.
    *   **Behavior:** Attempts to create a `Date` object and format it using `toLocaleString()`. Includes error handling for invalid date inputs.
    *   **Parameters:**
        *   `d`: A date string.
    *   **Returns:** The localized date string or `'-'` if formatting fails.

*   **`pill(status)` function:**
    *   **Description:** Generates an HTML `<span>` element representing a status pill, styled based on the status value.
    *   **Behavior:** If `status` is `'failed'` or `'failure'`, it applies the `'pill bad'` class; otherwise, it applies `'pill ok'`.
    *   **Parameters:**
        *   `status`: The status string (e.g., `'success'`, `'failed'`).
    *   **Returns:** An HTML string for the status pill.

*   **`refresh()` function:**
    *   **Description:** An asynchronous function that fetches all necessary dashboard data from various API endpoints and updates the UI.
    *   **Behavior:**
        1.  Uses `Promise.all` to concurrently fetch data from:
            *   `/api/dashboard/metrics`
            *   `/api/dashboard/events?limit=10`
            *   `/api/dashboard/operations?limit=10`
            *   `/api/dashboard/usage?days=7`
        2.  Updates the text content of elements displaying total events, failed events, total AI operations, and failed AI operations using the data from `/api/dashboard/metrics`.
        3.  Populates the "Recent Events" table (`eventsTbody`) by mapping event data to HTML table rows, using `pill()` for status and `fmtDate()` for timestamps.
        4.  Populates the "Recent AI Operations" table (`opsTbody`) by mapping operation data to HTML table rows, using `pill()` for status and displaying `inputSize` and `outputSize`.
        5.  Displays the usage analytics data from `/api/dashboard/usage` as pretty-printed JSON in the `usage` `<pre>` element.

*   **Event Listener:**
    *   Attaches a `click` event listener to the element with ID `refresh` (the "Refresh" button).
    *   When clicked, it calls the `refresh()` function and logs any errors to the console.

*   **Initialization:**
    *   The `refresh()` function is called once when the page loads to populate the dashboard with initial data, logging any errors to the console.

**API Endpoints (as utilized/referenced in this file):**

The dashboard interacts with or references the following API endpoints:

*   `GET /api/dashboard/metrics`: Fetches overall dashboard metrics (events, AI operations totals and failures).
*   `GET /api/dashboard/events?limit=10`: Fetches up to 10 recent events.
*   `GET /api/dashboard/operations?limit=10`: Fetches up to 10 recent AI operations.
*   `GET /api/dashboard/usage?days=7`: Fetches usage analytics for the last 7 days.
*   `POST /api/process-event`: Referenced as an endpoint for GitHub Actions to call. Requires `Authorization: Bearer API_AUTH_BEARER`.
*   `GET /health`: Referenced as an endpoint for health checks.