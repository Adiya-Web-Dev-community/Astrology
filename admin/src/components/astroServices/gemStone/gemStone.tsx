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
import { Loader2 } from "lucide-react";
import axiosInstance from "@/api/client";
import { Layout } from "@/components/custom/layout";
import { Search } from "@/components/search";
import ThemeSwitch from "@/components/theme-switch";
import { UserNav } from "@/components/user-nav";
import GemstoneForm from "./GemstoneForm";

const fetchGemstones = async () => {
  const response = await axiosInstance.get("/astro-services/gemstones");
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
  const queryClient = useQueryClient();

  const {
    data: gemstones,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["gemstones"],
    queryFn: fetchGemstones,
  });

  const createGemstoneMutation = useMutation({
    mutationFn: createGemstone,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gemstones"] });
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
      queryClient.invalidateQueries({ queryKey: ["gemstones"] });
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
      queryClient.invalidateQueries({ queryKey: ["gemstones"] });
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

          <Table className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Zodiac Sign</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Carat</TableHead>
                <TableHead>Availability</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gemstones.map((gemstone) => (
                <TableRow key={gemstone._id}>
                  <TableCell>{gemstone.name}</TableCell>
                  <TableCell>{gemstone.zodiacSign}</TableCell>
                  <TableCell>${gemstone.price}</TableCell>
                  <TableCell>{gemstone.carat}</TableCell>
                  <TableCell>
                    {gemstone.availability ? "Available" : "Not Available"}
                  </TableCell>
                  <TableCell>
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
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
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
