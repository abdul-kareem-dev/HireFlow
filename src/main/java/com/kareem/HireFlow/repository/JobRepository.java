package com.kareem.HireFlow.repository;

import com.kareem.HireFlow.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepository extends JpaRepository<Job, Long> {
}