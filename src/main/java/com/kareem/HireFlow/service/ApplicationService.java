package com.kareem.HireFlow.service;

import com.kareem.HireFlow.entity.ApplicationStatus;
import com.kareem.HireFlow.entity.Job;
import com.kareem.HireFlow.entity.JobApplication;
import com.kareem.HireFlow.exception.ConflictException;
import com.kareem.HireFlow.exception.ResourceNotFoundException;
import com.kareem.HireFlow.repository.ApplicationRepository;
import com.kareem.HireFlow.repository.JobRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final JobRepository jobRepository;

    public ApplicationService(
            ApplicationRepository applicationRepository,
            JobRepository jobRepository) {

        this.applicationRepository = applicationRepository;
        this.jobRepository = jobRepository;
    }

    public JobApplication applyForJob(Long jobId, JobApplication application) {

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));

        if (applicationRepository.existsByApplicantEmailAndJobId(
                application.getApplicantEmail(),
                jobId)) {

            throw new ConflictException(
                    "You have already applied for this job"
            );
        }

        application.setJob(job);
        application.setStatus(ApplicationStatus.APPLIED);
        application.setAppliedAt(LocalDateTime.now());

        return applicationRepository.save(application);
    }

    public List<JobApplication> getAllApplications() {
        return applicationRepository.findAll();
    }

    public List<JobApplication> getApplicationsByEmail(String email) {
        return applicationRepository.findByApplicantEmail(email);
    }

    public List<JobApplication> getApplicationsByJob(Long jobId) {
        return applicationRepository.findByJobId(jobId);
    }

    public JobApplication updateStatus(
            Long applicationId,
            ApplicationStatus status) {

        JobApplication application = applicationRepository
                .findById(applicationId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Application not found"));

        application.setStatus(status);

        return applicationRepository.save(application);
    }
}