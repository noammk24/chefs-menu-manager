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
- Add a picture to a menu item
- Validate required information
- Receive feedback when an item is successfully saved
- Display a suitable message when no menu items have been added

Each menu item contains the following information:

- Dish Name
- Description
- Course
- Price
- Optional Picture

---

## Technologies Used

- React Native (React Native, n.d.-d)
- TypeScript (TypeScript, n.d.)
- JavaScript
- Node.js
- Android Studio
- Android SDK
- Visual Studio Code
- Git and GitHub

---

## Main Features

### 1. Home Screen

The Home screen displays the restaurant menu items in a clear and organised list, using React Native components such as `View`, `Text`, `FlatList` and `TouchableOpacity` (React Native, n.d.-a; React Native, n.d.-b; React Native, n.d.-g; React Native, n.d.-i; React Native, n.d.-j).

If no menu items have been added, the application displays an empty-state message.

Each menu item displays:

- Dish Name
- Course
- Description
- Price

### 2. Add Menu Item

The **Add Menu Item** screen allows the chef to enter information about a new dish using `TextInput` and other React Native interface components (React Native, n.d.-a; React Native, n.d.-h).

The chef can enter:

- Dish Name
- Description
- Course
- Price
- An optional picture selected from the device's photo library

The selected picture is previewed before the menu item is saved.

The available course options are:

- Starter
- Main Course
- Dessert

### 3. Input Validation

The application checks that the required information has been entered before saving a menu item. Form values and validation messages are held in React state (React, n.d.-b), while `TextInput` provides the fields for entering information (React Native, n.d.-h).

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
- Picture (change or remove it)

### 7. Menu Item Pictures

The chef can choose one picture from the device's photo library when adding or editing a menu item using `react-native-image-picker` (React Native Image Picker, n.d.). The picture can be previewed, changed, or removed, and is displayed with the menu item on the Home screen and details screen using React Native's `Image` component (React Native, n.d.-c).

---

## Changelog

### 29 August 2026 - React Native and TypeScript setup

- Set up the React Native project, TypeScript configuration, npm dependencies, and native Android and iOS project structure.

### 30 August-2 September 2026 - Menu screens and validation

- Created the initial restaurant menu interface and added screen navigation.
- Added a form for dish name, description, course, and price, with required-field checks and messages for missing or invalid values.
- Added menu item details so an item can be viewed separately.

### 28-29 September 2026 - Menu management, search, and statistics

- Added menu item creation and editing, with success feedback after saving.
- Added menu-name search, course filters for starters, main courses, and desserts, and a control to clear both.
- Added menu overview statistics for total items and average price, plus counts for each course.

### 22 October 2026 - Reusable display components and picture selection

- Extracted menu item display, statistic cards, course statistics, and common action buttons into reusable components.
- Added selection of one dish photo from the device's photo library, with a preview and the selected image URI included in the menu item.

### 6 November 2026 - Menu form and interface refactoring

- Extracted the search field, course filter, and empty-state message into separate components.
- Moved the add and edit forms into a shared `MenuItemForm`, and image display and its no-picture placeholder into `MenuItemImage`.
- Kept menu data, calculations, and screen navigation in `App.tsx`, while moving repeated presentation and form markup into components that receive values and callbacks. React components can be composed and reused, and props let a parent pass values and functions to child components (React, n.d.-a; React, n.d.-c). This makes the main screen easier to follow and lets the add and edit screens share the same form layout, making later changes easier to maintain.
- Improved photo-selection handling, including responses for cancellation, picker errors, and missing image results.

### Current implementation status

- The source code includes photo selection and preview for adding or editing an item, and displays the image in the menu list and details screen. An image can also be changed or removed while editing.
- Menu items and image URIs are kept in React state; no persistent storage is implemented, so they are not saved across app restarts.
- Photo selection was not tested on a device or emulator as part of this README update.

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
- Dish pictures
- Validation messages
- Success feedback
- Empty-state feedback

React Native provides the native interface components used by the app, while `StyleSheet` is used to define component styles (React Native, n.d.-a; React Native, n.d.-e; React Native, n.d.-f).

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
- [ ] Optionally select a picture and check its preview.
- [ ] Save the menu item.
- [ ] Check that the success message is displayed.
- [ ] Check that the new menu item and its picture appear on the Home screen.

### Viewing a Menu Item

- [ ] Select an existing menu item.
- [ ] Check that the menu item details are displayed correctly.
- [ ] Verify the dish name, description, course, and price.
- [ ] Check that the dish picture is displayed, if one was added.

### Editing a Menu Item

- [ ] Select an existing menu item.
- [ ] Select the edit option.
- [ ] Change one or more fields.
- [ ] Change or remove the picture, if desired.
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
- Advanced search functionality
- Additional menu filters
- Sorting menu items by price
- Delete functionality
- User authentication
- Cloud synchronisation
- Support for multiple chefs or restaurant staff

---

## Repository and video demonstration 

Git and GitHub are used to track project changes and host the project repository (Git, n.d.; GitHub, n.d.).

GitHub Repository:

https://github.com/noammk24/chefs-menu-manager

link video youtube:

https://youtu.be/k82V3IpaerM
---

## Author

**MULENGA NOAM KABEKE**
**ST10517736**

QUALIFICATION: Higher Certificate in Mobile Application and Web Development


COURSE NAME : Mobile App scripting 

---

## License

This project was developed for educational purposes.

---

## References

Git (n.d.) ‘About Git’. Git. Available at: https://git-scm.com/about (Accessed: 6 November 2026).

GitHub (n.d.) ‘About Git’. GitHub Docs. Available at: https://docs.github.com/en/get-started/using-git/about-git (Accessed: 6 November 2026).

React (n.d.-a) ‘Passing props to a component’. React. Available at: https://react.dev/learn/passing-props-to-a-component (Accessed: 6 November 2026).

React (n.d.-b) ‘State: A component’s memory’. React. Available at: https://react.dev/learn/state-a-components-memory (Accessed: 6 November 2026).

React (n.d.-c) ‘Your first component’. React. Available at: https://react.dev/learn/your-first-component (Accessed: 6 November 2026).

React Native (n.d.-a) ‘Core Components and APIs’. React Native. Available at: https://reactnative.dev/docs/components-and-apis (Accessed: 6 November 2026).

React Native (n.d.-b) ‘FlatList’. React Native. Available at: https://reactnative.dev/docs/flatlist (Accessed: 6 November 2026).

React Native (n.d.-c) ‘Image’. React Native. Available at: https://reactnative.dev/docs/image (Accessed: 6 November 2026).

React Native (n.d.-d) ‘Introduction’. React Native. Available at: https://reactnative.dev/docs/getting-started (Accessed: 6 November 2026).

React Native (n.d.-e) ‘Style’. React Native. Available at: https://reactnative.dev/docs/style (Accessed: 6 November 2026).

React Native (n.d.-f) ‘StyleSheet’. React Native. Available at: https://reactnative.dev/docs/stylesheet (Accessed: 6 November 2026).

React Native (n.d.-g) ‘Text’. React Native. Available at: https://reactnative.dev/docs/text (Accessed: 6 November 2026).

React Native (n.d.-h) ‘TextInput’. React Native. Available at: https://reactnative.dev/docs/textinput (Accessed: 6 November 2026).

React Native (n.d.-i) ‘TouchableOpacity’. React Native. Available at: https://reactnative.dev/docs/touchableopacity (Accessed: 6 November 2026).

React Native (n.d.-j) ‘View’. React Native. Available at: https://reactnative.dev/docs/view (Accessed: 6 November 2026).

React Native Image Picker (n.d.) ‘react-native-image-picker’. GitHub. Available at: https://github.com/react-native-image-picker/react-native-image-picker (Accessed: 6 November 2026).

TypeScript (n.d.) ‘TypeScript: Documentation - The TypeScript Handbook’. TypeScript. Available at: https://www.typescriptlang.org/docs/handbook/intro.html (Accessed: 6 November 2026).