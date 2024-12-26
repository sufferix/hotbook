import React from "react";

function ReviewsSection({
  reviews = [],
  newReviewContent = "",
  setNewReviewContent = () => {},
  newReviewRating = 0,
  setNewReviewRating = () => {},
  onAddReview = () => {},
  statusReviews = "idle",
}) {
  const firstTimeLoading =
    statusReviews === "loading" && (reviews?.length || 0) === 0;

  if (firstTimeLoading) {
    return <p>Загрузка отзывов...</p>;
  }

  const handleStarClick = (index) => {
    setNewReviewRating(index + 1);
  };

  return (
    <div className="reviews-section">
      <h3 className="section-title">
        Отзывы{" "}
        {statusReviews === "loading" && reviews.length > 0 && (
          <span style={{ fontSize: "12px", color: "#aaa" }}>
            (обновление...)
          </span>
        )}
      </h3>

      <textarea
        value={newReviewContent}
        onChange={(e) => setNewReviewContent(e.target.value)}
        placeholder="Напишите ваш отзыв..."
        className="review-input"
      />

      <div className="rating-input">
        <p>Ваша оценка: </p>
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={`star ${index < newReviewRating ? "selected" : ""}`}
            onClick={() => handleStarClick(index)}
          >
            ★
          </span>
        ))}
      </div>

      <button
        onClick={onAddReview}
        className="add-review-button"
        disabled={statusReviews === "loading"}
      >
        Добавить отзыв
      </button>

      <div className="reviews-list">
        {reviews.map((review) => (
          <div key={review.id} className="review-card">
            <p className="review-name">
              {(() => {
                if (!review.userName || review.userName.trim() === "") return "Аноним";
                const parts = review.userName.split(" ").filter((part) => part.trim().toLowerCase() !== "null");
                return parts.length > 0 ? parts.join(" ") : "Аноним";
              })()}
            </p>
            <div className="review-rating">
              {[...Array(5)].map((_, starIndex) => (
                <span
                  key={starIndex}
                  className={`star ${
                    starIndex < review.rating ? "selected" : ""
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <p className="review-text">{review.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewsSection;
