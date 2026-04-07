-- Выполни в Supabase → SQL Editor (одним скриптом или по частям при повторном запуске).

-- ─── Профили пользователей ───
create table if not exists public.users (
  id           uuid primary key references auth.users(id) on delete cascade,
  email        text not null,
  name         text,
  avatar_url   text,
  accent_theme text not null default 'blue',
  plan         text not null default 'free'
                 check (plan in ('free', 'course', 'course_community')),
  plan_activated_at timestamptz,
  completion_email_sent boolean not null default false,
  course_completed boolean not null default false,
  course_completed_at timestamptz,
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

-- Автообновление updated_at
create or replace function public.update_updated_at()
returns trigger as $$
begin new.updated_at = now(); return new; end;
$$ language plpgsql;

drop trigger if exists users_updated_at on public.users;
create trigger users_updated_at
  before update on public.users
  for each row execute function public.update_updated_at();

-- ─── Коды доступа ───
create table if not exists public.access_codes (
  id       uuid primary key default gen_random_uuid(),
  code     text not null unique,
  plan     text not null check (plan in ('course', 'course_community')),
  used     boolean not null default false,
  used_by  uuid references public.users(id),
  used_at  timestamptz,
  note     text,
  created_at timestamptz default now()
);

-- ─── Прогресс уроков ───
create table if not exists public.lesson_progress (
  user_id    uuid references public.users(id) on delete cascade,
  lesson_id  int not null,
  completed  boolean not null default false,
  completed_at timestamptz,
  primary key (user_id, lesson_id)
);

-- ─── RLS ───
alter table public.users enable row level security;
alter table public.access_codes enable row level security;
alter table public.lesson_progress enable row level security;

drop policy if exists "users: own row" on public.users;
create policy "users: own row" on public.users
  for all using (auth.uid() = id);

drop policy if exists "access_codes: deny all" on public.access_codes;
create policy "access_codes: deny all" on public.access_codes
  for all using (false);

drop policy if exists "progress: own rows" on public.lesson_progress;
create policy "progress: own rows" on public.lesson_progress
  for all using (auth.uid() = user_id);

-- Если таблица users уже была без этого поля:
alter table public.users
  add column if not exists completion_email_sent boolean not null default false;

-- Прохождение курса (меню «Записаться на созвон», доступ к /completion)
alter table public.users
  add column if not exists course_completed boolean not null default false,
  add column if not exists course_completed_at timestamptz;

-- Уже получили письмо о завершении — считаем курс пройденным
update public.users
set
  course_completed = true,
  course_completed_at = coalesce(course_completed_at, updated_at)
where completion_email_sent = true
  and course_completed = false;
