
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { 
//   Dialog, 
//   DialogContent, 
//   DialogHeader, 
//   DialogTitle, 
//   DialogFooter 
// } from "@/components/ui/dialog";
// import { Textarea } from "@/components/ui/textarea";
// import { Input } from "@/components/ui/input";
// import axiosInstance from "@/api/client";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationPrevious,
//   PaginationNext
// } from "@/components/ui/pagination"; 
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";

// interface Feedback {
//   _id: string;
//   userId?: {
//     firstName: string;
//     lastName: string;
//     email: string;
//   };
//   comment: string;
//   rating: number;
// }

// interface FeedbackForm {
//   comment: string;
//   rating: number;
// }

// const FeedbackManagement: React.FC = () => {
//   const queryClient = useQueryClient();
//   const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
//   const [dialogMode, setDialogMode] = useState<"create" | "update">("create");
//   const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
//   const [page, setPage] = useState<number>(1);  
//    const [limit, setLimit] = useState(5);

//   const { register, handleSubmit, reset } = useForm<FeedbackForm>();

//   // Fetch feedback with pagination
//   const { data: feedbackResponse, isLoading, error } = useQuery({
//     queryKey: ["feedback", page, limit],
//     queryFn: async () => {
//       const response = await axiosInstance.get<Feedback[]>("/feedback", {
//         params: { page, limit },
//       });
//       return response;
//     },
//     keepPreviousData: true, // Prevent reloading flicker when paginating
//   });

//   // Create feedback mutation
//   const createFeedbackMutation = useMutation({
//     mutationFn: (newFeedback: FeedbackForm) =>
//       axiosInstance.post("/feedback", newFeedback),
//     onSuccess: () => {
//       queryClient.invalidateQueries(["feedback"]);
//       setIsDialogOpen(false);
//     },
//   });

//   // Update feedback mutation
//   const updateFeedbackMutation = useMutation({
//     mutationFn: ({ id, updatedFeedback }: { id: string; updatedFeedback: FeedbackForm }) =>
//       axiosInstance.put(`/feedback/${id}`, updatedFeedback),
//     onSuccess: () => {
//       queryClient.invalidateQueries(["feedback"]);
//       setIsDialogOpen(false);
//     },
//   });

//   // Delete feedback mutation
//   const deleteFeedbackMutation = useMutation({
//     mutationFn: (id: string) => axiosInstance.delete(`/feedback/${id}`),
//     onSuccess: () => queryClient.invalidateQueries(["feedback"]),
//   });

//   // Dialog handlers
//   const openDialog = (mode: "create" | "update", feedback: Feedback | null = null) => {
//     setDialogMode(mode);
//     setSelectedFeedback(feedback);
//     setIsDialogOpen(true);

//     if (mode === "update" && feedback) {
//       reset({
//         comment: feedback.comment,
//         rating: feedback.rating,
//       });
//     } else {
//       reset({
//         comment: "",
//         rating: 1,
//       });
//     }
//   };

//   const closeDialog = () => {
//     setIsDialogOpen(false);
//     setSelectedFeedback(null);
//   };

//   const onSubmit = (data: FeedbackForm) => {
//     if (dialogMode === "create") {
//       createFeedbackMutation.mutate(data);
//     } else if (dialogMode === "update" && selectedFeedback) {
//       updateFeedbackMutation.mutate({
//         id: selectedFeedback._id,
//         updatedFeedback: data,
//       });
//     }
//   };

//   const handleDelete = (id: string) => {
//     deleteFeedbackMutation.mutate(id);
//   };

//     const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//       setLimit(Number(e.target.value));
//       setPage(1); // Reset to the first page when changing the limit
//     };

//   if (isLoading) return <div>Loading feedback...</div>;
//   if (error) return <div>Error loading feedback</div>;

//   const feedbacks: Feedback[] = feedbackResponse?.data || [];
//   const totalPages = feedbackResponse?.pagination?.totalPages || 1;

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Feedback Management</h1>
//         <Button onClick={() => openDialog("create")}>New Feedback</Button>
//         <div className="mb-4">
//         <label htmlFor="limit" className="mr-2">Records per page:</label>
//         <Select id="limit" value={limit.toString()} onChange={handleLimitChange}>
//           <SelectTrigger>
//             <SelectValue placeholder="Select Limit" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="5">5</SelectItem>
//             <SelectItem value="10">10</SelectItem>
//             <SelectItem value="20">20</SelectItem>
//             <SelectItem value="50">50</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>
//       </div>

//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>User</TableHead>
//             <TableHead>Comment</TableHead>
//             <TableHead>Rating</TableHead>
//             <TableHead>Actions</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {feedbacks.map((feedback) => (
//             <TableRow key={feedback._id}>
//               <TableCell>
//                 {feedback.userId?.firstName} {feedback.userId?.lastName}
//                 <div className="text-xs text-gray-500">
//                   {feedback.userId?.email}
//                 </div>
//               </TableCell>
//               <TableCell>{feedback.comment}</TableCell>
//               <TableCell>{feedback.rating}</TableCell>
//               <TableCell>
//                 <Button
//                   variant="ghost"
//                   onClick={() => openDialog("update", feedback)}
//                 >
//                   Edit
//                 </Button>
//                 <Button
//                   variant="ghost"
//                   onClick={() => handleDelete(feedback._id)}
//                 >
//                   Delete
//                 </Button>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>

//       {/* Pagination Component */}
//       <Pagination>
//         <PaginationContent>
//           <PaginationItem>
//             <PaginationPrevious
//               onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
//               disabled={page === 1}
//             />
//           </PaginationItem>
//           {[...Array(totalPages)].map((_, index) => (
//             <PaginationItem key={index}>
//               <Button
//                 variant={page === index + 1 ? "outline" : "solid"}
//                 onClick={() => setPage(index + 1)}
//               >
//                 {index + 1}
//               </Button>
//             </PaginationItem>
//           ))}
//           <PaginationItem>
//             <PaginationNext
//               onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
//               disabled={page === totalPages}
//             />
//           </PaginationItem>
//         </PaginationContent>
//       </Pagination>

//       {/* Create/Update Dialog */}
//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>
//               {dialogMode === "create" ? "Create New Feedback" : "Edit Feedback"}
//             </DialogTitle>
//           </DialogHeader>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <Textarea
//               {...register("comment", { required: true })}
//               placeholder="Enter your feedback"
//               className="mb-4"
//             />
//             <Input
//               {...register("rating", { required: true })}
//               type="number"
//               placeholder="Enter rating (1-5)"
//               min="1"
//               max="5"
//               className="mb-4"
//             />
//             <DialogFooter className="mt-4">
//               <Button type="submit">
//                 {dialogMode === "create" ? "Create Feedback" : "Update Feedback"}
//               </Button>
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default FeedbackManagement;
//==============================================================================
import React, { useState, useEffect } from "react";
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext
} from "@/components/ui/pagination"; 
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface Feedback {
  _id: string;
  userId?: {
    firstName: string;
    lastName: string;
    email: string;
  };
  comment: string;
  rating: number;
}

interface FeedbackForm {
  comment: string;
  rating: number;
}

const FeedbackManagement: React.FC = () => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [dialogMode, setDialogMode] = useState<"create" | "update">("create");
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const { register, handleSubmit, reset } = useForm<FeedbackForm>();

  const { data: feedbackResponse, isLoading, error } = useQuery({
    queryKey: ["feedback", page, limit],
    queryFn: async () => {
      const response = await axiosInstance.get("/feedback", {
        params: { page, limit }
      });
      return response;
    },
    keepPreviousData: true,
  });

  // Create feedback mutation
  const createFeedbackMutation = useMutation({
    mutationFn: (newFeedback: FeedbackForm) =>
      axiosInstance.post("/feedback", newFeedback),
    onSuccess: () => {
      queryClient.invalidateQueries(["feedback"]);
      setIsDialogOpen(false);
    },
  });

  // Update feedback mutation
  const updateFeedbackMutation = useMutation({
    mutationFn: ({ id, updatedFeedback }: { id: string; updatedFeedback: FeedbackForm }) =>
      axiosInstance.put(`/feedback/${id}`, updatedFeedback),
    onSuccess: () => {
      queryClient.invalidateQueries(["feedback"]);
      setIsDialogOpen(false);
    },
  });

  // Delete feedback mutation
  const deleteFeedbackMutation = useMutation({
    mutationFn: (id: string) => axiosInstance.delete(`/feedback/${id}`),
    onSuccess: () => queryClient.invalidateQueries(["feedback"]),
  });

  const handleLimitChange = (value: string) => {
    const newLimit = Number(value);
    setLimit(newLimit);
    setPage(1);
  };

  // Dialog handlers
  const openDialog = (mode: "create" | "update", feedback: Feedback | null = null) => {
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
        rating: 1,
      });
    }
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedFeedback(null);
  };

  const onSubmit = (data: FeedbackForm) => {
    if (dialogMode === "create") {
      createFeedbackMutation.mutate(data);
    } else if (dialogMode === "update" && selectedFeedback) {
      updateFeedbackMutation.mutate({
        id: selectedFeedback._id,
        updatedFeedback: data,
      });
    }
  };

  const handleDelete = (id: string) => {
    deleteFeedbackMutation.mutate(id);
  };

  if (isLoading) return <div>Loading feedback...</div>;
  if (error) return <div>Error loading feedback</div>;

  const feedbacks: Feedback[] = feedbackResponse?.data || [];
  const totalPages = feedbackResponse?.pagination?.totalPages || 1;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Feedback Management</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="limit">Records per page:</label>
            <Select value={limit.toString()} onValueChange={handleLimitChange}>
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* <Button onClick={() => openDialog("create")}>New Feedback</Button> */}
        </div>
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
                {feedback.userId ? (
                  <>
                    {feedback.userId.firstName} {feedback.userId.lastName}
                    <div className="text-xs text-gray-500">
                      {feedback.userId.email}
                    </div>
                  </>
                ) : (
                  <span className="text-gray-500">Anonymous</span>
                )}
              </TableCell>
              <TableCell>{feedback.comment}</TableCell>
              <TableCell>{feedback.rating}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  onClick={() => openDialog("update", feedback)}
                  className="mr-2"
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

      <div className="mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <Button
                  variant={page === index + 1 ? "outline" : "ghost"}
                  onClick={() => setPage(index + 1)}
                  className="mx-1"
                >
                  {index + 1}
                </Button>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={page === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

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