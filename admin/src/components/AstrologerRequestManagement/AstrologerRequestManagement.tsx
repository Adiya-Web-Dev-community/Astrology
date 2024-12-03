// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
// import axiosInstance from "@/api/client";

// const AstrologerRequestManagement = () => {
//   const queryClient = useQueryClient();
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [dialogMode, setDialogMode] = useState("create");
//   const [selectedRequest, setSelectedRequest] = useState(null);
//   const { register, handleSubmit, reset } = useForm();

// // Updated (v5 syntax):
// const { data: requests, isLoading } = useQuery({
//     queryKey: ["astrologer-requests"],
//     queryFn: async () => {
//       const response = await axiosInstance.get("/astrologer-requests");
//       return response.data;
//     }
//   });

//  // Updated (v5 syntax):
// const createRequestMutation = useMutation({
//     mutationFn: (newRequest) => axiosInstance.post("/astrologer-requests", newRequest),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["astrologer-requests"] });
//       setIsDialogOpen(false);
//     },
//   });

//   // Update an astrologer request
//   const updateRequestMutation = useMutation({
//     mutationFn: ({ id, updatedRequest }) =>
//       axiosInstance.put(`/astrologer-requests/${id}`, updatedRequest),
//     onSuccess: () => {
//       queryClient.invalidateQueries(["astrologer-requests"]);
//       setIsDialogOpen(false);
//     },
//   });

//   // Delete an astrologer request
//   const deleteRequestMutation = useMutation({
//     mutationFn: (id) => axiosInstance.delete(`/astrologer-requests/${id}`),
//     onSuccess: () => queryClient.invalidateQueries(["astrologer-requests"]),
//   });

//   // Dialog handlers
//   const openDialog = (mode, request = null) => {
//     setDialogMode(mode);
//     setSelectedRequest(request);
//     setIsDialogOpen(true);

//     if (mode === "update" && request) {
//       reset({
//         name: request.name,
//         email: request.email,
//         message: request.message,
//         status: request.status,
//       });
//     } else {
//       reset({
//         name: "",
//         email: "",
//         message: "",
//         status: "pending",
//       });
//     }
//   };

//   const closeDialog = () => {
//     setIsDialogOpen(false);
//     setSelectedRequest(null);
//   };

//   const onSubmit = (data) => {
//     if (dialogMode === "create") {
//       createRequestMutation.mutate(data);
//     } else if (dialogMode === "update" && selectedRequest) {
//       updateRequestMutation.mutate({ id: selectedRequest._id, updatedRequest: data });
//     }
//   };

//   const handleDelete = (id) => {
//     deleteRequestMutation.mutate(id);
//   };

//   if (isLoading) return <div>Loading requests...</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Astrologer Requests</h1>
//         <Button onClick={() => openDialog("create")}>New Request</Button>
//       </div>

//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Name</TableHead>
//             <TableHead>Email</TableHead>
//             <TableHead>Message</TableHead>
//             <TableHead>Status</TableHead>
//             <TableHead>Actions</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {requests.map((request) => (
//             <TableRow key={request._id}>
//               <TableCell>{request.name}</TableCell>
//               <TableCell>{request.email}</TableCell>
//               <TableCell>{request.message}</TableCell>
//               <TableCell>{request.status}</TableCell>
//               <TableCell>
//                 <Button variant="ghost" onClick={() => openDialog("update", request)}>
//                   Edit
//                 </Button>
//                 <Button variant="destructive" onClick={() => handleDelete(request._id)}>
//                   Delete
//                 </Button>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>

//       {/* Create/Update Dialog */}
//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>
//               {dialogMode === "create" ? "Create New Request" : "Update Request"}
//             </DialogTitle>
//           </DialogHeader>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <Input {...register("name", { required: true })} placeholder="Name" className="mb-4" />
//             <Input {...register("email", { required: true })} placeholder="Email" className="mb-4" />
//             <Textarea {...register("message", { required: true })} placeholder="Message" className="mb-4" />
//             <Select {...register("status", { required: true })} defaultValue="pending">
//               <SelectTrigger>
//                 <SelectValue placeholder="Select Status" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="pending">Pending</SelectItem>
//                 <SelectItem value="approved">Approved</SelectItem>
//                 <SelectItem value="rejected">Rejected</SelectItem>
//               </SelectContent>
//             </Select>
//             <DialogFooter>
//               <Button type="submit">
//                 {dialogMode === "create" ? "Create Request" : "Update Request"}
//               </Button>
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default AstrologerRequestManagement;
//===========================================
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import axiosInstance from "@/api/client";

const AstrologerRequestManagement = () => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState("create");
  const [selectedRequest, setSelectedRequest] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  // Fetch all requests
  const { data: requests = [], isLoading, error } = useQuery({
    queryKey: ["astrologer-requests"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/astrologer-requests");
      return data;
    },
  });

  // Create request mutation
  const createRequestMutation = useMutation({
    mutationFn: (newRequest) => axiosInstance.post("/astrologer-requests", newRequest),
    onSuccess: () => {
      queryClient.invalidateQueries(["astrologer-requests"]);
      closeDialog();
    },
  });

  // Update request mutation
  const updateRequestMutation = useMutation({
    mutationFn: ({ id, updatedRequest }) =>
      axiosInstance.put(`/astrologer-requests/${id}`, updatedRequest),
    onSuccess: () => {
      queryClient.invalidateQueries(["astrologer-requests"]);
      closeDialog();
    },
  });

  // Delete request mutation
  const deleteRequestMutation = useMutation({
    mutationFn: (id) => axiosInstance.delete(`/astrologer-requests/${id}`),
    onSuccess: () => queryClient.invalidateQueries(["astrologer-requests"]),
  });

  // Open the dialog in create or update mode
  const openDialog = (mode, request = null) => {
    setDialogMode(mode);
    setSelectedRequest(request);
    setIsDialogOpen(true);

    if (mode === "update" && request) {
      reset(request);
    } else {
      reset({ name: "", email: "", message: "", status: "Pending" });
    }
  };

  // Close the dialog
  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedRequest(null);
  };

  // Handle form submission
  const onSubmit = (data) => {
    if (dialogMode === "create") {
      createRequestMutation.mutate(data);
    } else if (dialogMode === "update" && selectedRequest) {
      updateRequestMutation.mutate({ id: selectedRequest._id, updatedRequest: data });
    }
  };

  // Handle deletion of a request
  const handleDelete = (id) => {
    deleteRequestMutation.mutate(id);
  };

  if (isLoading) return <div>Loading requests...</div>;
  if (error) return <div>Error fetching requests</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Astrologer Requests</h1>
        <Button onClick={() => openDialog("create")}>New Request</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request._id}>
              <TableCell>{request.name}</TableCell>
              <TableCell>{request.email}</TableCell>
              <TableCell>{request.message}</TableCell>
              <TableCell>{request.status}</TableCell>
              <TableCell>
                <Button variant="ghost" onClick={() => openDialog("update", request)}>
                  Edit
                </Button>
                <Button variant="destructive" onClick={() => handleDelete(request._id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Dialog for create/update */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogMode === "create" ? "Create New Request" : "Update Request"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input {...register("name", { required: true })} placeholder="Name" className="mb-4" />
            <Input {...register("email", { required: true })} placeholder="Email" className="mb-4" />
            <Textarea {...register("message", { required: true })} placeholder="Message" className="mb-4" />
            <Select {...register("status", { required: true })} defaultValue="Pending">
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <DialogFooter>
              <Button type="submit">
                {dialogMode === "create" ? "Create Request" : "Update Request"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AstrologerRequestManagement;
