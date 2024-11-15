import React from "react";
import Booking from "../../components/main_booking/booking";
import MainContent from "../../components/main_poproutes/main_routes";

function Home() {
  return (
    <div>
      <h1 className="main-title">HotBook - по работе и для души</h1>
      <Booking />
      <MainContent />
    </div>
  );
}

export default Home;
