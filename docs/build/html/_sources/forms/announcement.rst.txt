AnnouncementForm
===============

This module contains the `AnnouncementForm` component, which is used to create and submit announcements.

Form Schema
-----------

The `FormSchema` object defines the schema for the announcement form, including the title, body, variant, start date, end date, and show date. It also specifies the validation rules and error messages for each field.

Submitting the Form
-------------------

When the form is submitted, the `onSubmit` function is called, which triggers a toast notification displaying the submitted values in a formatted JSON style.

Rendering the Form
------------------

The `AnnouncementForm` component renders a form using the `useForm` hook from `react-hook-form`. It includes input fields for the announcement title, body, variant, start date, end date, and show date. Each field is rendered with appropriate validation and error messages.

UI Components
-------------

The form utilizes various UI components such as `Textarea`, `Select`, `Input`, `Button`, `Switch`, `Popover`, and `CalendarIcon` for user interaction and input.

Character Limits
----------------

The form also enforces character limits for the body field, with a maximum length of 255 characters. The character count is dynamically displayed as the user types in the `Textarea`, providing real-time feedback to the user.

Form Submission
---------------

Upon completion, the user can submit the form by clicking the "Schedule" button.

This RST documentation provides an overview of the `AnnouncementForm` component and its functionality within the ticketing portal.