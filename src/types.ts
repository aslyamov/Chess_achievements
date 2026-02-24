export interface Student {
  id: string;
  name: string;
  createdAt: string;
}

export interface AchievementCategory {
  id: string;
  name: string;
}

export interface Achievement {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface StudentAchievement {
  id: string;
  studentId: string;
  achievementId: string;
  grantedAt: string; // ISO date string
}

export interface AppData {
  students: Student[];
  categories: AchievementCategory[];
  achievements: Achievement[];
  studentAchievements: StudentAchievement[];
}
