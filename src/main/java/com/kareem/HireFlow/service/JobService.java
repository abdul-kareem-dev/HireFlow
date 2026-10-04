package com.kareem.HireFlow.service;

import com.kareem.HireFlow.entity.Job;
import com.kareem.HireFlow.exception.ConflictException;
import com.kareem.HireFlow.repository.ApplicationRepository;
import com.kareem.HireFlow.repository.JobRepository;
import org.springframework.stereotype.Service;
import com.kareem.HireFlow.exception.ResourceNotFoundException;
import java.util.List;

@Service
public class JobService {

    private final JobRepository jobRepository;
    private final ApplicationRepository applicationRepository;

    public JobService(JobRepository jobRepository, ApplicationService applicationService, ApplicationRepository applicationRepository) {
        this.jobRepository = jobRepository;
        this.applicationRepository = applicationRepository;
    }

    public Job createJob(Job job) {
        return jobRepository.save(job);
    }

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public Job getJobById(Long id) {
        return jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));
    }

    public Job updateJob(Long id, Job updatedJob) {
        Job existingJob = getJobById(id);

        existingJob.setTitle(updatedJob.getTitle());
        existingJob.setCompany(updatedJob.getCompany());
        existingJob.setLocation(updatedJob.getLocation());
        existingJob.setDescription(updatedJob.getDescription());
        existingJob.setSkills(updatedJob.getSkills());

        return jobRepository.save(existingJob);
    }

    public void deleteJob(Long id) {

        Job existingJob = getJobById(id);

        if (applicationRepository.existsByJobId(id)) {
            throw new ConflictException(
                    "Cannot delete this job because applications exist for it"
            );
        }

        jobRepository.delete(existingJob);
    }
}