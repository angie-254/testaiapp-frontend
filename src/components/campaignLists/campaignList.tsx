'use client';
import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, ArrowRight, Loader2 } from 'lucide-react';
import { Campaign, useCampaigns } from '@/lib/hooks/campaigns';

const CampaignCard = ({ campaign } : { campaign: Campaign }) => (
  <Card className="mb-4 hover:shadow-lg transition-shadow">
    <CardHeader className="flex flex-row items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold">{campaign.title}</h3>
        <div className="flex items-center text-gray-500 mt-1">
          <Calendar className="w-4 h-4 mr-2" />
          <span className="text-sm">
            Deadline: {new Date(campaign.deadline).toLocaleDateString()}
          </span>
        </div>
      </div>
      <Badge 
        className={campaign.status === 'ACTIVE' ? 'bg-green-500' : 'bg-gray-500'}
      >
        {campaign.status}
      </Badge>
    </CardHeader>
    <CardContent>
      <p className="text-gray-600 mb-4">{campaign.description}</p>
      <div className="flex justify-end">
        <button 
          onClick={() => window.location.href = `/campaigns/${campaign.id}`}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          View Details
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </CardContent>
  </Card>
);

const CampaignList = () => {
  const {data: campaigns, isLoading, error} = useCampaigns();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-800">Error loading campaigns. Please try again later.</p>
        </div>
      </div>
    );
  }
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Campaigns</h1>
        </div>
        
        <div>
        {campaigns?.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No campaigns found.</p>
        ) : (
          campaigns?.map(campaign => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))
        )}
        </div>
      </div>
    );
  };
  
  export default CampaignList;