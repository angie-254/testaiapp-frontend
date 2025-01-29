import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Link as LinkIcon, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useParams, useRouter } from 'next/navigation';
import { useCampaign, useSubmitContent } from '@/lib/hooks/campaigns';


const CampaignDetail = () => {
  const router = useRouter();
  const params = useParams();
  const campaignId = Number(params.id);
  const [contentUrl, setContentUrl] = useState('');
  const { 
    data: campaignData, 
    isLoading, 
    error 
  } = useCampaign(campaignId);
  
  const { 
    mutate: submitContent, 
    isPending: isSubmitting,
    isSuccess: isSubmitSuccess,
    error: submitError 
  } = useSubmitContent();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    submitContent({ 
      campaignId, 
      contentUrl 
    }, {
      onSuccess: () => {
        setContentUrl('');
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error || !campaignData) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Alert className="bg-red-50">
          <AlertDescription>
            Error loading campaign details. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <button 
          onClick={() => router.push('/dashboard/campaignLists')}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Campaigns
        </button>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">{campaignData.title}</h1>
          <Badge 
            className={campaignData.status === 'ACTIVE' ? 'bg-green-500' : 'bg-gray-500'}
          >
            {campaignData.status}
          </Badge>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-xl font-semibold">Campaign Details</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-gray-600">{campaignData.description}</p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Requirements</h3>
              <p className="text-gray-600">{campaignData.requirements}</p>
            </div>

            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-gray-500" />
              <span className="text-gray-600">
                Deadline: {new Date(campaignData.deadline).toLocaleDateString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-xl font-semibold">Submit Content</h2>
        </CardHeader>
        <CardContent>
          {isSubmitSuccess && (
            <Alert className="mb-4 bg-green-50">
              <AlertDescription>
                Your submission has been received successfully!
              </AlertDescription>
            </Alert>
          )}

{submitError && (
            <Alert className="mb-4 bg-red-50">
              <AlertDescription>
                Error submitting content. Please try again.
              </AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Content URL (TikTok, Instagram, etc.)
              </label>
              <div className="relative">
                <LinkIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="url"
                  value={contentUrl}
                  onChange={(e) => setContentUrl(e.target.value)}
                  placeholder="https://..."
                  className="pl-10 w-full p-2 border rounded-md"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
               {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </span>
              ) : (
                'Submit Content'
              )}
            </button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Previous Submissions</h2>
        </CardHeader>
        <CardContent>
          {campaignData.submissions?.length > 0 ? (
            <div className="space-y-4">
              {campaignData.submissions.map((submission) => (
                <div
                  key={submission.id}
                  className="flex items-center justify-between p-4 border rounded-md"
                >
                  <div className="flex items-center">
                    <LinkIcon className="w-4 h-4 mr-2 text-gray-400" />
                    <a
                      href={submission.contentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {submission.contentUrl}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-4">
                      {new Date(submission.submittedAt).toLocaleDateString()}
                    </span>
                    <Badge>
                      {submission.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No submissions yet</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignDetail;