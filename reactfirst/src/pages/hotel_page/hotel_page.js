import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchHotelDetail,
  fetchHotelReviews,
  postHotelReview,
  clearHotelDetail,
} from "../../redux/slices/hotelDetailSlice";

import ImageSlider from "../../components/hotel_info/image_slider";
import AmenitiesSection from "../../components/hotel_info/amenities";
import DescriptionSection from "../../components/hotel_info/description";
import RoomCards from "../../components/hotel_info/room_cards";
import ReviewsSection from "../../components/hotel_info/reviews";

import "./hotel_page.css";

function HotelInfoPage() {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const searchParams = new URLSearchParams(location.search);
  const city = searchParams.get("city");
  const checkInDate = searchParams.get("checkInDate");
  const checkOutDate = searchParams.get("checkOutDate");
  const stars = searchParams.get("stars") || null;
  const amenities = searchParams.get("amenities") || "";

  const numOfAdultsParam = searchParams.get("numOfAdults");
  const numOfChildrenParam = searchParams.get("numOfChildren");
  const { numOfAdults: stateAdults, numOfChildren: stateChildren } = location.state || {};

  const numOfAdults = stateAdults
    ? parseInt(stateAdults, 10)
    : numOfAdultsParam
    ? parseInt(numOfAdultsParam, 10)
    : 1;

  const numOfChildren = stateChildren
    ? parseInt(stateChildren, 10)
    : numOfChildrenParam
    ? parseInt(numOfChildrenParam, 10)
    : 0;

  const { hotel, reviews, statusHotel, statusReviews, error } = useSelector(
    (state) => state.hotelDetail
  );

  useEffect(() => {
    dispatch(
      fetchHotelDetail({
        id,
        city,
        checkInDate,
        checkOutDate,
        stars,
        amenities,
      })
    );
    dispatch(fetchHotelReviews(id));
  }, [
    dispatch,
    id,
    city,
    checkInDate,
    checkOutDate,
    stars,
    amenities,
    numOfAdults,
    numOfChildren,
  ]);

  useEffect(() => {
  }, [hotel, reviews]);

  useEffect(() => {
    return () => {
      dispatch(clearHotelDetail());
    };
  }, [dispatch]);

  const [newReviewContent, setNewReviewContent] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(0);

  const handleAddReview = async () => {
    if (!newReviewRating || newReviewRating < 1) {
      alert("Выберите рейтинг!");
      return;
    }
    if (!newReviewContent.trim()) {
      alert("Напишите текст отзыва!");
      return;
    }

    const resultAction = await dispatch(
      postHotelReview({
        id,
        rating: newReviewRating,
        content: newReviewContent,
      })
    );

    if (postHotelReview.fulfilled.match(resultAction)) {
      setNewReviewContent("");
      setNewReviewRating(0);
      dispatch(fetchHotelReviews(id));
    } else {
      alert("Необходимо зарегистрироваться, чтобы добавить отзыв!");
    }
  };

  if (!hotel && statusHotel === "loading") {
    return <p>Загрузка информации об отеле...</p>;
  }

  if (statusHotel === "failed") {
    return <p className="error-message">{error || "Ошибка загрузки отеля"}</p>;
  }

  if (!hotel) {
    return <p>Нет данных об отеле.</p>;
  }

  const { name, address, city: hotelCity, description, photos, rooms } = hotel;
  const sliderImages = photos?.map((p) => p.url) || [];

  return (
    <div className="hotel-info-page">
      <main className="page-container">
        <h1 className="hotel-title">{name || "Название отеля"}</h1>
        <p className="hotel-address">
          {address || "Адрес не указан"},{" "}
          {hotelCity || "Город неизвестен"}
        </p>

        <ImageSlider images={sliderImages} />

        <div className="hotel-details">
          <AmenitiesSection />
          <DescriptionSection text={description} />
        </div>

        <RoomCards
          hotelId={id}
          rooms={rooms}
          hotelName={name}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          numOfAdults={numOfAdults}
          numOfChildren={numOfChildren}
        />

        <ReviewsSection
          reviews={reviews}
          statusReviews={statusReviews}
          newReviewContent={newReviewContent}
          setNewReviewContent={setNewReviewContent}
          newReviewRating={newReviewRating}
          setNewReviewRating={setNewReviewRating}
          onAddReview={handleAddReview}
        />
      </main>
    </div>
  );
}

export default HotelInfoPage;
