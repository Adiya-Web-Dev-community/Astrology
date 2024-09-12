import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import uploadImage from "@/firebase/image";
import { Layout } from "../custom/layout";
import { Button } from "@/components/ui/button";
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
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import axiosInstance from "@/api/client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  setAstrologers,
  addAstrologer,
  updateAstrologer,
  removeAstrologer,
  setCurrentPage,
} from "@/store/features/astrologer/astrologersSlice";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import Loader from "../loader";
import { useAuth } from "@/hooks/useAuth";
import { Search } from "../search";
import ThemeSwitch from "../theme-switch";
import { UserNav } from "../user-nav";
import AstrologerForm from "./astrologerForm";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AstrologerManagement = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const {
    data: astrologers,
    totalPages,
    currentPage,
  } = useSelector((state) => state.astrologers);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [currentAstrologer, setCurrentAstrologer] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [limit, setLimit] = useState(10);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      specialties: [],
      experience: "",
      bio: "",
      profileImage: "",
      pricing: "",
      isAvailable: true,
    },
  });

  const { isLoading: astrologersLoading, data: fetchedAstrologers } = useQuery({
    queryKey: ["astrologers", currentPage],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/astrologers?page=${currentPage}&limit=${limit}`
      );
      dispatch(setAstrologers(response));
      return response.data;
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axiosInstance.get("/categories");
      return response;
    },
  });

  const createMutation = useMutation({
    mutationFn: (astrologerData) =>
      axiosInstance.post("/astrologers/create", astrologerData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess: (data) => {
      dispatch(addAstrologer(data));
      queryClient.invalidateQueries(["astrologers"]);
      setDialogOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (astrologerData) =>
      axiosInstance.put(`/astrologers/${astrologerData._id}`, astrologerData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess: (data) => {
      dispatch(updateAstrologer(data));
      queryClient.invalidateQueries(["astrologers"]);
      setDialogOpen(false);
    },
    onError: (error) => {
      // Handle error
      console.error("Error updating astrologer:", error);
      alert("Failed to update astrologer. Please try again.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) =>
      axiosInstance.delete(`/astrologers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess: (_, id) => {
      dispatch(removeAstrologer(id));
      queryClient.invalidateQueries(["astrologers"]);
      setAlertDialogOpen(false);
    },
  });

  const toggleAvailabilityMutation = useMutation({
    mutationFn: (id) =>
      axiosInstance.put(`/astrologers/${id}/toggle-availability`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess: (data) => {
      dispatch(updateAstrologer(data));
      queryClient.invalidateQueries(["astrologers"]);
    },
  });

  const handleFormSubmit = async (data) => {
    if (data.profileImage instanceof FileList && data.profileImage.length > 0) {
      const file = data.profileImage[0];
      const url = await uploadImage("astrologer", file);
      data.profileImage = url;
    }

    if (isEditing) {
      updateMutation.mutate({ ...data, _id: currentAstrologer._id });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleDelete = () => {
    if (currentAstrologer) {
      deleteMutation.mutate(currentAstrologer._id);
    }
  };

  const handleToggleAvailability = (id) => {
    toggleAvailabilityMutation.mutate(id);
  };

  const handleEditClick = (astrologer) => {
    console.log("Astrologer", astrologer);

    setCurrentAstrologer(astrologer);
    form.reset({
      ...astrologer,
      specialties: astrologer.specialties.map((s) => s._id),
    });
    setIsEditing(true);
    setDialogOpen(true);
  };

  const handleCreateClick = () => {
    form.reset({
      name: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      phoneNumber: "",
      specialties: [],
      experience: "",
      bio: "",
      profileImage: "",
      pricing: "",
      isAvailable: true,
    });
    setIsEditing(false);
    setDialogOpen(true);
  };

  const handleView = (astrologer) => {
    navigate(`/astrologer/${astrologer._id}`);
  };

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
    queryClient.invalidateQueries(["astrologers", page]);
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
        <div className="container mx-auto">
          <div className="mb-2 flex items-center justify-between space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">
              List of Astrologer's
            </h1>
          </div>
          <Button onClick={handleCreateClick}>Add Astrologer</Button>
          {astrologersLoading ? (
            <Loader />
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Profile</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Specialties</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Pricing</TableHead>
                    <TableHead>Availability</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {astrologers &&
                    astrologers.map((astrologer) => (
                      <TableRow key={astrologer._id}>
                        <TableCell>
                          <Avatar>
                            <AvatarImage
                              src={astrologer.profileImage}
                              alt={astrologer?.name}
                            />
                            <AvatarFallback>
                              {astrologer?.name?.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        </TableCell>
                        <TableCell>{astrologer?.name}</TableCell>
                        <TableCell>{astrologer.email}</TableCell>
                        <TableCell>{astrologer.phoneNumber}</TableCell>
                        <TableCell>
                          {astrologer &&
                            astrologer.specialties?.map((specialty) => (
                              <Badge
                                key={specialty._id}
                                variant="secondary"
                                className="mr-1"
                              >
                                {specialty.name}
                              </Badge>
                            ))}
                        </TableCell>
                        <TableCell>{astrologer.experience} years</TableCell>
                        <TableCell>₹ {astrologer.pricing}</TableCell>
                        <TableCell>
                          <Checkbox
                            checked={astrologer.isAvailable}
                            onCheckedChange={() =>
                              handleToggleAvailability(astrologer._id)
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            onClick={() => handleView(astrologer)}
                            className="mr-2"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => handleEditClick(astrologer)}
                            className="mr-2"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setCurrentAstrologer(astrologer);
                              setAlertDialogOpen(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <div className="mt-4 flex justify-center">
                <Pagination className="mt-4">
                  <PaginationContent>
                    <PaginationPrevious
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    />
                    {[...Array(totalPages)].map((_, index) => (
                      <PaginationItem key={index}>
                        <PaginationLink
                          isActive={index + 1 === currentPage}
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationNext
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    />
                  </PaginationContent>
                </Pagination>
              </div>
            </>
          )}

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className="max-w-4xl h-auto">
              <DialogHeader>
                <DialogTitle>
                  {isEditing ? "Edit Astrologer" : "Add Astrologer"}
                </DialogTitle>
              </DialogHeader>
              <AstrologerForm
                isEditing={isEditing}
                onSubmit={handleFormSubmit}
                categories={categories}
                currentAstrologer={currentAstrologer}
              />
            </DialogContent>
          </Dialog>

          <AlertDialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <Button
                  variant="secondary"
                  onClick={() => setAlertDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </Layout.Body>
    </Layout>
  );
};

export default AstrologerManagement;
//==============================================
