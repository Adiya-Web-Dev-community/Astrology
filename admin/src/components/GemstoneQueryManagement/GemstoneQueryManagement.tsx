
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
//     data: queriesResponse, 
//     isLoading, 
//     error 
//   } = useQuery({
//     queryKey: ["gemstone-queries"],
//     queryFn: async () => {
//       const response = await axiosInstance.get("/astro-services/get-all-queries");
//       return response;
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
//         queryType: query.queryType,
//         message: query.message,
//         status: query.status
//       });
//     } else {
//       reset({
//         queryType: "purchase",
//         message: "",
//         status: "pending"
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

//   // Extract the actual queries from the response
//   const queries = queriesResponse?.data || [];

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Gemstone Queries</h1>
//         <Button onClick={() => openDialog("create")}>New Query</Button>
//       </div>

//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>User</TableHead>
//             <TableHead>Gemstone</TableHead>
//             <TableHead>Query Type</TableHead>
//             <TableHead>Message</TableHead>
//             <TableHead>Status</TableHead>
//             <TableHead>Actions</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {queries.map((query) => (
//             <TableRow key={query._id}>
//               <TableCell>
//                 {query.userId?.firstName} {query.userId?.lastName}
//                 <div className="text-xs text-gray-500">
//                   {query.userId?.email}
//                 </div>
//               </TableCell>
//               <TableCell>
//                 {query.gemstoneId ? (
//                   <>
//                     {query.gemstoneId.name}
//                     <div className="text-xs text-gray-500">
//                       ${query.gemstoneId.price}
//                     </div>
//                   </>
//                 ) : (
//                   "No Gemstone"
//                 )}
//               </TableCell>
//               <TableCell>{query.queryType}</TableCell>
//               <TableCell>{query.message}</TableCell>
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
//             <Select 
//               {...register("queryType", { required: true })}
//               defaultValue="purchase"
//             >
//               <SelectTrigger className="mb-4">
//                 <SelectValue placeholder="Select Query Type" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="purchase">Purchase</SelectItem>
//                 <SelectItem value="information">Information</SelectItem>
//                 <SelectItem value="consultation">Consultation</SelectItem>
//               </SelectContent>
//             </Select>

//             <Textarea 
//               {...register("message", { required: true })} 
//               placeholder="Enter your query message" 
//               className="mb-4"
//             />

//             <Select 
//               {...register("status", { required: true })}
//               defaultValue="pending"
//             >
//               <SelectTrigger>
//                 <SelectValue placeholder="Select Status" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="pending">Pending</SelectItem>
//                 <SelectItem value="in-progress">In Progress</SelectItem>
//                 <SelectItem value="resolved">Resolved</SelectItem>
//                 <SelectItem value="closed">Closed</SelectItem>
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
//===================================================
import React, { useState } from "react";
import { useForm, Control } from "react-hook-form";
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
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axiosInstance from "@/api/client";

// Define types
interface User {
  firstName: string;
  lastName: string;
  email: string;
}

interface Gemstone {
  name: string;
  price: number;
}

interface GemstoneQuery {
  _id: string;
  userId: User;
  gemstoneId: Gemstone | null;
  queryType: string;
  message: string;
  status: string;
}

interface FormData {
  queryType: string;
  message: string;
  status: string;
}

const GemstoneQueryManagement: React.FC = () => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [dialogMode, setDialogMode] = useState<"create" | "update">("create");
  const [selectedQuery, setSelectedQuery] = useState<GemstoneQuery | null>(null);
  const { register, handleSubmit, reset, control } = useForm<FormData>();

  // Fetch all gemstone queries
  const {
    data: queriesResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["gemstone-queries"],
    queryFn: async () => {
      const response = await axiosInstance.get("/astro-services/get-all-queries");
      return response;
    },
  });

  // Create query mutation
  const createQueryMutation = useMutation({
    mutationFn: (newQuery: FormData) =>
      axiosInstance.post("/astro-services/gemstone-query", newQuery),
    onSuccess: () => {
      queryClient.invalidateQueries(["gemstone-queries"]);
      setIsDialogOpen(false);
    },
  });

  // Update query mutation
  const updateQueryMutation = useMutation({
    mutationFn: ({ id, updatedQuery }: { id: string; updatedQuery: FormData }) =>
      axiosInstance.patch(`/astro-services/query/${id}`, updatedQuery),
    onSuccess: () => {
      queryClient.invalidateQueries(["gemstone-queries"]);
      setIsDialogOpen(false);
    },
  });

  // Delete query mutation
  const deleteQueryMutation = useMutation({
    mutationFn: (id: string) => axiosInstance.delete(`/astro-services/query/${id}`),
    onSuccess: () => queryClient.invalidateQueries(["gemstone-queries"]),
  });

  // Dialog handlers
  const openDialog = (mode: "create" | "update", query: GemstoneQuery | null = null) => {
    setDialogMode(mode);
    setSelectedQuery(query);
    setIsDialogOpen(true);

    if (mode === "update" && query) {
      reset({
        queryType: query.queryType,
        message: query.message,
        status: query.status,
      });
    } else {
      reset({
        queryType: "purchase",
        message: "",
        status: "pending",
      });
    }
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedQuery(null);
  };

  const onSubmit = async (data: FormData) => {
    if (dialogMode === "create") {
      createQueryMutation.mutate(data);
    } else if (dialogMode === "update" && selectedQuery) {
      updateQueryMutation.mutate({
        id: selectedQuery._id,
        updatedQuery: data,
      });
    }
  };

  const handleDelete = (id: string) => {
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
          {queries.map((query: GemstoneQuery) => (
            <TableRow key={query._id}>
              <TableCell>
                {query.userId?.firstName} {query.userId?.lastName}
                <div className="text-xs text-gray-500">{query.userId?.email}</div>
              </TableCell>
              <TableCell>
                {query.gemstoneId ? (
                  <>
                    {query.gemstoneId.name}
                    <div className="text-xs text-gray-500">${query.gemstoneId.price}</div>
                  </>
                ) : (
                  "No Gemstone"
                )}
              </TableCell>
              <TableCell>{query.queryType}</TableCell>
              <TableCell>{query.message}</TableCell>
              <TableCell>{query.status}</TableCell>
              <TableCell>
                <Button variant="ghost" onClick={() => openDialog("update", query)}>
                  Edit
                </Button>
                <Button variant="ghost" onClick={() => handleDelete(query._id)}>
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
            <Select {...register("queryType", { required: true })} defaultValue="purchase">
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

            <Select {...register("status", { required: true })} defaultValue="pending">
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