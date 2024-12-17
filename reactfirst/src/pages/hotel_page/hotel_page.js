import React from "react";
import ImageSlider from "../../components/hotel_info/image_slider";
import AmenitiesSection from "../../components/hotel_info/amenities";
import DescriptionSection from "../../components/hotel_info/description";
import RoomCards from "../../components/hotel_info/room_cards";
import ReviewsSection from "../../components/hotel_info/reviews";
import "./hotel_page.css";

function HotelInfoPage() {

    return (
      <div className="hotel-info-page">
        
        <main className="page-container">
          <h1 className="hotel-title">Название отеля</h1>
          <ImageSlider />
          <div className="hotel-details">
            <AmenitiesSection />
            <DescriptionSection />
          </div>
          <RoomCards />
          <ReviewsSection />
        </main>
    </div>
  );
}

export default HotelInfoPage;




