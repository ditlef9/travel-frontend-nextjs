// app/types/TodoI.ts

export interface Todo {
    id: number;
    username: string; // Include this if it's part of your Todo object
    description: string;
    targetDate: string; // Adjust the type if it's a Date object
    done: boolean;
  }
  