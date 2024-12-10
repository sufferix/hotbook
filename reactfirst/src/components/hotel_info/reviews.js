import React from "react";

function ReviewsSection() {
  const reviews = [
    {
      avatar: "/images/avatar1.jpg",
      name: "Арбуз Ананасов",
      rating: 5,
      text: "Всё классно!",
    },
    {
      avatar: "/images/avatar2.jpg",
      name: "Банан Грушева",
      rating: 4,
      text: "Очень уютно, но немного шумно.",
    },
  ];

  return (
    <div className="reviews-section">
      <h3 className="section-title">Отзывы</h3>
      <div className="reviews-list">
        {reviews.map((review, index) => (
          <div key={index} className="review-card">
            <img src={review.avatar} alt={review.name} className="avatar" />
            <div className="review-content">
              <p className="review-name">{review.name}</p>
              <p className="review-rating">
                {"★".repeat(review.rating)}{" "}
                <span className="rating-text">({review.rating})</span>
              </p>
              <p className="review-text">{review.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewsSection;
