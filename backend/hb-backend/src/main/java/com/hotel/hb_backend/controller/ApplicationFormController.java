package com.hotel.hb_backend.controller;

import com.hotel.hb_backend.dto.ApplicationFormDTO;
import com.hotel.hb_backend.dto.Response;
import com.hotel.hb_backend.service.ApplicationFormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/applications")
public class ApplicationFormController {

    @Autowired
    private ApplicationFormService applicationFormService;

    //Пользователь отправляет анкету.
    @PostMapping("/submit")
    public ResponseEntity<Response> submitApplication(@RequestBody ApplicationFormDTO applicationFormDTO) {
        Response response = applicationFormService.submitApplicationForm(applicationFormDTO);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    //Администратор получает список необработанных анкет.

    @GetMapping("/pending")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<ApplicationFormDTO>> getPendingApplications() {
        List<ApplicationFormDTO> forms = applicationFormService.getPendingApplications();
        return ResponseEntity.ok(forms);
    }

    //Администратор обрабатывает анкету
    @PostMapping("/process/{formId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> processApplication(@PathVariable Long formId, @RequestParam boolean accept) {
        Response response = applicationFormService.processApplication(formId, accept);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
}
