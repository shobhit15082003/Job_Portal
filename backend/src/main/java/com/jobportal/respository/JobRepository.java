package com.jobportal.respository;

import com.jobportal.entity.Job;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Arrays;
import java.util.List;

public interface JobRepository extends MongoRepository<Job,Long> {
   public List<Job> findByPostedBy(Long postedBy);
}
