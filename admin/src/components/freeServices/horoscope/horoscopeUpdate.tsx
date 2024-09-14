// import { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
// } from "@/components/ui/form";
// import { toast } from "@/components/ui/use-toast";
// import axiosInstance from "@/api/client";
// import uploadImage from "@/firebase/image";

// const AdminHoroscopeUpdate = ({ zodiacSign, onUpdateSuccess, onCancel }) => {
//   const queryClient = useQueryClient();

//   const form = useForm({
//     defaultValues: {
//       daily: { description: "", luckyColor: "", luckyNumber: "" },
//       monthly: { description: "", career: "", love: "", health: "", money: "" },
//       yearly: { description: "", career: "", love: "", health: "", money: "" },
//     },
//   });

//   const { data: horoscopeData, isLoading } = useQuery({
//     queryKey: ["horoscope", zodiacSign],
//     queryFn: async () => {
//       if (!zodiacSign) return null;
//       const response = await axiosInstance.get(
//         `/free-services/horoscope/${zodiacSign}`
//       );
//       return response.data;
//     },
//     enabled: !!zodiacSign,
//   });

//   useEffect(() => {
//     if (horoscopeData) {
//       form.reset({
//         daily: {
//           description: horoscopeData.daily.description || "",
//           luckyColor: horoscopeData.daily.luckyColor || "",
//           luckyNumber: horoscopeData.daily.luckyNumber || "",
//         },
//         monthly: {
//           description: horoscopeData.monthly.description || "",
//           career: horoscopeData.monthly.career || "",
//           love: horoscopeData.monthly.love || "",
//           health: horoscopeData.monthly.health || "",
//           money: horoscopeData.monthly.money || "",
//         },
//         yearly: {
//           description: horoscopeData.yearly.description || "",
//           career: horoscopeData.yearly.career || "",
//           love: horoscopeData.yearly.love || "",
//           health: horoscopeData.yearly.health || "",
//           money: horoscopeData.yearly.money || "",
//         },
//       });
//     }
//   }, [horoscopeData, form]);

//   const updateHoroscopeMutation = useMutation({
//     mutationFn: (data) =>
//       axiosInstance.post(`/free-services/horoscope/${zodiacSign}`, data),
//     onSuccess: () => {
//       queryClient.invalidateQueries(["horoscope", zodiacSign]);
//       toast({
//         title: "Success",
//         description: "Horoscope updated successfully!",
//       });
//       if (onUpdateSuccess) onUpdateSuccess();
//     },
//     onError: (error) => {
//       console.error("Error updating horoscope:", error);
//       toast({
//         title: "Error",
//         description: "Failed to update horoscope. Please try again.",
//         variant: "destructive",
//       });
//     },
//   });

//   const onSubmit = (data) => {
//     updateHoroscopeMutation.mutate(data);
//   };

//   return (
//     <div className="container mx-auto">
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//           {/* Daily Horoscope */}
//           <div>
//             <h2 className="text-xl font-semibold">Daily Horoscope</h2>
//             <FormField
//               control={form.control}
//               name="daily.description"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Description</FormLabel>
//                   <FormControl>
//                     <Textarea {...field} />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="daily.luckyColor"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Lucky Color</FormLabel>
//                   <FormControl>
//                     <Input {...field} />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="daily.luckyNumber"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Lucky Number</FormLabel>
//                   <FormControl>
//                     <Input {...field} />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />
//           </div>

//           {/* Monthly Horoscope */}
//           <div>
//             <h2 className="text-xl font-semibold">Monthly Horoscope</h2>
//             {["description", "career", "love", "health", "money"].map(
//               (field) => (
//                 <FormField
//                   key={field}
//                   control={form.control}
//                   name={`monthly.${field}`}
//                   render={({ field: fieldProps }) => (
//                     <FormItem>
//                       <FormLabel>
//                         {field.charAt(0).toUpperCase() + field.slice(1)}
//                       </FormLabel>
//                       <FormControl>
//                         <Textarea {...fieldProps} />
//                       </FormControl>
//                     </FormItem>
//                   )}
//                 />
//               )
//             )}
//           </div>

//           {/* Yearly Horoscope */}
//           <div>
//             <h2 className="text-xl font-semibold">Yearly Horoscope</h2>
//             {["description", "career", "love", "health", "money"].map(
//               (field) => (
//                 <FormField
//                   key={field}
//                   control={form.control}
//                   name={`yearly.${field}`}
//                   render={({ field: fieldProps }) => (
//                     <FormItem>
//                       <FormLabel>
//                         {field.charAt(0).toUpperCase() + field.slice(1)}
//                       </FormLabel>
//                       <FormControl>
//                         <Textarea {...fieldProps} />
//                       </FormControl>
//                     </FormItem>
//                   )}
//                 />
//               )
//             )}
//           </div>

//           <div className="flex space-x-4">
//             <Button type="submit" disabled={updateHoroscopeMutation.isLoading}>
//               {updateHoroscopeMutation.isLoading ? "Updating..." : "Update"}
//             </Button>
//             <Button variant="outline" onClick={onCancel}>
//               Cancel
//             </Button>
//           </div>
//         </form>
//       </Form>
//     </div>
//   );
// };

// export default AdminHoroscopeUpdate;
//==============================================
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
// } from "@/components/ui/form";
// import { toast } from "@/components/ui/use-toast";
// import axiosInstance from "@/api/client";
// import uploadImage from "@/firebase/image";

// const AdminHoroscopeUpdate = ({ zodiacSign, onUpdateSuccess, onCancel }) => {
//   const queryClient = useQueryClient();
//   const [imageFile, setImageFile] = useState(null);
//   const [imageProgress, setImageProgress] = useState(null);

//   const form = useForm({
//     defaultValues: {
//       daily: { description: "", luckyColor: "", luckyNumber: "" },
//       monthly: { description: "", career: "", love: "", health: "", money: "" },
//       yearly: { description: "", career: "", love: "", health: "", money: "" },
//       zodiacImage: "",
//     },
//   });

//   const { data: horoscopeData, isLoading } = useQuery({
//     queryKey: ["horoscope", zodiacSign],
//     queryFn: async () => {
//       if (!zodiacSign) return null;
//       const response = await axiosInstance.get(
//         `/free-services/horoscope/${zodiacSign}`
//       );
//       return response.data;
//     },
//     enabled: !!zodiacSign,
//   });

//   useEffect(() => {
//     if (horoscopeData) {
//       form.reset({
//         daily: {
//           description: horoscopeData.daily.description || "",
//           luckyColor: horoscopeData.daily.luckyColor || "",
//           luckyNumber: horoscopeData.daily.luckyNumber || "",
//         },
//         monthly: {
//           description: horoscopeData.monthly.description || "",
//           career: horoscopeData.monthly.career || "",
//           love: horoscopeData.monthly.love || "",
//           health: horoscopeData.monthly.health || "",
//           money: horoscopeData.monthly.money || "",
//         },
//         yearly: {
//           description: horoscopeData.yearly.description || "",
//           career: horoscopeData.yearly.career || "",
//           love: horoscopeData.yearly.love || "",
//           health: horoscopeData.yearly.health || "",
//           money: horoscopeData.yearly.money || "",
//         },
//         zodiacImage: horoscopeData.zodiacImage || "",
//       });
//     }
//   }, [horoscopeData, form]);

//   const updateHoroscopeMutation = useMutation({
//     mutationFn: async (data) => {
//       if (imageFile) {
//         const imageURL = await uploadImage(
//           zodiacSign,
//           imageFile,
//           setImageProgress
//         );
//         data.zodiacImage = imageURL;
//       }
//       return axiosInstance.post(`/free-services/horoscope/${zodiacSign}`, data);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["horoscope", zodiacSign]);
//       toast({
//         title: "Success",
//         description: "Horoscope updated successfully!",
//       });
//       if (onUpdateSuccess) onUpdateSuccess();
//     },
//     onError: (error) => {
//       console.error("Error updating horoscope:", error);
//       toast({
//         title: "Error",
//         description: "Failed to update horoscope. Please try again.",
//         variant: "destructive",
//       });
//     },
//   });

//   const onSubmit = (data) => {
//     updateHoroscopeMutation.mutate(data);
//   };

//   const handleImageChange = (e) => {
//     setImageFile(e.target.files[0]);
//   };

//   if (isLoading) return <div>Loading...</div>;

//   return (
//     <div className="container mx-auto">
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//           {/* Daily Horoscope */}
//           <div>
//             <h2 className="text-xl font-semibold">Daily Horoscope</h2>
//             <FormField
//               control={form.control}
//               name="daily.description"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Description</FormLabel>
//                   <FormControl>
//                     <Textarea {...field} />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="daily.luckyColor"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Lucky Color</FormLabel>
//                   <FormControl>
//                     <Input {...field} />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="daily.luckyNumber"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Lucky Number</FormLabel>
//                   <FormControl>
//                     <Input {...field} />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />
//           </div>

//           {/* Monthly Horoscope */}
//           <div>
//             <h2 className="text-xl font-semibold">Monthly Horoscope</h2>
//             {["description", "career", "love", "health", "money"].map(
//               (field) => (
//                 <FormField
//                   key={field}
//                   control={form.control}
//                   name={`monthly.${field}`}
//                   render={({ field: fieldProps }) => (
//                     <FormItem>
//                       <FormLabel>
//                         {field.charAt(0).toUpperCase() + field.slice(1)}
//                       </FormLabel>
//                       <FormControl>
//                         <Textarea {...fieldProps} />
//                       </FormControl>
//                     </FormItem>
//                   )}
//                 />
//               )
//             )}
//           </div>

//           {/* Yearly Horoscope */}
//           <div>
//             <h2 className="text-xl font-semibold">Yearly Horoscope</h2>
//             {["description", "career", "love", "health", "money"].map(
//               (field) => (
//                 <FormField
//                   key={field}
//                   control={form.control}
//                   name={`yearly.${field}`}
//                   render={({ field: fieldProps }) => (
//                     <FormItem>
//                       <FormLabel>
//                         {field.charAt(0).toUpperCase() + field.slice(1)}
//                       </FormLabel>
//                       <FormControl>
//                         <Textarea {...fieldProps} />
//                       </FormControl>
//                     </FormItem>
//                   )}
//                 />
//               )
//             )}
//           </div>

//           {/* Zodiac Image Upload */}
//           <div>
//             <h2 className="text-xl font-semibold">Zodiac Image</h2>
//             <FormField
//               control={form.control}
//               name="zodiacImage"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Upload Image</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="file"
//                       accept="image/*"
//                       onChange={(e) => {
//                         handleImageChange(e);
//                         field.onChange(e.target.files[0]);
//                       }}
//                     />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />
//             {imageFile && <div>Selected file: {imageFile.name}</div>}
//             {imageProgress !== null && (
//               <div>Upload Progress: {Math.round(imageProgress)}%</div>
//             )}
//             {form.watch("zodiacImage") && (
//               <div>
//                 <img
//                   src={
//                     typeof form.watch("zodiacImage") === "string"
//                       ? form.watch("zodiacImage")
//                       : URL.createObjectURL(form.watch("zodiacImage"))
//                   }
//                   alt="Zodiac"
//                   className="w-32 h-32 mt-2"
//                 />
//               </div>
//             )}
//           </div>

//           <div className="flex space-x-4">
//             <Button type="submit" disabled={updateHoroscopeMutation.isLoading}>
//               {updateHoroscopeMutation.isLoading ? "Updating..." : "Update"}
//             </Button>
//             <Button variant="outline" onClick={onCancel}>
//               Cancel
//             </Button>
//           </div>
//         </form>
//       </Form>
//     </div>
//   );
// };

// export default AdminHoroscopeUpdate;
//======================================================
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
// } from "@/components/ui/form";
// import { DatePicker } from "@/components/ui/date-picker";
// import { toast } from "@/components/ui/use-toast";
// import axiosInstance from "@/api/client";
// import uploadImage from "@/firebase/image";

// const AdminHoroscopeUpdate = ({ zodiacSign, onUpdateSuccess, onCancel }) => {
//   const queryClient = useQueryClient();
//   const [imageFile, setImageFile] = useState(null);
//   const [imageProgress, setImageProgress] = useState(null);

//   const form = useForm({
//     defaultValues: {
//       daily: { description: "", luckyColor: "", luckyNumber: "" },
//       monthly: { description: "", career: "", love: "", health: "", money: "" },
//       yearly: { description: "", career: "", love: "", health: "", money: "" },
//       zodiacImage: "",
//       dateRange: { start: "", end: "" }, // Added dateRange
//     },
//   });

//   const { data: horoscopeData, isLoading } = useQuery({
//     queryKey: ["horoscope", zodiacSign],
//     queryFn: async () => {
//       if (!zodiacSign) return null;
//       const response = await axiosInstance.get(
//         `/free-services/horoscope/${zodiacSign}`
//       );
//       return response.data;
//     },
//     enabled: !!zodiacSign,
//   });

//   useEffect(() => {
//     if (horoscopeData) {
//       form.reset({
//         daily: {
//           description: horoscopeData.daily.description || "",
//           luckyColor: horoscopeData.daily.luckyColor || "",
//           luckyNumber: horoscopeData.daily.luckyNumber || "",
//         },
//         monthly: {
//           description: horoscopeData.monthly.description || "",
//           career: horoscopeData.monthly.career || "",
//           love: horoscopeData.monthly.love || "",
//           health: horoscopeData.monthly.health || "",
//           money: horoscopeData.monthly.money || "",
//         },
//         yearly: {
//           description: horoscopeData.yearly.description || "",
//           career: horoscopeData.yearly.career || "",
//           love: horoscopeData.yearly.love || "",
//           health: horoscopeData.yearly.health || "",
//           money: horoscopeData.yearly.money || "",
//         },
//         zodiacImage: horoscopeData.zodiacImage || "",
//         dateRange: {
//           start: horoscopeData.dateRange?.start || "",
//           end: horoscopeData.dateRange?.end || "",
//         },
//       });
//     }
//   }, [horoscopeData, form]);

//   const updateHoroscopeMutation = useMutation({
//     mutationFn: async (data) => {
//       if (imageFile) {
//         const imageURL = await uploadImage(
//           zodiacSign,
//           imageFile,
//           setImageProgress
//         );
//         data.zodiacImage = imageURL;
//       }
//       return axiosInstance.post(`/free-services/horoscope/${zodiacSign}`, data);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["horoscope", zodiacSign]);
//       toast({
//         title: "Success",
//         description: "Horoscope updated successfully!",
//       });
//       if (onUpdateSuccess) onUpdateSuccess();
//     },
//     onError: (error) => {
//       console.error("Error updating horoscope:", error);
//       toast({
//         title: "Error",
//         description: "Failed to update horoscope. Please try again.",
//         variant: "destructive",
//       });
//     },
//   });

//   const onSubmit = (data) => {
//     updateHoroscopeMutation.mutate(data);
//   };

//   const handleImageChange = (e) => {
//     setImageFile(e.target.files[0]);
//   };

//   if (isLoading) return <div>Loading...</div>;

//   return (
//     <div className="container mx-auto">
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//           {/* Daily Horoscope */}
//           <div>
//             <h2 className="text-xl font-semibold">Daily Horoscope</h2>
//             <FormField
//               control={form.control}
//               name="daily.description"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Description</FormLabel>
//                   <FormControl>
//                     <Textarea {...field} />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="daily.luckyColor"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Lucky Color</FormLabel>
//                   <FormControl>
//                     <Input {...field} />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="daily.luckyNumber"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Lucky Number</FormLabel>
//                   <FormControl>
//                     <Input {...field} />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />
//           </div>

//           {/* Monthly Horoscope */}
//           <div>
//             <h2 className="text-xl font-semibold">Monthly Horoscope</h2>
//             {["description", "career", "love", "health", "money"].map(
//               (field) => (
//                 <FormField
//                   key={field}
//                   control={form.control}
//                   name={`monthly.${field}`}
//                   render={({ field: fieldProps }) => (
//                     <FormItem>
//                       <FormLabel>
//                         {field.charAt(0).toUpperCase() + field.slice(1)}
//                       </FormLabel>
//                       <FormControl>
//                         <Textarea {...fieldProps} />
//                       </FormControl>
//                     </FormItem>
//                   )}
//                 />
//               )
//             )}
//           </div>

//           {/* Yearly Horoscope */}
//           <div>
//             <h2 className="text-xl font-semibold">Yearly Horoscope</h2>
//             {["description", "career", "love", "health", "money"].map(
//               (field) => (
//                 <FormField
//                   key={field}
//                   control={form.control}
//                   name={`yearly.${field}`}
//                   render={({ field: fieldProps }) => (
//                     <FormItem>
//                       <FormLabel>
//                         {field.charAt(0).toUpperCase() + field.slice(1)}
//                       </FormLabel>
//                       <FormControl>
//                         <Textarea {...fieldProps} />
//                       </FormControl>
//                     </FormItem>
//                   )}
//                 />
//               )
//             )}
//           </div>

//           {/* Date Range */}
//           <div>
//             <h2 className="text-xl font-semibold">Date Range</h2>
//             <FormField
//               control={form.control}
//               name="dateRange.start"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Start Date</FormLabel>
//                   <FormControl>
//                     <Input type="date" {...field} />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="dateRange.end"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>End Date</FormLabel>
//                   <FormControl>
//                     <Input type="date" {...field} />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />
//           </div>

//           {/* Zodiac Image Upload */}
//           <div>
//             <h2 className="text-xl font-semibold">Zodiac Image</h2>
//             <FormField
//               control={form.control}
//               name="zodiacImage"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Upload Image</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="file"
//                       accept="image/*"
//                       onChange={(e) => {
//                         handleImageChange(e);
//                         field.onChange(e.target.files[0]);
//                       }}
//                     />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />
//             {imageFile && <div>Selected file: {imageFile.name}</div>}
//             {imageProgress !== null && (
//               <div>Upload Progress: {Math.round(imageProgress)}%</div>
//             )}
//             {form.watch("zodiacImage") && (
//               <div>
//                 <img
//                   src={
//                     typeof form.watch("zodiacImage") === "string"
//                       ? form.watch("zodiacImage")
//                       : URL.createObjectURL(form.watch("zodiacImage"))
//                   }
//                   alt="Zodiac"
//                   className="w-32 h-32 mt-2"
//                 />
//               </div>
//             )}
//           </div>

//           <div className="flex space-x-4">
//             <Button type="submit" disabled={updateHoroscopeMutation.isLoading}>
//               {updateHoroscopeMutation.isLoading ? "Updating..." : "Update"}
//             </Button>
//             <Button variant="outline" onClick={onCancel}>
//               Cancel
//             </Button>
//           </div>
//         </form>
//       </Form>
//     </div>
//   );
// };

// export default AdminHoroscopeUpdate;
//===============================================
// import * as React from "react";
// import { useForm, Controller } from "react-hook-form";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
// } from "@/components/ui/form";
// import { toast } from "@/components/ui/use-toast";
// import axiosInstance from "@/api/client";
// import uploadImage from "@/firebase/image";
// import { CalendarDateRangePicker } from "@/components/CalendarDateRangePicker";

// const AdminHoroscopeUpdate = ({ zodiacSign, onUpdateSuccess, onCancel }) => {
//   const queryClient = useQueryClient();
//   const [imageFile, setImageFile] = React.useState(null);
//   const [imageProgress, setImageProgress] = React.useState(null);
//   const [dateRange, setDateRange] = React.useState<DateRange | undefined>(
//     undefined
//   );

//   const form = useForm({
//     defaultValues: {
//       daily: { description: "", luckyColor: "", luckyNumber: "" },
//       monthly: { description: "", career: "", love: "", health: "", money: "" },
//       yearly: { description: "", career: "", love: "", health: "", money: "" },
//       zodiacImage: "",
//       dateRange: undefined,
//     },
//   });

//   const { data: horoscopeData, isLoading } = useQuery({
//     queryKey: ["horoscope", zodiacSign],
//     queryFn: async () => {
//       if (!zodiacSign) return null;
//       const response = await axiosInstance.get(
//         `/free-services/horoscope/${zodiacSign}`
//       );
//       return response.data;
//     },
//     enabled: !!zodiacSign,
//   });

//   React.useEffect(() => {
//     if (horoscopeData) {
//       form.reset({
//         daily: {
//           description: horoscopeData.daily.description || "",
//           luckyColor: horoscopeData.daily.luckyColor || "",
//           luckyNumber: horoscopeData.daily.luckyNumber || "",
//         },
//         monthly: {
//           description: horoscopeData.monthly.description || "",
//           career: horoscopeData.monthly.career || "",
//           love: horoscopeData.monthly.love || "",
//           health: horoscopeData.monthly.health || "",
//           money: horoscopeData.monthly.money || "",
//         },
//         yearly: {
//           description: horoscopeData.yearly.description || "",
//           career: horoscopeData.yearly.career || "",
//           love: horoscopeData.yearly.love || "",
//           health: horoscopeData.yearly.health || "",
//           money: horoscopeData.yearly.money || "",
//         },
//         zodiacImage: horoscopeData.zodiacImage || "",
//         dateRange: horoscopeData.dateRange || undefined,
//       });
//       setDateRange(horoscopeData.dateRange);
//     }
//   }, [horoscopeData, form]);

//   const updateHoroscopeMutation = useMutation({
//     mutationFn: async (data) => {
//       if (imageFile) {
//         const imageURL = await uploadImage(
//           zodiacSign,
//           imageFile,
//           setImageProgress
//         );
//         data.zodiacImage = imageURL;
//       }
//       return axiosInstance.post(`/free-services/horoscope`, {
//         ...data,
//         dateRange,
//       });
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["horoscope", zodiacSign]);
//       toast({
//         title: "Success",
//         description: "Horoscope updated successfully!",
//       });
//       if (onUpdateSuccess) onUpdateSuccess();
//     },
//     onError: (error) => {
//       console.error("Error updating horoscope:", error);
//       toast({
//         title: "Error",
//         description: "Failed to update horoscope. Please try again.",
//         variant: "destructive",
//       });
//     },
//   });

//   const onSubmit = (data) => {
//     updateHoroscopeMutation.mutate(data);
//   };

//   const handleImageChange = (e) => {
//     setImageFile(e.target.files[0]);
//   };

//   if (isLoading) return <div>Loading...</div>;

//   return (
//     <div className="container mx-auto">
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//           {/* Daily Horoscope */}
//           <div>
//             <h2 className="text-xl font-semibold">Daily Horoscope</h2>
//             <FormField
//               control={form.control}
//               name="daily.description"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Description</FormLabel>
//                   <FormControl>
//                     <Textarea {...field} />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="daily.luckyColor"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Lucky Color</FormLabel>
//                   <FormControl>
//                     <Input {...field} />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="daily.luckyNumber"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Lucky Number</FormLabel>
//                   <FormControl>
//                     <Input {...field} />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />
//           </div>

//           {/* Monthly Horoscope */}
//           <div>
//             <h2 className="text-xl font-semibold">Monthly Horoscope</h2>
//             {["description", "career", "love", "health", "money"].map(
//               (field) => (
//                 <FormField
//                   key={field}
//                   control={form.control}
//                   name={`monthly.${field}`}
//                   render={({ field: fieldProps }) => (
//                     <FormItem>
//                       <FormLabel>
//                         {field.charAt(0).toUpperCase() + field.slice(1)}
//                       </FormLabel>
//                       <FormControl>
//                         <Textarea {...fieldProps} />
//                       </FormControl>
//                     </FormItem>
//                   )}
//                 />
//               )
//             )}
//           </div>

//           {/* Yearly Horoscope */}
//           <div>
//             <h2 className="text-xl font-semibold">Yearly Horoscope</h2>
//             {["description", "career", "love", "health", "money"].map(
//               (field) => (
//                 <FormField
//                   key={field}
//                   control={form.control}
//                   name={`yearly.${field}`}
//                   render={({ field: fieldProps }) => (
//                     <FormItem>
//                       <FormLabel>
//                         {field.charAt(0).toUpperCase() + field.slice(1)}
//                       </FormLabel>
//                       <FormControl>
//                         <Textarea {...fieldProps} />
//                       </FormControl>
//                     </FormItem>
//                   )}
//                 />
//               )
//             )}
//           </div>

//           {/* Date Range Picker */}
//           <div>
//             <h2 className="text-xl font-semibold">Date Range</h2>
//             <Controller
//               name="dateRange"
//               control={form.control}
//               render={({ field }) => (
//                 <CalendarDateRangePicker
//                   dateRange={dateRange}
//                   onDateRangeChange={(range) => {
//                     setDateRange(range);
//                     field.onChange(range);
//                   }}
//                 />
//               )}
//             />
//           </div>

//           {/* Zodiac Image Upload */}
//           <div>
//             <h2 className="text-xl font-semibold">Zodiac Image</h2>
//             <FormField
//               control={form.control}
//               name="zodiacImage"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Upload Image</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="file"
//                       accept="image/*"
//                       onChange={(e) => {
//                         handleImageChange(e);
//                         field.onChange(e.target.files[0]);
//                       }}
//                     />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />
//             {imageFile && <div>Selected file: {imageFile.name}</div>}
//             {imageProgress !== null && (
//               <div>Upload Progress: {Math.round(imageProgress)}%</div>
//             )}
//             {form.watch("zodiacImage") && (
//               <div>
//                 <img
//                   src={
//                     typeof form.watch("zodiacImage") === "string"
//                       ? form.watch("zodiacImage")
//                       : URL.createObjectURL(form.watch("zodiacImage"))
//                   }
//                   alt="Zodiac"
//                   className="w-32 h-32 mt-2"
//                 />
//               </div>
//             )}
//           </div>

//           <div className="flex space-x-4">
//             <Button type="submit" disabled={updateHoroscopeMutation.isLoading}>
//               {updateHoroscopeMutation.isLoading ? "Updating..." : "Update"}
//             </Button>
//             <Button variant="outline" onClick={onCancel}>
//               Cancel
//             </Button>
//           </div>
//         </form>
//       </Form>
//     </div>
//   );
// };

// export default AdminHoroscopeUpdate;
//=======================================================
import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import axiosInstance from "@/api/client";
import uploadImage from "@/firebase/image";
import { CalendarDateRangePicker } from "@/components/CalendarDateRangePicker";
import { DateRange } from "react-day-picker";

const AdminHoroscopeUpdate = ({ zodiacSign, onUpdateSuccess, onCancel }) => {
  const queryClient = useQueryClient();
  const [imageFile, setImageFile] = React.useState(null);
  const [imageProgress, setImageProgress] = React.useState(null);
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(
    undefined
  );

  const form = useForm({
    defaultValues: {
      daily: { description: "", luckyColor: "", luckyNumber: "" },
      monthly: { description: "", career: "", love: "", health: "", money: "" },
      yearly: { description: "", career: "", love: "", health: "", money: "" },
      zodiacImage: "",
      dateRange: undefined,
    },
  });

  const { data: horoscopeData, isLoading } = useQuery({
    queryKey: ["horoscope", zodiacSign],
    queryFn: async () => {
      if (!zodiacSign) return null;
      const response = await axiosInstance.get(
        `/free-services/horoscope/${zodiacSign}`
      );
      return response.data;
    },
    enabled: !!zodiacSign,
  });

  React.useEffect(() => {
    if (horoscopeData) {
      form.reset({
        daily: {
          description: horoscopeData.daily.description || "",
          luckyColor: horoscopeData.daily.luckyColor || "",
          luckyNumber: horoscopeData.daily.luckyNumber || "",
        },
        monthly: {
          description: horoscopeData.monthly.description || "",
          career: horoscopeData.monthly.career || "",
          love: horoscopeData.monthly.love || "",
          health: horoscopeData.monthly.health || "",
          money: horoscopeData.monthly.money || "",
        },
        yearly: {
          description: horoscopeData.yearly.description || "",
          career: horoscopeData.yearly.career || "",
          love: horoscopeData.yearly.love || "",
          health: horoscopeData.yearly.health || "",
          money: horoscopeData.yearly.money || "",
        },
        zodiacImage: horoscopeData.zodiacImage || "",
        dateRange: horoscopeData.dateRange
          ? {
              start: new Date(horoscopeData.dateRange.start),
              end: new Date(horoscopeData.dateRange.end),
            }
          : undefined,
      });
      setDateRange(
        horoscopeData.dateRange
          ? {
              from: new Date(horoscopeData.dateRange.start),
              to: new Date(horoscopeData.dateRange.end),
            }
          : undefined
      );
    }
  }, [horoscopeData, form]);

  const updateHoroscopeMutation = useMutation({
    mutationFn: async (data) => {
      if (imageFile) {
        const imageURL = await uploadImage(
          zodiacSign,
          imageFile,
          setImageProgress
        );
        data.zodiacImage = imageURL;
      }

      // Format dateRange if it's defined
      const formattedDateRange = dateRange
        ? {
            start: dateRange.from.toISOString(),
            end: dateRange.to.toISOString(),
          }
        : undefined;

      return axiosInstance.post(`/free-services/horoscope`, {
        ...data,
        zodiacSign,
        dateRange: formattedDateRange,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["horoscope", zodiacSign]);
      toast({
        title: "Success",
        description: "Horoscope updated successfully!",
      });
      if (onUpdateSuccess) onUpdateSuccess();
    },
    onError: (error) => {
      console.error("Error updating horoscope:", error);
      toast({
        title: "Error",
        description: "Failed to update horoscope. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data) => {
    updateHoroscopeMutation.mutate(data);
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Daily Horoscope */}
          <div>
            <h2 className="text-xl font-semibold">Daily Horoscope</h2>
            <FormField
              control={form.control}
              name="daily.description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="daily.luckyColor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lucky Color</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="daily.luckyNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lucky Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Monthly Horoscope */}
          <div>
            <h2 className="text-xl font-semibold">Monthly Horoscope</h2>
            {["description", "career", "love", "health", "money"].map(
              (field) => (
                <FormField
                  key={field}
                  control={form.control}
                  name={`monthly.${field}`}
                  render={({ field: fieldProps }) => (
                    <FormItem>
                      <FormLabel>
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </FormLabel>
                      <FormControl>
                        <Textarea {...fieldProps} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )
            )}
          </div>

          {/* Yearly Horoscope */}
          <div>
            <h2 className="text-xl font-semibold">Yearly Horoscope</h2>
            {["description", "career", "love", "health", "money"].map(
              (field) => (
                <FormField
                  key={field}
                  control={form.control}
                  name={`yearly.${field}`}
                  render={({ field: fieldProps }) => (
                    <FormItem>
                      <FormLabel>
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </FormLabel>
                      <FormControl>
                        <Textarea {...fieldProps} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )
            )}
          </div>

          {/* Date Range Picker */}
          <div>
            <h2 className="text-xl font-semibold">Date Range</h2>
            <Controller
              name="dateRange"
              control={form.control}
              render={({ field }) => (
                <CalendarDateRangePicker
                  dateRange={dateRange}
                  onDateRangeChange={(range) => {
                    setDateRange(range);
                    field.onChange(range);
                  }}
                />
              )}
            />
          </div>

          {/* Zodiac Image Upload */}
          <div>
            <h2 className="text-xl font-semibold">Zodiac Image</h2>
            <FormField
              control={form.control}
              name="zodiacImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        handleImageChange(e);
                        field.onChange(e.target.files[0]);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {imageFile && <div>Selected file: {imageFile.name}</div>}
            {imageProgress !== null && (
              <div>Upload Progress: {Math.round(imageProgress)}%</div>
            )}
            {form.watch("zodiacImage") && (
              <div>
                <img
                  src={
                    typeof form.watch("zodiacImage") === "string"
                      ? form.watch("zodiacImage")
                      : URL.createObjectURL(form.watch("zodiacImage"))
                  }
                  alt="Zodiac"
                  className="w-32 h-32 mt-2"
                />
              </div>
            )}
          </div>

          <div className="flex space-x-4">
            <Button type="submit" disabled={updateHoroscopeMutation.isLoading}>
              {updateHoroscopeMutation.isLoading ? "Updating..." : "Update"}
            </Button>
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AdminHoroscopeUpdate;
