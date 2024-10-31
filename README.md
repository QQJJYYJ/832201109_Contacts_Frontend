
# Contacts Management Frontend

This repository contains the frontend application for the Contacts Management System. It is built using Vue.js and Element UI, providing a user interface to manage contact information. The frontend communicates with the backend via RESTful API endpoints to perform operations such as adding, updating, deleting, and searching for contacts.

## Project Structure

```
- 832201109_contacts_frontend
  - src                     # Frontend source files
    - assets                # Static resources
      - logo.png            # Project logo
    - components            # Vue components
      - HelloWorld.vue      # Sample component
    - router                # Router configuration
      - index.js            # Router entry file
    - App.vue               # Root component
    - main.js               # Application entry file
  - config                  # Configuration files
    - dev.env.js            # Development environment configuration
    - index.js              # Global configuration
    - prod.env.js           # Production environment configuration
  - static                  # Static files not processed by Webpack
    - .gitkeep              # Placeholder file
  - README.md               # Project documentation
  - codestyle.md            # Code style guide
  - .babelrc                # Babel configuration
  - .editorconfig           # Editor configuration
  - .eslintignore           # ESLint ignore rules
  - .eslintrc.js            # ESLint configuration
  - .gitignore              # Git ignore rules
  - .postcssrc.js           # PostCSS configuration
  - index.html              # Main HTML file
  - package-lock.json       # Dependency lock file
  - package.json            # Project dependencies
```

## Requirements

- Node.js 12+
- npm 6+
- Vue CLI 4+

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/QQJJYYJ/832201109_contacts_frontend.git
   cd 832201109_contacts_frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:8080`.

4. **Build for production**:
   ```bash
   npm run build
   ```
   This will generate the production files in the `dist` folder.

## Main Features

- **Contact Management**: Add, edit, delete, and search contacts.
- **Search Function**: Perform fuzzy search by name with real-time results.
- **Form Validation**: Ensures valid input for contact information (name and phone number).
- **Proxy for API Requests**: Configured in `config/index.js` to handle cross-origin requests during development.

## API Endpoints

The frontend communicates with the backend via the following API endpoints:
- **GET /api/select?Name={name}**: Search for contacts by name (fuzzy search).
- **POST /api/add**: Add a new contact.
- **POST /api/update**: Update an existing contact by ID.
- **POST /api/del**: Delete a contact by ID.

## Code Style

The project follows standard Vue.js and JavaScript conventions. For detailed code styling, please refer to `codestyle.md` in the root directory.

## Contribution

If you’d like to contribute, please fork the repository and use a feature branch. Pull requests are welcome!

## License

This project is licensed under the MIT License. See the LICENSE file for details.
