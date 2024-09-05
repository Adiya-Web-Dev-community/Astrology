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
          className="ml-4 mt-4"
        >
          Back
        </Button>
      </Layout.Header>
      <Layout.Body>
        <div className="container mx-auto p-4">
          <div>
            <div>
              <div>{blog.title}</div>
              <div>{blog.category.name}</div>
            </div>
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
                className="text-lg"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
              <Separator className="my-4" />
              <div className="text-sm text-gray-500">
                <p>
                  <strong>Excerpt:</strong> {blog.excerpt}
                </p>
                <p>
                  <strong>Meta Description:</strong> {blog.metaDescription}
                </p>
                <p>
                  <strong>Keywords:</strong>{" "}
                  {blog.keywords.map((keyword, index) => (
                    <Badge variant="outline" key={index} className="mr-2">
                      {keyword}
                    </Badge>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout.Body>
    </Layout>
  );
};

export default BlogDetails;
