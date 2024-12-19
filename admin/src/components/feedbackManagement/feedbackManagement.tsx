import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import axiosInstance from "@/api/client";

const FeedbackManagement = () => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState("create");
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  // Fetch all feedback
  const { data: feedbackResponse, isLoading, error } = useQuery({
    queryKey: ["feedback"],
    queryFn: async () => {
      const response = await axiosInstance.get("/feedback");
      return response;
    },
  });

  // Create feedback mutation
  const createFeedbackMutation = useMutation({
    mutationFn: (newFeedback) => axiosInstance.post("/feedback", newFeedback),
    onSuccess: () => {
      queryClient.invalidateQueries(["feedback"]);
      setIsDialogOpen(false);
    },
  });

  // Update feedback mutation
  const updateFeedbackMutation = useMutation({
    mutationFn: ({ id, updatedFeedback }) =>
      axiosInstance.put(`/feedback/${id}`, updatedFeedback),
    onSuccess: () => {
      queryClient.invalidateQueries(["feedback"]);
      setIsDialogOpen(false);
    },
  });

  // Delete feedback mutation
  const deleteFeedbackMutation = useMutation({
    mutationFn: (id) => axiosInstance.delete(`/feedback/${id}`),
    onSuccess: () => queryClient.invalidateQueries(["feedback"]),
  });

  // Dialog handlers
  const openDialog = (mode, feedback = null) => {
    setDialogMode(mode);
    setSelectedFeedback(feedback);
    setIsDialogOpen(true);

    if (mode === "update" && feedback) {
      reset({
        comment: feedback.comment,
        rating: feedback.rating,
      });
    } else {
      reset({
        comment: "",
        rating: "",
      });
    }
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedFeedback(null);
  };

  const onSubmit = async (data) => {
    if (dialogMode === "create") {
      createFeedbackMutation.mutate(data);
    } else if (dialogMode === "update" && selectedFeedback) {
      updateFeedbackMutation.mutate({
        id: selectedFeedback._id,
        updatedFeedback: data,
      });
    }
  };

  const handleDelete = (id) => {
    deleteFeedbackMutation.mutate(id);
  };

  if (isLoading) return <div>Loading feedback...</div>;
  if (error) return <div>Error loading feedback</div>;

  const feedbacks = feedbackResponse?.data || [];

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Feedback Management</h1>
        <Button onClick={() => openDialog("create")}>New Feedback</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Comment</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {feedbacks.map((feedback) => (
            <TableRow key={feedback._id}>
              <TableCell>
                {feedback.userId?.firstName} {feedback.userId?.lastName}
                <div className="text-xs text-gray-500">
                  {feedback.userId?.email}
                </div>
              </TableCell>
              <TableCell>{feedback.comment}</TableCell>
              <TableCell>{feedback.rating}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  onClick={() => openDialog("update", feedback)}
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => handleDelete(feedback._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Create/Update Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogMode === "create" ? "Create New Feedback" : "Edit Feedback"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Textarea
              {...register("comment", { required: true })}
              placeholder="Enter your feedback"
              className="mb-4"
            />
            <Input
              {...register("rating", { required: true })}
              type="number"
              placeholder="Enter rating (1-5)"
              min="1"
              max="5"
              className="mb-4"
            />
            <DialogFooter className="mt-4">
              <Button type="submit">
                {dialogMode === "create" ? "Create Feedback" : "Update Feedback"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FeedbackManagement;
