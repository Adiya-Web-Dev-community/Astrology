import React, { useState } from "react";
import { useForm } from "react-hook-form";
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Pencil, Trash2 } from "lucide-react";
import axiosInstance from "@/api/client";
import { useAuth } from "@/hooks/useAuth";

const ThoughtsManagement = () => {
  const { token } = useAuth();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState("create");
  const [selectedThought, setSelectedThought] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  // Fetch Thoughts
  const { data, isLoading, error } = useQuery({
    queryKey: ["thoughts", page],
    queryFn: async () => {
      const response = await axiosInstance.get(`/thoughts?page=${page}&limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    },
    keepPreviousData: true,
  });

  const thoughts = data?.data  || [];
  const meta = data?.meta || {};

  // Mutations
  const createThoughtMutation = useMutation({
    mutationFn: (newThought) =>
      axiosInstance.post("/thoughts", newThought, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess: () => queryClient.invalidateQueries(["thoughts"]),
  });

  const updateThoughtMutation = useMutation({
    mutationFn: ({ id, updatedThought }) =>
      axiosInstance.put(`/thoughts/${id}`, updatedThought, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess: () => queryClient.invalidateQueries(["thoughts"]),
  });

  const deleteThoughtMutation = useMutation({
    mutationFn: (id) =>
      axiosInstance.delete(`/thoughts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess: () => queryClient.invalidateQueries(["thoughts"]),
  });

  const openDialog = (mode, thought = null) => {
    setDialogMode(mode);
    setSelectedThought(thought);
    setIsDialogOpen(true);
    if (mode === "update" && thought) {
      reset({ thoughtText: thought.thoughtText, author: thought.author });
    } else {
      reset({ thoughtText: "", author: "" });
    }
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedThought(null);
  };

  const onSubmit = async (data) => {
    if (dialogMode === "create") {
      createThoughtMutation.mutate(data);
    } else if (dialogMode === "update" && selectedThought) {
      updateThoughtMutation.mutate({ id: selectedThought._id, updatedThought: data });
    }
    closeDialog();
  };

  const openDeleteDialog = (thought) => {
    setSelectedThought(thought);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setSelectedThought(null);
  };

  const handleDelete = () => {
    if (selectedThought) {
      deleteThoughtMutation.mutate(selectedThought._id);
    }
    closeDeleteDialog();
  };

  const handleUpdateToLatest = (thought) => {
    axiosInstance.put('/thoughts/update-latest', { thoughtId: thought._id }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then(() => {
        queryClient.invalidateQueries(["thoughts"]);
        // fetchLatestThought(); // Refresh latest thought
    }).catch((error) => {
        console.error("Error updating the thought to latest: ", error);
    });
};


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading thoughts</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Thoughts Management</h1>
        <Button onClick={() => openDialog("create")}>Add Thought</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Thought Text</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {thoughts.map((thought) => (
            <TableRow key={thought._id}>
              <TableCell>{thought.thoughtText}</TableCell>
              <TableCell>{thought.author}</TableCell>
              <TableCell>{new Date(thought.date).toLocaleDateString()}</TableCell>
              <TableCell>
                <Button variant="ghost" onClick={() => openDialog("update", thought)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" onClick={() => openDeleteDialog(thought)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" onClick={() => handleUpdateToLatest(thought)}>
            Set as Latest
        </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      {meta.totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
              />
            </PaginationItem>
            {[...Array(meta.totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationItem
                  onClick={() => setPage(index + 1)}
                  isActive={page === index + 1}
                >
                  {index + 1}
                </PaginationItem>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => setPage((prev) => Math.min(prev + 1, meta.totalPages))}
                disabled={page === meta.totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {/* Create/Update Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogMode === "create" ? "Add Thought" : "Edit Thought"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register("thoughtText", { required: true })}
              placeholder="Thought Text"
              className="mb-4"
            />
            <Input
              {...register("author", { required: true })}
              placeholder="Author"
              className="mb-4"
            />
            <DialogFooter>
              <Button type="submit">{dialogMode === "create" ? "Create" : "Update"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <div className="mb-4">
            Are you sure you want to delete the thought{" "}
            <strong>{selectedThought?.thoughtText || "this thought"}</strong>?
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
  );
};

export default ThoughtsManagement;
