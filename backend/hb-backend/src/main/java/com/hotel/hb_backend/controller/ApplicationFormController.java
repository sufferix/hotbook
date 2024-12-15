package com.hotel.hb_backend.controller;

import com.hotel.hb_backend.ServiceInterface.IApplicationService;
import com.hotel.hb_backend.dto.ApplicationFormDTO;
import com.hotel.hb_backend.dto.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/applications")
public class ApplicationFormController {

    @Autowired
    private IApplicationService applicationFormService;

    //Пользователь отправляет анкету.
    @PostMapping("/submit")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<Response> submitApplicationForm(@RequestBody ApplicationFormDTO applicationFormDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        Response response = applicationFormService.submitApplicationForm(applicationFormDTO, email);
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
