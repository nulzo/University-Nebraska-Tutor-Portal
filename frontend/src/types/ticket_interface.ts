export type TypeTicket = {
  id: number;
  professor: number;
  course: number | null;
  issue: number | null;
  student: number | null;
  tutor: number | null;
  name: string;
  title: string;
  description: string;
  status: "NEW" | "OPENED" | "CLOSED";
  created_at: string;
  opened_at: string | null;
  updated_at: string;
  closed_at: string | null;
  was_successful: boolean;
  was_reopened: boolean;
};
