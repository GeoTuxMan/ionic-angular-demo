/** Obiectivul introdus de utilizator (rezultatul formularului). */
export interface Goal {
  title: string;
  description: string;
  /** Data finalizarii, format ISO (YYYY-MM-DD). */
  dueDate: string;
  createdAt: string;
}
