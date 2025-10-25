### Countries App

This is a simple web application that displays information about countries around the world. It is built using Laravel, React and TypeScript, and it utilizes the REST Countries API to fetch country data.

### Setup

1. Clone the repository:
    ```bash
    git clone
    ```
2. Navigate to the project directory:
    ```bash
    cd countries
    ```
3. Install the dependencies:

    ```bash
    composer install
    npm install
    ```

4. Set up your environment variables by copying the example file:

    ```bash
    cp .env.example .env

    ```

5. Near the end of the .env file add the API URL:

    ```
    REST_COUNTRIES_API_URL=https://restcountries.com/v3.1/
    ```

6. Generate an application key:

    ```bash
    php artisan key:generate
    ```

7. Run the development server:
    ```bash
    php artisan serve
    npm run dev
    ```
    Or use this command to run both servers concurrently:
    ```bash
    composer run dev
    ```
