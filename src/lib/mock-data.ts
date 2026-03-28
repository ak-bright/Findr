import { Job, Application, Profile } from './types';

// Mock data for development without Supabase connection

export const MOCK_COMPANIES: Profile[] = [
  {
    id: 'company-1',
    full_name: 'TechCorp Ghana',
    role: 'company',
    company_name: 'TechCorp Ghana',
    created_at: '2026-01-15T10:00:00Z',
  },
  {
    id: 'company-2',
    full_name: 'DataHive Solutions',
    role: 'company',
    company_name: 'DataHive Solutions',
    created_at: '2026-02-01T08:00:00Z',
  },
  {
    id: 'company-3',
    full_name: 'GreenLeaf Digital',
    role: 'company',
    company_name: 'GreenLeaf Digital',
    created_at: '2026-01-20T12:00:00Z',
  },
  {
    id: 'company-4',
    full_name: 'FinServe Africa',
    role: 'company',
    company_name: 'FinServe Africa',
    created_at: '2026-02-10T09:00:00Z',
  },
];

export const MOCK_JOBS: Job[] = [
  {
    id: 'job-1',
    company_id: 'company-1',
    title: 'Frontend Developer Intern',
    description:
      'Join our frontend team to build modern web applications using React and Next.js. You will work alongside senior developers, participate in code reviews, and contribute to real-world projects serving thousands of users across Ghana.',
    location: 'Accra',
    skills: ['React', 'JavaScript', 'CSS', 'HTML', 'TypeScript'],
    category: 'internship',
    deadline: '2026-05-30',
    created_at: '2026-03-01T10:00:00Z',
    company: MOCK_COMPANIES[0],
  },
  {
    id: 'job-2',
    company_id: 'company-2',
    title: 'Data Analyst — NSS Placement',
    description:
      'We are looking for a National Service Personnel to join our data analytics team. You will work with large datasets, create dashboards, and generate insights that drive business decisions. Training will be provided.',
    location: 'Kumasi',
    skills: ['Python', 'SQL', 'Excel', 'Power BI', 'Data Analysis'],
    category: 'nss',
    deadline: '2026-06-15',
    created_at: '2026-03-05T08:00:00Z',
    company: MOCK_COMPANIES[1],
  },
  {
    id: 'job-3',
    company_id: 'company-3',
    title: 'Junior UX Designer',
    description:
      'GreenLeaf Digital is hiring a Junior UX Designer to help create beautiful and intuitive digital experiences. You should have a strong eye for design and basic experience with Figma or similar tools.',
    location: 'Remote',
    skills: ['Figma', 'UI/UX Design', 'Adobe Photoshop', 'HTML', 'CSS'],
    category: 'entry-level',
    deadline: '2026-04-30',
    created_at: '2026-03-10T12:00:00Z',
    company: MOCK_COMPANIES[2],
  },
  {
    id: 'job-4',
    company_id: 'company-1',
    title: 'Backend Engineer Intern',
    description:
      'Work on our backend infrastructure using Node.js and PostgreSQL. You will help build RESTful APIs, optimize database queries, and ensure high availability of our services.',
    location: 'Accra',
    skills: ['Node.js', 'PostgreSQL', 'JavaScript', 'TypeScript', 'Git'],
    category: 'internship',
    deadline: '2026-05-15',
    created_at: '2026-03-08T10:00:00Z',
    company: MOCK_COMPANIES[0],
  },
  {
    id: 'job-5',
    company_id: 'company-4',
    title: 'Finance & Accounting Intern',
    description:
      'FinServe Africa is looking for a detail-oriented intern to support our finance team. You will assist with financial reporting, reconciliation, and data entry using Excel and QuickBooks.',
    location: 'Accra',
    skills: ['Excel', 'Accounting', 'Finance', 'Communication'],
    category: 'internship',
    deadline: '2026-06-01',
    created_at: '2026-03-12T09:00:00Z',
    company: MOCK_COMPANIES[3],
  },
  {
    id: 'job-6',
    company_id: 'company-2',
    title: 'Machine Learning Engineer — Entry Level',
    description:
      'Join our AI team to build and deploy ML models. Work with cutting-edge tools like Python, TensorFlow, and scikit-learn to solve real business problems.',
    location: 'Kumasi',
    skills: ['Python', 'Machine Learning', 'Data Analysis', 'SQL', 'Git'],
    category: 'entry-level',
    deadline: '2026-05-20',
    created_at: '2026-03-15T08:00:00Z',
    company: MOCK_COMPANIES[1],
  },
  {
    id: 'job-7',
    company_id: 'company-3',
    title: 'Content Writer — NSS',
    description:
      'We need a creative writer for our NSS placement. You will produce blog posts, social media content, and marketing copy for our digital campaigns.',
    location: 'Takoradi',
    skills: ['Content Writing', 'SEO', 'Social Media', 'Communication'],
    category: 'nss',
    deadline: '2026-06-30',
    created_at: '2026-03-18T12:00:00Z',
    company: MOCK_COMPANIES[2],
  },
  {
    id: 'job-8',
    company_id: 'company-4',
    title: 'Mobile App Developer Intern',
    description:
      'Build cross-platform mobile applications using Flutter. You will work closely with designers and backend engineers to ship features for our financial services app.',
    location: 'Accra',
    skills: ['Flutter', 'Dart', 'Git', 'JavaScript', 'Problem Solving'],
    category: 'internship',
    deadline: '2026-05-25',
    created_at: '2026-03-20T09:00:00Z',
    company: MOCK_COMPANIES[3],
  },
];

export const MOCK_APPLICATIONS: Application[] = [
  {
    id: 'app-1',
    job_id: 'job-1',
    user_id: 'user-1',
    applicant_name: 'Kwame Asante',
    cv_text: 'Experienced frontend developer with React skills...',
    status: 'pending',
    created_at: '2026-03-22T10:00:00Z',
    job: MOCK_JOBS[0],
  },
  {
    id: 'app-2',
    job_id: 'job-2',
    user_id: 'user-1',
    applicant_name: 'Kwame Asante',
    cv_text: 'Data analysis background with Python and SQL...',
    status: 'reviewed',
    created_at: '2026-03-23T08:00:00Z',
    job: MOCK_JOBS[1],
  },
];
