import React, { useEffect } from "react";
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
import NewEditor from "./editorNew";
import axiosInstance from "@/api/client";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "../custom/layout";
import { Search } from "../search";
import ThemeSwitch from "../theme-switch";
import { UserNav } from "../user-nav";

// Define the form schema
const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  thumbnail: z.string().url({ message: "Must be a valid URL." }),
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

  const { data: blog, isLoading } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => axiosInstance.get(`/blogs/${id}`).then((res) => res.data),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      thumbnail: "",
      content: "",
      categoryId: "",
      excerpt: "",
      metaDescription: "",
      keywords: "",
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
    }
  }, [blog, form]);

  const updateBlogMutation = useMutation({
    mutationFn: (updatedBlog) => axiosInstance.put(`/blogs/${id}`, updatedBlog),
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
      navigate("/blogs");
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axiosInstance.get("/categories");
      return response;
    },
  });

  const onSubmit = async (data) => {
    data.keywords = data.keywords.split(",").map((keyword) => keyword.trim());
    updateBlogMutation.mutate(data);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
                    <FormLabel>Thumbnail URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Thumbnail URL" {...field} />
                    </FormControl>
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
                      <select {...field}>
                        <option value="">Select Category</option>
                        {categories?.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
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
