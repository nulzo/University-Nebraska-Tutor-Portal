TutorTicketForm React Component Documentation
=============================================

The `TutorTicketForm` component is a React form used in a ticketing portal to display and update ticket details. It includes various form fields for ticket information and provides functionality to update the ticket using the `updateTicket` API. The form is built using the `react-hook-form` library and incorporates components from the project's UI library.

Overview
--------

The `TutorTicketForm` component consists of several key sections and components:

- **Alert Dialog and Trigger**: The form is displayed within an `AlertDialog`, triggered by a button with three dots.

- **Form Initialization**: The form is initialized using the `useForm` hook from `react-hook-form`. It uses a `FormSchema` provided by the `zod` library for validation.

- **Form Submission**: The form submission is handled by the `onSubmit` function, which triggers the `updateTicket` mutation and displays a success toast message.

- **Ticket Details Display**: Ticket details, including the title, ID, status, and actions, are displayed at the top of the form.

- **Dropdown Menus**: The form includes two dropdown menus with various actions, such as copying ticket details or flagging the ticket.

- **CheckDropdown**: A custom checkbox field (`CheckDropdown`) is used to toggle the `was_successful` property.

- **TextareaField**: A custom textarea field (`TextareaField`) is used for entering and displaying the ticket description.

- **DropdownField**: A custom dropdown field (`DropdownField`) is used for selecting the ticket status.

- **SearchFilterField and DropField**: Custom fields are used for selecting tutors and difficulty levels, respectively.

- **DetailLink Component**: The `DetailLink` component displays labeled details, such as student, professor, and course information.

- **Button Components**: Various buttons are used for actions like updating the form, discarding changes, or copying ticket details.

Usage
-----

To use the `TutorTicketForm` component, pass the ticket object as a prop. The form handles the display and editing of ticket details. It relies on the `react-hook-form` library for form management and incorporates components from the project's UI library for consistent styling.

Example:

```jsx
import TutorTicketForm from "@/path/to/TutorTicketForm";

function TicketDetailsPage({ ticket }) {
  return (
    <div>
      <h1>Ticket Details</h1>
      <TutorTicketForm ticket={ticket} />
    </div>
  );
}
