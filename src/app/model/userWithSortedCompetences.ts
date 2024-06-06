import { User } from "./user";

export interface UserWithSortedCompetences extends User {
    sortedCompetences: { technology: string; rating: number }[]; // Interface for sorted user competences
  }