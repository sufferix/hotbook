package com.hotel.hb_backend.service;

import com.hotel.hb_backend.serviceinterface.IApplicationService;
import com.hotel.hb_backend.dto.ModelMapper;
import com.hotel.hb_backend.repository.ApplicationFormRepository;
import com.hotel.hb_backend.repository.UserRepository;
import com.hotel.hb_backend.dto.ApplicationFormDTO;
import com.hotel.hb_backend.dto.Response;
import com.hotel.hb_backend.entity.ApplicationForm;
import com.hotel.hb_backend.entity.Role;
import com.hotel.hb_backend.entity.User;
import com.hotel.hb_backend.exception.MessException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationFormService implements IApplicationService {

    @Autowired
    private ApplicationFormRepository applicationFormRepository;

    @Autowired
    private UserRepository userRepository;

    public Response submitApplicationForm(ApplicationFormDTO applicationFormDTO, String email) {
        Response response = new Response();
        try {
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new MessException("Пользователь не найден"));

            ApplicationForm form = new ApplicationForm();
            form.setUser(user);
            form.setFullName(applicationFormDTO.getFullName());
            form.setEmail(applicationFormDTO.getEmail());
            form.setPhoneNumber(applicationFormDTO.getPhoneNumber());
            form.setCity(applicationFormDTO.getCity());
            form.setAddress(applicationFormDTO.getAddress());
            form.setHotelName(applicationFormDTO.getHotelName());
            form.setProcessed(null);

            applicationFormRepository.save(form);

            response.setStatusCode(200);
            response.setMessage("Анкета успешно отправлена");
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Ошибка при отправке анкеты: " + e.getMessage());
        }
        return response;
    }

    public List<ApplicationFormDTO> getPendingApplications() {
        List<ApplicationForm> forms = applicationFormRepository.findUnprocessedApplications();
        return ModelMapper.mapApplicationFormListToDTO(forms);
    }

    public Response processApplication(Long formId, boolean accept) {
        Response response = new Response();

        try {
            ApplicationForm form = applicationFormRepository.findById(formId)
                    .orElseThrow(() -> new MessException("Заявка не найдена"));

            if (accept) {
                User user = form.getUser();
                user.setRole(Role.HOTELIER);
                userRepository.save(user);
            }

            applicationFormRepository.delete(form);

            response.setStatusCode(200);
            response.setMessage(accept ? "Заявка принята, пользователь стал владельцем отеля" : "Заявка отклонена");

        } catch (MessException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Ошибка при обработке заявки: " + e.getMessage());
        }

        return response;
    }
}

