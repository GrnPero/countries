### Countries App

This is a simple web application that displays information about countries around the world. It is built using Laravel, React and TypeScript, and it utilizes the REST Countries API to fetch country data.

### Setup

1. Clone the repository:
    ```bash
    git clone git@github.com:GrnPero/countries.git
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

5. Make these changes to the .env file since we aren't using a database:

    ```
    # DB_CONNECTION=sqlite

    SESSION_DRIVER=file
    QUEUE_CONNECTION=sync
    CACHE_STORE=file
    ```

    Or you can just run the migrations if you prefer to keep the database configuration:

    ```bash
    php artisan migrate
    ```

6. Also, add the following line to the .env file to set the REST Countries API URL:

    ```
    REST_COUNTRIES_API_URL=https://restcountries.com/v3.1/
    ```

7. Generate an application key:

    ```bash
    php artisan key:generate
    ```

8. Run the development server:
    ```bash
    php artisan serve
    npm run dev
    ```
    Or use this command to run both servers concurrently:
    ```bash
    composer run dev
    ```
