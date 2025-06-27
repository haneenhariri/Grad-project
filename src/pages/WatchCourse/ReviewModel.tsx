import { useTranslation } from "react-i18next";
import Button from "../../Ui/Button/Button";
import { useState } from "react";
import StarRatingInput from "../../components/StarRating/StarRatingInput";
import { showToast } from "../../utils/toast";
import axios from "axios";
import { addReview } from "../../services/revie";
export interface ReviewModelProps {
  showMode: boolean;
  setShowMode: (showMode: boolean) => void;
  courseId: number;
}

export default function ReviewModel({
  showMode,
  setShowMode,
  courseId,
}: ReviewModelProps) {
  const { t } = useTranslation();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      showToast(t("CoursesSection.Please select a rating before submitting"), "error");
      return;
    }
    if (review.trim() === "") {
      showToast(t("CoursesSection.Please write your feedback before submitting"), "error");
      return;
    }

    if (!courseId) {
      console.error("Course ID is missing or invalid:", courseId);
      showToast(t("CoursesSection.Cannot submit review: Course ID is missing"), "error");
      return;
    }

    try {
      setIsSubmitting(true);
      console.log(
        `Submitting review - Course ID: ${courseId}, Rating: ${rating}, Review: ${review}`
      );
      const response = await addReview(courseId, rating, review);
      console.log("API Response:", response);
      if (response && response.status === "success") {
        showToast(t("CoursesSection.Your review has been submitted successfully!"), "success");
        setRating(0);
        setReview("");
        setShowMode(false);
      } else {
        throw new Error(response?.message || "Unknown error occurred");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Failed to submit your review";
        showToast(errorMessage, "error");
      } else {
        showToast("An unexpected error occurred", "error");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    showMode && (
      <div className="fixed inset-0 bg-black bg-opacity-50 md:text-lg text-sm flex items-center justify-center z-[70]">
        <div className="bg-white rounded-lg w-full max-w-lg shadow-lg">
          <div className="p-5 flex justify-between border-b items-center">
            <h2 className="text-xl font-bold">{t("btn.Write a Review")}</h2>
            <button
              onClick={() => setShowMode(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="p-5">
            <div className="flex flex-col items-center mb-6">
              <h3 className="text-lg mb-3">{t("Rate this course")}</h3>
              <StarRatingInput
                rating={rating}
                onChange={setRating}
                size="lg"
                readonly={false}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="review-text">{t("Feedback")}</label>
              <textarea
                required
                id="review-text"
                rows={4}
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="p-2 rounded-md border"
                placeholder={t("Write down your feedback here...")}
              ></textarea>
            </div>
          </div>
          <div className="p-5 flex justify-between items-center border-t">
            <Button
              text={t("Cancel")}
              onClick={() => setShowMode(false)}
              Bg="bg-gray-400/15"
            />
            <Button
              text={isSubmitting ? t("Submitting...") : t("Submit Review")}
              Bg={
                rating > 0 ? "bg-btn text-white" : "bg-gray-300 text-gray-600"
              }
              onClick={handleSubmit}
              disabled={rating === 0 || isSubmitting}
            />
          </div>
        </div>
      </div>
    )
  );
}
