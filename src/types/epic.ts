export interface epicType {
  id: string;
  epic_id: string;
  title: string;
  description: string;
  created_at: string;
  deadline: string;
  assignee?: User;
  created_by?: User;
}
interface User {
  sub: string;
  name: string;
}
