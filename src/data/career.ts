export interface CareerProject {
  name: string;
  description: string;
  role: string;
  teamSize?: number;
  technologies?: string[];
  achievements?: string[];
}

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
  projects?: CareerProject[];
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
    projects: [
      {
        name: 'マイクロサービス移行プロジェクト',
        description:
          '既存のモノリシックECバックエンドを複数のマイクロサービスに段階的に分割。サービスメッシュ導入によりサービス間通信の信頼性を確保した。',
        role: 'バックエンドテックリード',
        teamSize: 6,
        technologies: ['Go', 'gRPC', 'Kubernetes', 'Istio', 'AWS EKS'],
        achievements: [
          'デプロイ頻度を月1回から週3〜5回に改善し、機能リリースサイクルを大幅短縮',
          '障害時のサービス影響範囲をモノリス比で約70%低減',
        ],
      },
      {
        name: '注文・在庫API パフォーマンス改善',
        description:
          'ピーク時にレスポンスが劣化していた注文・在庫管理APIを対象に、クエリ最適化・Redis キャッシュ導入・非同期処理化を実施。',
        role: 'バックエンドエンジニア（担当リード）',
        teamSize: 3,
        technologies: ['Go', 'PostgreSQL', 'Redis', 'AWS SQS'],
        achievements: [
          '主要APIのP95レスポンスタイムを800msから320msに短縮（60%削減）',
          'キャッシュヒット率85%を達成し、DBへの直接クエリ数を大幅削減',
        ],
      },
    ],
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
    projects: [
      {
        name: 'SaaSレポーティング機能 API 開発',
        description:
          '大量データの集計・出力を行うレポーティング機能のREST APIを設計・実装。非同期ジョブキューによるバックグラウンド処理を導入し、タイムアウトを解消した。',
        role: 'バックエンドエンジニア（一人リード）',
        teamSize: 4,
        technologies: ['Python', 'FastAPI', 'PostgreSQL', 'Celery', 'Redis'],
        achievements: [
          'リリース後6ヶ月で1万件以上のエンドポイント呼び出しを安定処理',
          '非同期処理化によりタイムアウトエラー率をゼロに抑制',
        ],
      },
    ],
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
