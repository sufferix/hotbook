import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchOwnerHotels,
  updateHotel,
  uploadHotelImage,
  deleteHotelPhoto,
  deleteRoomPhoto,
} from '../../redux/slices/ownerHotelSlice';
import { useParams, useNavigate } from 'react-router-dom';
import RoomModal from '../../components/owner_account/RoomModal';
import './add_edit_hotel.css';

const EditHotel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { hotels, status, error } = useSelector((state) => state.ownerHotels);
  const hotel = hotels.find((hotel) => hotel.id === parseInt(id));

  const [hotelData, setHotelData] = useState({
    name: '',
    city: '',
    address: '',
    description: '',
    stars: 1,
  });

  const [hotelPhotos, setHotelPhotos] = useState([]);
  const [hotelPhotoPreviews, setHotelPhotoPreviews] = useState([]);

  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchOwnerHotels());
    }
  }, [status, dispatch]);


  useEffect(() => {
    if (hotel) {
      setHotelData({
        name: hotel.name || '',
        city: hotel.city || '',
        address: hotel.address || '',
        description: hotel.description || '',
        stars: hotel.stars || 1,
      });
      setHotelPhotoPreviews(hotel.photos.map((photo) => photo.url));
    }
  }, [hotel]);

  const handleHotelChange = (e) => {
    const { name, value } = e.target;
    setHotelData((prev) => ({ ...prev, [name]: value }));
  };

  const handleHotelPhotoChange = (e) => {
    const files = Array.from(e.target.files);
    setHotelPhotos(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setHotelPhotoPreviews((prev) => [...prev, ...previews]);
  };

  const handleRemoveExistingPhoto = (photoId) => {
    if (window.confirm('Вы уверены, что хотите удалить эту фотографию?')) {
      dispatch(deleteHotelPhoto({ hotelId: hotel.id, photoId }));
      setHotelPhotoPreviews(hotel.photos.filter((photo) => photo.id !== photoId).map((photo) => photo.url));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(updateHotel({ hotelId: hotel.id, hotelData })).unwrap();

      for (const photo of hotelPhotos) {
        await dispatch(uploadHotelImage({ hotelId: hotel.id, imageFile: photo })).unwrap();
      }

      alert('Отель успешно обновлен!');
      navigate('/owner-dashboard');
    } catch (err) {
      alert(err);
    }
  };

  const openRoomModal = (room = null) => {
    setCurrentRoom(room);
    setIsRoomModalOpen(true);
  };

  const closeRoomModal = () => {
    setCurrentRoom(null);
    setIsRoomModalOpen(false);
  };

  if (status === 'loading') {
    return <p>Загрузка данных отеля...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!hotel) {
    return <p>Отель не найден.</p>;
  }

  return (
    <div className="add-edit-hotel">
      <h2>Редактировать Отель</h2>
      <form onSubmit={handleSubmit}>
        <div className="section">
          <h3 className="section-title">Информация об Отеле</h3>
          <div className="form-group">
            <label>Название:</label>
            <input
              type="text"
              name="name"
              value={hotelData.name}
              onChange={handleHotelChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Город:</label>
            <input
              type="text"
              name="city"
              value={hotelData.city}
              onChange={handleHotelChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Адрес:</label>
            <input
              type="text"
              name="address"
              value={hotelData.address}
              onChange={handleHotelChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Описание:</label>
            <textarea
              name="description"
              value={hotelData.description}
              onChange={handleHotelChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Количество звёзд:</label>
            <input
              type="number"
              name="stars"
              min="1"
              max="5"
              value={hotelData.stars}
              onChange={handleHotelChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Фотографии отеля:</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleHotelPhotoChange}
            />
            <div className="photo-previews">
              {hotel.photos.map((photo) => (
                <div key={photo.id} className="existing-photo">
                  <img src={photo.url} alt={`Фотография ${photo.id}`} className="preview-image" />
                  <button
                    type="button"
                    className="remove-photo-button"
                    onClick={() => handleRemoveExistingPhoto(photo.id)}
                  >
                    &times;
                  </button>
                </div>
              ))}

              {hotelPhotos.map((file, index) => (
                <img
                  key={index}
                  src={hotelPhotoPreviews[hotel.photos.length + index]}
                  alt={`Новое фото ${index + 1}`}
                  className="preview-image"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="section">
          <h3 className="section-title">Номера</h3>
          <button type="button" onClick={() => openRoomModal()} className="add-room-button">
            Добавить Номер
          </button>
          <div className="room-cards-container">
            {hotel.rooms && hotel.rooms.length > 0 ? (
              hotel.rooms.map((room) => (
                <div key={room.id} className="room-card">
                  <div className="photo-container">
                    {room.photos && room.photos.length > 0 ? (
                      room.photos.map((photo) => (
                        <div key={photo.id} className="existing-photo">
                          <img src={photo.url} alt={`Фотография номера ${room.id}`} className="preview-image" />
                          <button
                            type="button"
                            className="remove-photo-button"
                            onClick={() => {
                              if (window.confirm('Вы уверены, что хотите удалить эту фотографию?')) {
                                dispatch(deleteRoomPhoto({ hotelId: hotel.id, roomId: room.id, photoId: photo.id }));
                              }
                            }}
                          >
                            &times;
                          </button>
                        </div>
                      ))
                    ) : (
                      <p>Нет фотографий</p>
                    )}
                  </div>

                  <p className="room-category">{room.roomType}</p>
                  <p className="room-price">{room.roomPrice} ₽/ночь</p>

                  <button type="button" className="edit-room-button" onClick={() => openRoomModal(room)}>
                    Редактировать
                  </button>
                </div>
              ))
            ) : (
              <p>Нет доступных номеров</p>
            )}
          </div>
        </div>

        {status === 'loading' && <p>Загрузка...</p>}
        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="save-hotel-button">
          Сохранить Изменения
        </button>
      </form>

      {isRoomModalOpen && (
        <RoomModal
          isOpen={isRoomModalOpen}
          onRequestClose={closeRoomModal}
          hotelId={hotel.id}
          existingRoom={currentRoom}
        />
      )}
    </div>
  );
};

export default EditHotel;
