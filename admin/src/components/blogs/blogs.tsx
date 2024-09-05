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
// import { Pencil, Trash2 } from "lucide-react";
// import axiosInstance from "@/api/client";
// import { Layout } from "../custom/layout";
// import { setBlogs, setSelectedBlog } from "@/store/features/blog/blogSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import Loader from "../loader";

// const BlogManagement = () => {
//   const dispatch = useDispatch();
//   const queryClient = useQueryClient();
//   const navigate = useNavigate();

//   const blogs = useSelector((state) => state.blog.blogs);

//   const { data: blogsData, isLoading } = useQuery({
//     queryKey: ["blogs"],
//     queryFn: async () => {
//       const response = await axiosInstance.get("/blogs");
//       dispatch(setBlogs(response));
//       return response;
//     },
//   });
//   if (isLoading) {
//     return <Loader />;
//   }

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

//   const handleDeleteBlog = (blog) => {
//     if (window.confirm(`Are you sure you want to delete "${blog.title}"?`)) {
//       deleteBlogMutation.mutate(blog._id);
//     }
//   };

//   return (
//     <Layout>
//       <Layout.Header className="border border-b">
//         <div className="ml-auto flex items-center space-x-4">
//           {/* Other UI components */}
//         </div>
//       </Layout.Header>
//       <Layout.Body>
//         <div className="mb-2 flex items-center justify-between space-y-2">
//           <h1 className="text-2xl font-bold tracking-tight">
//             List of Blog Posts
//           </h1>
//         </div>
//         <div className="container mx-auto p-4">
//           <Button onClick={handleAddBlog} className="mb-4">
//             Add Blog
//           </Button>

//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Title</TableHead>
//                 <TableHead>Category</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {blogs.map((blog) => (
//                 <TableRow key={blog._id}>
//                   <TableCell>{blog.title}</TableCell>
//                   <TableCell>{blog.category.name}</TableCell>
//                   <TableCell>
//                     <Button
//                       variant="ghost"
//                       onClick={() => handleEditBlog(blog)}
//                     >
//                       <Pencil className="h-4 w-4" />
//                     </Button>
//                     <Button
//                       variant="ghost"
//                       onClick={() => handleDeleteBlog(blog)}
//                     >
//                       <Trash2 className="h-4 w-4" />
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       </Layout.Body>
//     </Layout>
//   );
// };

// export default BlogManagement;
//========================================
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
import { Pencil, Trash2, Eye } from "lucide-react"; // Add Eye icon for details view
import axiosInstance from "@/api/client";
import { Layout } from "../custom/layout";
import { setBlogs, setSelectedBlog } from "@/store/features/blog/blogSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../loader";
import { Search } from "../search";
import ThemeSwitch from "../theme-switch";
import { UserNav } from "../user-nav";

const BlogManagement = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const blogs = useSelector((state) => state.blog.blogs);

  const { data: blogsData, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const response = await axiosInstance.get("/blogs");
      dispatch(setBlogs(response));
      return response;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

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

  const handleDeleteBlog = (blog) => {
    if (window.confirm(`Are you sure you want to delete "${blog.title}"?`)) {
      deleteBlogMutation.mutate(blog._id);
    }
  };

  const handleViewDetails = (blog) => {
    navigate(`/blogs/${blog._id}`); // Navigate to the blog details page
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
          <Button onClick={handleAddBlog} className="mb-4">
            Add Blog
          </Button>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogs.map((blog) => (
                <TableRow key={blog._id}>
                  <TableCell>{blog.title}</TableCell>
                  <TableCell>{blog?.category?.name}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      onClick={() => handleViewDetails(blog)} // View details button
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => handleEditBlog(blog)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => handleDeleteBlog(blog)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Layout.Body>
    </Layout>
  );
};

export default BlogManagement;
