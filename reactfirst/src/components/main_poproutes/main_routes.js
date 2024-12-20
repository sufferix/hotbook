import React from "react";


function MainContent() {
  const routes = [
    { name: "Стамбул, Турция", image: "istanbul.jpg" },
    { name: "Пхукет, Таиланд", image: "phuket.jpg" },
    { name: "Санкт-Петербург, Россия", image: "spb.jpg" },
    { name: "Дубай, ОАЭ", image: "dubai.jpg" },
  ];

  return (
    <div className="main-content">
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
