// import React from "react";
// import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from "@/components/ui/form";
// import { Loader2 } from "lucide-react";

// const PoojaForm = ({
//   onSubmit,
//   isEditMode,
//   initialData,
//   astrologers,
//   isPending,
// }) => {
//   const form = useForm({
//     defaultValues: initialData || {
//       pujaName: "",
//       description: "",
//       date: "",
//       duration: "",
//       location: "",
//       price: "",
//       maxParticipants: "",
//       bookedParticipants: "0",
//       images: "",
//       astrologerId: "",
//     },
//   });

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//         <FormField
//           control={form.control}
//           name="pujaName"
//           rules={{ required: "Puja Name is required" }}
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Puja Name</FormLabel>
//               <FormControl>
//                 <Input {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="description"
//           rules={{ required: "Description is required" }}
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Description</FormLabel>
//               <FormControl>
//                 <Textarea {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="date"
//           rules={{ required: "Date is required" }}
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Date</FormLabel>
//               <FormControl>
//                 <Input type="date" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="duration"
//           rules={{ required: "Duration is required" }}
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Duration</FormLabel>
//               <FormControl>
//                 <Input {...field} placeholder="e.g., 2 hours" />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="location"
//           rules={{ required: "Location is required" }}
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Location</FormLabel>
//               <FormControl>
//                 <Input {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="price"
//           rules={{ required: "Price is required" }}
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Price</FormLabel>
//               <FormControl>
//                 <Input type="number" step="0.01" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="maxParticipants"
//           rules={{ required: "Max Participants is required" }}
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Max Participants</FormLabel>
//               <FormControl>
//                 <Input type="number" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="bookedParticipants"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Booked Participants</FormLabel>
//               <FormControl>
//                 <Input type="number" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="astrologerId"
//           rules={{ required: "Astrologer is required" }}
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Select Astrologer</FormLabel>
//               <FormControl>
//                 <select {...field}>
//                   <option value="">Select an astrologer</option>
//                   {astrologers.map((astrologer) => (
//                     <option key={astrologer._id} value={astrologer._id}>
//                       {astrologer.name}
//                     </option>
//                   ))}
//                 </select>
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="images"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Images (comma-separated URLs)</FormLabel>
//               <FormControl>
//                 <Input {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Button type="submit" disabled={isPending}>
//           {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
//           {isEditMode ? "Update" : "Create"}
//         </Button>
//       </form>
//     </Form>
//   );
// };

// export default PoojaForm;
//=========================================
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Loader2, Upload } from "lucide-react";
import uploadImage from "@/firebase/image";

const PoojaForm = ({
  onSubmit,
  isEditMode,
  initialData,
  astrologers,
  isPending,
}) => {
  const [imageFile, setImageFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [imageUrl, setImageUrl] = useState(initialData?.image || "");

  const form = useForm({
    defaultValues: initialData || {
      pujaName: "",
      description: "",
      date: "",
      duration: "",
      location: "",
      price: "",
      maxParticipants: "",
      bookedParticipants: "0",
      astrologer: "",
    },
  });

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleFormSubmit = async (data) => {
    let imageUrl = initialData?.image || "";

    if (imageFile) {
      try {
        imageUrl = await uploadImage("poojas", imageFile, setUploadProgress);
      } catch (error) {
        console.error("Error uploading image:", error);
        // Handle the error (e.g., show an error message to the user)
        return;
      }
    }

    onSubmit({ ...data, image: imageUrl });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-4"
      >
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
          name="astrologer"
          rules={{ required: "Astrologer is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Astrologer</FormLabel>
              <FormControl>
                <select {...field}>
                  <option value="">Select an astrologer</option>
                  {astrologers.map((astrologer) => (
                    <option key={astrologer._id} value={astrologer._id}>
                      {astrologer.name}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem>
          <FormLabel>Image</FormLabel>
          <FormControl>
            <div className="flex items-center space-x-2">
              <Input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
              />
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Puja"
                  className="w-12 h-12 object-cover"
                />
              )}
            </div>
          </FormControl>
          {uploadProgress !== null && (
            <div className="mt-2">
              <progress value={uploadProgress} max="100" />
              <span className="ml-2">{Math.round(uploadProgress)}%</span>
            </div>
          )}
        </FormItem>
        <Button type="submit" disabled={isPending || uploadProgress !== null}>
          {(isPending || uploadProgress !== null) && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          {isEditMode ? "Update" : "Create"}
        </Button>
      </form>
    </Form>
  );
};

export default PoojaForm;
