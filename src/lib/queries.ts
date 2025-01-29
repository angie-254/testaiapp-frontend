import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from './axios';

interface Campaign {
  id: number;
  title: string;
  description: string;
  requirements: string;
  deadline: Date;
  status: 'ACTIVE' | 'COMPLETED';
}

interface Submission {
  id: number;
  contentUrl: string;
  status: string;
  submittedAt: string;
}