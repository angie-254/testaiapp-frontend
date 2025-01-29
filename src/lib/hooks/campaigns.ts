import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../axios';

export interface Campaign {
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

export const useCampaigns = () => {
  return useQuery({
    queryKey: ['campaigns'],
    queryFn: async () => {
      const { data } = await api.get<Campaign[]>('/campaigns');
      return data;
    },
  });
};

export const useCampaign = (id: number) => {
  return useQuery({
    queryKey: ['campaigns', id],
    queryFn: async () => {
      const { data } = await api.get<Campaign & { submissions: Submission[] }>(`/campaigns/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

export const useSubmitContent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ campaignId, contentUrl }: { campaignId: number; contentUrl: string }) => {
      const { data } = await api.post(`/campaigns/${campaignId}/submissions`, { contentUrl });
      return data;
    },
    onSuccess: (_, { campaignId }) => {
      queryClient.invalidateQueries({ queryKey: ['campaigns', campaignId] });
    },
  });
};