package com.jobportal.service;

import com.jobportal.dto.ApplicationDTO;
import com.jobportal.dto.JobDTO;
import com.jobportal.dto.ResponseDTO;
import com.jobportal.exception.JobPortalException;
import jakarta.validation.Valid;

import java.util.List;

public interface JobService {

   public JobDTO postJob(JobDTO jobDTO) throws JobPortalException;

    public List<JobDTO> getAllJobs();

    public JobDTO getJob(Long id) throws JobPortalException;


    public void applyJob(Long id, ApplicationDTO applicationDTO) throws JobPortalException;
}
