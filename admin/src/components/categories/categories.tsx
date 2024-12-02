// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Pencil, Trash2 } from "lucide-react";
// import { Layout } from "../custom/layout";
// import { Search } from "../search";
// import ThemeSwitch from "../theme-switch";
// import { UserNav } from "../user-nav";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { useDispatch, useSelector } from "react-redux";
// import axiosInstance from "@/api/client";
// import { setCategories } from "@/store/features/category/categorySlice";

// const CategoryManagement = () => {
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [dialogMode, setDialogMode] = useState("create");
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//   const { register, handleSubmit, reset } = useForm();
//   const dispatch = useDispatch();
//   const categories = useSelector((state) => state.categories);
//   const queryClient = useQueryClient();

//   // Fetch categories using react-query
//   const { isLoading, error } = useQuery({
//     queryKey: ["categories"],
//     queryFn: async () => {
//       const response = await axiosInstance.get("/categories");
//       dispatch(setCategories(response)); // Save categories in Redux store
//       return response;
//     },
//   });

//   // Mutations for creating/updating/deleting categories
//   const createCategoryMutation = useMutation({
//     mutationFn: (newCategory) => axiosInstance.post("/categories", newCategory),
//     onSuccess: () => queryClient.invalidateQueries(["categories"]),
//   });

//   const updateCategoryMutation = useMutation({
//     mutationFn: ({ id, updatedCategory }) =>
//       axiosInstance.put(`/categories/${id}`, updatedCategory),
//     onSuccess: () => queryClient.invalidateQueries(["categories"]),
//   });

//   const deleteCategoryMutation = useMutation({
//     mutationFn: (id) => axiosInstance.delete(`/categories/${id}`),
//     onSuccess: () => queryClient.invalidateQueries(["categories"]),
//   });

//   const openDialog = (mode, category = null) => {
//     setDialogMode(mode);
//     setSelectedCategory(category);
//     setIsDialogOpen(true);
//     if (mode === "update" && category) {
//       reset({ name: category.name });
//     } else {
//       reset({ name: "" });
//     }
//   };

//   const closeDialog = () => {
//     setIsDialogOpen(false);
//     setSelectedCategory(null);
//   };

//   const openDeleteDialog = (category) => {
//     setSelectedCategory(category);
//     setIsDeleteDialogOpen(true);
//   };

//   const closeDeleteDialog = () => {
//     setIsDeleteDialogOpen(false);
//     setSelectedCategory(null);
//   };

//   const onSubmit = (data) => {
//     if (dialogMode === "create") {
//       createCategoryMutation.mutate(data);
//     } else if (dialogMode === "update" && selectedCategory) {
//       updateCategoryMutation.mutate({
//         id: selectedCategory._id,
//         updatedCategory: data,
//       });
//     }
//     closeDialog();
//   };

//   const handleDelete = () => {
//     if (selectedCategory) {
//       deleteCategoryMutation.mutate(selectedCategory._id);
//     }
//     closeDeleteDialog();
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error fetching categories</div>;

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
//         <div className="mb-2 flex items-center justify-between space-y-2">
//           <h1 className="text-2xl font-bold tracking-tight">
//             List of Categories.
//           </h1>
//         </div>
//         <div className="container mx-auto p-4">
//           <Button onClick={() => openDialog("create")} className="mb-4">
//             Add Category
//           </Button>

//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Name</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {categories.map((category) => (
//                 <TableRow key={category._id}>
//                   <TableCell>{category.name}</TableCell>
//                   <TableCell>
//                     <Button
//                       variant="ghost"
//                       onClick={() => openDialog("update", category)}
//                     >
//                       <Pencil className="h-4 w-4" />
//                     </Button>
//                     <Button
//                       variant="ghost"
//                       onClick={() => openDeleteDialog(category)}
//                     >
//                       <Trash2 className="h-4 w-4" />
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>

//           {/* Dialog for Creating/Updating a Category */}
//           <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>
//                   {dialogMode === "create" ? "Add Category" : "Edit Category"}
//                 </DialogTitle>
//               </DialogHeader>
//               <form onSubmit={handleSubmit(onSubmit)}>
//                 <Input
//                   {...register("name", { required: true })}
//                   placeholder="Category Name"
//                   className="mb-4"
//                 />
//                 <DialogFooter>
//                   <Button type="submit">
//                     {dialogMode === "create" ? "Create" : "Update"}
//                   </Button>
//                 </DialogFooter>
//               </form>
//             </DialogContent>
//           </Dialog>

//           {/* Confirmation Dialog for Deleting a Category */}
//           <Dialog
//             open={isDeleteDialogOpen}
//             onOpenChange={setIsDeleteDialogOpen}
//           >
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>Confirm Delete</DialogTitle>
//               </DialogHeader>
//               <div className="mb-4">
//                 Are you sure you want to delete the category "
//                 {selectedCategory?.name}"?
//               </div>
//               <DialogFooter>
//                 <Button variant="secondary" onClick={closeDeleteDialog}>
//                   Cancel
//                 </Button>
//                 <Button variant="destructive" onClick={handleDelete}>
//                   Delete
//                 </Button>
//               </DialogFooter>
//             </DialogContent>
//           </Dialog>
//         </div>
//       </Layout.Body>
//     </Layout>
//   );
// };

// export default CategoryManagement;
//=================================================
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Pencil, Trash2 } from "lucide-react";
// import { Layout } from "../custom/layout";
// import { Search } from "../search";
// import ThemeSwitch from "../theme-switch";
// import { UserNav } from "../user-nav";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { useDispatch, useSelector } from "react-redux";

// import axiosInstance from "@/api/client";
// import { Input } from "@/components/ui/input"; // Importing the Input component
// import { setCategories } from "@/store/features/category/categorySlice";

// const CategoryManagement = () => {
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [dialogMode, setDialogMode] = useState("create");
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//   const { register, handleSubmit, reset } = useForm();
//   const dispatch = useDispatch();
//   const categories = useSelector((state) => state.categories);
//   const queryClient = useQueryClient();

//   // Fetch categories using react-query
//   const { isLoading, error } = useQuery({
//     queryKey: ["categories"],
//     queryFn: async () => {
//       const response = await axiosInstance.get("/categories");
//       dispatch(setCategories(response)); // Save categories in Redux store
//       return response;
//     },
//   });

//   // Mutations for creating/updating/deleting categories
//   const createCategoryMutation = useMutation({
//     mutationFn: (newCategory) => axiosInstance.post("/categories", newCategory),
//     onSuccess: () => queryClient.invalidateQueries(["categories"]),
//   });

//   const updateCategoryMutation = useMutation({
//     mutationFn: ({ id, updatedCategory }) =>
//       axiosInstance.put(`/categories/${id}`, updatedCategory),
//     onSuccess: () => queryClient.invalidateQueries(["categories"]),
//   });

//   const deleteCategoryMutation = useMutation({
//     mutationFn: (id) => axiosInstance.delete(`/categories/${id}`),
//     onSuccess: () => queryClient.invalidateQueries(["categories"]),
//   });

//   const openDialog = (mode, category = null) => {
//     setDialogMode(mode);
//     setSelectedCategory(category);
//     setIsDialogOpen(true);
//     if (mode === "update" && category) {
//       reset({ name: category.name });
//     } else {
//       reset({ name: "" });
//     }
//   };

//   const closeDialog = () => {
//     setIsDialogOpen(false);
//     setSelectedCategory(null);
//   };

//   const openDeleteDialog = (category) => {
//     setSelectedCategory(category);
//     setIsDeleteDialogOpen(true);
//   };

//   const closeDeleteDialog = () => {
//     setIsDeleteDialogOpen(false);
//     setSelectedCategory(null);
//   };

//   const onSubmit = (data) => {
//     if (dialogMode === "create") {
//       createCategoryMutation.mutate(data);
//     } else if (dialogMode === "update" && selectedCategory) {
//       updateCategoryMutation.mutate({
//         id: selectedCategory._id,
//         updatedCategory: data,
//       });
//     }
//     closeDialog();
//   };

//   const handleDelete = () => {
//     if (selectedCategory) {
//       deleteCategoryMutation.mutate(selectedCategory._id);
//     }
//     closeDeleteDialog();
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error fetching categories</div>;

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
//         <div className="mb-2 flex items-center justify-between space-y-2">
//           <h1 className="text-2xl font-bold tracking-tight">
//             List of Categories.
//           </h1>
//         </div>
//         <div className="container mx-auto p-4">
//           <Button onClick={() => openDialog("create")} className="mb-4">
//             Add Category
//           </Button>

//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Name</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {categories.map((category) => (
//                 <TableRow key={category._id}>
//                   <TableCell>{category.name}</TableCell>
//                   <TableCell>
//                     <Button
//                       variant="ghost"
//                       onClick={() => openDialog("update", category)}
//                     >
//                       <Pencil className="h-4 w-4" />
//                     </Button>
//                     <Button
//                       variant="ghost"
//                       onClick={() => openDeleteDialog(category)}
//                     >
//                       <Trash2 className="h-4 w-4" />
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>

//           {/* Dialog for Creating/Updating a Category */}
//           <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>
//                   {dialogMode === "create" ? "Add Category" : "Edit Category"}
//                 </DialogTitle>
//               </DialogHeader>
//               <form onSubmit={handleSubmit(onSubmit)}>
//                 <Input
//                   {...register("name", { required: true })}
//                   placeholder="Category Name"
//                   className="mb-4"
//                 />
//                 <DialogFooter>
//                   <Button type="submit">
//                     {dialogMode === "create" ? "Create" : "Update"}
//                   </Button>
//                 </DialogFooter>
//               </form>
//             </DialogContent>
//           </Dialog>

//           {/* Confirmation Dialog for Deleting a Category */}
//           <Dialog
//             open={isDeleteDialogOpen}
//             onOpenChange={setIsDeleteDialogOpen}
//           >
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>Confirm Delete</DialogTitle>
//               </DialogHeader>
//               <div className="mb-4">
//                 Are you sure you want to delete the category "
//                 {selectedCategory?.name}"?
//               </div>
//               <DialogFooter>
//                 <Button variant="secondary" onClick={closeDeleteDialog}>
//                   Cancel
//                 </Button>
//                 <Button variant="destructive" onClick={handleDelete}>
//                   Delete
//                 </Button>
//               </DialogFooter>
//             </DialogContent>
//           </Dialog>
//         </div>
//       </Layout.Body>
//     </Layout>
//   );
// };

// export default CategoryManagement;
//======================================================

// const CategoryManagement = () => {
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [dialogMode, setDialogMode] = useState("create");
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//   const [progressStatus, setProgressStatus] = useState(null); // Track upload progress
//   const [uploadedImageURL, setUploadedImageURL] = useState(null); // Track uploaded image URL
//   const { register, handleSubmit, reset } = useForm();
//   const dispatch = useDispatch();
//   const categories = useSelector((state) => state.categories);
//   const queryClient = useQueryClient();

//   // Fetch categories using react-query
//   const { isLoading, error } = useQuery({
//     queryKey: ["categories"],
//     queryFn: async () => {
//       const response = await axiosInstance.get("/categories");
//       dispatch(setCategories(response)); // Save categories in Redux store
//       return response;
//     },
//   });

//   // Mutations for creating/updating/deleting categories
//   const createCategoryMutation = useMutation({
//     mutationFn: (newCategory) => axiosInstance.post("/categories", newCategory),
//     onSuccess: () => queryClient.invalidateQueries(["categories"]),
//   });

//   const updateCategoryMutation = useMutation({
//     mutationFn: ({ id, updatedCategory }) =>
//       axiosInstance.put(`/categories/${id}`, updatedCategory),
//     onSuccess: () => queryClient.invalidateQueries(["categories"]),
//   });

//   const deleteCategoryMutation = useMutation({
//     mutationFn: (id) => axiosInstance.delete(`/categories/${id}`),
//     onSuccess: () => queryClient.invalidateQueries(["categories"]),
//   });

//   const openDialog = (mode, category = null) => {
//     setDialogMode(mode);
//     setSelectedCategory(category);
//     setIsDialogOpen(true);
//     if (mode === "update" && category) {
//       reset({ name: category.name });
//       setUploadedImageURL(category.image); // Load the existing image URL
//     } else {
//       reset({ name: "" });
//       setUploadedImageURL(null); // Reset the image URL when creating a new category
//     }
//   };

//   const closeDialog = () => {
//     setIsDialogOpen(false);
//     setSelectedCategory(null);
//   };

//   const openDeleteDialog = (category) => {
//     setSelectedCategory(category);
//     setIsDeleteDialogOpen(true);
//   };

//   const closeDeleteDialog = () => {
//     setIsDeleteDialogOpen(false);
//     setSelectedCategory(null);
//   };

//   const onSubmit = async (data) => {
//     // If an image file is selected, upload it first
//     if (data.image[0]) {
//       const file = data.image[0];
//       const uploadedImage = await uploadImage(
//         "categories",
//         file,
//         setProgressStatus
//       );
//       data.image = uploadedImage; // Store the uploaded image URL in the form data
//     } else {
//       data.image = uploadedImageURL || ""; // Use existing image URL if no new image is uploaded
//     }

//     if (dialogMode === "create") {
//       createCategoryMutation.mutate(data);
//     } else if (dialogMode === "update" && selectedCategory) {
//       updateCategoryMutation.mutate({
//         id: selectedCategory._id,
//         updatedCategory: data,
//       });
//     }
//     closeDialog();
//   };

//   const handleDelete = () => {
//     if (selectedCategory) {
//       deleteCategoryMutation.mutate(selectedCategory._id);
//     }
//     closeDeleteDialog();
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error fetching categories</div>;

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
//           <div className="mb-2 flex items-center justify-between space-y-2">
//             <h1 className="text-2xl font-bold tracking-tight">
//               List of Categories
//             </h1>
//           </div>
//           <Button onClick={() => openDialog("create")} className="mb-4">
//             Add Category
//           </Button>

//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Avatar</TableHead> {/* Add Avatar column */}
//                 <TableHead>Name</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {categories.map((category) => (
//                 <TableRow key={category._id}>
//                   <TableCell>
//                     <Avatar>
//                       <AvatarImage src={category.image} alt={category.name} />{" "}
//                       {/* Display avatar */}
//                       <AvatarFallback>{category.name.charAt(0)}</AvatarFallback>
//                     </Avatar>
//                   </TableCell>
//                   <TableCell>{category.name}</TableCell>
//                   <TableCell>
//                     <Button
//                       variant="ghost"
//                       onClick={() => openDialog("update", category)}
//                     >
//                       <Pencil className="h-4 w-4" />
//                     </Button>
//                     <Button
//                       variant="ghost"
//                       onClick={() => openDeleteDialog(category)}
//                     >
//                       <Trash2 className="h-4 w-4" />
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>

//           <Pagination>
//             <PaginationContent>
//               <PaginationItem>
//                 <PaginationPrevious href="#" />
//               </PaginationItem>
//               <PaginationItem>
//                 <PaginationLink href="#" isActive>
//                   1
//                 </PaginationLink>
//               </PaginationItem>
//               <PaginationItem>
//                 <PaginationLink href="#">2</PaginationLink>
//               </PaginationItem>
//               <PaginationItem>
//                 <PaginationLink href="#">3</PaginationLink>
//               </PaginationItem>
//               <PaginationItem>
//                 <PaginationEllipsis />
//               </PaginationItem>
//               <PaginationItem>
//                 <PaginationNext href="#" />
//               </PaginationItem>
//             </PaginationContent>
//           </Pagination>

//           {/* Dialog for Creating/Updating a Category */}
//           <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>
//                   {dialogMode === "create" ? "Add Category" : "Edit Category"}
//                 </DialogTitle>
//               </DialogHeader>
//               <form onSubmit={handleSubmit(onSubmit)}>
//                 <Input
//                   {...register("name", { required: true })}
//                   placeholder="Category Name"
//                   className="mb-4"
//                 />
//                 <Input {...register("image")} type="file" className="mb-4" />
//                 {progressStatus && (
//                   <div>Upload Progress: {progressStatus}%</div>
//                 )}{" "}
//                 {/* Display upload progress */}
//                 {uploadedImageURL && (
//                   <Avatar className="mb-4">
//                     <AvatarImage src={uploadedImageURL} alt="Category Image" />
//                     <AvatarFallback>?</AvatarFallback>
//                   </Avatar>
//                 )}
//                 <DialogFooter>
//                   <Button type="submit">
//                     {dialogMode === "create" ? "Create" : "Update"}
//                   </Button>
//                 </DialogFooter>
//               </form>
//             </DialogContent>
//           </Dialog>

//           {/* Confirmation Dialog for Deleting a Category */}
//           <Dialog
//             open={isDeleteDialogOpen}
//             onOpenChange={setIsDeleteDialogOpen}
//           >
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>Confirm Delete</DialogTitle>
//               </DialogHeader>
//               <div className="mb-4">
//                 Are you sure you want to delete the category "
//                 {selectedCategory?.name}"?
//               </div>
//               <DialogFooter>
//                 <Button variant="secondary" onClick={closeDeleteDialog}>
//                   Cancel
//                 </Button>
//                 <Button variant="destructive" onClick={handleDelete}>
//                   Delete
//                 </Button>
//               </DialogFooter>
//             </DialogContent>
//           </Dialog>
//         </div>
//       </Layout.Body>
//     </Layout>
//   );
// };


import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"; // Import Avatar components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import { Layout } from "../custom/layout";
import { Search } from "../search";
import ThemeSwitch from "../theme-switch";
import { UserNav } from "../user-nav";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";

import axiosInstance from "@/api/client";
import { Input } from "@/components/ui/input"; // Importing the Input component
import { setCategories } from "@/store/features/category/categorySlice";
import uploadImage from "@/firebase/image";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const CategoryManagement = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState("create");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [progressStatus, setProgressStatus] = useState(null); // Track upload progress
  const [uploadedImageURL, setUploadedImageURL] = useState(null); // Track uploaded image URL
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const queryClient = useQueryClient();

  // Pagination state
  const [page, setPage] = useState(1); // Current page
  const [limit] = useState(10); // Number of items per page (you can also make this dynamic if needed)

  // Fetch categories using react-query with pagination
  const { isLoading, error, data } = useQuery({
    queryKey: ["categories", page],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/categories?page=${page}&limit=${limit}`
      );
      dispatch(setCategories(response.categories)); // Save categories in Redux store
      return response;
    },
    keepPreviousData: true, // To keep previous data while new data is loading
  });

  // Total categories and pagination data from the response
  const totalCategories = data?.totalCategories || 0;
  const totalPages = Math.ceil(totalCategories / limit);

  // Mutations for creating/updating/deleting categories
  const createCategoryMutation = useMutation({
    mutationFn: (newCategory) => axiosInstance.post("/categories", newCategory),
    onSuccess: () => queryClient.invalidateQueries(["categories"]),
  });

  const updateCategoryMutation = useMutation({
    mutationFn: ({ id, updatedCategory }) =>
      axiosInstance.put(`/categories/${id}`, updatedCategory),
    onSuccess: () => queryClient.invalidateQueries(["categories"]),
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: (id) => axiosInstance.delete(`/categories/${id}`),
    onSuccess: () => queryClient.invalidateQueries(["categories"]),
  });

  const openDialog = (mode, category = null) => {
    setDialogMode(mode);
    setSelectedCategory(category);
    setIsDialogOpen(true);
    if (mode === "update" && category) {
      reset({ name: category.name });
      setUploadedImageURL(category.image); // Load the existing image URL
    } else {
      reset({ name: "" });
      setUploadedImageURL(null); // Reset the image URL when creating a new category
    }
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedCategory(null);
  };

  const openDeleteDialog = (category) => {
    setSelectedCategory(category);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setSelectedCategory(null);
  };

  const onSubmit = async (data) => {
    // If an image file is selected, upload it first
    if (data.image[0]) {
      const file = data.image[0];
      const uploadedImage = await uploadImage(
        "categories",
        file,
        setProgressStatus
      );
      data.image = uploadedImage; // Store the uploaded image URL in the form data
    } else {
      data.image = uploadedImageURL || ""; // Use existing image URL if no new image is uploaded
    }

    if (dialogMode === "create") {
      createCategoryMutation.mutate(data);
    } else if (dialogMode === "update" && selectedCategory) {
      updateCategoryMutation.mutate({
        id: selectedCategory._id,
        updatedCategory: data,
      });
    }
    closeDialog();
  };

  const handleDelete = () => {
    if (selectedCategory) {
      deleteCategoryMutation.mutate(selectedCategory._id);
    }
    closeDeleteDialog();
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching categories</div>;

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
          <div className="mb-2 flex items-center justify-between space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">
              List of Categories
            </h1>
          </div>
          <Button onClick={() => openDialog("create")} className="mb-4">
            Add Category
          </Button>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Avatar</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category._id}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={category.image} alt={category.name} />
                      <AvatarFallback>{category.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      onClick={() => openDialog("update", category)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => openDeleteDialog(category)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination Component */}
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    href="#"
                    isActive={page === index + 1}
                    onClick={() => setPage(index + 1)}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() =>
                    setPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={page === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>

          {/* Dialog for Creating/Updating a Category */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {dialogMode === "create" ? "Add Category" : "Edit Category"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                  {...register("name", { required: true })}
                  placeholder="Category Name"
                  className="mb-4"
                />
                <Input {...register("image")} type="file" className="mb-4" />
                {progressStatus && (
                  <div>Upload Progress: {progressStatus}%</div>
                )}
                {uploadedImageURL && (
                  <Avatar className="mb-4">
                    <AvatarImage src={uploadedImageURL} alt="Category Image" />
                    <AvatarFallback>?</AvatarFallback>
                  </Avatar>
                )}
                <DialogFooter>
                  <Button type="submit">
                    {dialogMode === "create" ? "Create" : "Update"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {/* Confirmation Dialog for Deleting a Category */}
          <Dialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Delete</DialogTitle>
              </DialogHeader>
              <div className="mb-4">
                Are you sure you want to delete the category "
                {selectedCategory?.name}"?
              </div>
              <DialogFooter>
                <Button variant="secondary" onClick={closeDeleteDialog}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </Layout.Body>
    </Layout>
  );
};

export default CategoryManagement;
