import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Toast } from "@/components/ui/toast";
import { Loader2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import axiosInstance from "@/api/client";

const fetchGemstones = async () => {
  const response = await axiosInstance.get("/astro-services/gemstones");
  return response;
};

const createGemstone = async (newGemstone) => {
  const response = await axiosInstance.post(
    "/astro-services/gemstones",
    newGemstone
  );
  return response.data;
};

const updateGemstone = async (updatedGemstone) => {
  const response = await axiosInstance.put(
    `/astro-services/gemstones/${updatedGemstone._id}`,
    updatedGemstone
  );
  return response.data;
};

const deleteGemstone = async (id) => {
  const response = await axiosInstance.delete(
    `/astro-services/gemstones/${id}`
  );
  return response.data;
};

const GemstoneProductsManagement = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedGemstone, setSelectedGemstone] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm();

  const {
    data: gemstones,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["gemstones"],
    queryFn: fetchGemstones,
  });

  const createGemstoneeMutation = useMutation({
    mutationFn: createGemstone,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gemstones"] });
      setIsDialogOpen(false);
      Toast({ title: "Success", description: "Gemstone created successfully" });
    },
    onError: (error) => {
      Toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateGemstoneMutation = useMutation({
    mutationFn: updateGemstone,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gemstones"] });
      setIsDialogOpen(false);
      Toast({ title: "Success", description: "Gemstone updated successfully" });
    },
    onError: (error) => {
      Toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteGemstoneMutation = useMutation({
    mutationFn: deleteGemstone,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gemstones"] });
      Toast({ title: "Success", description: "Gemstone deleted successfully" });
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
      carat: parseFloat(data.carat),
      images: data.images.split(",").map((url) => url.trim()),
      availability: Boolean(data.availability),
    };

    if (isEditMode) {
      updateGemstoneMutation.mutate({
        ...formattedData,
        _id: selectedGemstone._id,
      });
    } else {
      createGemstoneeMutation.mutate(formattedData);
    }
  };

  const handleEdit = (gemstone) => {
    setIsEditMode(true);
    setSelectedGemstone(gemstone);
    form.reset({
      ...gemstone,
      images: gemstone.images.join(", "),
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this gemstone?")) {
      deleteGemstoneMutation.mutate(id);
    }
  };

  const handleDialogOpen = () => {
    setIsEditMode(false);
    setSelectedGemstone(null);
    form.reset({
      name: "",
      description: "",
      price: "",
      carat: "",
      zodiacSign: "",
      images: "",
      availability: true,
    });
    setIsDialogOpen(true);
  };

  if (isLoading)
    return (
      <div className="flex justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  if (isError) return <div>Error loading gemstones: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gemstone Products Management</h1>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button onClick={handleDialogOpen}>Add New Gemstone</Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? "Edit Gemstone" : "Add New Gemstone"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                rules={{ required: "Description is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                rules={{ required: "Price is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="carat"
                rules={{ required: "Carat is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Carat</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="zodiacSign"
                rules={{ required: "Zodiac Sign is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zodiac Sign</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Images (comma-separated URLs)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="availability"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Availability</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={
                  createGemstoneeMutation.isPending ||
                  updateGemstoneMutation.isPending
                }
              >
                {(createGemstoneeMutation.isPending ||
                  updateGemstoneMutation.isPending) && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isEditMode ? "Update" : "Create"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Zodiac Sign</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Carat</TableHead>
            <TableHead>Availability</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {gemstones.map((gemstone) => (
            <TableRow key={gemstone._id}>
              <TableCell>{gemstone.name}</TableCell>
              <TableCell>{gemstone.zodiacSign}</TableCell>
              <TableCell>${gemstone.price}</TableCell>
              <TableCell>{gemstone.carat}</TableCell>
              <TableCell>
                {gemstone.availability ? "Available" : "Not Available"}
              </TableCell>
              <TableCell>
                <Button onClick={() => handleEdit(gemstone)} className="mr-2">
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(gemstone._id)}
                  variant="destructive"
                  disabled={deleteGemstoneMutation.isPending}
                >
                  {deleteGemstoneMutation.isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default GemstoneProductsManagement;
