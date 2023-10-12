CRUD App
CRUD App is a basic web application developed using React, enabling users to Create, Read, Update, and Delete items in a list. It provides a user-friendly interface for managing items efficiently.

Features
Add Items: Users can easily add new items to the list.
Update Items: Existing items can be edited and updated as needed.
Delete Items: Unwanted items can be promptly removed from the list.
Error Handling: The app incorporates error messages for scenarios like empty items and string length validation.

How to Use
1. Clone the Repository
2. Navigate to Project Directory
3. Run the app: npm start


Running Tests
The project includes a comprehensive suite of tests to ensure its functionality.

Test Cases
Renders Initial Components:
Checks if the initial components are rendered correctly.

Adds a New Item:
Verifies if a new item can be successfully added to the list.

Does Not Insert an Empty String:
Ensures that empty strings are not allowed, and the appropriate error message is displayed.

Deletes Item Correctly on Clicking Delete Button:
Validates if items can be correctly deleted upon clicking the delete button.

Updates Item Correctly on Clicking Update Button:
Tests the functionality of updating items by clicking the update button.

Cannot Update String with Empty String:
Verifies that updating a string with an empty string is not allowed and displays the appropriate error message.

Displays Error Message for String Longer Than 1000 Characters:
Checks if an error message is displayed when the input string exceeds 1000 characters.

To Run test:
Type npm test in terminal
