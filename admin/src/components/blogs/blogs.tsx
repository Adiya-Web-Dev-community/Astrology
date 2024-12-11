
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
// import { Pencil, Trash2, Eye } from "lucide-react";
// import axiosInstance from "@/api/client";
// import { Layout } from "../custom/layout";
// import { setBlogs, setSelectedBlog } from "@/store/features/blog/blogSlice";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import Loader from "../loader";
// import { Search } from "../search";
// import ThemeSwitch from "../theme-switch";
// import { UserNav } from "../user-nav";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogDescription,
// } from "@/components/ui/alert-dialog";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationPrevious,
//   PaginationNext,
// } from "@/components/ui/pagination";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// const BlogManagement = () => {
//   const dispatch = useDispatch();
//   const queryClient = useQueryClient();
//   const navigate = useNavigate();

//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [blogToDelete, setBlogToDelete] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [limit, setLimit] = useState(10);

//   const { data: blogsData, isLoading } = useQuery({
//     queryKey: ["blogs", currentPage, limit],
//     queryFn: async () => {
//       const response = await axiosInstance.get(
//         `/blogs?limit=${limit}&page=${currentPage}`
//       );
//       dispatch(setBlogs(response.data));
//       return response;
//     },
//   });

//   const deleteBlogMutation = useMutation({
//     mutationFn: (blogId) => axiosInstance.delete(`/blogs/${blogId}`),
//     onSuccess: () => {
//       queryClient.invalidateQueries("blogs");
//     },
//   });

//   const handleAddBlog = () => {
//     navigate("/blogs/create");
//   };

//   const handleEditBlog = (blog) => {
//     dispatch(setSelectedBlog(blog));
//     navigate(`/blogs/edit/${blog._id}`);
//   };

//   const handleOpenDialog = (blog) => {
//     setBlogToDelete(blog);
//     setIsDialogOpen(true);
//   };

//   const handleConfirmDelete = () => {
//     if (blogToDelete) {
//       deleteBlogMutation.mutate(blogToDelete._id);
//       setIsDialogOpen(false);
//     }
//   };

//   const handleViewDetails = (blog) => {
//     navigate(`/blogs/${blog._id}`);
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const handleLimitChange = (newLimit) => {
//     setLimit(Number(newLimit));
//     setCurrentPage(1); // Reset to first page when changing limit
//   };

//   if (isLoading) {
//     return <Loader />;
//   }

//   const { data, pagination } = blogsData;
//   const { currentPage: apiCurrentPage, totalPages } = pagination;

//   const renderPaginationItems = () => {
//     const items = [];
//     const maxVisiblePages = 5;
//     const halfVisible = Math.floor(maxVisiblePages / 2);

//     let startPage = Math.max(1, apiCurrentPage - halfVisible);
//     let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

//     if (endPage - startPage + 1 < maxVisiblePages) {
//       startPage = Math.max(1, endPage - maxVisiblePages + 1);
//     }

//     for (let i = startPage; i <= endPage; i++) {
//       items.push(
//         <PaginationItem key={i}>
//           <PaginationLink
//             href="#"
//             onClick={() => handlePageChange(i)}
//             isActive={i === apiCurrentPage}
//           >
//             {i}
//           </PaginationLink>
//         </PaginationItem>
//       );
//     }

//     return items;
//   };

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
//               List of Blog Posts
//             </h1>
//           </div>
//           <div className="flex items-center justify-between">
//             <Button onClick={handleAddBlog} className="mb-4">
//               Add Blog
//             </Button>
//             <div className="flex items-center gap-2 ">
//               <span>Show:</span>
//               <Select
//                 value={limit.toString()}
//                 onValueChange={handleLimitChange}
//               >
//                 <SelectTrigger className="w-[70px]">
//                   <SelectValue placeholder={limit} />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="5">5</SelectItem>
//                   <SelectItem value="10">10</SelectItem>
//                   <SelectItem value="20">20</SelectItem>
//                   <SelectItem value="50">50</SelectItem>
//                 </SelectContent>
//               </Select>
//               <span>per page</span>
//             </div>
//           </div>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Thumbnail</TableHead>
//                 <TableHead>Title</TableHead>
//                 <TableHead>Category</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {blogsData.data.map((blog) => (
//                 <TableRow key={blog._id}>
//                   <TableCell>
//                     <Avatar>
//                       <AvatarImage src={blog.thumbnail} alt={blog?.title} />
//                       <AvatarFallback>{blog?.title?.charAt(0)}</AvatarFallback>
//                     </Avatar>
//                   </TableCell>
//                   <TableCell>{blog.title}</TableCell>
//                   <TableCell>{blog?.category?.name}</TableCell>
//                   <TableCell>
//                     <Button
//                       variant="ghost"
//                       onClick={() => handleViewDetails(blog)}
//                     >
//                       <Eye className="h-4 w-4" />
//                     </Button>
//                     <Button
//                       variant="ghost"
//                       onClick={() => handleEditBlog(blog)}
//                     >
//                       <Pencil className="h-4 w-4" />
//                     </Button>
//                     <Button
//                       variant="ghost"
//                       onClick={() => handleOpenDialog(blog)}
//                     >
//                       <Trash2 className="h-4 w-4" />
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
//                     href="#"
//                     onClick={() => handlePageChange(apiCurrentPage - 1)}
//                     disabled={apiCurrentPage === 1}
//                   />
//                 </PaginationItem>
//                 {renderPaginationItems()}
//                 <PaginationItem>
//                   <PaginationNext
//                     href="#"
//                     onClick={() => handlePageChange(apiCurrentPage + 1)}
//                     disabled={apiCurrentPage === totalPages}
//                   />
//                 </PaginationItem>
//               </PaginationContent>
//             </Pagination>
//           </div>
//         </div>

//         <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//           <AlertDialogContent>
//             <AlertDialogHeader>
//               <AlertDialogTitle>
//                 Are you sure you want to delete this blog?
//               </AlertDialogTitle>
//               <AlertDialogDescription>
//                 This action cannot be undone. This will permanently delete the
//                 blog post titled <b>"{blogToDelete?.title}"</b>.
//               </AlertDialogDescription>
//             </AlertDialogHeader>
//             <AlertDialogFooter>
//               <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>
//                 Cancel
//               </AlertDialogCancel>
//               <AlertDialogAction onClick={handleConfirmDelete}>
//                 Confirm
//               </AlertDialogAction>
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialog>
//       </Layout.Body>
//     </Layout>
//   );
// };

// export default BlogManagement;
//=========================================
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
import { Pencil, Trash2, Eye } from "lucide-react";
import axiosInstance from "@/api/client";
import { Layout } from "../custom/layout";
import { setBlogs, setSelectedBlog } from "@/store/features/blog/blogSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../loader";
import { Search } from "../search";
import ThemeSwitch from "../theme-switch";
import { UserNav } from "../user-nav";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const BlogManagement = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [language, setLanguage] = useState("english");

  const { data: blogsData, isLoading } = useQuery({
    queryKey: ["blogs", currentPage, limit, language],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/blogs?limit=${limit}&page=${currentPage}&language=${language}`
      );
      dispatch(setBlogs(response.data));
      return response;
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: (blogId) => axiosInstance.delete(`/blogs/${blogId}`),
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
    },
  });

  const handleAddBlog = () => {
    navigate("/blogs/create");
  };

  const handleEditBlog = (blog) => {
    dispatch(setSelectedBlog(blog));
    navigate(`/blogs/edit/${blog._id}`);
  };

  const handleOpenDialog = (blog) => {
    setBlogToDelete(blog);
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (blogToDelete) {
      deleteBlogMutation.mutate(blogToDelete._id);
      setIsDialogOpen(false);
    }
  };

  const handleViewDetails = (blog) => {
    navigate(`/blogs/${blog._id}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(Number(newLimit));
    setCurrentPage(1);
  };

  if (isLoading) {
    return <Loader />;
  }

  const { data, pagination } = blogsData;
  const { currentPage: apiCurrentPage, totalPages } = pagination;

  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;
    const halfVisible = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(1, apiCurrentPage - halfVisible);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            onClick={() => handlePageChange(i)}
            isActive={i === apiCurrentPage}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

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
              List of Blog Posts
            </h1>
          </div>
          
          {/* Language and Action Tabs */}
          <Tabs 
            defaultValue="english" 
            onValueChange={(value) => setLanguage(value)}
            className="mb-4"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="english">English Blogs</TabsTrigger>
              <TabsTrigger value="hindi">Hindi Blogs</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center justify-between mb-4">
            <Button onClick={handleAddBlog}>
              Add Blog
            </Button>
            <div className="flex items-center gap-2">
              <span>Show:</span>
              <Select
                value={limit.toString()}
                onValueChange={handleLimitChange}
              >
                <SelectTrigger className="w-[70px]">
                  <SelectValue placeholder={limit} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
              <span>per page</span>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Thumbnail</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((blog) => (
                <TableRow key={blog._id}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage 
                        src={blog.thumbnail} 
                        alt={language === 'english' 
                          ? blog.english.title 
                          : blog.hindi.title
                        } 
                      />
                      <AvatarFallback>
                        {language === 'english' 
                          ? blog.english.title.charAt(0) 
                          : blog.hindi.title.charAt(0)
                        }
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    {language === 'english' 
                      ? blog.english.title 
                      : blog.hindi.title
                    }
                  </TableCell>
                  <TableCell>{blog.category.name}</TableCell>
                  <TableCell>
                    {blog.tags?.join(', ') || 'No tags'}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewDetails(blog)}
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditBlog(blog)}
                        title="Edit Blog"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenDialog(blog)}
                        title="Delete Blog"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="mt-4 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() => handlePageChange(apiCurrentPage - 1)}
                    disabled={apiCurrentPage === 1}
                  />
                </PaginationItem>
                {renderPaginationItems()}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() => handlePageChange(apiCurrentPage + 1)}
                    disabled={apiCurrentPage === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete this blog?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                blog post titled <b>"{language === 'english' 
                  ? blogToDelete?.english.title 
                  : blogToDelete?.hindi.title
                }"</b>.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmDelete}>
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Layout.Body>
    </Layout>
  );
};

export default BlogManagement;