import { Task } from "../../tasks/models/task.model";

export interface User {
    id?: string;
    name: string;
    email: string;
    tasks: Array<Task>;
  }