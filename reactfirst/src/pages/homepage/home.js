import React from "react";
import Booking from "../../components/main_booking/booking";
import MainContent from "../../components/main_poproutes/main_routes";
import "./home.css"

function Home() {
  return (
    <div className="main-container">
      <h1 className="main-title">HotBook - по работе и для души</h1>
      <Booking />
      <h2>Популярные маршруты</h2>
      <MainContent />
    </div>
  );
}

export default Home;
