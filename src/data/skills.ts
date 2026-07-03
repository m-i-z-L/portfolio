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
  { name: 'PHP', category: 'language', level: 'expert', yearsOfExperience: 7, featured: true },
  { name: 'SQL', category: 'language', level: 'proficient', yearsOfExperience: 7, featured: true },
  { name: 'Python', category: 'language', level: 'familiar', yearsOfExperience: 2, featured: false },

  // Framework
  { name: 'Laravel', category: 'framework', level: 'expert', yearsOfExperience: 7, featured: true },

  // Database
  { name: 'MySQL', category: 'database', level: 'expert', yearsOfExperience: 7, featured: true },
  { name: 'Redis', category: 'database', level: 'proficient', yearsOfExperience: 5, featured: true },
  { name: 'OpenSearch', category: 'database', level: 'familiar', yearsOfExperience: 2, featured: false },

  // Infrastructure
  { name: 'AWS', category: 'infrastructure', level: 'proficient', yearsOfExperience: 5, featured: true },
  { name: 'GitLab CI/CD', category: 'infrastructure', level: 'proficient', yearsOfExperience: 5, featured: false },

  // Tool
  { name: 'Git', category: 'tool', level: 'expert', yearsOfExperience: 7, featured: false },
  { name: 'PHPUnit', category: 'tool', level: 'proficient', yearsOfExperience: 5, featured: true },
  { name: 'Pest', category: 'tool', level: 'familiar', yearsOfExperience: 1, featured: false },
];
