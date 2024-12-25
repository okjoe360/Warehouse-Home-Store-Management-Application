# Warehouse/Home Store Management Application

## Overview
This is a simple and user-friendly application for managing inventory and operations of a warehouse or a home store. Built with **Python Eel** for the front-end, **Peewee SQLite** for the database, and **JavaScript** for enhanced interactivity, the application provides essential features to track stock, add or remove items, and generate reports.

## Features
- **Inventory Management**: Add, update, delete, and view items in the inventory.
- **Stock Tracking**: Track quantities and restocking needs.
- **Search Functionality**: Quickly find items by name or category.
- **Database Integration**: Persistent data storage using Peewee ORM and SQLite.
- **User Interface**: Interactive and lightweight interface powered by Eel and JavaScript.

## Technologies Used
- **Python**
  - Eel: For building the HTML-based GUI.
  - Peewee: Lightweight ORM for SQLite database.
- **SQLite**: Reliable, self-contained database engine.
- **JavaScript**: Enhances interactivity and responsiveness in the UI.
- **HTML/CSS**: To structure and style the user interface.

## Installation

### Prerequisites
Ensure you have the following installed:
- Python 3.x
- pip (Python package manager)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/warehouse-management.git
   cd warehouse-management
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the application:
   ```bash
   python main.py
   ```

## Usage
1. Start the application by running `main.py`.
2. Use the interface to:
   - Add new items to inventory.
   - Update stock levels.
   - Delete outdated items.
   - Search for specific products.
3. View reports or export data if supported.

## Folder Structure
```
warehouse-management/
├── main.py               # Entry point of the application
├── my_database.py           # Database models and connections
├── view
│     ├── templates/
│          └── index.html # HTML templates
├── requirements.txt      # Python dependencies
└── README.md             # Project documentation
```

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

## Contact
For questions or feedback, feel free to reach out:
- **GitHub**: [Your GitHub Profile](https://github.com/okjoe360)
- **Email**: me@joelokoniha.com
