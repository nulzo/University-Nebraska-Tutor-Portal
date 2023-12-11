TicketForm TypeScript Module Documentation
==========================================

The `TicketForm` TypeScript module defines a React component responsible for creating support tickets. This documentation provides an overview of the module's structure, key components, and their responsibilities.

Overview
--------

The `TicketForm` component facilitates the creation of support tickets by gathering information from users, such as their name, selected professor, course, issue type, and a detailed description of the problem. It leverages various utility functions, hooks, and external APIs to enhance its functionality.

Key Components
--------------

### FormSchema

The `FormSchema` is a Zod schema defining the shape and validation rules for the form data. It ensures that the user provides valid input for fields such as name, title, professor, course, issue, and description.

### TicketLabel Component

This component renders a formatted label for certain form fields, such as the full name.

### TicketDescription Component

Similar to `TicketLabel`, this component renders a description for specific form fields, providing additional guidance or context.

### TicketForm Component

The main `TicketForm` component orchestrates the entire form. It uses the `react-hook-form` library for form management and validation. The component includes form fields for user information, selects for professors, courses, and issue types, and a text area for the ticket description. It also handles form submission, triggering the creation of a support ticket through the `createTicket` API.

### useFetchProfessor, useFetchCourse, useFetchIssue Hooks

These custom hooks fetch data from external APIs related to professors, courses, and issue types, respectively. They ensure that the form has up-to-date information for dropdowns and selects.

### LoadingSelect Component

This component provides a visual indication (e.g., loading spinner) when fetching data for selects.

### useToast Hook

The `useToast` hook manages the display of toast messages, providing user feedback on form submission.

### useNavigate Hook

The `useNavigate` hook from `react-router-dom` facilitates navigation upon successful ticket submission.

TicketForm React Component Documentation
========================================

The `TicketForm` component is a React form used to create a new ticket in a ticketing system. It allows users to provide information about their name, the professor, course, issue type, a brief summary, and a detailed description of their ticket. The form incorporates various UI components, including buttons, inputs, and popovers.

Overview
--------

The `TicketForm` component comprises several key sections and components:

- **Form Initialization**: The form is initialized using the `useForm` hook from `react-hook-form`. It uses the `FormSchema` provided by the `zod` library for validation.

- **Form Submission**: The form submission is handled by the `onSubmit` function, which triggers the `createTicket` mutation and displays a success toast message.

- **LoadingSelect**: A loading state is displayed for select dropdowns while fetching data.

- **Popovers and Commands**: Popovers are used for professor, course, and issue type selection, incorporating a search functionality (`Command`). Each selection dropdown is triggered by a `Button` and displays a list of items with a search input.

- **Form Fields and Validation**: Various form fields are utilized, including `Input`, `Textarea`, and custom `FormField` components. The form includes validation for name, title, professor, course, issue type, and description.

- **TicketLabel and TicketDescription**: Custom components (`TicketLabel` and `TicketDescription`) are used for styling labels and descriptions consistently.

- **Button Component**: The form submission is triggered by a `Button` component with dynamic disabling based on the mutation's pending state.

Usage
-----

To use the `TicketForm` component, integrate it into the desired page or component. The form handles the creation of new tickets, including input validation and mutation handling.

Example:

```jsx
import TicketForm from "@/path/to/TicketForm";

function NewTicketPage() {
  return (
    <div>
      <h1>Create a New Ticket</h1>
      <TicketForm />
    </div>
  );
}


### Additional Notes

- The `max_ticket_length` constant defines the maximum character limit for the ticket description.
- The form utilizes the `zodResolver` from `@hookform/resolvers/zod` for Zod schema-based validation.
- The `useMutation` hook from `@tanstack/react-query` manages the asynchronous ticket creation process.

Usage
-----

To use the `TicketForm` component, integrate it into a parent component or page within a React application. Make sure to include the necessary dependencies and handle form submission accordingly.

Example:

```jsx
import TicketForm from "@/path/to/TicketForm";

function SupportPage() {
  return (
    <div>
      <h1>Submit a Support Ticket</h1>
      <TicketForm />
    </div>
  );
}