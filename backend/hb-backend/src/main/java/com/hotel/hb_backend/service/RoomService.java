package com.hotel.hb_backend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.hotel.hb_backend.entity.RoomPhoto;
import com.hotel.hb_backend.repository.AmenityRepository;
import com.hotel.hb_backend.repository.HotelRepository;
import com.hotel.hb_backend.dto.Response;
import com.hotel.hb_backend.dto.RoomDTO;
import com.hotel.hb_backend.entity.Amenity;
import com.hotel.hb_backend.entity.Hotel;
import com.hotel.hb_backend.entity.Room;
import com.hotel.hb_backend.exception.MessException;
import com.hotel.hb_backend.repository.RoomPhotoRepository;
import com.hotel.hb_backend.serviceinterface.IRoomService;
import com.hotel.hb_backend.repository.RoomRepository;
import com.hotel.hb_backend.dto.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class RoomService implements IRoomService {

    private final RoomRepository roomRepository;

    private final HotelRepository hotelRepository;
    private final AmenityRepository amenityRepository;
    private final RoomPhotoRepository roomPhotoRepository;
    private final Cloudinary cloudinary;

    public RoomService(RoomRepository roomRepository, HotelRepository hotelRepository, AmenityRepository amenityRepository, RoomPhotoRepository roomPhotoRepository, Cloudinary cloudinary) {
        this.roomRepository = roomRepository;
        this.hotelRepository = hotelRepository;
        this.amenityRepository = amenityRepository;
        this.roomPhotoRepository = roomPhotoRepository;
        this.cloudinary = cloudinary;
    }

    @Override
    public Response getRoomsByHotelId(Long hotelId) {
        Response response = new Response();
        try {
            List<Room> rooms = roomRepository.findByHotelId(hotelId);
            List<RoomDTO> roomDTOs = ModelMapper.mapRoomListEntityToRoomListDTO(rooms);

            response.setStatusCode(200);
            response.setMessage("Список номеров успешно получен");
            response.setRoomList(roomDTOs);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Ошибка при получении списка номеров: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response addRoomToHotel(Long hotelId, RoomDTO roomDTO, String email) {
        Response response = new Response();
        try {
            Hotel hotel = hotelRepository.findById(hotelId)
                    .orElseThrow(() -> new MessException("Отель не найден"));

            if (!hotel.getUser().getEmail().equals(email)) {
                throw new MessException("Вы не являетесь владельцем этого отеля");
            }

            List<Amenity> amenities = new ArrayList<>();
            if (roomDTO.getAmenityIds() != null) {
                amenities = amenityRepository.findAllById(roomDTO.getAmenityIds());
            }

            Room room = ModelMapper.mapRoomDTOToRoom(roomDTO, amenities);
            room.setHotel(hotel);

            roomRepository.save(room);

            response.setStatusCode(201);
            response.setMessage("Номер успешно добавлен");
        } catch (MessException e) {
            response.setStatusCode(403);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Ошибка при добавлении номера: " + e.getMessage());
        }
        return response;
    }


    @Override
    public Response updateRoom(Long hotelId, Long roomId, RoomDTO roomDTO, String email) {
        Response response = new Response();
        try {
            Room room = roomRepository.findByIdAndHotelId(roomId, hotelId)
                    .orElseThrow(() -> new MessException("Номер не найден"));

            if (!room.getHotel().getUser().getEmail().equals(email)) {
                throw new MessException("Вы не являетесь владельцем этого номера");
            }

            List<Amenity> amenities = new ArrayList<>();
            if (roomDTO.getAmenityIds() != null) {
                amenities = amenityRepository.findAllById(roomDTO.getAmenityIds());
            }

            room.setRoomType(roomDTO.getRoomType());
            room.setRoomPrice(roomDTO.getRoomPrice());
            room.setAmenities(amenities);

            roomRepository.save(room);

            response.setStatusCode(200);
            response.setMessage("Номер успешно обновлен");
        } catch (MessException e) {
            response.setStatusCode(403);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Ошибка при обновлении номера: " + e.getMessage());
        }
        return response;
    }


    @Override
    public Response deleteRoom(Long hotelId, Long roomId, String email) {
        Response response = new Response();
        try {
            Room room = roomRepository.findByIdAndHotelId(roomId, hotelId)
                    .orElseThrow(() -> new MessException("Номер не найден"));

            if (!room.getHotel().getUser().getEmail().equals(email)) {
                throw new MessException("Вы не можете удалить этот номер");
            }

            String folderPath = "rooms/" + roomId;

            try {
                cloudinary.api().deleteResourcesByPrefix(folderPath, ObjectUtils.emptyMap());
                cloudinary.api().deleteFolder(folderPath, ObjectUtils.emptyMap());
            } catch (Exception ignored) {
            }

            roomRepository.delete(room);

            response.setStatusCode(200);
            response.setMessage("Номер и его фотографии успешно удалены");
        } catch (MessException e) {
            response.setStatusCode(403);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Ошибка при удалении номера: " + e.getMessage());
        }
        return response;
    }


    @Override
    public Response addRoomPhotos(Long hotelId, Long roomId, String email, List<MultipartFile> files) {
        Response response = new Response();

        try {
            Room room = roomRepository.findByIdAndHotelId(roomId, hotelId)
                    .orElseThrow(() -> new MessException("Номер не найден"));

            if (!room.getHotel().getUser().getEmail().equals(email)) {
                throw new MessException("Вы не являетесь владельцем этого номера");
            }

            for (MultipartFile file : files) {
                Map<?, ?> uploadResult = cloudinary.uploader().upload(
                        file.getBytes(),
                        ObjectUtils.asMap("folder", "rooms/" + roomId)
                );

                String imageUrl = (String) uploadResult.get("secure_url");

                RoomPhoto photo = new RoomPhoto();
                photo.setPhotoUrl(imageUrl);
                photo.setRoom(room);
                roomPhotoRepository.save(photo);
            }

            response.setStatusCode(201);
            response.setMessage("Фотографии номера успешно добавлены");
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
    public Response deleteRoomPhoto(Long hotelId, Long roomId, Long photoId, String email) {
        Response response = new Response();

        try {
            Room room = roomRepository.findByIdAndHotelId(roomId, hotelId)
                    .orElseThrow(() -> new MessException("Номер не найден"));

            if (!room.getHotel().getUser().getEmail().equals(email)) {
                throw new MessException("Вы не являетесь владельцем этого номера");
            }

            RoomPhoto photo = roomPhotoRepository.findById(photoId)
                    .orElseThrow(() -> new MessException("Фотография не найдена"));

            String publicId = photo.getPhotoUrl()
                    .substring(photo.getPhotoUrl().lastIndexOf("/") + 1)
                    .replace(".jpg", "")
                    .replace(".png", "");

            cloudinary.uploader().destroy("rooms/" + roomId + "/" + publicId, ObjectUtils.emptyMap());

            roomPhotoRepository.delete(photo);

            response.setStatusCode(200);
            response.setMessage("Фотография номера успешно удалена");
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

