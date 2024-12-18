package com.hotel.hb_backend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.hotel.hb_backend.entity.HotelPhoto;
import com.hotel.hb_backend.entity.Room;
import com.hotel.hb_backend.repository.HotelPhotoRepository;
import com.hotel.hb_backend.repository.RoomRepository;
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
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Service
public class HotelService implements IHotelService {

    @Autowired
    private HotelRepository hotelRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private HotelPhotoRepository hotelPhotoRepository;
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private Cloudinary cloudinary;

    @Override
    public Response getAllCities() {
        Response response = new Response();
        try {
            List<String> cities = hotelRepository.findAllDistinctCities();
            response.setStatusCode(200);
            response.setMessage("Список городов успешно получен");
            response.setCities(cities);  // Добавь поле `cities` в `Response`
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Ошибка при получении списка городов: " + e.getMessage());
        }
        return response;
    }

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
    public Response getHotelByIdWithoutFilters(Long hotelId) {
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
            response.setMessage("Ошибка при получении информации об отеле: " + e.getMessage());
        }

        return response;
    }

    @Override
    public Response getHotelByIdWithFilters(Long hotelId, LocalDate checkInDate, LocalDate checkOutDate, List<Long> amenities) {
        Response response = new Response();

        try {
            Hotel hotel = hotelRepository.findById(hotelId)
                    .orElseThrow(() -> new MessException("Отель с ID " + hotelId + " не найден"));

            List<Room> availableRooms = roomRepository.findAvailableRoomsByHotelIdAndFilters(
                    hotelId, checkInDate, checkOutDate, amenities);

            HotelDetailDTO hotelDetailDTO = ModelMapper.mapHotelToDetailDTO(hotel);
            hotelDetailDTO.setRooms(ModelMapper.mapRoomListEntityToRoomListDTO(availableRooms));

            response.setStatusCode(200);
            response.setMessage("Информация об отеле успешно получена");
            response.setHotelDetail(hotelDetailDTO);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Ошибка при получении информации об отеле: " + e.getMessage());
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

            List<Room> rooms = roomRepository.findByHotelId(hotelId);
            for (Room room : rooms) {
                String roomFolderPath = "rooms/" + room.getId();
                cloudinary.api().deleteResourcesByPrefix(roomFolderPath, ObjectUtils.emptyMap());
                cloudinary.api().deleteFolder(roomFolderPath, ObjectUtils.emptyMap());
            }

            roomRepository.deleteAll(rooms);

            String hotelFolderPath = "hotels/" + hotelId;
            cloudinary.api().deleteResourcesByPrefix(hotelFolderPath, ObjectUtils.emptyMap());
            cloudinary.api().deleteFolder(hotelFolderPath, ObjectUtils.emptyMap());

            hotelRepository.delete(hotel);

            response.setStatusCode(200);
            response.setMessage("Отель, его номера и все фотографии успешно удалены");
        } catch (MessException e) {
            response.setStatusCode(403);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Ошибка при удалении отеля: " + e.getMessage());
        }
        return response;
    }



    @Override
    public Response addHotelPhotos(Long hotelId, String email, List<MultipartFile> files) {
        Response response = new Response();

        try {
            Hotel hotel = hotelRepository.findById(hotelId)
                    .orElseThrow(() -> new MessException("Отель не найден"));

            if (!hotel.getUser().getEmail().equals(email)) {
                throw new MessException("Вы не можете добавлять фотографии к этому отелю");
            }

            for (MultipartFile file : files) {
                Map<?, ?> uploadResult = cloudinary.uploader().upload(
                        file.getBytes(),
                        ObjectUtils.asMap("folder", "hotels/" + hotelId)
                );

                String imageUrl = (String) uploadResult.get("secure_url");

                HotelPhoto photo = new HotelPhoto();
                photo.setPhotoUrl(imageUrl);
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

    @Override
    public Response deleteHotelPhoto(Long hotelId, Long photoId, String email) {
        Response response = new Response();

        try {
            HotelPhoto photo = hotelPhotoRepository.findById(photoId)
                    .orElseThrow(() -> new MessException("Фотография не найдена"));

            if (!photo.getHotel().getId().equals(hotelId)) {
                throw new MessException("Фотография не принадлежит указанному отелю");
            }

            if (!photo.getHotel().getUser().getEmail().equals(email)) {
                throw new MessException("Вы не можете удалять фотографии этого отеля");
            }

            String publicId = photo.getPhotoUrl()
                    .substring(photo.getPhotoUrl().lastIndexOf("/") + 1)
                    .replace(".jpg", "")
                    .replace(".png", "");

            cloudinary.uploader().destroy("hotels/" + hotelId + "/" + publicId, ObjectUtils.emptyMap());
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


    @Override
    public Response filterHotels(String city, List<Integer> stars, String roomType,
                                 List<Long> amenities, LocalDate checkInDate, LocalDate checkOutDate) {
        Response response = new Response();

        try {
            Specification<Hotel> specification = HotelSpecification.withFilters(
                    city, stars, roomType, amenities, checkInDate, checkOutDate);

            List<Hotel> filteredHotels = hotelRepository.findAll(specification);

            List<HotelDTO> hotelDTOs = ModelMapper.mapHotelListEntityToHotelListDTO(filteredHotels);

            response.setStatusCode(200);
            response.setMessage("Фильтрованные отели успешно получены");
            response.setHotelList(hotelDTOs);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Ошибка при фильтрации отелей: " + e.getMessage());
        }

        return response;
    }

}

