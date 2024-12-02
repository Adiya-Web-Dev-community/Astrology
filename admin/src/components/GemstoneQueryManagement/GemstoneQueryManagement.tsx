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
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
// import { Input, Textarea } from "@/components/ui/input";
// import axiosInstance from "@/api/client";

// const GemstoneQueryManagement = () => {
//   const queryClient = useQueryClient();
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [dialogMode, setDialogMode] = useState("create");
//   const [selectedQuery, setSelectedQuery] = useState(null);
//   const { register, handleSubmit, reset } = useForm();

//   // Fetch all gemstone queries
//   const { data: queries, isLoading, error } = useQuery({
//     queryKey: ["gemstone-queries"],
//     queryFn: async () => {
//       const response = await axiosInstance.get("/astro-services/get-all-queries");
//       return response.data;
//     },
//   });

//   // Create query mutation
//   const createQueryMutation = useMutation({
//     mutationFn: (newQuery) =>
//       axiosInstance.post("/astro-services/gemstone-query", newQuery),
//     onSuccess: () => {
//       queryClient.invalidateQueries(["gemstone-queries"]);
//       setIsDialogOpen(false);
//     },
//   });

//   // Update query mutation
//   const updateQueryMutation = useMutation({
//     mutationFn: ({ id, updatedQuery }) =>
//       axiosInstance.patch(`/astro-services/query/${id}`, updatedQuery),
//     onSuccess: () => {
//       queryClient.invalidateQueries(["gemstone-queries"]);
//       setIsDialogOpen(false);
//     },
//   });

//   // Delete query mutation
//   const deleteQueryMutation = useMutation({
//     mutationFn: (id) => axiosInstance.delete(`/astro-services/query/${id}`),
//     onSuccess: () => queryClient.invalidateQueries(["gemstone-queries"]),
//   });

//   // Dialog handlers
//   const openDialog = (mode, query = null) => {
//     setDialogMode(mode);
//     setSelectedQuery(query);
//     setIsDialogOpen(true);
//     if (mode === "update" && query) {
//       reset({ question: query.question, response: query.response });
//     } else {
//       reset({ question: "", response: "" });
//     }
//   };

//   const closeDialog = () => {
//     setIsDialogOpen(false);
//     setSelectedQuery(null);
//   };

//   const onSubmit = (data) => {
//     if (dialogMode === "create") {
//       createQueryMutation.mutate(data);
//     } else if (dialogMode === "update" && selectedQuery) {
//       updateQueryMutation.mutate({ id: selectedQuery._id, updatedQuery: data });
//     }
//   };

//   const handleDelete = (id) => {
//     deleteQueryMutation.mutate(id);
//   };

//   if (isLoading) return <div>Loading queries...</div>;
//   if (error) return <div>Error fetching gemstone queries</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Gemstone Query Management</h1>
//         <Button onClick={() => openDialog("create")}>Add Query</Button>
//       </div>

//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>User</TableHead>
//             <TableHead>Question</TableHead>
//             <TableHead>Response</TableHead>
//             <TableHead>Status</TableHead>
//             <TableHead>Actions</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {queries.map((query) => (
//             <TableRow key={query._id}>
//               <TableCell>{query.user?.name || "Unknown"}</TableCell>
//               <TableCell>{query.question}</TableCell>
//               <TableCell>{query.response || "Pending"}</TableCell>
//               <TableCell>{query.status || "Pending"}</TableCell>
//               <TableCell>
//                 <Button variant="ghost" onClick={() => openDialog("update", query)}>
//                   Edit
//                 </Button>
//                 <Button variant="ghost" onClick={() => handleDelete(query._id)}>
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
//               {dialogMode === "create" ? "Add Gemstone Query" : "Edit Gemstone Query"}
//             </DialogTitle>
//           </DialogHeader>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <Textarea
//               {...register("question", { required: true })}
//               placeholder="Enter your question"
//               className="mb-4"
//             />
//             <Textarea
//               {...register("response")}
//               placeholder="Enter response (optional)"
//               className="mb-4"
//             />
//             <DialogFooter>
//               <Button type="submit">{dialogMode === "create" ? "Create" : "Update"}</Button>
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default GemstoneQueryManagement;
//============================================
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
// import { 
//   Select, 
//   SelectContent, 
//   SelectItem, 
//   SelectTrigger, 
//   SelectValue 
// } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import axiosInstance from "@/api/client";

// const GemstoneQueryManagement = () => {
//   const queryClient = useQueryClient();
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [dialogMode, setDialogMode] = useState("create");
//   const [selectedQuery, setSelectedQuery] = useState(null);
//   const { register, handleSubmit, reset, control } = useForm();

//   // Fetch all gemstone queries
//   const { 
//     data: queries, 
//     isLoading, 
//     error 
//   } = useQuery({
//     queryKey: ["gemstone-queries"],
//     queryFn: async () => {
//       const response = await axiosInstance.get("/astro-services/get-all-queries");
//       return response.data;
//     },
//   });

//   // Create query mutation
//   const createQueryMutation = useMutation({
//     mutationFn: (newQuery) => axiosInstance.post("/astro-services/gemstone-query", newQuery),
//     onSuccess: () => {
//       queryClient.invalidateQueries(["gemstone-queries"]);
//       setIsDialogOpen(false);
//     },
//   });

//   // Update query mutation
//   const updateQueryMutation = useMutation({
//     mutationFn: ({ id, updatedQuery }) =>
//       axiosInstance.patch(`/astro-services/query/${id}`, updatedQuery),
//     onSuccess: () => {
//       queryClient.invalidateQueries(["gemstone-queries"]);
//       setIsDialogOpen(false);
//     },
//   });

//   // Delete query mutation
//   const deleteQueryMutation = useMutation({
//     mutationFn: (id) => axiosInstance.delete(`/astro-services/query/${id}`),
//     onSuccess: () => queryClient.invalidateQueries(["gemstone-queries"]),
//   });

//   // Dialog handlers
//   const openDialog = (mode, query = null) => {
//     setDialogMode(mode);
//     setSelectedQuery(query);
//     setIsDialogOpen(true);

//     if (mode === "update" && query) {
//       reset({
//         gemstoneType: query.gemstoneType,
//         queryDescription: query.queryDescription,
//         status: query.status
//       });
//     } else {
//       reset({
//         gemstoneType: "",
//         queryDescription: "",
//         status: "PENDING"
//       });
//     }
//   };

//   const closeDialog = () => {
//     setIsDialogOpen(false);
//     setSelectedQuery(null);
//   };

//   const onSubmit = async (data) => {
//     if (dialogMode === "create") {
//       createQueryMutation.mutate(data);
//     } else if (dialogMode === "update" && selectedQuery) {
//       updateQueryMutation.mutate({ 
//         id: selectedQuery._id, 
//         updatedQuery: data 
//       });
//     }
//   };

//   const handleDelete = (id) => {
//     deleteQueryMutation.mutate(id);
//   };

//   if (isLoading) return <div>Loading queries...</div>;
//   if (error) return <div>Error loading queries</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Gemstone Queries</h1>
//         <Button onClick={() => openDialog("create")}>New Query</Button>
//       </div>

//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Gemstone Type</TableHead>
//             <TableHead>Query Description</TableHead>
//             <TableHead>Status</TableHead>
//             <TableHead>Actions</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {queries.map((query) => (
//             <TableRow key={query._id}>
//               <TableCell>{query.gemstoneType}</TableCell>
//               <TableCell>{query.queryDescription}</TableCell>
//               <TableCell>{query.status}</TableCell>
//               <TableCell>
//                 <Button 
//                   variant="ghost" 
//                   onClick={() => openDialog("update", query)}
//                 >
//                   Edit
//                 </Button>
//                 <Button 
//                   variant="ghost" 
//                   onClick={() => handleDelete(query._id)}
//                 >
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
//               {dialogMode === "create" ? "Create New Query" : "Edit Query"}
//             </DialogTitle>
//           </DialogHeader>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <Input 
//               {...register("gemstoneType", { required: true })} 
//               placeholder="Gemstone Type" 
//               className="mb-4" 
//             />
//             <Textarea 
//               {...register("queryDescription", { required: true })} 
//               placeholder="Describe your query" 
//               className="mb-4"
//             />
//             <Select 
//               {...register("status", { required: true })}
//               defaultValue="PENDING"
//             >
//               <SelectTrigger>
//                 <SelectValue placeholder="Select Status" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="PENDING">Pending</SelectItem>
//                 <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
//                 <SelectItem value="RESOLVED">Resolved</SelectItem>
//                 <SelectItem value="CLOSED">Closed</SelectItem>
//               </SelectContent>
//             </Select>
//             <DialogFooter className="mt-4">
//               <Button type="submit">
//                 {dialogMode === "create" ? "Create Query" : "Update Query"}
//               </Button>
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default GemstoneQueryManagement;
// ============================================
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
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axiosInstance from "@/api/client";

const GemstoneQueryManagement = () => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState("create");
  const [selectedQuery, setSelectedQuery] = useState(null);
  const { register, handleSubmit, reset, control } = useForm();

  // Fetch all gemstone queries
  const { 
    data: queriesResponse, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ["gemstone-queries"],
    queryFn: async () => {
      const response = await axiosInstance.get("/astro-services/get-all-queries");
      return response;
    },
  });

  // Create query mutation
  const createQueryMutation = useMutation({
    mutationFn: (newQuery) => axiosInstance.post("/astro-services/gemstone-query", newQuery),
    onSuccess: () => {
      queryClient.invalidateQueries(["gemstone-queries"]);
      setIsDialogOpen(false);
    },
  });

  // Update query mutation
  const updateQueryMutation = useMutation({
    mutationFn: ({ id, updatedQuery }) =>
      axiosInstance.patch(`/astro-services/query/${id}`, updatedQuery),
    onSuccess: () => {
      queryClient.invalidateQueries(["gemstone-queries"]);
      setIsDialogOpen(false);
    },
  });

  // Delete query mutation
  const deleteQueryMutation = useMutation({
    mutationFn: (id) => axiosInstance.delete(`/astro-services/query/${id}`),
    onSuccess: () => queryClient.invalidateQueries(["gemstone-queries"]),
  });

  // Dialog handlers
  const openDialog = (mode, query = null) => {
    setDialogMode(mode);
    setSelectedQuery(query);
    setIsDialogOpen(true);

    if (mode === "update" && query) {
      reset({
        queryType: query.queryType,
        message: query.message,
        status: query.status
      });
    } else {
      reset({
        queryType: "purchase",
        message: "",
        status: "pending"
      });
    }
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedQuery(null);
  };

  const onSubmit = async (data) => {
    if (dialogMode === "create") {
      createQueryMutation.mutate(data);
    } else if (dialogMode === "update" && selectedQuery) {
      updateQueryMutation.mutate({ 
        id: selectedQuery._id, 
        updatedQuery: data 
      });
    }
  };

  const handleDelete = (id) => {
    deleteQueryMutation.mutate(id);
  };

  if (isLoading) return <div>Loading queries...</div>;
  if (error) return <div>Error loading queries</div>;

  // Extract the actual queries from the response
  const queries = queriesResponse?.data || [];

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gemstone Queries</h1>
        <Button onClick={() => openDialog("create")}>New Query</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Gemstone</TableHead>
            <TableHead>Query Type</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {queries.map((query) => (
            <TableRow key={query._id}>
              <TableCell>
                {query.userId?.firstName} {query.userId?.lastName}
                <div className="text-xs text-gray-500">
                  {query.userId?.email}
                </div>
              </TableCell>
              <TableCell>
                {query.gemstoneId ? (
                  <>
                    {query.gemstoneId.name}
                    <div className="text-xs text-gray-500">
                      ${query.gemstoneId.price}
                    </div>
                  </>
                ) : (
                  "No Gemstone"
                )}
              </TableCell>
              <TableCell>{query.queryType}</TableCell>
              <TableCell>{query.message}</TableCell>
              <TableCell>{query.status}</TableCell>
              <TableCell>
                <Button 
                  variant="ghost" 
                  onClick={() => openDialog("update", query)}
                >
                  Edit
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => handleDelete(query._id)}
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
              {dialogMode === "create" ? "Create New Query" : "Edit Query"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Select 
              {...register("queryType", { required: true })}
              defaultValue="purchase"
            >
              <SelectTrigger className="mb-4">
                <SelectValue placeholder="Select Query Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="purchase">Purchase</SelectItem>
                <SelectItem value="information">Information</SelectItem>
                <SelectItem value="consultation">Consultation</SelectItem>
              </SelectContent>
            </Select>

            <Textarea 
              {...register("message", { required: true })} 
              placeholder="Enter your query message" 
              className="mb-4"
            />

            <Select 
              {...register("status", { required: true })}
              defaultValue="pending"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>

            <DialogFooter className="mt-4">
              <Button type="submit">
                {dialogMode === "create" ? "Create Query" : "Update Query"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GemstoneQueryManagement;