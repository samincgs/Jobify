'use client';

import { getAllJobsAction } from '@/utils/action';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { JobCard } from './job-card';

export const JobsList = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const jobStatus = searchParams.get('jobStatus') || 'all';

  const pageNumber = Number(searchParams.get('page')) || 1;

  const { data, isPending } = useQuery({
    queryKey: ['jobs', search ?? '', jobStatus, pageNumber],
    queryFn: () => getAllJobsAction({ search, jobStatus, page: pageNumber }),
  });

  const jobs = data?.jobs || [];

  if (isPending) return <h2 className='text-xl'>Please wait...</h2>;

  if (jobs.length < 1) return <h2 className='text-xl'>No Jobs Found...</h2>;

  return (
    <>
      <div className='grid md:grid-cols-2  gap-8'>
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </>
  );
};
