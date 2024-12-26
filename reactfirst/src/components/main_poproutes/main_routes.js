import React from "react";
import "./main_routes.css";

const MainRoutes = () => {
  // Статичные данные для отображения направлений
  const routes = [
    { name: "Москва", image: "moscow.jpg" },
    { name: "Владивосток", image: "vladivostok.jpeg" },
    { name: "Санкт-Петербург", image: "spb.jpg" },
    { name: "Сочи", image: "sochi.jpg" },
  ];

  return (
    <div className="main-content">
      <div className="route-grid">
        {routes.map((route, index) => (
          <div key={index} className="route">
            {route.image ? (
              <img
                src={`${process.env.PUBLIC_URL}/images/${route.image}`}
                alt={route.name}
              />
            ) : (
              <div className="placeholder">Нет фото</div>
            )}
            <p>{route.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainRoutes;

