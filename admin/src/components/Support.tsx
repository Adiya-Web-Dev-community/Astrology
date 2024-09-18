// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";

// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { useToast } from "@/components/ui/use-toast";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import axiosInstance from "@/api/client";
// import Loader from "./loader";

// const supportSchema = z.object({
//   name: z.string().min(2, "Name must be at least 2 characters"),
//   email: z.string().email("Invalid email address"),
//   issueType: z.enum([
//     "Technical Issue",
//     "Account Related Issue",
//     "Refund Request",
//     "Feedback",
//     "Other",
//   ]),
//   message: z.string().min(10, "Message must be at least 10 characters"),
// });

// const useSupportRequests = () => {
//   return useQuery({
//     queryKey: ["supportRequests"],
//     queryFn: async () => {
//       const { data } = await axiosInstance.get("/support/get-all-supports");
//       return data;
//     },
//   });
// };

// const useCreateSupportRequest = () => {
//   const queryClient = useQueryClient();
//   const { toast } = useToast();

//   return useMutation({
//     mutationFn: async (supportData) => {
//       const { data } = await axiosInstance.post(
//         "/support/create-support",
//         supportData
//       );
//       return data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["supportRequests"]);
//       toast({
//         title: "Success",
//         description: "Support request created successfully",
//       });
//     },
//     onError: () => {
//       toast({
//         title: "Error",
//         description: "Failed to create support request",
//         variant: "destructive",
//       });
//     },
//   });
// };

// const useDeleteSupportRequest = () => {
//   const queryClient = useQueryClient();
//   const { toast } = useToast();

//   return useMutation({
//     mutationFn: async (id) => {
//       await axiosInstance.delete(`/support/${id}`);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["supportRequests"]);
//       toast({
//         title: "Deleted",
//         description: "Support request deleted successfully",
//       });
//     },
//     onError: () => {
//       toast({
//         title: "Error",
//         description: "Failed to delete support request",
//         variant: "destructive",
//       });
//     },
//   });
// };

// const SupportRequestForm = ({ onSubmit }) => {
//   const form = useForm({
//     resolver: zodResolver(supportSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       issueType: "General Inquiry",
//       message: "",
//     },
//   });

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//         <FormField
//           control={form.control}
//           name="name"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Name</FormLabel>
//               <FormControl>
//                 <Input {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email</FormLabel>
//               <FormControl>
//                 <Input type="email" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="issueType"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Issue Type</FormLabel>
//               <Select onValueChange={field.onChange} defaultValue={field.value}>
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select issue type" />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   <SelectItem value="Technical Issue">
//                     Technical Issue
//                   </SelectItem>
//                   <SelectItem value="Account Related Issue">
//                     Account Related Issue
//                   </SelectItem>
//                   <SelectItem value="Refund Request">Refund Request</SelectItem>
//                   <SelectItem value="Feedback">Feedback</SelectItem>
//                   <SelectItem value="Other">Other</SelectItem>
//                 </SelectContent>
//               </Select>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="message"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Message</FormLabel>
//               <FormControl>
//                 <Textarea {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Button type="submit">Submit Support Request</Button>
//       </form>
//     </Form>
//   );
// };

// const SupportRequestsTable = ({ requests, onDelete }) => (
//   <Table>
//     <TableHeader>
//       <TableRow>
//         <TableHead>Name</TableHead>
//         <TableHead>Email</TableHead>
//         <TableHead>Issue Type</TableHead>
//         <TableHead>Message</TableHead>
//         <TableHead>Actions</TableHead>
//       </TableRow>
//     </TableHeader>
//     <TableBody>
//       {requests.map((request) => (
//         <TableRow key={request._id}>
//           <TableCell>{request.name}</TableCell>
//           <TableCell>{request.email}</TableCell>
//           <TableCell>{request.issueType}</TableCell>
//           <TableCell>{request.message}</TableCell>
//           <TableCell>
//             <Button variant="destructive" onClick={() => onDelete(request._id)}>
//               Delete
//             </Button>
//           </TableCell>
//         </TableRow>
//       ))}
//     </TableBody>
//   </Table>
// );

// const SupportRequests = () => {
//   const { data: supportRequests, isLoading, isError } = useSupportRequests();
//   const createMutation = useCreateSupportRequest();
//   const deleteMutation = useDeleteSupportRequest();

//   if (isLoading) return <Loader />;
//   if (isError) return <div>Error loading support requests</div>;

//   return (
//     <div className="space-y-8">
//       <h1 className="text-2xl font-bold">Support Requests</h1>
//       <SupportRequestForm onSubmit={createMutation.mutate} />
//       <SupportRequestsTable
//         requests={supportRequests}
//         onDelete={deleteMutation.mutate}
//       />
//     </div>
//   );
// };

// export default SupportRequests;
//=========================================
import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axiosInstance from "@/api/client";
import Loader from "./loader";

const supportSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  issueType: z.enum([
    "Technical Issue",
    "Account Related Issue",
    "Refund Request",
    "Feedback",
    "Other",
  ]),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const useSupportRequests = () => {
  return useQuery({
    queryKey: ["supportRequests"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/support/get-all-supports");
      return data;
    },
  });
};

const useCreateSupportRequest = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (supportData) => {
      const { data } = await axiosInstance.post(
        "/support/create-support",
        supportData
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["supportRequests"]);
      toast({
        title: "Success",
        description: "Support request created successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create support request",
        variant: "destructive",
      });
    },
  });
};

const useDeleteSupportRequest = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id) => {
      await axiosInstance.delete(`/support/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["supportRequests"]);
      toast({
        title: "Deleted",
        description: "Support request deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete support request",
        variant: "destructive",
      });
    },
  });
};

const SupportRequestForm = ({ onSubmit, onOpenChange }) => {
  const form = useForm({
    resolver: zodResolver(supportSchema),
    defaultValues: {
      name: "",
      email: "",
      issueType: "General Inquiry",
      message: "",
    },
  });

  const handleSubmit = async (data) => {
    await onSubmit(data);
    form.reset();
    onOpenChange(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="issueType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Issue Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select issue type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Technical Issue">
                    Technical Issue
                  </SelectItem>
                  <SelectItem value="Account Related Issue">
                    Account Related Issue
                  </SelectItem>
                  <SelectItem value="Refund Request">Refund Request</SelectItem>
                  <SelectItem value="Feedback">Feedback</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit Support Request</Button>
      </form>
    </Form>
  );
};

const SupportRequestsTable = ({ requests, onDelete }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Issue Type</TableHead>
        <TableHead>Message</TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {requests.map((request) => (
        <TableRow key={request._id}>
          <TableCell>{request.name}</TableCell>
          <TableCell>{request.email}</TableCell>
          <TableCell>{request.issueType}</TableCell>
          <TableCell>{request.message}</TableCell>
          <TableCell>
            <Button variant="destructive" onClick={() => onDelete(request._id)}>
              Delete
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

const SupportRequests = () => {
  const { data: supportRequests, isLoading, isError } = useSupportRequests();
  const createMutation = useCreateSupportRequest();
  const deleteMutation = useDeleteSupportRequest();
  const [open, setOpen] = React.useState(false);

  if (isLoading) return <Loader />;
  if (isError) return <div>Error loading support requests</div>;

  return (
    <div className="container mx-auto space-y-8 p-6">
      <div className=" flex justify-between items-center">
        <h1 className="text-2xl font-bold">Support Requests</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>New Support Request</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Support Request</DialogTitle>
              <DialogDescription>
                Fill out the form below to submit a new support request.
              </DialogDescription>
            </DialogHeader>
            <SupportRequestForm
              onSubmit={createMutation.mutate}
              onOpenChange={setOpen}
            />
          </DialogContent>
        </Dialog>
      </div>
      <SupportRequestsTable
        requests={supportRequests}
        onDelete={deleteMutation.mutate}
      />
    </div>
  );
};

export default SupportRequests;
