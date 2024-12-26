import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createHotel, createRoom, uploadHotelImage, uploadRoomImage } from '../../redux/slices/ownerHotelSlice';
import { useNavigate } from 'react-router-dom';
import './add_edit_hotel.css';

const AddHotel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.ownerHotels);

  const [hotelData, setHotelData] = useState({
    name: '',
    city: '',
    address: '',
    description: '',
    stars: 1,
  });

  const [hotelPhotos, setHotelPhotos] = useState([]);
  const [hotelPhotoPreviews, setHotelPhotoPreviews] = useState([]);
  const [rooms, setRooms] = useState([
    { roomType: '', roomPrice: 0, amenityIds: [], photos: [], photoPreviews: [] },
  ]);

  const handleHotelChange = (e) => {
    const { name, value } = e.target;
    setHotelData((prev) => ({ ...prev, [name]: value }));
  };

  const handleHotelPhotoChange = (e) => {
    const files = Array.from(e.target.files);
    setHotelPhotos(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setHotelPhotoPreviews(previews);
  };

  const handleRoomChange = (index, e) => {
    const { name, value } = e.target;
    setRooms((prev) => {
      const updatedRooms = [...prev];
      updatedRooms[index][name] = value;
      return updatedRooms;
    });
  };

  const handleAmenityChange = (index, amenityId) => {
    setRooms((prev) => {
      const updatedRooms = [...prev];
      const currentAmenities = updatedRooms[index].amenityIds;
      if (currentAmenities.includes(amenityId)) {
        updatedRooms[index].amenityIds = currentAmenities.filter((id) => id !== amenityId);
      } else {
        updatedRooms[index].amenityIds.push(amenityId);
      }
      return updatedRooms;
    });
  };

  const handleAddRoom = () => {
    setRooms([...rooms, { roomType: '', roomPrice: 0, amenityIds: [], photos: [], photoPreviews: [] }]);
  };

  const handleRemoveRoom = (index) => {
    setRooms(rooms.filter((_, i) => i !== index));
  };

  const handleRoomPhotoChange = (index, e) => {
    const files = Array.from(e.target.files);
    setRooms((prev) => {
      const updatedRooms = [...prev];
      updatedRooms[index].photos = [...updatedRooms[index].photos, ...files];

      const previews = files.map((file) => URL.createObjectURL(file));
      updatedRooms[index].photoPreviews = [...updatedRooms[index].photoPreviews, ...previews];

      return updatedRooms;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const createdHotel = await dispatch(createHotel(hotelData)).unwrap();
      const hotelId = createdHotel.id;

      for (const photo of hotelPhotos) {
        await dispatch(uploadHotelImage({ hotelId, imageFile: photo })).unwrap();
      }

      for (const room of rooms) {
        const createdRoom = await dispatch(createRoom({ hotelId, roomData: room })).unwrap();
        const roomId = createdRoom.id;

        for (const photo of room.photos) {
          await dispatch(uploadRoomImage({ hotelId, roomId, imageFile: photo })).unwrap();
        }
      }

      alert('Отель успешно добавлен!');
      navigate('/owner-dashboard');
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="add-edit-hotel">
      <h2>Добавить Отель</h2>
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
              {hotelPhotoPreviews.map((src, index) => (
                <img key={index} src={src} alt={`Отель фото ${index + 1}`} className="preview-image" />
              ))}
            </div>
          </div>
        </div>

        <div className="section">
          <h3 className="section-title">Номера</h3>
          {rooms.map((room, index) => (
            <div key={index} className="room-section">
              <h4>Номер {index + 1}</h4>
              <div className="form-group">
                <label>Тип номера:</label>
                <input
                  type="text"
                  name="roomType"
                  value={room.roomType}
                  onChange={(e) => handleRoomChange(index, e)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Цена за ночь:</label>
                <input
                  type="number"
                  name="roomPrice"
                  value={room.roomPrice}
                  onChange={(e) => handleRoomChange(index, e)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Удобства:</label>
                <div className="amenities-checkboxes">
                  <label>
                    <input
                      type="checkbox"
                      value={1}
                      checked={room.amenityIds.includes(1)}
                      onChange={() => handleAmenityChange(index, 1)}
                    />
                    Wi-Fi
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value={2}
                      checked={room.amenityIds.includes(2)}
                      onChange={() => handleAmenityChange(index, 2)}
                    />
                    Кондиционер
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value={3}
                      checked={room.amenityIds.includes(3)}
                      onChange={() => handleAmenityChange(index, 3)}
                    />
                    Телевизор
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label>Фотографии номера:</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleRoomPhotoChange(index, e)}
                />
                <div className="photo-previews">
                  {room.photoPreviews && room.photoPreviews.map((src, i) => (
                    <img key={i} src={src} alt={`Номер ${index + 1} фото ${i + 1}`} className="preview-image" />
                  ))}
                </div>
              </div>
              {rooms.length > 1 && (
                <button type="button" onClick={() => handleRemoveRoom(index)} className="remove-room-button">
                  Удалить номер
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={handleAddRoom} className="add-room-button">
            Добавить Номер
          </button>
        </div>

        {status === 'loading' && <p>Загрузка...</p>}
        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="save-hotel-button">
          Сохранить Отель
        </button>
      </form>
    </div>
  );
};

export default AddHotel;
