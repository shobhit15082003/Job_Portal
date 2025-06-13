package com.jobportal.service;

import com.jobportal.dto.ApplicationDTO;
import com.jobportal.dto.ApplicationStatus;
import com.jobportal.dto.JobDTO;
import com.jobportal.dto.ResponseDTO;
import com.jobportal.entity.Applicant;
import com.jobportal.entity.Job;
import com.jobportal.exception.JobPortalException;
import com.jobportal.respository.JobRepository;
import com.jobportal.utility.Utilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service("jobService")
public class JobServiceImpl implements JobService{

    @Autowired
    private JobRepository jobRepository;

    @Override
    public JobDTO postJob(JobDTO jobDTO) throws JobPortalException {
        jobDTO.setId(Utilities.getNextSequence("jobs"));
        jobDTO.setPostTime(LocalDateTime.now());
        return jobRepository.save(jobDTO.toEntity()).toDTO();
    }

    @Override
    public List<JobDTO> getAllJobs() {
        return jobRepository.findAll().stream().map((x)->x.toDTO()).toList();
    }

    @Override
    public JobDTO getJob(Long id) throws JobPortalException {
        return jobRepository.findById(id).orElseThrow(()->new JobPortalException("JOB_NOT_FOUND")).toDTO();

    }

    @Override
    public void applyJob(Long id, ApplicationDTO applicationDTO) throws JobPortalException {
      Job job= jobRepository.findById(id).orElseThrow(()-> new JobPortalException("JOB_NOT_FOUND"));
      List<Applicant>applicants=job.getApplicants();
      if(applicants==null)
          applicants=new ArrayList<>();
        if(applicants.stream().anyMatch(x -> x.getApplicantId().equals(applicationDTO.getApplicantId())))
            throw new JobPortalException("JOB_APPLIED_ALREADY");
            applicationDTO.setApplicationStatus(ApplicationStatus.APPLIED);
            applicants.add(applicationDTO.toEntity());
            job.setApplicants(applicants);
            jobRepository.save(job);
    }


}
