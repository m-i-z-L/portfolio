export interface CareerHistory {
  id: string;
  company: string;
  role: string;
  /** 開始年月 "YYYY-MM" */
  startDate: string;
  /** 終了年月 "YYYY-MM"。省略した場合は現職とみなす */
  endDate?: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export const career: CareerHistory[] = [
  {
    id: 'company-c',
    company: 'Company C',
    role: 'バックエンドエンジニア',
    startDate: '2022-04',
    description:
      'ECプラットフォームのバックエンド開発をリード。マイクロサービス化推進とAPIパフォーマンス改善を担当。',
    achievements: [
      'モノリスからマイクロサービスへの段階的移行を設計・実施し、デプロイ頻度を月1回から週複数回に改善',
      'DBクエリ最適化とキャッシュ導入により主要APIのレスポンスタイムを平均60%削減',
      'チーム横断のAPIドキュメント整備を主導し、フロントエンドとの連携コストを大幅低減',
    ],
    technologies: ['Go', 'gRPC', 'PostgreSQL', 'Redis', 'Kubernetes', 'AWS'],
  },
  {
    id: 'company-b',
    company: 'Company B',
    role: 'バックエンドエンジニア',
    startDate: '2019-04',
    endDate: '2022-03',
    description:
      'SaaSプロダクトのAPI開発・運用を担当。新機能開発からパフォーマンスチューニングまで幅広く従事。',
    achievements: [
      'REST API設計・実装を一人でリードし、リリース後6ヶ月で1万件以上のエンドポイント呼び出しを安定処理',
      'CIパイプラインを整備しテストカバレッジを20%から75%に向上',
      'PostgreSQLのパーティショニング導入でデータ増加に伴うクエリ劣化を防止',
    ],
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'GitHub Actions'],
  },
  {
    id: 'company-a',
    company: 'Company A',
    role: 'バックエンドエンジニア',
    startDate: '2019-04',
    endDate: '2021-03',
    description:
      '受託開発会社にてWebアプリケーションのバックエンド開発を担当。複数プロジェクトを並行して経験。',
    achievements: [
      '複数の業務システムAPIを設計・開発し、オンスケでのリリースを達成',
      'レガシーシステムのPHP→Python移行プロジェクトに参加し、移行スクリプトを実装',
    ],
    technologies: ['Python', 'Django', 'MySQL', 'AWS', 'Docker'],
  },
];
