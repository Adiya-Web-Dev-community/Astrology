
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { 
//   Table, 
//   TableBody, 
//   TableCell, 
//   TableHead, 
//   TableHeader, 
//   TableRow 
// } from "@/components/ui/table";
// import { 
//   Dialog, 
//   DialogContent, 
//   DialogHeader, 
//   DialogTitle, 
//   DialogFooter 
// } from "@/components/ui/dialog";
// import axiosInstance from "@/api/client";

// const BannerManagement = () => {
//   const queryClient = useQueryClient();
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const { register, handleSubmit, reset } = useForm();

//   // Fetch the current active banner
//   const { data: currentBanner, isLoading: loadingCurrent } = useQuery({
//     queryKey: ["active-banner"],
//     queryFn: async () => {
//       const response = await axiosInstance.get("/banners/current");
//       return response.data;
//     },
//   });

//   // Fetch all banners
//   const { data: bannersResponse, isLoading: loadingBanners } = useQuery({
//     queryKey: ["all-banners"],
//     queryFn: async () => {
//       const response = await axiosInstance.get("/banners/all");
//       return response.data;
//     },
//   });

//   // Set banner mutation (create or update)
//   const setBannerMutation = useMutation({
//     mutationFn: (newBanner) => axiosInstance.post("/banners/set", newBanner),
//     onSuccess: () => {
//       queryClient.invalidateQueries(["active-banner"]);
//       queryClient.invalidateQueries(["all-banners"]);
//       setIsDialogOpen(false);
//     },
//   });

//   // Dialog handlers
//   const openDialog = () => {
//     setIsDialogOpen(true);
//     reset({
//       imageUrl: currentBanner?.imageUrl || "",
//       title: currentBanner?.title || "",
//       description: currentBanner?.description || "",
//     });
//   };

//   const closeDialog = () => {
//     setIsDialogOpen(false);
//   };

//   const onSubmit = async (data) => {
//     setBannerMutation.mutate(data);
//   };

//   if (loadingCurrent || loadingBanners) return <div>Loading...</div>;

//   const allBanners = bannersResponse || [];
//   const excludedBanners = allBanners.filter(
//     (banner) => banner._id !== currentBanner?._id
//   );

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Banner Management</h1>
//         <Button onClick={openDialog}>
//           {currentBanner?.imageUrl ? "Edit Banner" : "Set Banner"}
//         </Button>
//       </div>

//       {/* Current Banner */}
//       <div className="border p-4 rounded-lg mb-4">
//         {currentBanner?.imageUrl ? (
//           <div className="text-center">
//             <img 
//               src={currentBanner.imageUrl} 
//               alt="Current Banner" 
//               className="mx-auto mb-4 w-full max-w-lg rounded-md"
//             />
//             <h2 className="text-lg font-semibold">{currentBanner.title}</h2>
//             <p className="text-gray-600">{currentBanner.description}</p>
//           </div>
//         ) : (
//           <p className="text-center text-gray-500">No banner is currently set.</p>
//         )}
//       </div>

//       {/* All Banners Table */}
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Image</TableHead>
//             <TableHead>Title</TableHead>
//             <TableHead>Description</TableHead>
//             <TableHead>Actions</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {excludedBanners.map((banner) => (
//             <TableRow key={banner._id}>
//               <TableCell>
//                 <img 
//                   src={banner.imageUrl} 
//                   alt={banner.title} 
//                   className="w-20 h-12 object-cover rounded-md"
//                 />
//               </TableCell>
//               <TableCell>{banner.title || "Untitled"}</TableCell>
//               <TableCell>{banner.description || "No description"}</TableCell>
//               <TableCell>
//                 <Button 
//                   variant="ghost" 
//                   onClick={() => {
//                     reset(banner);
//                     setIsDialogOpen(true);
//                   }}
//                 >
//                   Edit
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
//             <DialogTitle>{currentBanner?.imageUrl ? "Edit Banner" : "Set Banner"}</DialogTitle>
//           </DialogHeader>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <Input
//               {...register("imageUrl", { required: true })}
//               placeholder="Enter image URL"
//               className="mb-4"
//             />
//             <Input
//               {...register("title")}
//               placeholder="Enter banner title (optional)"
//               className="mb-4"
//             />
//             <Input
//               {...register("description")}
//               placeholder="Enter banner description (optional)"
//               className="mb-4"
//             />

//             <DialogFooter>
//               <Button type="submit">
//                 {currentBanner?.imageUrl ? "Update Banner" : "Set Banner"}
//               </Button>
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default BannerManagement;
//================================================
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { 
//   Table, 
//   TableBody, 
//   TableCell, 
//   TableHead, 
//   TableHeader, 
//   TableRow 
// } from "@/components/ui/table";
// import { 
//   Dialog, 
//   DialogContent, 
//   DialogHeader, 
//   DialogTitle, 
//   DialogFooter 
// } from "@/components/ui/dialog";
// import { toast } from "@/components/ui/use-toast";
// import uploadImage from "@/firebase/image";
// import axiosInstance from "@/api/client";

// const BannerManagement = () => {
//   const queryClient = useQueryClient();
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [imageFile, setImageFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const { register, handleSubmit, reset, setValue } = useForm();

//   // Fetch the current active banner
//   const { data: currentBanner, isLoading: loadingCurrent } = useQuery({
//     queryKey: ["active-banner"],
//     queryFn: async () => {
//       const response = await axiosInstance.get("/banners/current");
//       return response.data;
//     },
//   });

//   // Fetch all banners
//   const { data: bannersResponse, isLoading: loadingBanners } = useQuery({
//     queryKey: ["all-banners"],
//     queryFn: async () => {
//       const response = await axiosInstance.get("/banners/all");
//       return response.data;
//     },
//   });

//   // Set banner mutation (create or update)
//   const setBannerMutation = useMutation({
//     mutationFn: (newBanner) => axiosInstance.post("/banners/set", newBanner),
//     onSuccess: () => {
//       queryClient.invalidateQueries(["active-banner"]);
//       queryClient.invalidateQueries(["all-banners"]);
//       setIsDialogOpen(false);
//       setImageFile(null);
//       setImagePreview(null);
//       toast({
//         title: "Banner Updated",
//         description: "Banner has been successfully updated.",
//       });
//     },
//     onError: (error) => {
//       toast({
//         title: "Error",
//         description: "Failed to update banner.",
//         variant: "destructive",
//       });
//     }
//   });

//   // Handle image file selection
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Dialog handlers
//   const openDialog = (banner = null) => {
//     setIsDialogOpen(true);
//     setImagePreview(banner?.imageUrl || null);
//     reset({
//       imageUrl: banner?.imageUrl || "",
//       title: banner?.title || "",
//       description: banner?.description || "",
//     });
//   };

//   const closeDialog = () => {
//     setIsDialogOpen(false);
//     setImageFile(null);
//     setImagePreview(null);
//   };

//   const onSubmit = async (data) => {
//     try {
//       let imageUrl = data.imageUrl;

//       // Upload image if a file is selected
//       if (imageFile) {
//         const uploadedImageUrl = await uploadImage(imageFile, "banners");
//         imageUrl = uploadedImageUrl;
//       }

//       // Prepare banner data
//       const bannerData = {
//         ...data,
//         imageUrl
//       };

//       // Submit banner
//       setBannerMutation.mutate(bannerData);
//     } catch (error) {
//       toast({
//         title: "Upload Failed",
//         description: "Failed to upload banner image.",
//         variant: "destructive",
//       });
//     }
//   };

//   if (loadingCurrent || loadingBanners) return <div>Loading...</div>;

//   const allBanners = bannersResponse || [];
//   const excludedBanners = allBanners.filter(
//     (banner) => banner._id !== currentBanner?._id
//   );

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Banner Management</h1>
//         <Button onClick={() => openDialog(currentBanner)}>
//           {currentBanner?.imageUrl ? "Edit Banner" : "Set Banner"}
//         </Button>
//       </div>

//       {/* Current Banner */}
//       <div className="border p-4 rounded-lg mb-4">
//         {currentBanner?.imageUrl ? (
//           <div className="text-center">
//             <img 
//               src={currentBanner.imageUrl} 
//               alt="Current Banner" 
//               className="mx-auto mb-4 w-full max-w-lg rounded-md"
//             />
//             <h2 className="text-lg font-semibold">{currentBanner.title}</h2>
//             <p className="text-gray-600">{currentBanner.description}</p>
//           </div>
//         ) : (
//           <p className="text-center text-gray-500">No banner is currently set.</p>
//         )}
//       </div>

//       {/* All Banners Table */}
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Image</TableHead>
//             <TableHead>Title</TableHead>
//             <TableHead>Description</TableHead>
//             <TableHead>Actions</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {excludedBanners.map((banner) => (
//             <TableRow key={banner._id}>
//               <TableCell>
//                 <img 
//                   src={banner.imageUrl} 
//                   alt={banner.title} 
//                   className="w-20 h-12 object-cover rounded-md"
//                 />
//               </TableCell>
//               <TableCell>{banner.title || "Untitled"}</TableCell>
//               <TableCell>{banner.description || "No description"}</TableCell>
//               <TableCell>
//                 <Button 
//                   variant="ghost" 
//                   onClick={() => openDialog(banner)}
//                 >
//                   Edit
//                 </Button>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>

//       {/* Create/Update Dialog */}
//       <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>{currentBanner?.imageUrl ? "Edit Banner" : "Set Banner"}</DialogTitle>
//           </DialogHeader>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             {/* Image Upload */}
//             <div className="mb-4">
//               <Input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="mb-2"
//               />
//               {imagePreview && (
//                 <img 
//                   src={imagePreview} 
//                   alt="Banner Preview" 
//                   className="w-full h-40 object-cover rounded-md"
//                 />
//               )}
//             </div>

//             <Input
//               {...register("title")}
//               placeholder="Enter banner title (optional)"
//               className="mb-4"
//             />
//             <Input
//               {...register("description")}
//               placeholder="Enter banner description (optional)"
//               className="mb-4"
//             />

//             <DialogFooter>
//               <Button type="submit" disabled={setBannerMutation.isLoading}>
//                 {setBannerMutation.isLoading ? "Uploading..." : (currentBanner?.imageUrl ? "Update Banner" : "Set Banner")}
//               </Button>
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default BannerManagement;
//==================================================
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { 
//   Table, 
//   TableBody, 
//   TableCell, 
//   TableHead, 
//   TableHeader, 
//   TableRow 
// } from "@/components/ui/table";
// import { 
//   Dialog, 
//   DialogContent, 
//   DialogHeader, 
//   DialogTitle, 
//   DialogFooter,
//   DialogTrigger,
//   DialogClose
// } from "@/components/ui/dialog";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger
// } from "@/components/ui/alert-dialog";
// import { toast } from "@/components/ui/use-toast";
// import uploadImage from "@/firebase/image";
// import axiosInstance from "@/api/client";

// const BannerManagement = () => {
//   const queryClient = useQueryClient();
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [imageFile, setImageFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [bannerToDelete, setBannerToDelete] = useState(null);
//   const { register, handleSubmit, reset, setValue } = useForm();

//   // Fetch the current active banner
//   const { data: currentBanner, isLoading: loadingCurrent } = useQuery({
//     queryKey: ["active-banner"],
//     queryFn: async () => {
//       const response = await axiosInstance.get("/banners/current");
//       return response.data;
//     },
//   });

//   // Fetch all banners
//   const { data: bannersResponse, isLoading: loadingBanners } = useQuery({
//     queryKey: ["all-banners"],
//     queryFn: async () => {
//       const response = await axiosInstance.get("/banners/all");
//       return response.data;
//     },
//   });

//   // Set banner mutation (create or update)
//   const setBannerMutation = useMutation({
//     mutationFn: (newBanner) => axiosInstance.post("/banners/set", newBanner),
//     onSuccess: () => {
//       queryClient.invalidateQueries(["active-banner"]);
//       queryClient.invalidateQueries(["all-banners"]);
//       setIsDialogOpen(false);
//       setImageFile(null);
//       setImagePreview(null);
//       toast({
//         title: "Banner Updated",
//         description: "Banner has been successfully updated.",
//       });
//     },
//     onError: (error) => {
//       toast({
//         title: "Error",
//         description: "Failed to update banner.",
//         variant: "destructive",
//       });
//     }
//   });

//   // Delete banner mutation
//   const deleteBannerMutation = useMutation({
//     mutationFn: (bannerId) => axiosInstance.delete(`/banners/${bannerId}`),
//     onSuccess: () => {
//       queryClient.invalidateQueries(["active-banner"]);
//       queryClient.invalidateQueries(["all-banners"]);
//       setBannerToDelete(null);
//       toast({
//         title: "Banner Deleted",
//         description: "Banner has been successfully deleted.",
//       });
//     },
//     onError: (error) => {
//       toast({
//         title: "Delete Failed",
//         description: "Failed to delete banner.",
//         variant: "destructive",
//       });
//     }
//   });

//   // Handle image file selection
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Dialog handlers
//   const openDialog = (banner = null) => {
//     setIsDialogOpen(true);
//     setImagePreview(banner?.imageUrl || null);
//     reset({
//       imageUrl: banner?.imageUrl || "",
//       title: banner?.title || "",
//       description: banner?.description || "",
//     });
//   };

//   const closeDialog = () => {
//     setIsDialogOpen(false);
//     setImageFile(null);
//     setImagePreview(null);
//   };

//   const onSubmit = async (data) => {
//     try {
//       let imageUrl = data.imageUrl;

//       // Upload image if a file is selected
//       if (imageFile) {
//         const uploadedImageUrl = await uploadImage(imageFile, "banners");
//         imageUrl = uploadedImageUrl;
//       }

//       // Prepare banner data
//       const bannerData = {
//         ...data,
//         imageUrl
//       };

//       // Submit banner
//       setBannerMutation.mutate(bannerData);
//     } catch (error) {
//       toast({
//         title: "Upload Failed",
//         description: "Failed to upload banner image.",
//         variant: "destructive",
//       });
//     }
//   };

//   // Handle banner deletion
//   const handleDeleteBanner = () => {
//     if (bannerToDelete) {
//       deleteBannerMutation.mutate(bannerToDelete._id);
//     }
//   };

//   if (loadingCurrent || loadingBanners) return <div>Loading...</div>;

//   const allBanners = bannersResponse || [];
//   const excludedBanners = allBanners.filter(
//     (banner) => banner._id !== currentBanner?._id
//   );

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Banner Management</h1>
//         <Button onClick={() => openDialog(currentBanner)}>
//           {currentBanner?.imageUrl ? "Edit Banner" : "Set Banner"}
//         </Button>
//       </div>

//       {/* Current Banner */}
//       <div className="border p-4 rounded-lg mb-4">
//         {currentBanner?.imageUrl ? (
//           <div className="text-center">
//             <img 
//               src={currentBanner.imageUrl} 
//               alt="Current Banner" 
//               className="mx-auto mb-4 w-full max-w-lg rounded-md"
//             />
//             <h2 className="text-lg font-semibold">{currentBanner.title}</h2>
//             <p className="text-gray-600">{currentBanner.description}</p>
//           </div>
//         ) : (
//           <p className="text-center text-gray-500">No banner is currently set.</p>
//         )}
//       </div>

//       {/* All Banners Table */}
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Image</TableHead>
//             <TableHead>Title</TableHead>
//             <TableHead>Description</TableHead>
//             <TableHead>Actions</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {excludedBanners.map((banner) => (
//             <TableRow key={banner._id}>
//               <TableCell>
//                 <img 
//                   src={banner.imageUrl} 
//                   alt={banner.title} 
//                   className="w-20 h-12 object-cover rounded-md"
//                 />
//               </TableCell>
//               <TableCell>{banner.title || "Untitled"}</TableCell>
//               <TableCell>{banner.description || "No description"}</TableCell>
//               <TableCell className="flex gap-2">
//                 <Button 
//                   variant="ghost" 
//                   onClick={() => openDialog(banner)}
//                 >
//                   Edit
//                 </Button>
//                 <AlertDialog>
//                   <AlertDialogTrigger asChild>
//                     <Button 
//                       variant="destructive" 
//                       size="sm" 
//                       onClick={() => setBannerToDelete(banner)}
//                     >
//                       Delete
//                     </Button>
//                   </AlertDialogTrigger>
//                   <AlertDialogContent>
//                     <AlertDialogHeader>
//                       <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
//                       <AlertDialogDescription>
//                         This will permanently delete the banner. This action cannot be undone.
//                       </AlertDialogDescription>
//                     </AlertDialogHeader>
//                     <AlertDialogFooter>
//                       <AlertDialogCancel>Cancel</AlertDialogCancel>
//                       <AlertDialogAction 
//                         onClick={handleDeleteBanner}
//                         disabled={deleteBannerMutation.isLoading}
//                       >
//                         {deleteBannerMutation.isLoading ? "Deleting..." : "Delete"}
//                       </AlertDialogAction>
//                     </AlertDialogFooter>
//                   </AlertDialogContent>
//                 </AlertDialog>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>

//       {/* Create/Update Dialog */}
//       <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>{currentBanner?.imageUrl ? "Edit Banner" : "Set Banner"}</DialogTitle>
//           </DialogHeader>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             {/* Image Upload */}
//             <div className="mb-4">
//               <Input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="mb-2"
//               />
//               {imagePreview && (
//                 <img 
//                   src={imagePreview} 
//                   alt="Banner Preview" 
//                   className="w-full h-40 object-cover rounded-md"
//                 />
//               )}
//             </div>

//             <Input
//               {...register("title")}
//               placeholder="Enter banner title (optional)"
//               className="mb-4"
//             />
//             <Input
//               {...register("description")}
//               placeholder="Enter banner description (optional)"
//               className="mb-4"
//             />

//             <DialogFooter>
//               <Button type="submit" disabled={setBannerMutation.isLoading}>
//                 {setBannerMutation.isLoading ? "Uploading..." : (currentBanner?.imageUrl ? "Update Banner" : "Set Banner")}
//               </Button>
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default BannerManagement;
//=============================================
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";
import uploadImage from "@/firebase/image";
import axiosInstance from "@/api/client";

const BannerManagement = () => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [bannerToDelete, setBannerToDelete] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  // Fetch current active banner
  const { data: currentBanner, isLoading: loadingCurrent } = useQuery({
    queryKey: ["active-banner"],
    queryFn: async () => {
      const response = await axiosInstance.get("/banners/current");
      return response.data;
    },
  });

  // Fetch all banners
  const { data: bannersResponse, isLoading: loadingBanners } = useQuery({
    queryKey: ["all-banners"],
    queryFn: async () => {
      const response = await axiosInstance.get("/banners/all");
      return response.data;
    },
  });

  // Set banner mutation (create/update)
  const setBannerMutation = useMutation({
    mutationFn: (newBanner) => axiosInstance.post("/banners/set", newBanner),
    onSuccess: () => {
      queryClient.invalidateQueries(["active-banner"]);
      queryClient.invalidateQueries(["all-banners"]);
      closeDialog();
      toast({
        title: "Success",
        description: "Banner has been updated.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update banner.",
        variant: "destructive",
      });
    },
  });

  // Delete banner mutation
  const deleteBannerMutation = useMutation({
    mutationFn: (bannerId) => axiosInstance.delete(`/banners/${bannerId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["all-banners"]);
      setBannerToDelete(null);
      toast({
        title: "Success",
        description: "Banner has been deleted.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete banner.",
        variant: "destructive",
      });
    },
  });

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Dialog handlers
  const openDialog = (banner = null) => {
    setIsDialogOpen(true);
    setImagePreview(banner?.imageUrl || null);
    reset({
      title: banner?.title || "",
      description: banner?.description || "",
      imageUrl: banner?.imageUrl || "",
    });
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setImageFile(null);
    setImagePreview(null);
  };

  const onSubmit = async (data) => {
    try {
      let imageUrl = data.imageUrl;

      // Upload new image if selected
      if (imageFile) {
        imageUrl = await uploadImage("banners", imageFile, null);
      }

      // Submit the banner data
      setBannerMutation.mutate({ ...data, imageUrl });
    } catch {
      toast({
        title: "Error",
        description: "Failed to upload banner.",
        variant: "destructive",
      });
    }
  };

  if (loadingCurrent || loadingBanners) return <div>Loading...</div>;

  const allBanners = bannersResponse || [];
  const excludedBanners = allBanners.filter(
    (banner) => banner._id !== currentBanner?._id
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Banner Management</h1>

      {/* Current Banner */}
      <div className="border p-4 mb-4">
        {currentBanner?.imageUrl ? (
          <div>
            <img
              src={currentBanner.imageUrl}
              alt="Current Banner"
              className="w-full max-w-md mx-auto rounded"
            />
            <h2 className="text-xl mt-2">{currentBanner.title}</h2>
            <p className="text-gray-600">{currentBanner.description}</p>
          </div>
        ) : (
          <p>No current banner set.</p>
        )}
        <Button onClick={() => openDialog(currentBanner)} className="mt-4">
          {currentBanner?.imageUrl ? "Edit Banner" : "Set Banner"}
        </Button>
      </div>

      {/* All Banners Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {excludedBanners.map((banner) => (
            <TableRow key={banner._id}>
              <TableCell>
                <img
                  src={banner.imageUrl}
                  alt={banner.title}
                  className="w-20 h-12 object-cover rounded"
                />
              </TableCell>
              <TableCell>{banner.title || "Untitled"}</TableCell>
              <TableCell>{banner.description || "No description"}</TableCell>
              <TableCell>
                <Button variant="ghost" onClick={() => openDialog(banner)}>
                  Edit
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      onClick={() => setBannerToDelete(banner)}
                    >
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() =>
                          deleteBannerMutation.mutate(banner._id)
                        }
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Create/Update Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {imagePreview ? "Edit Banner" : "Set Banner"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mb-4"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full max-h-40 mb-4 rounded"
              />
            )}
            <Input
              {...register("title")}
              placeholder="Banner title"
              className="mb-4"
            />
            <Input
              {...register("description")}
              placeholder="Banner description"
              className="mb-4"
            />
            <DialogFooter>
              <Button type="submit">
                {imagePreview ? "Update Banner" : "Set Banner"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BannerManagement;
