// import React, { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import NewEditor from "./editorNew";
// import axiosInstance from "@/api/client";
// import { useNavigate, useParams } from "react-router-dom";
// import { Layout } from "../custom/layout";
// import { Search } from "../search";
// import ThemeSwitch from "../theme-switch";
// import { UserNav } from "../user-nav";
// import Loader from "../loader";
// import uploadImage from "@/firebase/image";

// // Define the form schema
// const formSchema = z.object({
//   title: z.string().min(2, { message: "Title must be at least 2 characters." }),
//   thumbnail: z.string().optional(),
//   content: z.string().min(1, { message: "Content is required." }),
//   categoryId: z.string().nonempty({ message: "Category is required." }),
//   excerpt: z.string().optional(),
//   metaDescription: z.string().optional(),
//   keywords: z.string().optional(),
// });

// const EditBlog = () => {
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();
//   const { id } = useParams();

//   const {
//     data: blog,
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["blog", id],
//     queryFn: async () => {
//       const response = await axiosInstance.get(`/blogs/${id}`);
//       if (!response) {
//         throw new Error("Blog not found");
//       }
//       return response;
//     },
//   });

//   const updateBlogMutation = useMutation({
//     mutationFn: (updatedBlog) => axiosInstance.put(`/blogs/${id}`, updatedBlog),
//     onSuccess: () => {
//       queryClient.invalidateQueries("blogs");
//       navigate("/blogs");
//     },
//   });

//   const { data: categories } = useQuery({
//     queryKey: ["categories"],
//     queryFn: async () => {
//       const response = await axiosInstance.get("/categories");
//       return response;
//     },
//   });

//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       title: blog?.title || "",
//       thumbnail: blog?.thumbnail || "",
//       content: blog?.content || "",
//       categoryId: blog?.category?._id || "",
//       excerpt: blog?.excerpt || "",
//       metaDescription: blog?.metaDescription || "",
//       keywords: blog?.keywords?.join(", ") || "",
//     },
//   });

//   useEffect(() => {
//     if (blog) {
//       form.reset({
//         title: blog.title,
//         thumbnail: blog.thumbnail,
//         content: blog.content,
//         categoryId: blog.category._id,
//         excerpt: blog.excerpt,
//         metaDescription: blog.metaDescription,
//         keywords: blog.keywords.join(", "),
//       });
//     }
//   }, [blog, form]);

//   const onSubmit = async (data) => {
//     data.keywords = data.keywords.split(",").map((keyword) => keyword.trim());
//     updateBlogMutation.mutate(data);
//   };

//   if (isLoading) {
//     return <Loader></Loader>;
//   }

//   if (isError) {
//     return <div>Error loading blog. Please try again.</div>;
//   }

//   if (!blog) {
//     return <div>Blog not found.</div>;
//   }

//   return (
//     <Layout>
//       <Layout.Header className="border border-b">
//         <Button
//           variant="outline"
//           onClick={() => window.history.back()}
//           className="ml-4"
//         >
//           Back
//         </Button>
//         <div className="ml-auto flex items-center space-x-4">
//           <Search />
//           <ThemeSwitch />
//           <UserNav />
//         </div>
//       </Layout.Header>
//       <Layout.Body>
//         <div className="container mx-auto">
//           <div className="mb-2 flex items-center justify-between space-y-2">
//             <h1 className="text-2xl font-bold tracking-tight">
//               Edit Blog Posts
//             </h1>
//           </div>
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//               <FormField
//                 control={form.control}
//                 name="title"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Title</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Blog Title" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="thumbnail"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Thumbnail URL</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Thumbnail URL" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="categoryId"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Category</FormLabel>
//                     <FormControl>
//                       <Select
//                         onValueChange={field.onChange}
//                         defaultValue={field.value}
//                       >
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select a Category" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectGroup>
//                             {categories?.map((category) => (
//                               <SelectItem
//                                 key={category._id}
//                                 value={category._id}
//                               >
//                                 {category.name}
//                               </SelectItem>
//                             ))}
//                           </SelectGroup>
//                         </SelectContent>
//                       </Select>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="content"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Content</FormLabel>
//                     <FormControl>
//                       <NewEditor
//                         value={field.value}
//                         onChange={field.onChange}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="excerpt"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Excerpt</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Blog Excerpt" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="metaDescription"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Meta Description</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Meta Description" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="keywords"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Keywords</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="Keywords, separated by commas"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <Button type="submit" className="mr-4">
//                 Update Blog
//               </Button>
//               <Button variant="outline" onClick={() => navigate("/blogs")}>
//                 Cancel
//               </Button>
//             </form>
//           </Form>
//         </div>
//       </Layout.Body>
//     </Layout>
//   );
// };

// export default EditBlog;
//=================================================
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import NewEditor from "./editorNew";
import axiosInstance from "@/api/client";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "../custom/layout";
import { Search } from "../search";
import ThemeSwitch from "../theme-switch";
import { UserNav } from "../user-nav";
import Loader from "../loader";
import uploadImage from "@/firebase/image";

const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  thumbnail: z.string().optional(),
  content: z.string().min(1, { message: "Content is required." }),
  categoryId: z.string().nonempty({ message: "Category is required." }),
  excerpt: z.string().optional(),
  metaDescription: z.string().optional(),
  keywords: z.string().optional(),
});

const EditBlog = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const [thumbnailPreview, setThumbnailPreview] = useState("");

  const {
    data: blog,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/blogs/${id}`);
      if (!response) {
        throw new Error("Blog not found");
      }
      return response;
    },
  });

  const updateBlogMutation = useMutation({
    mutationFn: (updatedBlog) => axiosInstance.put(`/blogs/${id}`, updatedBlog),
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
      navigate("/blogs");
    },
  });

  const {
    data: { categories },
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axiosInstance.get("/categories");
      console.log();

      return response;
    },
  });
  console.log("categories", categories);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: blog?.title || "",
      thumbnail: blog?.thumbnail || "",
      content: blog?.content || "",
      categoryId: blog?.category?._id || "",
      excerpt: blog?.excerpt || "",
      metaDescription: blog?.metaDescription || "",
      keywords: blog?.keywords?.join(", ") || "",
    },
  });

  useEffect(() => {
    if (blog) {
      form.reset({
        title: blog.title,
        thumbnail: blog.thumbnail,
        content: blog.content,
        categoryId: blog.category._id,
        excerpt: blog.excerpt,
        metaDescription: blog.metaDescription,
        keywords: blog.keywords.join(", "),
      });
      setThumbnailPreview(blog.thumbnail); // Set the initial thumbnail preview
    }
  }, [blog, form]);

  const handleThumbnailUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = await uploadImage(file);
      form.setValue("thumbnail", url); // Update form thumbnail value
      setThumbnailPreview(url); // Update preview
    }
  };

  const onSubmit = async (data) => {
    data.keywords = data.keywords.split(",").map((keyword) => keyword.trim());
    updateBlogMutation.mutate(data);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error loading blog. Please try again.</div>;
  }

  if (!blog) {
    return <div>Blog not found.</div>;
  }

  return (
    <Layout>
      <Layout.Header className="border border-b">
        <Button
          variant="outline"
          onClick={() => window.history.back()}
          className="ml-4"
        >
          Back
        </Button>
        <div className="ml-auto flex items-center space-x-4">
          <Search />
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>
      <Layout.Body>
        <div className="container mx-auto">
          <div className="mb-2 flex items-center justify-between space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">
              Edit Blog Posts
            </h1>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Blog Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="thumbnail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thumbnail</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        onChange={handleThumbnailUpload}
                        accept="image/*"
                      />
                    </FormControl>
                    {thumbnailPreview && (
                      <img
                        src={thumbnailPreview}
                        alt="Thumbnail Preview"
                        className="mt-4 h-24 w-24 object-cover"
                      />
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Category" />
                        </SelectTrigger>
                        {/* <SelectContent>
                          <SelectGroup>
                            {categories &&
                              categories?.map((category) => (
                                <SelectItem
                                  key={category._id}
                                  value={category._id}
                                >
                                  {category.name}
                                </SelectItem>
                              ))}
                          </SelectGroup>
                        </SelectContent> */}
                        <SelectContent>
                          <SelectGroup>
                            {Array.isArray(categories) &&
                              categories.map((category) => (
                                <SelectItem
                                  key={category._id}
                                  value={category._id}
                                >
                                  {category.name}
                                </SelectItem>
                              ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <NewEditor
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="excerpt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Excerpt</FormLabel>
                    <FormControl>
                      <Input placeholder="Blog Excerpt" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="metaDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Meta Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="keywords"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Keywords</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Keywords, separated by commas"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="mr-4">
                Update Blog
              </Button>
              <Button variant="outline" onClick={() => navigate("/blogs")}>
                Cancel
              </Button>
            </form>
          </Form>
        </div>
      </Layout.Body>
    </Layout>
  );
};

export default EditBlog;
