export interface Task {
    id?: string;
    title: string;
    description: string;
    due: string | null;
    category: string;
  }