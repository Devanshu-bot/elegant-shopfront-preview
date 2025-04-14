
import { useState } from "react";
import { Review } from "@/utils/mockData";
import { Star, StarHalf } from "lucide-react";

interface ReviewSectionProps {
  reviews: Review[];
  rating: number;
  reviewCount: number;
}

export function ReviewSection({ reviews, rating, reviewCount }: ReviewSectionProps) {
  const [displayCount, setDisplayCount] = useState(3);
  const [expandedReviews, setExpandedReviews] = useState<number[]>([]);
  
  // Generate stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`star-${i}`} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="h-5 w-5 fill-yellow-400 text-yellow-400" />);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-star-${i}`} className="h-5 w-5 text-gray-300" />
      );
    }

    return stars;
  };

  const toggleExpandReview = (reviewId: number) => {
    if (expandedReviews.includes(reviewId)) {
      setExpandedReviews(expandedReviews.filter(id => id !== reviewId));
    } else {
      setExpandedReviews([...expandedReviews, reviewId]);
    }
  };

  const showMoreReviews = () => {
    setDisplayCount(prev => prev + 3);
  };

  return (
    <section className="mt-12 pt-8 border-t border-gray-200">
      <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

      {/* Rating Summary */}
      <div className="flex items-center mb-8">
        <div className="flex mr-2">
          {renderStars(rating)}
        </div>
        <p className="text-lg font-medium">{rating.toFixed(1)}</p>
        <span className="mx-2 text-gray-500">•</span>
        <p className="text-gray-500">{reviewCount} reviews</p>
      </div>

      {/* Reviews List */}
      <div className="space-y-8">
        {reviews.slice(0, displayCount).map((review) => (
          <div key={review.id} className="pb-6 border-b border-gray-100 last:border-b-0">
            <div className="flex items-center mb-2">
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                {review.avatarSrc ? (
                  <img 
                    src={review.avatarSrc} 
                    alt={review.author} 
                    className="h-full w-full object-cover rounded-full" 
                  />
                ) : (
                  <span className="text-gray-600 font-medium">
                    {review.author.charAt(0)}
                  </span>
                )}
              </div>
              <div>
                <h4 className="font-medium">{review.author}</h4>
                <div className="flex items-center">
                  <div className="flex mr-2">
                    {renderStars(review.rating)}
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <p className={`text-gray-700 ${
                review.content.length > 150 && !expandedReviews.includes(review.id) 
                  ? "line-clamp-3" 
                  : ""
              }`}>
                {review.content}
              </p>
              {review.content.length > 150 && (
                <button 
                  onClick={() => toggleExpandReview(review.id)}
                  className="text-product-accent text-sm font-medium mt-1 hover:underline"
                >
                  {expandedReviews.includes(review.id) ? "Read less" : "Read more"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Show more reviews button */}
      {displayCount < reviews.length && (
        <div className="mt-8 text-center">
          <button 
            onClick={showMoreReviews}
            className="inline-flex items-center justify-center px-6 py-2 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-product-accent transition-colors"
          >
            Show More Reviews
          </button>
        </div>
      )}
    </section>
  );
}
