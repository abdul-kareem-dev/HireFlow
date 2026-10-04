package com.kareem.HireFlow.repository;

import com.kareem.HireFlow.entity.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<JobApplication, Long> {

    List<JobApplication> findByApplicantEmail(String applicantEmail);

    List<JobApplication> findByJobId(Long jobId);

    boolean existsByApplicantEmailAndJobId(
            String applicantEmail,
            Long jobId);

    boolean existsByJobId(Long jobId);
}