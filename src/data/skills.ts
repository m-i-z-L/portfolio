export type SkillCategory = 'language' | 'framework' | 'database' | 'infrastructure' | 'tool';
export type SkillLevel = 'expert' | 'proficient' | 'familiar';

export interface Skill {
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  yearsOfExperience: number;
  featured: boolean;
}

export const CATEGORY_LABELS: Record<SkillCategory, string> = {
  language: 'Language',
  framework: 'Framework',
  database: 'Database',
  infrastructure: 'Infrastructure',
  tool: 'Tool',
};

// カテゴリの表示順
export const CATEGORY_ORDER: SkillCategory[] = [
  'language',
  'framework',
  'database',
  'infrastructure',
  'tool',
];

export const skills: Skill[] = [
  // Language
  { name: 'Go', category: 'language', level: 'expert', yearsOfExperience: 5, featured: true },
  { name: 'Python', category: 'language', level: 'proficient', yearsOfExperience: 4, featured: true },
  { name: 'TypeScript', category: 'language', level: 'proficient', yearsOfExperience: 3, featured: true },
  { name: 'SQL', category: 'language', level: 'proficient', yearsOfExperience: 6, featured: true },
  { name: 'Bash', category: 'language', level: 'familiar', yearsOfExperience: 5, featured: false },

  // Framework
  { name: 'Echo', category: 'framework', level: 'expert', yearsOfExperience: 4, featured: true },
  { name: 'FastAPI', category: 'framework', level: 'proficient', yearsOfExperience: 2, featured: true },
  { name: 'Astro', category: 'framework', level: 'familiar', yearsOfExperience: 1, featured: false },

  // Database
  { name: 'PostgreSQL', category: 'database', level: 'expert', yearsOfExperience: 6, featured: true },
  { name: 'MySQL', category: 'database', level: 'proficient', yearsOfExperience: 4, featured: true },
  { name: 'Redis', category: 'database', level: 'proficient', yearsOfExperience: 3, featured: true },
  { name: 'BigQuery', category: 'database', level: 'familiar', yearsOfExperience: 2, featured: false },

  // Infrastructure
  { name: 'Docker', category: 'infrastructure', level: 'expert', yearsOfExperience: 5, featured: true },
  { name: 'Kubernetes', category: 'infrastructure', level: 'proficient', yearsOfExperience: 3, featured: true },
  { name: 'AWS', category: 'infrastructure', level: 'proficient', yearsOfExperience: 4, featured: true },
  { name: 'GCP', category: 'infrastructure', level: 'familiar', yearsOfExperience: 2, featured: false },
  { name: 'GitHub Actions', category: 'infrastructure', level: 'proficient', yearsOfExperience: 3, featured: false },

  // Tool
  { name: 'Git', category: 'tool', level: 'expert', yearsOfExperience: 7, featured: false },
  { name: 'gRPC', category: 'tool', level: 'proficient', yearsOfExperience: 3, featured: true },
  { name: 'OpenAPI', category: 'tool', level: 'proficient', yearsOfExperience: 3, featured: false },
];
