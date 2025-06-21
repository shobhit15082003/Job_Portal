package com.jobportal.service;

import com.jobportal.dto.*;
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

    @Autowired
    private NotificationService notificationService;

    @Override
    public JobDTO postJob(JobDTO jobDTO) throws JobPortalException {
        if(jobDTO.getId()==0) {
            jobDTO.setId(Utilities.getNextSequence("jobs"));
            jobDTO.setPostTime(LocalDateTime.now());
            NotificationDTO notiDTO=new NotificationDTO();
            notiDTO.setAction("Job Posted Successfully");
            notiDTO.setMessage("Job Posted Successfully for "+jobDTO.getJobTitle()+" at "+jobDTO.getCompany());
            notiDTO.setUserId(jobDTO.getPostedBy());
            notiDTO.setRoute("/posted-jobs/"+jobDTO.getId());
            notificationService.sendNotificiation(notiDTO);
        }
        else{
            Job job=jobRepository.findById(jobDTO.getId()).orElseThrow(()->new JobPortalException("JOB_NOT_FOUND"));
            if(job.getJobStatus().equals(JobStatus.DRAFT)|| jobDTO.getJobStatus().equals(JobStatus.CLOSED))
                jobDTO.setPostTime(LocalDateTime.now());
        }
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

    @Override
    public List<JobDTO> getJobsPostedBy(Long id) {

        return jobRepository.findByPostedBy(id).stream().map((x)->x.toDTO()).toList();
    }

    @Override
    public void changeAppStatus(Application application) throws JobPortalException {
        Job job= jobRepository.findById(application.getId()).orElseThrow(()-> new JobPortalException("JOB_NOT_FOUND"));
        List<Applicant>applicants=job.getApplicants().stream().map((x)->{
            if(application.getApplicantId()==x.getApplicantId()){
                x.setApplicationStatus(application.getApplicationStatus());
                if(application.getApplicationStatus().equals(ApplicationStatus.INTERVIEWING)){
                    x.setInterviewTime(application.getInterviewTime());
                    NotificationDTO notiDTO=new NotificationDTO();
                    notiDTO.setAction("Interview Scheduled");
                    notiDTO.setMessage("Interview Scheduled for job id: "+application.getId());
                    notiDTO.setUserId(application.getApplicantId());
                    notiDTO.setRoute("/job-history");
                    try {
                        notificationService.sendNotificiation(notiDTO);
                    } catch (JobPortalException e) {
                        e.printStackTrace();
                    }
                }
            }
            return x;
        }).toList();
        job.setApplicants(applicants);
        jobRepository.save(job);

    }


}
