# Restaurant Menu Manager

A simple React Native mobile application that allows a chef to manage restaurant menu items digitally.

## Project Overview

The **Restaurant Menu Manager** was developed to replace a paper-based method of managing restaurant menu information.

The application provides the chef with a simple way to create, view, update, and manage menu items from a mobile device.

The application allows the chef to:

- Add new menu items
- View existing menu items
- View detailed information about a menu item
- Edit existing menu items
- Validate required information
- Receive feedback when an item is successfully saved
- Display a suitable message when no menu items have been added

Each menu item contains the following information:

- Dish Name
- Description
- Course
- Price

---

## Technologies Used

- React Native
- TypeScript
- JavaScript
- Node.js
- Android Studio
- Android SDK
- Visual Studio Code
- Git and GitHub

---

## Main Features

### 1. Home Screen

The Home screen displays the restaurant menu items in a clear and organised list.

If no menu items have been added, the application displays an empty-state message.

Each menu item displays:

- Dish Name
- Course
- Description
- Price

### 2. Add Menu Item

The **Add Menu Item** screen allows the chef to enter information about a new dish.

The chef can enter:

- Dish Name
- Description
- Course
- Price

The available course options are:

- Starter
- Main Course
- Dessert

### 3. Input Validation

The application checks that the required information has been entered before saving a menu item.

For example, the application displays an error message if:

- The dish name is empty
- The description is empty
- A course has not been selected
- The price is empty
- The price is invalid

### 4. Success Feedback

After a menu item has been successfully saved, the application displays a confirmation message.

This provides feedback to the chef that the menu item has been added successfully.

### 5. Menu Item Details

The application allows the chef to select a menu item and view its information in more detail.

The details screen displays:

- Dish Name
- Description
- Course
- Price

### 6. Edit Menu Item

The chef can edit an existing menu item and update its information.

The chef can update:

- Dish Name
- Description
- Course
- Price

---

## User Interface

The application uses a simple and consistent interface designed around the main tasks of the chef.

The interface includes:

- Clear headings
- Labels for input fields
- Input fields
- Course selection
- Buttons for actions
- Menu item cards
- Validation messages
- Success feedback
- Empty-state feedback

---

## Application Flow

The basic application flow is:

```text
Home Screen
     ↓
Add Menu Item
     ↓
Enter Menu Information
     ↓
Validation
     ↓
Save Menu Item
     ↓
Success Message
     ↓
Menu Item Displayed
```

The chef can also select an existing menu item to view its details and edit the information:

```text
Home Screen
     ↓
Select Menu Item
     ↓
View Menu Item Details
     ↓
Edit Menu Item
     ↓
Save Changes
     ↓
Updated Menu Item
```

---

## Example Menu Item

Example information used for testing:

| Field | Example |
|---|---|
| Dish Name | Chicken Alfredo |
| Description | Creamy pasta with grilled chicken |
| Course | Main Course |
| Price | R85 |

---

## Project Structure

The main application code is contained in:

```text
App.tsx
```

A simplified project structure is:

```text
chefs-menu-manager/
│
├── android/
├── ios/
├── App.tsx
├── package.json
├── package-lock.json
├── tsconfig.json
├── .gitignore
└── README.md
```

> Note: The `node_modules` folder is normally excluded from GitHub using `.gitignore` and should be recreated by running `npm install`.

---

## Requirements

Before running the application, make sure the following are installed:

- Node.js
- React Native development environment
- Android Studio
- Android SDK
- Java Development Kit (JDK)
- Visual Studio Code

An Android emulator or a compatible Android device is also required to run the application.

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/noammk24/chefs-menu-manager.git
```

### 2. Open the Project Folder

```bash
cd chefs-menu-manager
```

### 3. Install the Project Dependencies

```bash
npm install
```

---

## Running the Application

### 1. Start the Metro Development Server

```bash
npx.cmd react-native start
```

### 2. Run the Application on Android

Open another terminal in the project directory and run:

```bash
npx.cmd react-native run-android
```

If using an Android emulator, make sure the emulator is running before executing the command.

Alternatively, a compatible Android device can be connected and used for testing.

---

## Testing

The following functions should be tested.

### Home Screen

- [ ] Open the application.
- [ ] Check that the Home screen is displayed.
- [ ] Check the empty-state message when there are no menu items.

### Adding a Menu Item

- [ ] Select **Add Menu Item**.
- [ ] Try to save the form without entering any information.
- [ ] Check that validation messages are displayed.
- [ ] Enter a valid dish name.
- [ ] Enter a valid description.
- [ ] Select a course.
- [ ] Enter a valid price.
- [ ] Save the menu item.
- [ ] Check that the success message is displayed.
- [ ] Check that the new menu item appears on the Home screen.

### Viewing a Menu Item

- [ ] Select an existing menu item.
- [ ] Check that the menu item details are displayed correctly.
- [ ] Verify the dish name, description, course, and price.

### Editing a Menu Item

- [ ] Select an existing menu item.
- [ ] Select the edit option.
- [ ] Change one or more fields.
- [ ] Save the changes.
- [ ] Verify that the updated information is displayed.

---

## Validation Testing

The following invalid inputs should also be tested:

| Test Case | Expected Result |
|---|---|
| Empty dish name | Validation message displayed |
| Empty description | Validation message displayed |
| No course selected | Validation message displayed |
| Empty price | Validation message displayed |
| Invalid price | Validation message displayed |
| Valid information | Menu item saved successfully |

---

## Purpose of the Project

The main purpose of this project is to demonstrate how a simple mobile application can be used to improve the way restaurant menu information is managed.

The application focuses on keeping the interface simple and allowing the chef to complete the main tasks without unnecessary steps.

---

## Future Improvements

Possible future improvements to the application could include:

- Persistent database storage
- Menu item images
- Search functionality
- Filtering menu items by course
- Sorting menu items by price
- Delete functionality
- User authentication
- Cloud synchronisation
- Support for multiple chefs or restaurant staff

---

## Repository and video demonstration 

GitHub Repository:

https://github.com/noammk24/chefs-menu-manager

link video youtube:

https://youtu.be/k82V3IpaerM
---

## Author

**MULENGA NOAM KABEKE**

QUALIFICATION: Higher Certificate in Mobile Application and Web Development
COURSE NAME : Mobile App scripting 

---

## License

This project was developed for educational purposes.