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
import axiosInstance from "@/api/client";

const fetchGroupPujas = async () => {
  const response = await axiosInstance.get("/astro-services/pujas");
  return response;
};

const createGroupPuja = async (newPuja) => {
  const response = await axiosInstance.post("/astro-services/pujas", newPuja);
  return response.data;
};

const updateGroupPuja = async (updatedPuja) => {
  const response = await axiosInstance.put(
    `/astro-services/pujas/${updatedPuja._id}`,
    updatedPuja
  );
  return response.data;
};

const deleteGroupPuja = async (id) => {
  const response = await axiosInstance.delete(`/astro-services/pujas/${id}`);
  return response.data;
};

const GroupPujaManagement = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedPuja, setSelectedPuja] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm();

  const {
    data: pujas,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["groupPujas"],
    queryFn: fetchGroupPujas,
  });

  const createPujaMutation = useMutation({
    mutationFn: createGroupPuja,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groupPujas"] });
      setIsDialogOpen(false);
      Toast({
        title: "Success",
        description: "Group Puja created successfully",
      });
    },
    onError: (error) => {
      Toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updatePujaMutation = useMutation({
    mutationFn: updateGroupPuja,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groupPujas"] });
      setIsDialogOpen(false);
      Toast({
        title: "Success",
        description: "Group Puja updated successfully",
      });
    },
    onError: (error) => {
      Toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deletePujaMutation = useMutation({
    mutationFn: deleteGroupPuja,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groupPujas"] });
      Toast({
        title: "Success",
        description: "Group Puja deleted successfully",
      });
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
      date: new Date(data.date).toISOString(),
      price: parseFloat(data.price),
      maxParticipants: parseInt(data.maxParticipants),
      bookedParticipants: parseInt(data.bookedParticipants),
      images: data.images.split(",").map((url) => url.trim()),
    };

    if (isEditMode) {
      updatePujaMutation.mutate({ ...formattedData, _id: selectedPuja._id });
    } else {
      createPujaMutation.mutate(formattedData);
    }
  };

  const handleEdit = (puja) => {
    setIsEditMode(true);
    setSelectedPuja(puja);
    form.reset({
      ...puja,
      date: new Date(puja.date).toISOString().split("T")[0],
      images: puja.images.join(", "),
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this puja?")) {
      deletePujaMutation.mutate(id);
    }
  };

  const handleDialogOpen = () => {
    setIsEditMode(false);
    setSelectedPuja(null);
    form.reset({
      pujaName: "",
      description: "",
      date: "",
      duration: "",
      location: "",
      price: "",
      maxParticipants: "",
      bookedParticipants: "0",
      images: "",
    });
    setIsDialogOpen(true);
  };

  if (isLoading)
    return (
      <div className="flex justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  if (isError) return <div>Error loading pujas: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Group Puja Management</h1>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button onClick={handleDialogOpen}>Add New Puja</Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? "Edit Puja" : "Add New Puja"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="pujaName"
                rules={{ required: "Puja Name is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Puja Name</FormLabel>
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
                name="date"
                rules={{ required: "Date is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="duration"
                rules={{ required: "Duration is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., 2 hours" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                rules={{ required: "Location is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                name="maxParticipants"
                rules={{ required: "Max Participants is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Participants</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bookedParticipants"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Booked Participants</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
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
              <Button
                type="submit"
                disabled={
                  createPujaMutation.isPending || updatePujaMutation.isPending
                }
              >
                {(createPujaMutation.isPending ||
                  updatePujaMutation.isPending) && (
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
            <TableHead>Puja Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Max Participants</TableHead>
            <TableHead>Booked Participants</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pujas.map((puja) => (
            <TableRow key={puja._id}>
              <TableCell>{puja.pujaName}</TableCell>
              <TableCell>{new Date(puja.date).toLocaleDateString()}</TableCell>
              <TableCell>{puja.location}</TableCell>
              <TableCell>${puja.price}</TableCell>
              <TableCell>{puja.maxParticipants}</TableCell>
              <TableCell>{puja.bookedParticipants}</TableCell>
              <TableCell>
                <Button onClick={() => handleEdit(puja)} className="mr-2">
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(puja._id)}
                  variant="destructive"
                  disabled={deletePujaMutation.isPending}
                >
                  {deletePujaMutation.isPending && (
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

export default GroupPujaManagement;
