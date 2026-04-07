export type PlanId = "free" | "course" | "course_community";

export type UserRow = {
  id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  accent_theme: string;
  plan: PlanId;
  plan_activated_at: string | null;
  completion_email_sent: boolean;
  created_at: string;
  updated_at: string;
};

export type AccessCodeRow = {
  id: string;
  code: string;
  plan: "course" | "course_community";
  used: boolean;
  used_by: string | null;
  used_at: string | null;
  created_at: string;
  note: string | null;
};

export type LessonProgressRow = {
  user_id: string;
  lesson_id: number;
  completed: boolean;
  completed_at: string | null;
};

/**
 * Формат, который ожидает @supabase/supabase-js (см. сгенерированные типы Supabase).
 * Без `Relationships` и блоков Views/Functions/Enums вложенные операции сводятся к `never`.
 */
export type Database = {
  public: {
    Tables: {
      users: {
        Row: UserRow;
        Insert: {
          id: string;
          email: string;
          name?: string | null;
          avatar_url?: string | null;
          accent_theme?: string;
          plan?: PlanId;
          plan_activated_at?: string | null;
          completion_email_sent?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          avatar_url?: string | null;
          accent_theme?: string;
          plan?: PlanId;
          plan_activated_at?: string | null;
          completion_email_sent?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      access_codes: {
        Row: AccessCodeRow;
        Insert: {
          id?: string;
          code: string;
          plan: "course" | "course_community";
          used?: boolean;
          used_by?: string | null;
          used_at?: string | null;
          note?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          code?: string;
          plan?: "course" | "course_community";
          used?: boolean;
          used_by?: string | null;
          used_at?: string | null;
          note?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      lesson_progress: {
        Row: LessonProgressRow;
        Insert: {
          user_id: string;
          lesson_id: number;
          completed?: boolean;
          completed_at?: string | null;
        };
        Update: {
          user_id?: string;
          lesson_id?: number;
          completed?: boolean;
          completed_at?: string | null;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
