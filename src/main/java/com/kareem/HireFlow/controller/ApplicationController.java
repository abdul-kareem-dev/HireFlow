package com.kareem.HireFlow.controller;

import com.kareem.HireFlow.entity.ApplicationStatus;
import com.kareem.HireFlow.entity.JobApplication;
import com.kareem.HireFlow.service.ApplicationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @PostMapping("/job/{jobId}")
    public ResponseEntity<JobApplication> applyForJob(
            @PathVariable Long jobId,
            @Valid @RequestBody JobApplication application) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(applicationService.applyForJob(jobId, application));
    }

    @GetMapping
    public ResponseEntity<List<JobApplication>> getAllApplications() {

        return ResponseEntity.ok(
                applicationService.getAllApplications()
        );
    }

    @GetMapping("/user/{email}")
    public ResponseEntity<List<JobApplication>> getApplicationsByEmail(
            @PathVariable String email) {

        return ResponseEntity.ok(
                applicationService.getApplicationsByEmail(email)
        );
    }

    @GetMapping("/job/{jobId}")
    public ResponseEntity<List<JobApplication>> getApplicationsByJob(
            @PathVariable Long jobId) {

        return ResponseEntity.ok(
                applicationService.getApplicationsByJob(jobId)
        );
    }

    @PutMapping("/{applicationId}/status")
    public ResponseEntity<JobApplication> updateStatus(
            @PathVariable Long applicationId,
            @RequestParam ApplicationStatus status) {

        return ResponseEntity.ok(
                applicationService.updateStatus(
                        applicationId,
                        status
                )
        );
    }
}