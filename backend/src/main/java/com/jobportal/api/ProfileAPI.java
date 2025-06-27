package com.jobportal.api;

import com.jobportal.dto.ProfileDTO;
import com.jobportal.dto.ResponseDTO;
import com.jobportal.service.ProfileService;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(
        origins = "http://localhost:3000",
        allowedHeaders = "*",
        methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}
)
@Validated
@RequestMapping("/profiles")
public class ProfileAPI {

    private static final Logger logger = LoggerFactory.getLogger(ProfileAPI.class);

    @Autowired
    private ProfileService profileService;

    @GetMapping("/get/{id}")
    public ResponseEntity<ProfileDTO> getProfile(@PathVariable Long id) throws Exception {
        return new ResponseEntity<>(profileService.getProfile(id),HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<ProfileDTO> updateProfile(@RequestBody ProfileDTO profileDTO) throws Exception {
        return new ResponseEntity<>(profileService.updateProfile(profileDTO),HttpStatus.OK);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<ProfileDTO>> getAllProfile() throws Exception {
        return new ResponseEntity<>(profileService.getAllProfile(), HttpStatus.OK);
    }




}
