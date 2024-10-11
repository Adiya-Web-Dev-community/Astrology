// import React, { useState } from "react";
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
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Form } from "@/components/ui/form";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationPrevious,
//   PaginationNext,
//   PaginationEllipsis,
// } from "@/components/ui/pagination";
// import { useForm } from "react-hook-form";
// import { Toast } from "@/components/ui/toast";
// import { Loader2 } from "lucide-react";
// import axiosInstance from "@/api/client";
// import { Layout } from "@/components/custom/layout";
// import { Search } from "@/components/search";
// import ThemeSwitch from "@/components/theme-switch";
// import { UserNav } from "@/components/user-nav";
// import GemstoneForm from "./gemStoneForm";

// const fetchGemstones = async () => {
//   const response = await axiosInstance.get("/astro-services/gemstones");
//   return response;
// };

// const createGemstone = async (newGemstone) => {
//   const response = await axiosInstance.post(
//     "/astro-services/gemstones",
//     newGemstone
//   );
//   return response.data;
// };

// const updateGemstone = async (updatedGemstone) => {
//   const response = await axiosInstance.put(
//     `/astro-services/gemstones/${updatedGemstone._id}`,
//     updatedGemstone
//   );
//   return response.data;
// };

// const deleteGemstone = async (id) => {
//   const response = await axiosInstance.delete(
//     `/astro-services/gemstones/${id}`
//   );
//   return response.data;
// };

// const GemstoneProductsManagement = () => {
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [selectedGemstone, setSelectedGemstone] = useState(null);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const queryClient = useQueryClient();

//   const form = useForm();

//   const {
//     data: gemstones,
//     isLoading,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ["gemstones"],
//     queryFn: fetchGemstones,
//   });

//   const createGemstoneMutation = useMutation({
//     mutationFn: createGemstone,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["gemstones"] });
//       setIsDialogOpen(false);
//       Toast({ title: "Success", description: "Gemstone created successfully" });
//     },
//     onError: (error) => {
//       Toast({
//         title: "Error",
//         description: error.message,
//         variant: "destructive",
//       });
//     },
//   });

//   const updateGemstoneMutation = useMutation({
//     mutationFn: updateGemstone,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["gemstones"] });
//       setIsDialogOpen(false);
//       Toast({ title: "Success", description: "Gemstone updated successfully" });
//     },
//     onError: (error) => {
//       Toast({
//         title: "Error",
//         description: error.message,
//         variant: "destructive",
//       });
//     },
//   });

//   const deleteGemstoneMutation = useMutation({
//     mutationFn: deleteGemstone,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["gemstones"] });
//       Toast({ title: "Success", description: "Gemstone deleted successfully" });
//     },
//     onError: (error) => {
//       Toast({
//         title: "Error",
//         description: error.message,
//         variant: "destructive",
//       });
//     },
//   });

//   const onSubmit = (data) => {
//     const formattedData = {
//       ...data,
//       price: parseFloat(data.price),
//       carat: parseFloat(data.carat),
//       images: data.images.split(",").map((url) => url.trim()),
//       availability: Boolean(data.availability),
//     };

//     if (isEditMode) {
//       updateGemstoneMutation.mutate({
//         ...formattedData,
//         _id: selectedGemstone._id,
//       });
//     } else {
//       createGemstoneMutation.mutate(formattedData);
//     }
//   };

//   const handleEdit = (gemstone) => {
//     setIsEditMode(true);
//     setSelectedGemstone(gemstone);
//     form.reset({
//       ...gemstone,
//       images: gemstone.images.join(", "),
//     });
//     setIsDialogOpen(true);
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this gemstone?")) {
//       deleteGemstoneMutation.mutate(id);
//     }
//   };

//   const handleDialogOpen = () => {
//     setIsEditMode(false);
//     setSelectedGemstone(null);
//     form.reset({
//       name: "",
//       description: "",
//       price: "",
//       carat: "",
//       zodiacSign: "",
//       images: "",
//       availability: true,
//     });
//     setIsDialogOpen(true);
//   };

//   const handleSubmit = (data) => {
//     if (isEditMode) {
//       updateGemstoneMutation.mutate({ ...data, _id: selectedGemstone._id });
//     } else {
//       createGemstoneMutation.mutate(data);
//     }
//   };

//   if (isLoading)
//     return (
//       <div className="flex justify-center">
//         <Loader2 className="animate-spin" />
//       </div>
//     );
//   if (isError) return <div>Error loading gemstones: {error.message}</div>;

//   return (
//     <Layout>
//       <Layout.Header className="border border-b">
//         <div className="ml-auto flex items-center space-x-4">
//           <Search />
//           <ThemeSwitch />
//           <UserNav />
//         </div>
//       </Layout.Header>
//       <Layout.Body>
//         <div className="container mx-auto p-4">
//           <h1 className="text-2xl font-bold mb-4">
//             Gemstone Products Management
//           </h1>

//           <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//             <DialogTrigger asChild>
//               <Button onClick={handleDialogOpen}>Add New Gemstone</Button>
//             </DialogTrigger>
//             <DialogContent className="max-w-md">
//               <DialogHeader>
//                 <DialogTitle>
//                   {isEditMode ? "Edit Gemstone" : "Add New Gemstone"}
//                 </DialogTitle>
//               </DialogHeader>
//               <Form {...form}>
//                 <GemstoneForm
//                   onSubmit={handleSubmit}
//                   initialData={selectedGemstone}
//                   isLoading={
//                     createGemstoneMutation.isPending ||
//                     updateGemstoneMutation.isPending
//                   }
//                   isEditMode={isEditMode}
//                 />
//               </Form>
//             </DialogContent>
//           </Dialog>

//           <Table className="mt-4">
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Name</TableHead>
//                 <TableHead>Zodiac Sign</TableHead>
//                 <TableHead>Price</TableHead>
//                 <TableHead>Carat</TableHead>
//                 <TableHead>Availability</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {gemstones.map((gemstone) => (
//                 <TableRow key={gemstone._id}>
//                   <TableCell>{gemstone.name}</TableCell>
//                   <TableCell>{gemstone.zodiacSign}</TableCell>
//                   <TableCell>${gemstone.price}</TableCell>
//                   <TableCell>{gemstone.carat}</TableCell>
//                   <TableCell>
//                     {gemstone.availability ? "Available" : "Not Available"}
//                   </TableCell>
//                   <TableCell>
//                     <Button
//                       onClick={() => handleEdit(gemstone)}
//                       className="mr-2"
//                     >
//                       Edit
//                     </Button>
//                     <Button
//                       onClick={() => handleDelete(gemstone._id)}
//                       variant="destructive"
//                       disabled={deleteGemstoneMutation.isPending}
//                     >
//                       {deleteGemstoneMutation.isPending && (
//                         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                       )}
//                       Delete
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//           <div className="mt-4 flex justify-center">
//             <Pagination>
//               <PaginationContent>
//                 <PaginationItem>
//                   <PaginationPrevious href="#" />
//                 </PaginationItem>
//                 <PaginationItem>
//                   <PaginationLink href="#">1</PaginationLink>
//                 </PaginationItem>
//                 <PaginationItem>
//                   <PaginationLink href="#" isActive>
//                     2
//                   </PaginationLink>
//                 </PaginationItem>
//                 <PaginationItem>
//                   <PaginationLink href="#">3</PaginationLink>
//                 </PaginationItem>
//                 <PaginationItem>
//                   <PaginationEllipsis />
//                 </PaginationItem>
//                 <PaginationItem>
//                   <PaginationNext href="#" />
//                 </PaginationItem>
//               </PaginationContent>
//             </Pagination>
//           </div>
//         </div>
//       </Layout.Body>
//     </Layout>
//   );
// };

// export default GemstoneProductsManagement;
//=================================================
// import React, { useState } from "react";
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
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationPrevious,
//   PaginationNext,
//   PaginationEllipsis,
// } from "@/components/ui/pagination";
// import { Toast } from "@/components/ui/toast";
// import { Loader2 } from "lucide-react";
// import axiosInstance from "@/api/client";
// import { Layout } from "@/components/custom/layout";
// import { Search } from "@/components/search";
// import ThemeSwitch from "@/components/theme-switch";
// import { UserNav } from "@/components/user-nav";
// import GemstoneForm from "./gemStoneForm";

// const fetchGemstones = async () => {
//   const response = await axiosInstance.get("/astro-services/gemstones");
//   return response;
// };

// const createGemstone = async (newGemstone) => {
//   const response = await axiosInstance.post(
//     "/astro-services/gemstones",
//     newGemstone
//   );
//   return response.data;
// };

// const updateGemstone = async (updatedGemstone) => {
//   const response = await axiosInstance.put(
//     `/astro-services/gemstones/${updatedGemstone._id}`,
//     updatedGemstone
//   );
//   return response.data;
// };

// const deleteGemstone = async (id) => {
//   const response = await axiosInstance.delete(
//     `/astro-services/gemstones/${id}`
//   );
//   return response.data;
// };

// const GemstoneProductsManagement = () => {
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [selectedGemstone, setSelectedGemstone] = useState(null);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const queryClient = useQueryClient();

//   const {
//     data: gemstones,
//     isLoading,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ["gemstones"],
//     queryFn: fetchGemstones,
//   });

//   const createGemstoneMutation = useMutation({
//     mutationFn: createGemstone,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["gemstones"] });
//       setIsDialogOpen(false);
//       Toast({ title: "Success", description: "Gemstone created successfully" });
//     },
//     onError: (error) => {
//       Toast({
//         title: "Error",
//         description: error.message,
//         variant: "destructive",
//       });
//     },
//   });

//   const updateGemstoneMutation = useMutation({
//     mutationFn: updateGemstone,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["gemstones"] });
//       setIsDialogOpen(false);
//       Toast({ title: "Success", description: "Gemstone updated successfully" });
//     },
//     onError: (error) => {
//       Toast({
//         title: "Error",
//         description: error.message,
//         variant: "destructive",
//       });
//     },
//   });

//   const deleteGemstoneMutation = useMutation({
//     mutationFn: deleteGemstone,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["gemstones"] });
//       Toast({ title: "Success", description: "Gemstone deleted successfully" });
//     },
//     onError: (error) => {
//       Toast({
//         title: "Error",
//         description: error.message,
//         variant: "destructive",
//       });
//     },
//   });

//   const handleSubmit = (data) => {
//     if (isEditMode) {
//       updateGemstoneMutation.mutate({ ...data, _id: selectedGemstone._id });
//     } else {
//       createGemstoneMutation.mutate(data);
//     }
//   };

//   const handleEdit = (gemstone) => {
//     setIsEditMode(true);
//     setSelectedGemstone(gemstone);
//     setIsDialogOpen(true);
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this gemstone?")) {
//       deleteGemstoneMutation.mutate(id);
//     }
//   };

//   const handleDialogOpen = () => {
//     setIsEditMode(false);
//     setSelectedGemstone(null);
//     setIsDialogOpen(true);
//   };

//   if (isLoading)
//     return (
//       <div className="flex justify-center">
//         <Loader2 className="animate-spin" />
//       </div>
//     );
//   if (isError) return <div>Error loading gemstones: {error.message}</div>;

//   return (
//     <Layout>
//       <Layout.Header className="border border-b">
//         <div className="ml-auto flex items-center space-x-4">
//           <Search />
//           <ThemeSwitch />
//           <UserNav />
//         </div>
//       </Layout.Header>
//       <Layout.Body>
//         <div className="container mx-auto p-4">
//           <h1 className="text-2xl font-bold mb-4">
//             Gemstone Products Management
//           </h1>

//           <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//             <DialogTrigger asChild>
//               <Button onClick={handleDialogOpen}>Add New Gemstone</Button>
//             </DialogTrigger>
//             <DialogContent className="max-w-md">
//               <DialogHeader>
//                 <DialogTitle>
//                   {isEditMode ? "Edit Gemstone" : "Add New Gemstone"}
//                 </DialogTitle>
//               </DialogHeader>
//               <GemstoneForm
//                 onSubmit={handleSubmit}
//                 initialData={selectedGemstone}
//                 isLoading={
//                   createGemstoneMutation.isPending ||
//                   updateGemstoneMutation.isPending
//                 }
//                 isEditMode={isEditMode}
//               />
//             </DialogContent>
//           </Dialog>

//           <Table className="mt-4">
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Name</TableHead>
//                 <TableHead>Zodiac Sign</TableHead>
//                 <TableHead>Price</TableHead>
//                 <TableHead>Carat</TableHead>
//                 <TableHead>Availability</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {gemstones.map((gemstone) => (
//                 <TableRow key={gemstone._id}>
//                   <TableCell>{gemstone.name}</TableCell>
//                   <TableCell>{gemstone.zodiacSign}</TableCell>
//                   <TableCell>${gemstone.price}</TableCell>
//                   <TableCell>{gemstone.carat}</TableCell>
//                   <TableCell>
//                     {gemstone.availability ? "Available" : "Not Available"}
//                   </TableCell>
//                   <TableCell>
//                     <Button
//                       onClick={() => handleEdit(gemstone)}
//                       className="mr-2"
//                     >
//                       Edit
//                     </Button>
//                     <Button
//                       onClick={() => handleDelete(gemstone._id)}
//                       variant="destructive"
//                       disabled={deleteGemstoneMutation.isPending}
//                     >
//                       {deleteGemstoneMutation.isPending && (
//                         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                       )}
//                       Delete
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//           <div className="mt-4 flex justify-center">
//             <Pagination>
//               <PaginationContent>
//                 <PaginationItem>
//                   <PaginationPrevious href="#" />
//                 </PaginationItem>
//                 <PaginationItem>
//                   <PaginationLink href="#">1</PaginationLink>
//                 </PaginationItem>
//                 <PaginationItem>
//                   <PaginationLink href="#" isActive>
//                     2
//                   </PaginationLink>
//                 </PaginationItem>
//                 <PaginationItem>
//                   <PaginationLink href="#">3</PaginationLink>
//                 </PaginationItem>
//                 <PaginationItem>
//                   <PaginationEllipsis />
//                 </PaginationItem>
//                 <PaginationItem>
//                   <PaginationNext href="#" />
//                 </PaginationItem>
//               </PaginationContent>
//             </Pagination>
//           </div>
//         </div>
//       </Layout.Body>
//     </Layout>
//   );
// };

// export default GemstoneProductsManagement;
//========================================================
import React, { useState } from "react";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { Toast } from "@/components/ui/toast";
import { Eye, Loader2 } from "lucide-react";
import axiosInstance from "@/api/client";
import { Layout } from "@/components/custom/layout";
import { Search } from "@/components/search";
import ThemeSwitch from "@/components/theme-switch";
import { UserNav } from "@/components/user-nav";
import GemstoneForm from "./gemStoneForm";

const fetchGemstones = async (page = 1, limit = 10) => {
  const response = await axiosInstance.get(
    `/astro-services/gemstones?page=${page}&limit=${limit}`
  );
  console.log(response);

  return response;
};

const createGemstone = async (newGemstone) => {
  const response = await axiosInstance.post(
    "/astro-services/gemstones",
    newGemstone
  );
  return response.data;
};

const updateGemstone = async (updatedGemstone) => {
  const response = await axiosInstance.put(
    `/astro-services/gemstones/${updatedGemstone._id}`,
    updatedGemstone
  );
  return response.data;
};

const deleteGemstone = async (id) => {
  const response = await axiosInstance.delete(
    `/astro-services/gemstones/${id}`
  );
  return response.data;
};

const GemstoneProductsManagement = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedGemstone, setSelectedGemstone] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewingGemstone, setViewingGemstone] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["gemstones", currentPage],
    queryFn: () => fetchGemstones(currentPage),
    keepPreviousData: true, // This keeps old data while new data is loading
  });

  const createGemstoneMutation = useMutation({
    mutationFn: createGemstone,
    onSuccess: () => {
      queryClient.invalidateQueries(["gemstones"]);
      setIsDialogOpen(false);
      Toast({ title: "Success", description: "Gemstone created successfully" });
    },
    onError: (error) => {
      Toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateGemstoneMutation = useMutation({
    mutationFn: updateGemstone,
    onSuccess: () => {
      queryClient.invalidateQueries(["gemstones"]);
      setIsDialogOpen(false);
      Toast({ title: "Success", description: "Gemstone updated successfully" });
    },
    onError: (error) => {
      Toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteGemstoneMutation = useMutation({
    mutationFn: deleteGemstone,
    onSuccess: () => {
      queryClient.invalidateQueries(["gemstones"]);
      Toast({ title: "Success", description: "Gemstone deleted successfully" });
    },
    onError: (error) => {
      Toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (data) => {
    if (isEditMode) {
      updateGemstoneMutation.mutate({ ...data, _id: selectedGemstone._id });
    } else {
      createGemstoneMutation.mutate(data);
    }
  };

  const handleEdit = (gemstone) => {
    setIsEditMode(true);
    setSelectedGemstone(gemstone);
    setIsDialogOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this gemstone?")) {
      deleteGemstoneMutation.mutate(id);
    }
  };

  const handleDialogOpen = () => {
    setIsEditMode(false);
    setSelectedGemstone(null);
    setIsDialogOpen(true);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (isLoading)
    return (
      <div className="flex justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  if (isError) return <div>Error loading gemstones: {error.message}</div>;

  return (
    <Layout>
      <Layout.Header className="border border-b">
        <div className="ml-auto flex items-center space-x-4">
          <Search />
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>
      <Layout.Body>
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">
            Gemstone Products Management
          </h1>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleDialogOpen}>Add New Gemstone</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {isEditMode ? "Edit Gemstone" : "Add New Gemstone"}
                </DialogTitle>
              </DialogHeader>
              <GemstoneForm
                onSubmit={handleSubmit}
                initialData={selectedGemstone}
                isLoading={
                  createGemstoneMutation.isPending ||
                  updateGemstoneMutation.isPending
                }
                isEditMode={isEditMode}
              />
            </DialogContent>
          </Dialog>
          <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
            <DialogContent className="max-w-lg bg-white p-6 rounded-lg shadow-lg">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-center mb-4">
                  Gemstone Details
                </DialogTitle>
              </DialogHeader>
              {viewingGemstone && (
                <div className="space-y-4">
                  {/* Image */}
                  <div className="flex justify-center">
                    {viewingGemstone.images &&
                      viewingGemstone.images.length > 0 && (
                        <img
                          src={viewingGemstone.images[0]}
                          alt={viewingGemstone.name}
                          className="w-28 h-28 object-cover rounded-full shadow-lg border-2 border-gray-200"
                        />
                      )}
                  </div>

                  {/* Title */}
                  <h2 className="text-center text-lg font-semibold text-gray-800">
                    {viewingGemstone.name}
                  </h2>

                  {/* Description Table */}
                  <table className="w-full text-left table-auto border-collapse">
                    <tbody className="text-sm">
                      {/* Description */}
                      <tr className="border-b border-gray-200">
                        <td className="py-2 font-medium text-gray-600">
                          Description:
                        </td>
                        <td className="py-2 text-gray-800">
                          {viewingGemstone.description}
                        </td>
                      </tr>

                      {/* Zodiac Sign */}
                      <tr className="border-b border-gray-200">
                        <td className="py-2 font-medium text-gray-600">
                          Zodiac Sign:
                        </td>
                        <td className="py-2 text-gray-800">
                          {viewingGemstone.additionalInfo.zodiacSign}
                        </td>
                      </tr>

                      {/* Price */}
                      <tr className="border-b border-gray-200">
                        <td className="py-2 font-medium text-gray-600">
                          Price:
                        </td>
                        <td className="py-2 text-gray-800">
                          Rs {viewingGemstone.price}
                        </td>
                      </tr>

                      {/* Carat */}
                      <tr className="border-b border-gray-200">
                        <td className="py-2 font-medium text-gray-600">
                          Carat:
                        </td>
                        <td className="py-2 text-gray-800">
                          {viewingGemstone.additionalInfo.carat}
                        </td>
                      </tr>

                      {/* Weight in Ratti */}
                      <tr className="border-b border-gray-200">
                        <td className="py-2 font-medium text-gray-600">
                          Weight in Ratti:
                        </td>
                        <td className="py-2 text-gray-800">
                          {viewingGemstone.additionalInfo.weightInRatti}
                        </td>
                      </tr>

                      {/* Weight in Grams */}
                      <tr className="border-b border-gray-200">
                        <td className="py-2 font-medium text-gray-600">
                          Weight in Grams:
                        </td>
                        <td className="py-2 text-gray-800">
                          {viewingGemstone.additionalInfo.weightInGrams} g
                        </td>
                      </tr>

                      {/* Colour */}
                      <tr className="border-b border-gray-200">
                        <td className="py-2 font-medium text-gray-600">
                          Colour:
                        </td>
                        <td className="py-2 text-gray-800">
                          {viewingGemstone.additionalInfo.colour}
                        </td>
                      </tr>

                      {/* Origin */}
                      <tr className="border-b border-gray-200">
                        <td className="py-2 font-medium text-gray-600">
                          Origin:
                        </td>
                        <td className="py-2 text-gray-800">
                          {viewingGemstone.additionalInfo.origin}
                        </td>
                      </tr>

                      {/* Quality */}
                      <tr className="border-b border-gray-200">
                        <td className="py-2 font-medium text-gray-600">
                          Quality:
                        </td>
                        <td className="py-2 text-gray-800">
                          {viewingGemstone.additionalInfo.quality}
                        </td>
                      </tr>

                      {/* Shape */}
                      <tr className="border-b border-gray-200">
                        <td className="py-2 font-medium text-gray-600">
                          Shape:
                        </td>
                        <td className="py-2 text-gray-800">
                          {viewingGemstone.additionalInfo.shape}
                        </td>
                      </tr>

                      {/* Mantra */}
                      <tr className="border-b border-gray-200">
                        <td className="py-2 font-medium text-gray-600">
                          Mantra:
                        </td>
                        <td className="py-2 text-gray-800">
                          {viewingGemstone.additionalInfo.mantra}
                        </td>
                      </tr>

                      {/* Size */}
                      <tr className="border-b border-gray-200">
                        <td className="py-2 font-medium text-gray-600">
                          Size:
                        </td>
                        <td className="py-2 text-gray-800">
                          {viewingGemstone.additionalInfo.size}
                        </td>
                      </tr>

                      {/* Certification */}
                      <tr className="border-b border-gray-200">
                        <td className="py-2 font-medium text-gray-600">
                          Certification:
                        </td>
                        <td className="py-2 text-gray-800">
                          {viewingGemstone.additionalInfo.certification}
                        </td>
                      </tr>

                      {/* Treatment */}
                      <tr className="border-b border-gray-200">
                        <td className="py-2 font-medium text-gray-600">
                          Treatment:
                        </td>
                        <td className="py-2 text-gray-800">
                          {viewingGemstone.additionalInfo.treatment}
                        </td>
                      </tr>

                      {/* Availability */}
                      <tr className="border-b border-gray-200">
                        <td className="py-2 font-medium text-gray-600">
                          Availability:
                        </td>
                        <td className="py-2 text-gray-800">
                          {viewingGemstone.availability
                            ? "Available"
                            : "Not Available"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </DialogContent>
          </Dialog>

          <Table className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                {/* <TableHead>Zodiac Sign</TableHead> */}
                <TableHead>Price</TableHead>
                <TableHead>Carat</TableHead>
                <TableHead>Availability</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.gemstones.map((gemstone) => (
                <TableRow key={gemstone._id}>
                  <TableCell>
                    {gemstone.images && gemstone.images.length > 0 && (
                      <img
                        src={gemstone.images[0]}
                        alt={gemstone.name}
                        className="w-12 h-12 object-cover"
                      />
                    )}
                  </TableCell>

                  <TableCell>{gemstone.name}</TableCell>
                  <TableCell>{gemstone.description}</TableCell>
                  {/* <TableCell>{gemstone.zodiacSign}</TableCell> */}
                  <TableCell>Rs {gemstone.price}</TableCell>
                  <TableCell>{gemstone.additionalInfo.carat}</TableCell>
                  <TableCell>
                    {gemstone.availability ? "Available" : "Not Available"}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setViewingGemstone(gemstone);
                        setIsViewDialogOpen(true);
                      }}
                      className="mr-2"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => handleEdit(gemstone)}
                      className="mr-2"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(gemstone._id)}
                      variant="destructive"
                      disabled={deleteGemstoneMutation.isPending}
                    >
                      {deleteGemstoneMutation.isPending && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-4 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  />
                </PaginationItem>
                {[...Array(data.totalPages).keys()].map((num) => (
                  <PaginationItem key={num + 1}>
                    <PaginationLink
                      href="#"
                      onClick={() => handlePageChange(num + 1)}
                      isActive={currentPage === num + 1}
                    >
                      {num + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === data.totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </Layout.Body>
    </Layout>
  );
};

export default GemstoneProductsManagement;
