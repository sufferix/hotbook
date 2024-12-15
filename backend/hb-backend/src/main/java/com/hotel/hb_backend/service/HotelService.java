package com.hotel.hb_backend.service;

import com.hotel.hb_backend.entity.HotelPhoto;
import com.hotel.hb_backend.repository.HotelPhotoRepository;
import com.hotel.hb_backend.repository.UserRepository;
import com.hotel.hb_backend.dto.HotelDTO;
import com.hotel.hb_backend.dto.HotelDetailDTO;
import com.hotel.hb_backend.dto.Response;
import com.hotel.hb_backend.entity.Hotel;
import com.hotel.hb_backend.entity.User;
import com.hotel.hb_backend.exception.MessException;
import com.hotel.hb_backend.repository.HotelRepository;
import com.hotel.hb_backend.serviceinterface.IHotelService;
import com.hotel.hb_backend.dto.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class HotelService implements IHotelService {

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private HotelPhotoRepository hotelPhotoRepository;
    @Override
    public Response getAllHotels() {
        Response response = new Response();
        try {
            List<Hotel> hotels = hotelRepository.findAll();
            List<HotelDTO> hotelDTOs = ModelMapper.mapHotelListEntityToHotelListDTO(hotels);
            response.setStatusCode(200);
            response.setMessage("Список отелей успешно получен");
            response.setHotelList(hotelDTOs);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Ошибка при получении списка отелей: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getHotelById(Long hotelId) {
        Response response = new Response();
        try {
            Hotel hotel = hotelRepository.findById(hotelId)
                    .orElseThrow(() -> new MessException("Отель с ID " + hotelId + " не найден"));
            HotelDetailDTO hotelDetailDTO = ModelMapper.mapHotelToDetailDTO(hotel);
            response.setStatusCode(200);
            response.setMessage("Информация об отеле успешно получена");
            response.setHotelDetail(hotelDetailDTO);
        } catch (MessException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Ошибка при получении отеля: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response addHotel(HotelDTO hotelDTO, String email) {
        Response response = new Response();
        try {
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new MessException("Пользователь не найден"));

            Hotel hotel = new Hotel();
            hotel.setName(hotelDTO.getName());
            hotel.setCity(hotelDTO.getCity());
            hotel.setDescription(hotelDTO.getDescription());
            hotel.setStars(hotelDTO.getStars());
            hotel.setUser(user);

            hotelRepository.save(hotel);

            response.setStatusCode(201);
            response.setMessage("Отель успешно добавлен");
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Ошибка при добавлении отеля: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response updateHotel(Long hotelId, HotelDTO hotelDTO, String email) {
        Response response = new Response();
        try {
            Hotel hotel = hotelRepository.findById(hotelId)
                    .orElseThrow(() -> new MessException("Отель не найден"));

            if (!hotel.getUser().getEmail().equals(email)) {
                throw new MessException("Вы не можете редактировать этот отель");
            }

            hotel.setName(hotelDTO.getName());
            hotel.setCity(hotelDTO.getCity());
            hotel.setDescription(hotelDTO.getDescription());
            hotel.setStars(hotelDTO.getStars());

            hotelRepository.save(hotel);

            response.setStatusCode(200);
            response.setMessage("Отель успешно обновлен");
        } catch (MessException e) {
            response.setStatusCode(403);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Ошибка при обновлении отеля: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response deleteHotel(Long hotelId, String email) {
        Response response = new Response();
        try {
            Hotel hotel = hotelRepository.findById(hotelId)
                    .orElseThrow(() -> new MessException("Отель не найден"));

            if (!hotel.getUser().getEmail().equals(email)) {
                throw new MessException("Вы не можете удалить этот отель");
            }

            hotelRepository.delete(hotel);

            response.setStatusCode(200);
            response.setMessage("Отель успешно удален");
        } catch (MessException e) {
            response.setStatusCode(403);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Ошибка при удалении отеля: " + e.getMessage());
        }
        return response;
    }

    @Value("${uploads.directory}")
    private String uploadDir;

    public Response addHotelPhotos(Long hotelId, String email, List<MultipartFile> files) {
        Response response = new Response();

        try {
            // Проверяем отель
            Hotel hotel = hotelRepository.findById(hotelId)
                    .orElseThrow(() -> new MessException("Отель не найден"));

            // Проверяем, что отель принадлежит текущему пользователю
            if (!hotel.getUser().getEmail().equals(email)) {
                throw new MessException("Вы не можете добавлять фотографии к этому отелю");
            }

            // Сохраняем фотографии
            String hotelPhotoDir = uploadDir + "/hotels/" + hotelId;
            File directory = new File(hotelPhotoDir);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            for (MultipartFile file : files) {
                String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
                Path filePath = Paths.get(hotelPhotoDir, fileName);
                Files.write(filePath, file.getBytes());

                // Сохраняем запись в БД
                HotelPhoto photo = new HotelPhoto();
                photo.setFileName(fileName);
                photo.setHotel(hotel);
                hotelPhotoRepository.save(photo);
            }

            response.setStatusCode(201);
            response.setMessage("Фотографии успешно добавлены");
        } catch (MessException e) {
            response.setStatusCode(403);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Ошибка при сохранении фотографий: " + e.getMessage());
        }

        return response;
    }

    public Response deleteHotelPhoto(Long hotelId, Long photoId, String email) {
        Response response = new Response();

        try {
            // Проверяем существование отеля
            Hotel hotel = hotelRepository.findById(hotelId)
                    .orElseThrow(() -> new MessException("Отель не найден"));

            // Проверяем права доступа
            if (!hotel.getUser().getEmail().equals(email)) {
                throw new MessException("Вы не можете удалять фотографии этого отеля");
            }

            // Проверяем существование фотографии
            HotelPhoto photo = hotelPhotoRepository.findById(photoId)
                    .orElseThrow(() -> new MessException("Фотография не найдена"));

            // Удаляем файл из файловой системы
            String photoPath = uploadDir + "/hotels/" + hotelId + "/" + photo.getFileName();
            Path filePath = Paths.get(photoPath);
            Files.deleteIfExists(filePath);

            // Удаляем запись из базы данных
            hotelPhotoRepository.delete(photo);

            response.setStatusCode(200);
            response.setMessage("Фотография успешно удалена");
        } catch (MessException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Ошибка при удалении фотографии: " + e.getMessage());
        }

        return response;
    }

}

