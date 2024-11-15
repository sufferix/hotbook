import React from "react";
import "./main_routes.css";

function MainContent() {
  const routes = [
    { name: "Стамбул, Турция", image: "istanbul.jpg" },
    { name: "Пхукет, Таиланд", image: "phuket.jpg" },
    { name: "Санкт-Петербург, Россия", image: "spb.jpg" },
    { name: "Дубай, ОАЭ", image: "dubai.jpg" },
  ];

  return (
    <div className="main-content">
      <h2>Популярные маршруты</h2>
      <div className="route-grid">
        {routes.map((route, index) => (
          <div key={index} className="route">
            <img src={`${process.env.PUBLIC_URL}/images/${route.image}`} alt={route.name} />
            <p>{route.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainContent;
