import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/api/client";
import { Layout } from "../custom/layout";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import StarRating from "./StarRating";
import Loader from "../loader";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"; // Import AlertDialog components

const ReviewsPage = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [reviewToDelete, setReviewToDelete] = useState(null);

  // Fetch reviews
  const {
    isLoading,
    error,
    data: reviews,
  } = useQuery({
    queryKey: ["astrologerReviews", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/reviews/astrologer/${id}`);
      return response; // Ensure to return the data part
    },
  });

  // Fetch average rating
  const { data: averageRating } = useQuery({
    queryKey: ["astrologerAverageRating", id],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/reviews/astrologer/${id}/average-rating`
      );
      return response;
    },
    initialData: { averageRating: 0 },
  });
  console.log(averageRating);
  // Mutation for deleting a review
  const deleteMutation = useMutation({
    mutationFn: async (reviewId) => {
      await axiosInstance.delete(`/reviews/${reviewId}`);
    },
    onSuccess: () => {
      // Invalidate and refetch the reviews query to update the list
      queryClient.invalidateQueries(["astrologerReviews", id]);
    },
    onError: (error) => {
      // Handle the error
      alert(`Error deleting review: ${error.message}`);
    },
  });

  if (isLoading) return <Loader />;
  if (error) return <div>An error occurred: {error.message}</div>;

  const handleDelete = (reviewId) => {
    setReviewToDelete(reviewId); // Set reviewId to delete
  };

  const confirmDelete = () => {
    if (reviewToDelete) {
      deleteMutation.mutate(reviewToDelete);
      setReviewToDelete(null); // Clear the reviewId after deletion
    }
  };

  return (
    <Layout>
      <Layout.Body>
        <div className="container mx-auto mt-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Reviews</h1>
            <Link
              to={`/astrologer/${id}`}
              className="text-blue-500 hover:underline mb-4 block"
            >
              &larr; Back to Astrologer Details
            </Link>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Average Rating</h2>
              <StarRating rating={averageRating.averageRating} />
              <div className="">
                <p className="text-lg font-semibold mt-2">
                  {averageRating.averageRating.toFixed(1)} / 5
                </p>
                <p className="text-sm font-semibold mt-2">
                  <p>Total No. Reviews : {averageRating.totalReviews}</p>
                </p>
              </div>
            </div>
            {reviews.map((review) => (
              <Card key={review._id} className="mb-4">
                <CardHeader className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>
                      {review.user.firstName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-semibold">
                      {review.user.firstName} {review.user.lastName}
                    </h2>
                    <StarRating rating={review.rating} />
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <button
                        onClick={() => handleDelete(review._id)}
                        className="ml-auto text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this review? This action
                        cannot be undone.
                      </AlertDialogDescription>
                      <div className="flex justify-end gap-4">
                        <AlertDialogCancel
                          onClick={() => setReviewToDelete(null)}
                        >
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDelete}>
                          Delete
                        </AlertDialogAction>
                      </div>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardHeader>
                <CardContent>
                  <p>
                    <b>Comment:</b> {review.comment}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Layout.Body>
    </Layout>
  );
};

export default ReviewsPage;
