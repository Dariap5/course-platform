export type UserData = {
  name: string;
  email: string;
};

export type ThemeId = "blue" | "violet" | "ocean" | "sunset" | "forest" | "gold";

export type Lesson = {
  id: number;
  title: string;
  description: string;
  duration: string;
  videoUrl: string;
  notionUrl: string;
  notionLabel: string;
};
