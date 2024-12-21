package com.hotel.hb_backend.dto;

import com.hotel.hb_backend.entity.*;
import java.util.List;
import java.util.stream.Collectors;

public class ModelMapper {

    public static UserDTO mapUserEntityToUserDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setSurname(user.getSurname());
        userDTO.setEmail(user.getEmail());
        userDTO.setPhoneNumber(user.getPhoneNumber());
        userDTO.setRole(user.getRole());
        return userDTO;
    }

    public static RoomDTO mapRoomEntityToRoomDTO(Room room) {
        RoomDTO roomDTO = new RoomDTO();

        roomDTO.setId(room.getId());
        roomDTO.setRoomType(room.getRoomType());
        roomDTO.setRoomPrice(room.getRoomPrice());

        if (room.getPhotos() != null) {
            List<PhotoDTO> photos = room.getPhotos().stream()
                    .map(photo -> {
                        PhotoDTO photoDTO = new PhotoDTO();
                        photoDTO.setId(photo.getId());
                        photoDTO.setUrl("/rooms/" + room.getId() + "/photos/" + photo.getPhotoUrl());
                        return photoDTO;
                    })
                    .collect(Collectors.toList());
            roomDTO.setPhotos(photos);
        }

        if (room.getAmenities() != null) {
            List<AmenityDTO> amenities = mapAmenityListToDTO(room.getAmenities());
            roomDTO.setAmenities(amenities);
        }
        return roomDTO;
    }

    public static Room mapRoomDTOToRoom(RoomDTO roomDTO, List<Amenity> amenities) {
        Room room = new Room();

        room.setId(roomDTO.getId());
        room.setRoomType(roomDTO.getRoomType());
        room.setRoomPrice(roomDTO.getRoomPrice());
        room.setAmenities(amenities);
        return room;
    }


    public static BookingDTO mapBookingEntityToBookingDTO(Booking booking) {
        BookingDTO bookingDTO = new BookingDTO();
        bookingDTO.setId(booking.getId());
        bookingDTO.setCheckInDate(booking.getCheckInDate());
        bookingDTO.setCheckOutDate(booking.getCheckOutDate());
        bookingDTO.setNumOfAdults(booking.getNumOfAdults());
        bookingDTO.setNumOfChildren(booking.getNumOfChildren());
        bookingDTO.setTotalNumOfGuest(booking.getTotalNumOfGuest());
        bookingDTO.setTotalCost(booking.getTotalCost());
        bookingDTO.setFullName(booking.getFullName());

        if (booking.getRoom() != null && booking.getRoom().getHotel() != null) {
            Hotel hotel = booking.getRoom().getHotel();
            bookingDTO.setHotelName(hotel.getName());

            if (hotel.getPhotos() != null && !hotel.getPhotos().isEmpty()) {
                bookingDTO.setHotelPhotoUrl(hotel.getPhotos().get(0).getPhotoUrl());
            }
        }

        return bookingDTO;
    }



    public static List<UserDTO> mapUserListEntityToUserListDTO(List<User> userList) {
        return userList.stream().map(ModelMapper::mapUserEntityToUserDTO).collect(Collectors.toList());
    }

    public static List<RoomDTO> mapRoomListEntityToRoomListDTO(List<Room> roomList) {
        return roomList.stream().map(ModelMapper::mapRoomEntityToRoomDTO).collect(Collectors.toList());
    }

    public static List<BookingDTO> mapBookingListEntityToBookingListDTO(List<Booking> bookingList) {
        return bookingList.stream().map(ModelMapper::mapBookingEntityToBookingDTO).collect(Collectors.toList());
    }

    public static HotelDTO mapHotelEntityToHotelDTO(Hotel hotel) {
        HotelDTO hotelDTO = new HotelDTO();
        hotelDTO.setId(hotel.getId());
        hotelDTO.setName(hotel.getName());
        hotelDTO.setCity(hotel.getCity());
        hotelDTO.setAddress(hotel.getAddress());
        hotelDTO.setDescription(hotel.getDescription());
        hotelDTO.setStars(hotel.getStars());

        List<String> photoUrls = hotel.getPhotos().stream()
                .map(HotelPhoto::getPhotoUrl)
                .collect(Collectors.toList());
        hotelDTO.setPhotos(photoUrls);

        return hotelDTO;
    }


    public static HotelDetailDTO mapHotelToDetailDTO(Hotel hotel) {
        HotelDetailDTO dto = new HotelDetailDTO();
        dto.setId(hotel.getId());
        dto.setName(hotel.getName());
        dto.setCity(hotel.getCity());
        dto.setAddress(hotel.getAddress()); // Добавлено
        dto.setDescription(hotel.getDescription());
        dto.setStars(hotel.getStars());

        if (hotel.getRooms() != null) {
            List<RoomDTO> roomDTOs = hotel.getRooms().stream()
                    .map(ModelMapper::mapRoomEntityToRoomDTO)
                    .collect(Collectors.toList());
            dto.setRooms(roomDTOs);
        }

        List<PhotoDTO> photos = hotel.getPhotos().stream()
                .map(photo -> {
                    PhotoDTO photoDTO = new PhotoDTO();
                    photoDTO.setId(photo.getId());
                    photoDTO.setUrl(photo.getPhotoUrl());
                    return photoDTO;
                })
                .collect(Collectors.toList());

        dto.setPhotos(photos);
        return dto;
    }

    public static List<HotelDTO> mapHotelListEntityToHotelListDTO(List<Hotel> hotels) {
        return hotels.stream()
                .map(ModelMapper::mapHotelEntityToHotelDTO)
                .collect(Collectors.toList());
    }

    public static ApplicationFormDTO mapApplicationFormToDTO(ApplicationForm form) {
        ApplicationFormDTO dto = new ApplicationFormDTO();
        dto.setId(form.getId());
        dto.setFullName(form.getFullName());
        dto.setEmail(form.getEmail());
        dto.setPhoneNumber(form.getPhoneNumber());
        dto.setCity(form.getCity());
        dto.setAddress(form.getAddress());
        dto.setHotelName(form.getHotelName());
        dto.setProcessed(form.getProcessed());
        return dto;
    }

    public static List<ApplicationFormDTO> mapApplicationFormListToDTO(List<ApplicationForm> forms) {
        return forms.stream().map(ModelMapper::mapApplicationFormToDTO).collect(Collectors.toList());
    }
    public static ReviewDTO mapReviewToDTO(Review review) {
        ReviewDTO dto = new ReviewDTO();
        dto.setId(review.getId());
        dto.setRating(review.getRating());
        dto.setContent(review.getContent());
        dto.setUserName(review.getUser().getName() + " " + review.getUser().getSurname());
        dto.setHotelId(review.getHotel().getId());
        return dto;
    }

    public static List<ReviewDTO> mapReviewListToDTO(List<Review> reviews) {
        return reviews.stream().map(ModelMapper::mapReviewToDTO).collect(Collectors.toList());
    }
    public static AmenityDTO mapAmenityEntityToDTO(Amenity amenity) {
        AmenityDTO dto = new AmenityDTO();
        dto.setId(amenity.getId());
        dto.setName(amenity.getName());
        return dto;
    }

    public static List<AmenityDTO> mapAmenityListToDTO(List<Amenity> amenities) {
        return amenities.stream()
                .map(ModelMapper::mapAmenityEntityToDTO)
                .collect(Collectors.toList());
    }

}

