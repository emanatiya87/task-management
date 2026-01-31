export interface taskType {
  id: string;
  project_id: string;
  title: string;
  epic_id?: string;
  description?: string;
  assignee_id?: string;
  due_date?: string;
  status: string;
}
