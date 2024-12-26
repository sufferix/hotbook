import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { createRoom, updateRoom, uploadRoomImage, deleteRoomPhoto } from '../../redux/slices/ownerHotelSlice';
import './room_modal.css';

const RoomModal = ({ isOpen, onRequestClose, hotelId, existingRoom }) => {
  const dispatch = useDispatch();

  const [roomData, setRoomData] = useState({
    roomType: '',
    roomPrice: 0,
    amenityIds: [],
  });

  const [roomPhotos, setRoomPhotos] = useState([]);
  const [roomPhotoPreviews, setRoomPhotoPreviews] = useState([]);

  useEffect(() => {
    if (existingRoom) {
      setRoomData({
        roomType: existingRoom.roomType || '',
        roomPrice: existingRoom.roomPrice || 0,
        amenityIds: existingRoom.amenityIds || [],
      });
      setRoomPhotoPreviews(existingRoom.photos.map((photo) => photo.url));
    } else {
      setRoomData({
        roomType: '',
        roomPrice: 0,
        amenityIds: [],
      });
      setRoomPhotoPreviews([]);
    }
  }, [existingRoom]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAmenityChange = (amenityId) => {
    setRoomData((prev) => {
      if (prev.amenityIds.includes(amenityId)) {
        return { ...prev, amenityIds: prev.amenityIds.filter((id) => id !== amenityId) };
      } else {
        return { ...prev, amenityIds: [...prev.amenityIds, amenityId] };
      }
    });
  };

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    setRoomPhotos(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setRoomPhotoPreviews((prev) => [...prev, ...previews]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!roomData.roomType.trim()) {
      alert('Введите тип номера!');
      return;
    }
    if (roomData.roomPrice <= 0) {
      alert('Введите корректную цену за ночь!');
      return;
    }

    try {
      if (existingRoom) {
        await dispatch(updateRoom({ hotelId, roomId: existingRoom.id, roomData })).unwrap();
        for (const photo of roomPhotos) {
          await dispatch(uploadRoomImage({ hotelId, roomId: existingRoom.id, imageFile: photo })).unwrap();
        }
      } else {
        const result = await dispatch(createRoom({ hotelId, roomData })).unwrap();
        const roomId = result.id;
        for (const photo of roomPhotos) {
          await dispatch(uploadRoomImage({ hotelId, roomId, imageFile: photo })).unwrap();
        }
      }

      alert(`Номер ${existingRoom ? 'обновлён' : 'добавлен'} успешно!`);
      onRequestClose();
    } catch (err) {
      alert(err);
    }
  };

  const handleRemovePhoto = (photoId) => {
    if (window.confirm('Вы уверены, что хотите удалить эту фотографию?')) {
      dispatch(deleteRoomPhoto({ hotelId, roomId: existingRoom.id, photoId }));
      setRoomPhotoPreviews(existingRoom.photos.filter((photo) => photo.id !== photoId).map((photo) => photo.url));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={existingRoom ? 'Редактировать Номер' : 'Добавить Номер'}
      className="room-modal"
      overlayClassName="room-modal-overlay"
      ariaHideApp={false}
    >
      <h2>{existingRoom ? 'Редактировать Номер' : 'Добавить Номер'}</h2>
      <form onSubmit={handleSubmit} className="room-form">
        <div className="form-group">
          <label>Тип номера:</label>
          <input
            type="text"
            name="roomType"
            value={roomData.roomType}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Цена за ночь:</label>
          <input
            type="number"
            name="roomPrice"
            min="0"
            value={roomData.roomPrice}
            onChange={handleChange}
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
                checked={roomData.amenityIds.includes(1)}
                onChange={() => handleAmenityChange(1)}
              />
              Wi-Fi
            </label>
            <label>
              <input
                type="checkbox"
                value={2}
                checked={roomData.amenityIds.includes(2)}
                onChange={() => handleAmenityChange(2)}
              />
              Кондиционер
            </label>
            <label>
              <input
                type="checkbox"
                value={3}
                checked={roomData.amenityIds.includes(3)}
                onChange={() => handleAmenityChange(3)}
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
            onChange={handlePhotoChange}
          />
          <div className="photo-previews">
            {existingRoom && existingRoom.photos.map((photo) => (
              <div key={photo.id} className="existing-photo">
                <img src={photo.url} alt={`Фотография номера ${photo.id}`} className="preview-image" />
                <button
                  type="button"
                  className="remove-photo-button"
                  onClick={() => handleRemovePhoto(photo.id)}
                >
                  &times;
                </button>
              </div>
            ))}

            {roomPhotos.map((file, index) => (
              <img
                key={index}
                src={roomPhotoPreviews[existingRoom ? existingRoom.photos.length + index : index]}
                alt={`Новое фото ${index + 1}`}
                className="preview-image"
              />
            ))}
          </div>
        </div>
        <div className="modal-buttons">
          <button type="submit" className="save-button">
            {existingRoom ? 'Сохранить Изменения' : 'Добавить Номер'}
          </button>
          <button type="button" className="cancel-button" onClick={onRequestClose}>
            Отмена
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default RoomModal;
