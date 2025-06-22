package com.jobportal.api;

import com.jobportal.dto.ResponseDTO;
import com.jobportal.entity.Notification;
import com.jobportal.exception.JobPortalException;
import com.jobportal.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@Validated
@RequestMapping("/notification")
public class NotificationAPI {

    @Autowired
    private NotificationService notificationService;

    @GetMapping("/get/{userId}")
    public ResponseEntity<List<Notification>>getNotification(@PathVariable Long userid){
        return new ResponseEntity<>(notificationService.getUnreadNotifications(userid), HttpStatus.OK);
    }

    @PutMapping("/read/{id}")
    public ResponseEntity<ResponseDTO>readNotificaion(@PathVariable Long id) throws JobPortalException {
        notificationService.readNotification(id);
        return  new ResponseEntity<>(new ResponseDTO("Success"),HttpStatus.OK);
    }
}
