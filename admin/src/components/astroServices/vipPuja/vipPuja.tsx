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
// import PoojaForm from "./vipPoojaForm";

// const fetchGroupPujas = async (page = 1, limit = 10) => {
//   const response = await axiosInstance.get(`/astro-services/vip-pujas`, {
//     params: { page, limit },
//   });
//   return response;
// };

// const fetchAstrologers = async () => {
//   const response = await axiosInstance.get("/astrologers");
//   return response.data;
// };

// const createGroupPuja = async (newPuja) => {
//   const response = await axiosInstance.post("/astro-services/pujas", newPuja);
//   return response.data;
// };

// const updateGroupPuja = async (updatedPuja) => {
//   const response = await axiosInstance.put(
//     `/astro-services/pujas/${updatedPuja._id}`,
//     updatedPuja
//   );
//   return response.data;
// };

// const deleteGroupPuja = async (id) => {
//   const response = await axiosInstance.delete(`/astro-services/pujas/${id}`);
//   return response.data;
// };

// const GroupPujaManagement = () => {
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [selectedPuja, setSelectedPuja] = useState(null);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);

//   // Pagination state
//   const [page, setPage] = useState(1);
//   const [limit] = useState(10); // Fixed limit for now
//   const [totalPages, setTotalPages] = useState(1);

//   const queryClient = useQueryClient();

//   const {
//     data: pujasData,
//     isLoading,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ["groupPujas", page],
//     queryFn: () => fetchGroupPujas(page, limit),
//     onSuccess: (data) => setTotalPages(data.totalPages), // Update total pages
//   });

//   const { data: astrologers = [] } = useQuery({
//     queryKey: ["astrologers"],
//     queryFn: fetchAstrologers,
//   });

//   const createPujaMutation = useMutation({
//     mutationFn: createGroupPuja,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["groupPujas"] });
//       setIsDialogOpen(false);
//       Toast({
//         title: "Success",
//         description: "Group Puja created successfully",
//       });
//     },
//     onError: (error) => {
//       Toast({
//         title: "Error",
//         description: error.message,
//         variant: "destructive",
//       });
//     },
//   });

//   const updatePujaMutation = useMutation({
//     mutationFn: updateGroupPuja,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["groupPujas"] });
//       setIsDialogOpen(false);
//       Toast({
//         title: "Success",
//         description: "Group Puja updated successfully",
//       });
//     },
//     onError: (error) => {
//       Toast({
//         title: "Error",
//         description: error.message,
//         variant: "destructive",
//       });
//     },
//   });

//   const deletePujaMutation = useMutation({
//     mutationFn: deleteGroupPuja,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["groupPujas"] });
//       Toast({
//         title: "Success",
//         description: "Group Puja deleted successfully",
//       });
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
//       date: new Date(data.date).toISOString(),
//       price: parseFloat(data.price),
//       maxParticipants: parseInt(data.maxParticipants),
//       bookedParticipants: parseInt(data.bookedParticipants),
//     };

//     if (isEditMode) {
//       updatePujaMutation.mutate({ ...formattedData, _id: selectedPuja._id });
//     } else {
//       createPujaMutation.mutate(formattedData);
//     }
//   };

//   const handleEdit = (puja) => {
//     setIsEditMode(true);
//     setSelectedPuja(puja);
//     setIsDialogOpen(true);
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this puja?")) {
//       deletePujaMutation.mutate(id);
//     }
//   };

//   const handleDialogOpen = () => {
//     setIsEditMode(false);
//     setSelectedPuja(null);
//     setIsDialogOpen(true);
//   };

//   const handlePageChange = (newPage) => {
//     setPage(newPage);
//   };

//   if (isLoading)
//     return (
//       <div className="flex justify-center">
//         <Loader2 className="animate-spin" />
//       </div>
//     );
//   if (isError) return <div>Error loading pujas: {error.message}</div>;

//   const { pujas, totalPujas } = pujasData || { pujas: [], totalPujas: 0 };
//   console.log("qweq", pujasData);

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
//           <h1 className="text-2xl font-bold mb-4">Group Puja Management</h1>

//           <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//             <DialogTrigger asChild>
//               <Button onClick={handleDialogOpen}>Add New Puja</Button>
//             </DialogTrigger>
//             <DialogContent className="max-w-md">
//               <DialogHeader>
//                 <DialogTitle>
//                   {isEditMode ? "Edit Puja" : "Add New Puja"}
//                 </DialogTitle>
//               </DialogHeader>
//               <PoojaForm
//                 onSubmit={onSubmit}
//                 isEditMode={isEditMode}
//                 initialData={selectedPuja}
//                 astrologers={astrologers}
//                 isPending={
//                   createPujaMutation.isPending || updatePujaMutation.isPending
//                 }
//               />
//             </DialogContent>
//           </Dialog>

//           <Table className="mt-4">
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Puja Name</TableHead>
//                 <TableHead>Date</TableHead>
//                 <TableHead>Location</TableHead>
//                 <TableHead>Price</TableHead>
//                 <TableHead>Max Participants</TableHead>
//                 <TableHead>Booked Participants</TableHead>
//                 <TableHead>Image</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {pujas.map((puja) => (
//                 <TableRow key={puja._id}>
//                   <TableCell>{puja.pujaName}</TableCell>
//                   <TableCell>
//                     {new Date(puja.date).toLocaleDateString()}
//                   </TableCell>
//                   <TableCell>{puja.location}</TableCell>
//                   <TableCell>${puja.price}</TableCell>
//                   <TableCell>{puja.maxParticipants}</TableCell>
//                   <TableCell>{puja.bookedParticipants}</TableCell>
//                   <TableCell>
//                     {puja.image && (
//                       <img
//                         src={puja.image}
//                         alt={puja.pujaName}
//                         className="w-12 h-12 object-cover"
//                       />
//                     )}
//                   </TableCell>
//                   <TableCell>
//                     <Button onClick={() => handleEdit(puja)} className="mr-2">
//                       Edit
//                     </Button>
//                     <Button
//                       onClick={() => handleDelete(puja._id)}
//                       variant="destructive"
//                       disabled={deletePujaMutation.isPending}
//                     >
//                       {deletePujaMutation.isPending && (
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
//                   <PaginationPrevious
//                     onClick={() => handlePageChange(page - 1)}
//                     disabled={page === 1}
//                   />
//                 </PaginationItem>
//                 {[...Array(totalPages)].map((_, idx) => (
//                   <PaginationItem key={idx}>
//                     <PaginationLink
//                       href="#"
//                       isActive={idx + 1 === page}
//                       onClick={() => handlePageChange(idx + 1)}
//                     >
//                       {idx + 1}
//                     </PaginationLink>
//                   </PaginationItem>
//                 ))}
//                 <PaginationItem>
//                   <PaginationNext
//                     onClick={() => handlePageChange(page + 1)}
//                     disabled={page === totalPages}
//                   />
//                 </PaginationItem>
//               </PaginationContent>
//             </Pagination>
//           </div>
//         </div>
//       </Layout.Body>
//     </Layout>
//   );
// };

// export default GroupPujaManagement;
//==================================================
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
} from "@/components/ui/pagination";
import { Toast } from "@/components/ui/toast";
import { Loader2 } from "lucide-react";
import axiosInstance from "@/api/client";
import { Layout } from "@/components/custom/layout";
import { Search } from "@/components/search";
import ThemeSwitch from "@/components/theme-switch";
import { UserNav } from "@/components/user-nav";
import VipPoojaForm from "./vipPoojaForm";

const fetchVipPujas = async (page = 1, limit = 10) => {
  const response = await axiosInstance.get(`/astro-services/vip-pujas`, {
    params: { page, limit },
  });
  return response;
};

const createVipPuja = async (newPuja) => {
  const response = await axiosInstance.post(
    "/astro-services/vip-pujas",
    newPuja
  );
  return response.data;
};

const updateVipPuja = async (updatedPuja) => {
  const response = await axiosInstance.put(
    `/astro-services/vip-pujas/${updatedPuja._id}`,
    updatedPuja
  );
  return response.data;
};

const deleteVipPuja = async (id) => {
  const response = await axiosInstance.delete(
    `/astro-services/vip-pujas/${id}`
  );
  return response;
};

const VipPujaManagement = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedPuja, setSelectedPuja] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Pagination state
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // Fixed limit for now
  const [totalPages, setTotalPages] = useState(1);

  const queryClient = useQueryClient();

  const {
    data: pujasData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["vipPujas", page],
    queryFn: () => fetchVipPujas(page, limit),
    onSuccess: (data) => setTotalPages(data.totalPages), // Update total pages
  });

  const createPujaMutation = useMutation({
    mutationFn: createVipPuja,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vipPujas"] });
      setIsDialogOpen(false);
      Toast({
        title: "Success",
        description: "VIP Puja created successfully",
      });
    },
    onError: (error) => {
      Toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updatePujaMutation = useMutation({
    mutationFn: updateVipPuja,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vipPujas"] });
      setIsDialogOpen(false);
      Toast({
        title: "Success",
        description: "VIP Puja updated successfully",
      });
    },
    onError: (error) => {
      Toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deletePujaMutation = useMutation({
    mutationFn: deleteVipPuja,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vipPujas"] });
      Toast({
        title: "Success",
        description: "VIP Puja deleted successfully",
      });
    },
    onError: (error) => {
      Toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data) => {
    const formattedData = {
      ...data,
      price: parseFloat(data.price),
    };

    if (isEditMode) {
      updatePujaMutation.mutate({ ...formattedData, _id: selectedPuja._id });
    } else {
      createPujaMutation.mutate(formattedData);
    }
  };

  const handleEdit = (puja) => {
    setIsEditMode(true);
    setSelectedPuja(puja);
    setIsDialogOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this puja?")) {
      deletePujaMutation.mutate(id);
    }
  };

  const handleDialogOpen = () => {
    setIsEditMode(false);
    setSelectedPuja(null);
    setIsDialogOpen(true);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  if (isLoading)
    return (
      <div className="flex justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  if (isError) return <div>Error loading pujas: {error.message}</div>;

  const { vipPujas } = pujasData || { vipPujas: [] };

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
          <h1 className="text-2xl font-bold mb-4">VIP Puja Management</h1>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleDialogOpen}>Add New Puja</Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>
                  {isEditMode ? "Edit Puja" : "Add New Puja"}
                </DialogTitle>
              </DialogHeader>
              <VipPoojaForm
                onSubmit={onSubmit}
                isEditMode={isEditMode}
                initialData={selectedPuja}
              />
            </DialogContent>
          </Dialog>

          <Table className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead>Puja Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>God/Goddess</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Puja Sold</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vipPujas.map((puja) => (
                <TableRow key={puja._id}>
                  <TableCell>{puja.name}</TableCell>
                  <TableCell>{puja.description}</TableCell>
                  <TableCell>{puja.pujaGodGoddess}</TableCell>
                  <TableCell>${puja.price}</TableCell>
                  <TableCell>{puja.pujaSold}</TableCell>
                  <TableCell>
                    {puja.image && (
                      <img
                        src={puja.image}
                        alt={puja.name}
                        className="w-12 h-12 object-cover"
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(puja)} className="mr-2">
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(puja._id)}
                      variant="destructive"
                      disabled={deletePujaMutation.isPending}
                    >
                      {deletePujaMutation.isPending && (
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
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                  />
                </PaginationItem>
                {[...Array(totalPages)].map((_, idx) => (
                  <PaginationItem key={idx}>
                    <PaginationLink
                      href="#"
                      isActive={idx + 1 === page}
                      onClick={() => handlePageChange(idx + 1)}
                    >
                      {idx + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
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

export default VipPujaManagement;
