import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils'; // Import act from react-dom/test-utils
import App from '../App';

describe('CRUD App', () => {

  // Rendering all the elements.
  test('Renders the initial components', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText('Enter item...');
    const addButton = screen.getByText('Add');
    expect(inputElement).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });

  // Adding new items.
  test('Adds a new item', async () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText('Enter item...');
    const addButton = screen.getByText('Add');

    fireEvent.change(inputElement, { target: { value: 'New Item' } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('New Item')).toBeInTheDocument();
    });
  });

  // Trying to add empty string
  test('Does not insert an empty string', async () => {
    render(<App />);
    const addButton = screen.getByText('Add');
    fireEvent.click(addButton);

    // Assert that the error message is shown
    const errorMessage = await screen.findByText('Item cannot be empty!');
    expect(errorMessage).toBeInTheDocument();
  });

  // Deleting an Item
  test('Deletes item correctly on clicking delete button', async () => {
    // Render the component
    const { getByText, getByPlaceholderText, queryByText } = render(<App />);

    // Add an item
    const inputElement = getByPlaceholderText('Enter item...');
    fireEvent.change(inputElement, { target: { value: 'Test Item' } });
    fireEvent.click(getByText('Add'));

    // Find the delete button and click it
    const deleteButton = getByText('Delete');
    fireEvent.click(deleteButton);

    // Wait for the component to re-render after state update
    await waitFor(() => {
      // Check if the item is removed from the UI
      expect(queryByText('Test Item')).toBeNull();
    });
  });

  // Updating an item
  test('Updates item correctly on clicking update button', async () => {
    // Render the component
    const { getByText, getByPlaceholderText } = render(<App />);

    // Add an item
    const inputElement = getByPlaceholderText('Enter item...');
    fireEvent.change(inputElement, { target: { value: 'Test Item' } });
    fireEvent.click(getByText('Add'));

    // Find the update button and click it
    const updateButton = getByText('Update');
    fireEvent.click(updateButton);

    // Modify the input field value
    fireEvent.change(inputElement, { target: { value: 'Updated Test Item' } });

    // Click the update button again to save changes
    const updateButton1 = getByText('Update');
    fireEvent.click(updateButton1);

    // Wait for the component to re-render after state update
    await waitFor(() => {
      // Check if the item is updated correctly in the UI
      expect(getByText('Updated Test Item')).toBeInTheDocument();
    });
  });

  // Checking that string cannot be updated with null value.
  test('Cannot update string with empty string', async () => {
    const { getByText, getByPlaceholderText } = render(<App />);

    // Add an item
    const inputElement = getByPlaceholderText('Enter item...');
    fireEvent.change(inputElement, { target: { value: 'Test Item' } });
    fireEvent.click(getByText('Add'));

    // Find the update button and click it
    fireEvent.click(getByText('Update'));

    // Update the string with an empty string
    fireEvent.change(inputElement, { target: { value: '' } });
    fireEvent.click(getByText('Update'));

    // Check if the error message is displayed
    await waitFor(() => {
      expect(getByText('Item cannot be empty!')).toBeInTheDocument();
    });

    // Ensure the item remains the same
    expect(getByText('Test Item')).toBeInTheDocument();
  });

  //Items length cannot exceed 1000 character
  test('Displays error message when input is more than 1000 characters', () => {
    render(<App />);

    // Get the input element
    const inputElement = screen.getByPlaceholderText('Enter item...');

    // Create a string longer than 1000 characters
    const longString = 'a'.repeat(1001);

    // Simulate typing a string longer than 1000 characters
    fireEvent.change(inputElement, { target: { value: longString } });

    // Get the add/update button and click it
    const addButton = screen.getByText('Add');
    fireEvent.click(addButton);

    // Get the error message element
    const errorMessage = screen.getByText('Try string of less than 1000 characters!');

    // Assert that the error message is displayed
    expect(errorMessage).toBeInTheDocument();
  });
});