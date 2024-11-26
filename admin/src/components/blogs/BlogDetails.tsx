import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Layout } from "../custom/layout";
import Loader from "../loader";
import { Search } from "../search";
import ThemeSwitch from "../theme-switch";
import { UserNav } from "../user-nav";

// Define the BlogDetails component
const BlogDetails = () => {
  const { id } = useParams();

  const {
    data: blog,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => axiosInstance.get(`/blogs/${id}`).then((res) => res),
  });

  if (isLoading) return <Loader />;
  if (isError) return <div>Error loading blog details</div>;

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
        <div className="container mx-auto p-4">
          <div>
            <div className="mb-4">
              <div className="text-lg font-semibold">{blog.title}</div>
              <div className="text-gray-500"> - {blog?.category?.name}</div>
              <div className="mt-4">
                <p>
                  <strong>Tags:</strong>{" "}
                  {blog.keywords.map((keyword, index) => (
                    <Badge variant="outline" key={index} className="mr-2">
                      {keyword}
                    </Badge>
                  ))}
                </p>
              </div>
            </div>
            <Separator className="my-4" />
            <p className="mb-4">
              <strong>Excerpt:</strong> {blog.excerpt}
            </p>
            <div>
              <div className="mb-4">
                <img
                  src={blog.thumbnail}
                  alt={blog.title}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>
              <Separator className="my-4" />
              <div
                className="text-lg space-y-4"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
              <Separator className="my-4" />
              <div className="text-sm text-gray-500">
                <p>
                  <strong>Meta Description:</strong> {blog.metaDescription}
                </p>
                {/* <p>
                  <strong>Keywords:</strong>{" "}
                  {blog.keywords.map((keyword, index) => (
                    <Badge variant="outline" key={index} className="mr-2">
                      {keyword}
                    </Badge>
                  ))}
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </Layout.Body>
    </Layout>
  );
};

export default BlogDetails;
