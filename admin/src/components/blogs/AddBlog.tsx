// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import NewEditor from "./editorNew";
// import axiosInstance from "@/api/client";
// import { useNavigate } from "react-router-dom";
// import { Layout } from "../custom/layout";
// import { Search } from "../search";
// import ThemeSwitch from "../theme-switch";
// import { UserNav } from "../user-nav";
// import uploadImage from "@/firebase/image";

// // Define the form schema
// const formSchema = z.object({
//   title: z.string().min(2, { message: "Title must be at least 2 characters." }),
//   content: z.string().optional(),
//   categoryId: z.string().nonempty({ message: "Category is required." }),
//   excerpt: z.string().optional(),
//   metaDescription: z.string().optional(),
//   keywords: z.string().optional(),
// });

// const AddBlog = () => {
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();
//   const [thumbnailFile, setThumbnailFile] = useState(null);
//   const [uploadProgress, setUploadProgress] = useState(null);

//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       title: "",
//       content: "",
//       categoryId: "",
//       excerpt: "",
//       metaDescription: "",
//       keywords: "",
//     },
//   });

//   const createBlogMutation = useMutation({
//     mutationFn: (newBlog) => axiosInstance.post("/blogs", newBlog),
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

//   const handleFileChange = (event) => {
//     setThumbnailFile(event.target.files[0]);
//   };

//   const onSubmit = async (data) => {
//     try {
//       let thumbnailUrl = "";
//       if (thumbnailFile) {
//         thumbnailUrl = await uploadImage(
//           "blogThumbnails",
//           thumbnailFile,
//           setUploadProgress
//         );
//       }
//       data.thumbnail = thumbnailUrl;
//       data.keywords = data.keywords.split(",").map((keyword) => keyword.trim());
//       createBlogMutation.mutate(data);
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       // Handle the error (e.g., show an error message to the user)
//     }
//   };

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
//               Create Blog Posts
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
//               <FormItem>
//                 <FormLabel>Thumbnail</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="file"
//                     onChange={handleFileChange}
//                     accept="image/*"
//                   />
//                 </FormControl>
//                 {uploadProgress && <p>Upload progress: {uploadProgress}%</p>}
//                 <FormMessage />
//               </FormItem>
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
//                         OnChangeEditor={(content) => field.onChange(content)}
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
//               <div>
//                 <Button type="submit" className="mr-4">
//                   Create Blog
//                 </Button>
//                 <Button variant="outline" onClick={() => navigate("/blogs")}>
//                   Cancel
//                 </Button>
//               </div>
//             </form>
//           </Form>
//         </div>
//       </Layout.Body>
//     </Layout>
//   );
// };

// export default AddBlog;
//=============================================================
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NewEditor from "./editorNew";
import axiosInstance from "@/api/client";
import { useNavigate } from "react-router-dom";
import { Layout } from "../custom/layout";
import { Search } from "../search";
import ThemeSwitch from "../theme-switch";
import { UserNav } from "../user-nav";
import uploadImage from "@/firebase/image";

// Define the form schema for localized content
const localizedContentSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  content: z.string().optional(),
  excerpt: z.string().optional(),
  metaDescription: z.string().optional(),
  keywords: z.string().optional(),
});

// Main form schema
const formSchema = z.object({
  english: localizedContentSchema,
  hindi: localizedContentSchema,
  categoryId: z.string().nonempty({ message: "Category is required." }),
  tags: z.string().optional(),
});

const AddBlog = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      english: {
        title: "",
        content: "",
        excerpt: "",
        metaDescription: "",
        keywords: "",
      },
      hindi: {
        title: "",
        content: "",
        excerpt: "",
        metaDescription: "",
        keywords: "",
      },
      categoryId: "",
      tags: "",
    },
  });

  const createBlogMutation = useMutation({
    mutationFn: (newBlog) => axiosInstance.post("/blogs", newBlog),
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
      navigate("/blogs");
    },
  });

  const { categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axiosInstance.get("/categories");
      return response;
    },
  });

  const handleFileChange = (event) => {
    setThumbnailFile(event.target.files[0]);
  };

  const onSubmit = async (data) => {
    try {
      let thumbnailUrl = "";
      if (thumbnailFile) {
        thumbnailUrl = await uploadImage(
          "blogThumbnails",
          thumbnailFile,
          setUploadProgress
        );
      }

      // Process keywords and tags
      const processedData = {
        ...data,
        thumbnail: thumbnailUrl,
        english: {
          ...data.english,
          keywords: data.english.keywords?.split(",").map((k) => k.trim()),
          slug: data.english.title.toLowerCase().replace(/\s+/g, '-')
        },
        hindi: {
          ...data.hindi,
          keywords: data.hindi.keywords?.split(",").map((k) => k.trim()),
          slug: data.hindi.title.toLowerCase().replace(/\s+/g, '-')
        },
        tags: data.tags?.split(",").map((tag) => tag.trim()),
      };

      createBlogMutation.mutate(processedData);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

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
              Create Multilingual Blog Post
            </h1>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Tabs defaultValue="english">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="english">English</TabsTrigger>
                  <TabsTrigger value="hindi">Hindi</TabsTrigger>
                </TabsList>
                
                {/* English Content Tab */}
                <TabsContent value="english">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="english.title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>English Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Blog Title (English)" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="english.content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>English Content</FormLabel>
                          <FormControl>
                            <NewEditor
                              value={field.value}
                              OnChangeEditor={(content) => field.onChange(content)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Add other English fields similarly */}
                  </div>
                </TabsContent>
                
                {/* Hindi Content Tab */}
                <TabsContent value="hindi">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="hindi.title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Hindi Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Blog Title (Hindi)" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="hindi.content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Hindi Content</FormLabel>
                          <FormControl>
                            <NewEditor
                              value={field.value}
                              OnChangeEditor={(content) => field.onChange(content)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Add other Hindi fields similarly */}
                  </div>
                </TabsContent>
              </Tabs>

              {/* Common Fields */}
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {categories?.map((category) => (
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

              <FormItem>
                <FormLabel>Thumbnail</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </FormControl>
                {uploadProgress && <p>Upload progress: {uploadProgress}%</p>}
                <FormMessage />
              </FormItem>

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Tags, separated by commas"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <Button type="submit" className="mr-4">
                  Create Blog
                </Button>
                <Button variant="outline" onClick={() => navigate("/blogs")}>
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </Layout.Body>
    </Layout>
  );
};

export default AddBlog;