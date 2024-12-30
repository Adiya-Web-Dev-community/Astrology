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

//   // Fetch all requests
//   const { data: requests = [], isLoading, error } = useQuery({
//     queryKey: ["astrologer-requests"],
//     queryFn: async () => {
//       const { data } = await axiosInstance.get("/astrologer-requests");
//       return data;
//     },
//   });

//   // Create request mutation
//   const createRequestMutation = useMutation({
//     mutationFn: (newRequest) => axiosInstance.post("/astrologer-requests", newRequest),
//     onSuccess: () => {
//       queryClient.invalidateQueries(["astrologer-requests"]);
//       closeDialog();
//     },
//   });

//   // Update request mutation
//   const updateRequestMutation = useMutation({
//     mutationFn: ({ id, updatedRequest }) =>
//       axiosInstance.put(`/astrologer-requests/${id}`, updatedRequest),
//     onSuccess: () => {
//       queryClient.invalidateQueries(["astrologer-requests"]);
//       closeDialog();
//     },
//   });

//   // Delete request mutation
//   const deleteRequestMutation = useMutation({
//     mutationFn: (id) => axiosInstance.delete(`/astrologer-requests/${id}`),
//     onSuccess: () => queryClient.invalidateQueries(["astrologer-requests"]),
//   });

//   // Open the dialog in create or update mode
//   const openDialog = (mode, request = null) => {
//     setDialogMode(mode);
//     setSelectedRequest(request);
//     setIsDialogOpen(true);

//     if (mode === "update" && request) {
//       reset(request);
//     } else {
//       reset({ name: "", email: "", message: "", status: "Pending" });
//     }
//   };

//   // Close the dialog
//   const closeDialog = () => {
//     setIsDialogOpen(false);
//     setSelectedRequest(null);
//   };

//   // Handle form submission
//   const onSubmit = (data) => {
//     if (dialogMode === "create") {
//       createRequestMutation.mutate(data);
//     } else if (dialogMode === "update" && selectedRequest) {
//       updateRequestMutation.mutate({ id: selectedRequest._id, updatedRequest: data });
//     }
//   };

//   // Handle deletion of a request
//   const handleDelete = (id) => {
//     deleteRequestMutation.mutate(id);
//   };

//   if (isLoading) return <div>Loading requests...</div>;
//   if (error) return <div>Error fetching requests</div>;

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

//       {/* Dialog for create/update */}
//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>{dialogMode === "create" ? "Create New Request" : "Update Request"}</DialogTitle>
//           </DialogHeader>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <Input {...register("name", { required: true })} placeholder="Name" className="mb-4" />
//             <Input {...register("email", { required: true })} placeholder="Email" className="mb-4" />
//             <Textarea {...register("message", { required: true })} placeholder="Message" className="mb-4" />
//             <Select {...register("status", { required: true })} defaultValue="Pending">
//               <SelectTrigger>
//                 <SelectValue placeholder="Select Status" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="Pending">Pending</SelectItem>
//                 <SelectItem value="Approved">Approved</SelectItem>
//                 <SelectItem value="Rejected">Rejected</SelectItem>
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
//=============================================================
// import React, { useState } from "react";
// import { useForm, SubmitHandler } from "react-hook-form";
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
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogFooter,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import axiosInstance from "@/api/client";

// // Define types for form data and requests
// interface AstrologerRequest {
//   _id: string;
//   name: string;
//   email: string;
//   message: string;
//   status: "Pending" | "Approved" | "Rejected";
// }

// interface FormData {
//   name: string;
//   email: string;
//   message: string;
//   status: "Pending" | "Approved" | "Rejected";
// }

// const AstrologerRequestManagement: React.FC = () => {
//   const queryClient = useQueryClient();
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [dialogMode, setDialogMode] = useState<"create" | "update">("create");
//   const [selectedRequest, setSelectedRequest] = useState<AstrologerRequest | null>(null);

//   const { register, handleSubmit, reset } = useForm<FormData>();

//   // Fetch all requests
//   const {
//     data: requests = [],
//     isLoading,
//     error,
//   } = useQuery<AstrologerRequest[]>({
//     queryKey: ["astrologer-requests"],
//     queryFn: async () => {
//       const { data } = await axiosInstance.get<AstrologerRequest[]>("/astrologer-requests");
//       return data;
//     },
//   });

//   // Create request mutation
//   const createRequestMutation = useMutation({
//     mutationFn: (newRequest: FormData) => axiosInstance.post("/astrologer-requests", newRequest),
//     onSuccess: () => {
//       queryClient.invalidateQueries(["astrologer-requests"]);
//       closeDialog();
//     },
//   });

//   // Update request mutation
//   const updateRequestMutation = useMutation({
//     mutationFn: ({ id, updatedRequest }: { id: string; updatedRequest: FormData }) =>
//       axiosInstance.put(`/astrologer-requests/${id}`, updatedRequest),
//     onSuccess: () => {
//       queryClient.invalidateQueries(["astrologer-requests"]);
//       closeDialog();
//     },
//   });

//   // Delete request mutation
//   const deleteRequestMutation = useMutation({
//     mutationFn: (id: string) => axiosInstance.delete(`/astrologer-requests/${id}`),
//     onSuccess: () => queryClient.invalidateQueries(["astrologer-requests"]),
//   });

//   // Open the dialog in create or update mode
//   const openDialog = (mode: "create" | "update", request: AstrologerRequest | null = null) => {
//     setDialogMode(mode);
//     setSelectedRequest(request);
//     setIsDialogOpen(true);

//     if (mode === "update" && request) {
//       reset(request);
//     } else {
//       reset({ name: "", email: "", message: "", status: "Pending" });
//     }
//   };

//   // Close the dialog
//   const closeDialog = () => {
//     setIsDialogOpen(false);
//     setSelectedRequest(null);
//   };

//   // Handle form submission
//   const onSubmit: SubmitHandler<FormData> = (data) => {
//     if (dialogMode === "create") {
//       createRequestMutation.mutate(data);
//     } else if (dialogMode === "update" && selectedRequest) {
//       updateRequestMutation.mutate({ id: selectedRequest._id, updatedRequest: data });
//     }
//   };

//   // Handle deletion of a request
//   const handleDelete = (id: string) => {
//     deleteRequestMutation.mutate(id);
//   };

//   if (isLoading) return <div>Loading requests...</div>;
//   if (error) return <div>Error fetching requests</div>;

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

//       {/* Dialog for create/update */}
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
//             <Textarea
//               {...register("message", { required: true })}
//               placeholder="Message"
//               className="mb-4"
//             />
//             <Select {...register("status", { required: true })} defaultValue="Pending">
//               <SelectTrigger>
//                 <SelectValue placeholder="Select Status" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="Pending">Pending</SelectItem>
//                 <SelectItem value="Approved">Approved</SelectItem>
//                 <SelectItem value="Rejected">Rejected</SelectItem>
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
// import React, { useState } from "react";
// import { useForm, SubmitHandler } from "react-hook-form";
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
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogFooter,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import axiosInstance from "@/api/client";

// interface AstrologerRequest {
//   _id: string;
//   name: string;
//   email: string;
//   phone: string;
//   expertise: string;
//   status: "Pending" | "Approved" | "Rejected";
// }

// interface FormData {
//   name: string;
//   email: string;
//   phone: string;
//   expertise: string;
//   status: "Pending" | "Approved" | "Rejected";
// }

// const AstrologerRequestManagement: React.FC = () => {
//   const queryClient = useQueryClient();
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [dialogMode, setDialogMode] = useState<"create" | "update">("create");
//   const [selectedRequest, setSelectedRequest] = useState<AstrologerRequest | null>(null);
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(10);

//   const { register, handleSubmit, reset } = useForm<FormData>();

//   const { data: requestsResponse, isLoading, error } = useQuery({
//     queryKey: ["astrologer-requests", page, limit],
//     queryFn: async () => {
//       const response = await axiosInstance.get("/astrologer-requests", {
//         params: { page, limit },
//       });
//       return response;
//     },
//   });

//   const createRequestMutation = useMutation({
//     mutationFn: (newRequest: FormData) => axiosInstance.post("/astrologer-requests", newRequest),
//     onSuccess: () => {
//       queryClient.invalidateQueries(["astrologer-requests"]);
//       closeDialog();
//     },
//   });

//   const updateRequestMutation = useMutation({
//     mutationFn: ({ id, updatedRequest }: { id: string; updatedRequest: FormData }) =>
//       axiosInstance.put(`/astrologer-requests/${id}`, updatedRequest),
//     onSuccess: () => {
//       queryClient.invalidateQueries(["astrologer-requests"]);
//       closeDialog();
//     },
//   });

//   const deleteRequestMutation = useMutation({
//     mutationFn: (id: string) => axiosInstance.delete(`/astrologer-requests/${id}`),
//     onSuccess: () => queryClient.invalidateQueries(["astrologer-requests"]),
//   });

//   const openDialog = (mode: "create" | "update", request: AstrologerRequest | null = null) => {
//     setDialogMode(mode);
//     setSelectedRequest(request);
//     setIsDialogOpen(true);

//     if (mode === "update" && request) {
//       reset(request);
//     } else {
//       reset({ name: "", email: "", phone: "", expertise: "", status: "Pending" });
//     }
//   };

//   const closeDialog = () => {
//     setIsDialogOpen(false);
//     setSelectedRequest(null);
//   };

//   const onSubmit: SubmitHandler<FormData> = (data) => {
//     if (dialogMode === "create") {
//       createRequestMutation.mutate(data);
//     } else if (dialogMode === "update" && selectedRequest) {
//       updateRequestMutation.mutate({ id: selectedRequest._id, updatedRequest: data });
//     }
//   };

//   const handleDelete = (id: string) => {
//     deleteRequestMutation.mutate(id);
//   };

//   if (isLoading) return <div>Loading requests...</div>;
//   if (error) return <div>Error fetching requests</div>;

//   const requests = requestsResponse.data;
//   const meta = requestsResponse.meta;
// console.log(meta);

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
//             <TableHead>Phone</TableHead>
//             <TableHead>Expertise</TableHead>
//             <TableHead>Status</TableHead>
//             <TableHead>Actions</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {requests.map((request) => (
//             <TableRow key={request._id}>
//               <TableCell>{request.name}</TableCell>
//               <TableCell>{request.email}</TableCell>
//               <TableCell>{request.phone}</TableCell>
//               <TableCell>{request.expertise}</TableCell>
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

//       {/* Pagination */}
     
//         <Pagination>
//           <PaginationContent>
//             <PaginationItem>
//               <PaginationPrevious
//                 onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
//                 disabled={page === 1}
//               />
//             </PaginationItem>
//             {[...Array(meta.totalPages)].map((_, index) => (
//               <PaginationItem key={index}>
//                 <Button
//                   variant={page === index + 1 ? "outline" : "solid"}
//                   onClick={() => setPage(index + 1)}
//                 >
//                   {index + 1}
//                 </Button>
//               </PaginationItem>
//             ))}
//             <PaginationItem>
//               <PaginationNext
//                 onClick={() => setPage((prev) => Math.min(prev + 1, meta.totalPages))}
//                 disabled={page === meta.totalPages}
//               />
//             </PaginationItem>
//           </PaginationContent>
//         </Pagination>
   

//       {/* Dialog for create/update */}
//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>{dialogMode === "create" ? "Create New Request" : "Update Request"}</DialogTitle>
//           </DialogHeader>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <Input {...register("name", { required: true })} placeholder="Name" className="mb-4" />
//             <Input {...register("email", { required: true })} placeholder="Email" className="mb-4" />
//             <Input {...register("phone", { required: true })} placeholder="Phone" className="mb-4" />
//             <Input {...register("expertise", { required: true })} placeholder="Expertise" className="mb-4" />
//             <Select {...register("status", { required: true })} defaultValue="Pending">
//               <SelectTrigger>
//                 <SelectValue placeholder="Select Status" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="Pending">Pending</SelectItem>
//                 <SelectItem value="Approved">Approved</SelectItem>
//                 <SelectItem value="Rejected">Rejected</SelectItem>
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

//====================================================
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import axiosInstance from "@/api/client";

interface AstrologerRequest {
  _id: string;
  name: string;
  email: string;
  phone: string;
  expertise: string;
  status: "Pending" | "Approved" | "Rejected";
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  expertise: string;
  status: "Pending" | "Approved" | "Rejected";
}

const AstrologerRequestManagement: React.FC = () => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "update">("create");
  const [selectedRequest, setSelectedRequest] = useState<AstrologerRequest | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const { register, handleSubmit, reset } = useForm<FormData>();

  const { data: requestsResponse, isLoading, error } = useQuery({
    queryKey: ["astrologer-requests", page, limit],
    queryFn: async () => {
      const response = await axiosInstance.get("/astrologer-requests", {
        params: { page, limit },
      });
      return response;
    },
  });

  const createRequestMutation = useMutation({
    mutationFn: (newRequest: FormData) => axiosInstance.post("/astrologer-requests", newRequest),
    onSuccess: () => {
      queryClient.invalidateQueries(["astrologer-requests"]);
      closeDialog();
    },
  });

  const updateRequestMutation = useMutation({
    mutationFn: ({ id, updatedRequest }: { id: string; updatedRequest: FormData }) =>
      axiosInstance.put(`/astrologer-requests/${id}`, updatedRequest),
    onSuccess: () => {
      queryClient.invalidateQueries(["astrologer-requests"]);
      closeDialog();
    },
  });

  const deleteRequestMutation = useMutation({
    mutationFn: (id: string) => axiosInstance.delete(`/astrologer-requests/${id}`),
    onSuccess: () => queryClient.invalidateQueries(["astrologer-requests"]),
  });

  const openDialog = (mode: "create" | "update", request: AstrologerRequest | null = null) => {
    setDialogMode(mode);
    setSelectedRequest(request);
    setIsDialogOpen(true);

    if (mode === "update" && request) {
      reset(request);
    } else {
      reset({ name: "", email: "", phone: "", expertise: "", status: "Pending" });
    }
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedRequest(null);
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (dialogMode === "create") {
      createRequestMutation.mutate(data);
    } else if (dialogMode === "update" && selectedRequest) {
      updateRequestMutation.mutate({ id: selectedRequest._id, updatedRequest: data });
    }
  };

  const handleDelete = (id: string) => {
    deleteRequestMutation.mutate(id);
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
    setPage(1); // Reset to the first page when changing the limit
  };

  if (isLoading) return <div>Loading requests...</div>;
  if (error) return <div>Error fetching requests</div>;

  const requests = requestsResponse.data;
  const meta = requestsResponse.meta;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Astrologer Requests</h1>
        <Button onClick={() => openDialog("create")}>New Request</Button>
      </div>

      <div className="mb-4">
        <label htmlFor="limit" className="mr-2">Records per page:</label>
        <Select id="limit" value={limit.toString()} onChange={handleLimitChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select Limit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Expertise</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request._id}>
              <TableCell>{request.name}</TableCell>
              <TableCell>{request.email}</TableCell>
              <TableCell>{request.phone}</TableCell>
              <TableCell>{request.expertise}</TableCell>
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

      {/* Pagination */}
      
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
              />
            </PaginationItem>
            {[...Array(meta.totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <Button
                  variant={page === index + 1 ? "outline" : "solid"}
                  onClick={() => setPage(index + 1)}
                >
                  {index + 1}
                </Button>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => setPage((prev) => Math.min(prev + 1, meta.totalPages))}
                disabled={page === meta.totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
    

      {/* Dialog for create/update */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogMode === "create" ? "Create New Request" : "Update Request"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input {...register("name", { required: true })} placeholder="Name" className="mb-4" />
            <Input {...register("email", { required: true })} placeholder="Email" className="mb-4" />
            <Input {...register("phone", { required: true })} placeholder="Phone" className="mb-4" />
            <Input {...register("expertise", { required: true })} placeholder="Expertise" className="mb-4" />
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
