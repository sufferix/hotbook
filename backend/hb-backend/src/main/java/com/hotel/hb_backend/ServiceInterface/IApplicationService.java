package com.hotel.hb_backend.ServiceInterface;

import com.hotel.hb_backend.dto.ApplicationFormDTO;
import com.hotel.hb_backend.dto.Response;

import java.util.List;

public interface IApplicationService {
    Response submitApplicationForm(ApplicationFormDTO applicationFormDTO, String email);

    List<ApplicationFormDTO> getPendingApplications();

    Response processApplication(Long formId, boolean accept);
}
