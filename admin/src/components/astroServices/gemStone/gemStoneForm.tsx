// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Switch } from "@/components/ui/switch";
// import { Loader2 } from "lucide-react";
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from "@/components/ui/form";
// import uploadMultipleImage from "@/firebase/multipleImag";

// const GemstoneForm = ({ onSubmit, initialData, isLoading, isEditMode }) => {
//   const [uploadProgress, setUploadProgress] = useState(null);
//   const [selectedFiles, setSelectedFiles] = useState([]);

//   const form = useForm({
//     defaultValues: initialData || {
//       name: "",
//       description: "",
//       price: "",
//       carat: "",
//       zodiacSign: "",
//       availability: true,
//     },
//   });

//   const handleFileChange = (event) => {
//     setSelectedFiles(Array.from(event.target.files));
//   };

//   const handleSubmit = async (data) => {
//     const formattedData = {
//       ...data,
//       price: parseFloat(data.price),
//       carat: parseFloat(data.carat),
//       availability: Boolean(data.availability),
//     };

//     if (selectedFiles.length > 0) {
//       try {
//         const uploadPromises = selectedFiles.map((file) =>
//           uploadMultipleImage("gemstones", file, setUploadProgress)
//         );
//         const imageUrls = await Promise.all(uploadPromises);
//         formattedData.images = imageUrls;
//       } catch (error) {
//         console.error("Error uploading images:", error);
//         // Handle the error appropriately
//         return;
//       }
//     }

//     onSubmit(formattedData);
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
//         <FormField
//           control={form.control}
//           name="name"
//           rules={{ required: "Name is required" }}
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
//           name="carat"
//           rules={{ required: "Carat is required" }}
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Carat</FormLabel>
//               <FormControl>
//                 <Input type="number" step="0.1" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="zodiacSign"
//           rules={{ required: "Zodiac Sign is required" }}
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Zodiac Sign</FormLabel>
//               <FormControl>
//                 <Input {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="availability"
//           render={({ field }) => (
//             <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
//               <div className="space-y-0.5">
//                 <FormLabel className="text-base">Availability</FormLabel>
//               </div>
//               <FormControl>
//                 <Switch
//                   checked={field.value}
//                   onCheckedChange={field.onChange}
//                 />
//               </FormControl>
//             </FormItem>
//           )}
//         />
//         <FormItem>
//           <FormLabel>Images</FormLabel>
//           <FormControl>
//             <Input type="file" multiple onChange={handleFileChange} />
//           </FormControl>
//           {uploadProgress !== null && (
//             <div>Upload progress: {uploadProgress.toFixed(2)}%</div>
//           )}
//         </FormItem>
//         <Button type="submit" disabled={isLoading || uploadProgress !== null}>
//           {(isLoading || uploadProgress !== null) && (
//             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//           )}
//           {isEditMode ? "Update" : "Create"}
//         </Button>
//       </form>
//     </Form>
//   );
// };

// export default GemstoneForm;
//======================================================
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Switch } from "@/components/ui/switch";
// import { Loader2 } from "lucide-react";
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from "@/components/ui/form";
// import uploadMultipleImage from "@/firebase/multipleImag";

// const GemstoneForm = ({ onSubmit, initialData, isLoading, isEditMode }) => {
//   const [uploadProgress, setUploadProgress] = useState(null);
//   const [selectedFiles, setSelectedFiles] = useState([]);

//   const form = useForm({
//     defaultValues: initialData || {
//       name: "",
//       description: "",
//       price: "",
//       additionalInfo: {
//         carat: "",
//         zodiacSign: "",
//         weightInRatti: "",
//         weightInGrams: "",
//         colour: "",
//         origin: "",
//         quality: "",
//         shape: "",
//         mantra: "",
//         size: "",
//         certification: "",
//         treatment: "",
//       },
//       availability: true,
//     },
//   });

//   const handleFileChange = (event) => {
//     setSelectedFiles(Array.from(event.target.files));
//   };

//   const handleSubmit = async (data) => {
//     const formattedData = {
//       name: data.name,
//       description: data.description,
//       price: parseFloat(data.price),
//       availability: Boolean(data.availability),
//       additionalInfo: {
//         carat: parseFloat(data.additionalInfo.carat),
//         zodiacSign: data.additionalInfo.zodiacSign,
//         weightInRatti: parseFloat(data.additionalInfo.weightInRatti),
//         weightInGrams: parseFloat(data.additionalInfo.weightInGrams),
//         colour: data.additionalInfo.colour,
//         origin: data.additionalInfo.origin,
//         quality: data.additionalInfo.quality,
//         shape: data.additionalInfo.shape,
//         mantra: data.additionalInfo.mantra,
//         size: data.additionalInfo.size,
//         certification: data.additionalInfo.certification,
//         treatment: data.additionalInfo.treatment,
//       },
//     };

//     if (selectedFiles.length > 0) {
//       try {
//         const uploadPromises = selectedFiles.map((file) =>
//           uploadMultipleImage("gemstones", file, setUploadProgress)
//         );
//         const imageUrls = await Promise.all(uploadPromises);
//         formattedData.images = imageUrls;
//       } catch (error) {
//         console.error("Error uploading images:", error);
//         return;
//       }
//     }

//     onSubmit(formattedData);
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
//         <FormField
//           control={form.control}
//           name="name"
//           rules={{ required: "Name is required" }}
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
//           name="additionalInfo.carat"
//           rules={{ required: "Carat is required" }}
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Carat</FormLabel>
//               <FormControl>
//                 <Input type="number" step="0.1" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="additionalInfo.zodiacSign"
//           rules={{ required: "Zodiac Sign is required" }}
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Zodiac Sign</FormLabel>
//               <FormControl>
//                 <Input {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="additionalInfo.weightInRatti"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Weight in Ratti</FormLabel>
//               <FormControl>
//                 <Input type="number" step="0.1" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="additionalInfo.weightInGrams"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Weight in Grams</FormLabel>
//               <FormControl>
//                 <Input type="number" step="0.1" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="additionalInfo.colour"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Colour</FormLabel>
//               <FormControl>
//                 <Input {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="additionalInfo.origin"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Origin</FormLabel>
//               <FormControl>
//                 <Input {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="additionalInfo.quality"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Quality</FormLabel>
//               <FormControl>
//                 <Input {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="additionalInfo.shape"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Shape</FormLabel>
//               <FormControl>
//                 <Input {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="additionalInfo.mantra"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Mantra</FormLabel>
//               <FormControl>
//                 <Input {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="additionalInfo.size"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Size</FormLabel>
//               <FormControl>
//                 <Input {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="additionalInfo.certification"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Certification</FormLabel>
//               <FormControl>
//                 <Input {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="additionalInfo.treatment"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Treatment</FormLabel>
//               <FormControl>
//                 <Input {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="availability"
//           render={({ field }) => (
//             <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
//               <div className="space-y-0.5">
//                 <FormLabel className="text-base">Availability</FormLabel>
//               </div>
//               <FormControl>
//                 <Switch
//                   checked={field.value}
//                   onCheckedChange={field.onChange}
//                 />
//               </FormControl>
//             </FormItem>
//           )}
//         />
//         <FormItem>
//           <FormLabel>Images</FormLabel>
//           <FormControl>
//             <Input type="file" multiple onChange={handleFileChange} />
//           </FormControl>
//           {uploadProgress !== null && (
//             <div>Upload progress: {uploadProgress.toFixed(2)}%</div>
//           )}
//         </FormItem>
//         <Button type="submit" disabled={isLoading || uploadProgress !== null}>
//           {(isLoading || uploadProgress !== null) && (
//             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//           )}
//           {isEditMode ? "Update" : "Create"}
//         </Button>
//       </form>
//     </Form>
//   );
// };

// export default GemstoneForm;
//=============================================
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import uploadMultipleImage from "@/firebase/multipleImag";

const GemstoneForm = ({ onSubmit, initialData, isLoading, isEditMode }) => {
  const [uploadProgress, setUploadProgress] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const form = useForm({
    defaultValues: initialData || {
      name: "",
      description: "",
      price: "",
      additionalInfo: {
        carat: "",
        zodiacSign: "",
        weightInRatti: "",
        weightInGrams: "",
        colour: "",
        origin: "",
        quality: "",
        shape: "",
        mantra: "",
        size: "",
        certification: "",
        treatment: "",
      },
      availability: true,
    },
  });

  const handleFileChange = (event) => {
    setSelectedFiles(Array.from(event.target.files));
  };

  const handleSubmit = async (data) => {
    const formattedData = {
      name: data.name,
      description: data.description,
      price: parseFloat(data.price),
      availability: Boolean(data.availability),
      additionalInfo: {
        carat: parseFloat(data.additionalInfo.carat),
        zodiacSign: data.additionalInfo.zodiacSign,
        weightInRatti: parseFloat(data.additionalInfo.weightInRatti),
        weightInGrams: parseFloat(data.additionalInfo.weightInGrams),
        colour: data.additionalInfo.colour,
        origin: data.additionalInfo.origin,
        quality: data.additionalInfo.quality,
        shape: data.additionalInfo.shape,
        mantra: data.additionalInfo.mantra,
        size: data.additionalInfo.size,
        certification: data.additionalInfo.certification,
        treatment: data.additionalInfo.treatment,
      },
    };

    if (selectedFiles.length > 0) {
      try {
        const uploadPromises = selectedFiles.map((file) =>
          uploadMultipleImage("gemstones", file, setUploadProgress)
        );
        const imageUrls = await Promise.all(uploadPromises);
        formattedData.images = imageUrls;
      } catch (error) {
        console.error("Error uploading images:", error);
        return;
      }
    }

    onSubmit(formattedData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {/* Grid Container for Two-Column Layout */}
        <div className="grid grid-cols-2 gap-4">
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
            name="additionalInfo.carat"
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
            name="additionalInfo.zodiacSign"
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
            name="additionalInfo.weightInRatti"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight in Ratti</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="additionalInfo.weightInGrams"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight in Grams</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="additionalInfo.colour"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Colour</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="additionalInfo.origin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Origin</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="additionalInfo.quality"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quality</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="additionalInfo.shape"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shape</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="additionalInfo.mantra"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mantra</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="additionalInfo.size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Size</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="additionalInfo.certification"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Certification</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="additionalInfo.treatment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Treatment</FormLabel>
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
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 col-span-2">
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
        </div>

        {/* File Upload and Submit Button */}
        <FormItem>
          <FormLabel>Images</FormLabel>
          <FormControl>
            <Input type="file" multiple onChange={handleFileChange} />
          </FormControl>
          {uploadProgress !== null && (
            <div>Upload progress: {uploadProgress.toFixed(2)}%</div>
          )}
        </FormItem>

        <Button type="submit" disabled={isLoading || uploadProgress !== null}>
          {(isLoading || uploadProgress !== null) && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          {isEditMode ? "Update" : "Create"}
        </Button>
      </form>
    </Form>
  );
};

export default GemstoneForm;
