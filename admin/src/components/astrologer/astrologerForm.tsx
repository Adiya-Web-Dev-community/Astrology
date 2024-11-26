// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
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
// import { Checkbox } from "@/components/ui/checkbox";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { X } from "lucide-react";

// const AstrologerForm = ({
//   currentAstrologer,
//   isEditing,
//   onSubmit,
//   categories,
// }) => {
//   console.log("ADD_FORM", categories);
//   console.log("EDIT_FORM", currentAstrologer);

//   const { reset, control } = useForm();
//   // Effect to initialize form values if editing
//   useEffect(() => {
//     if (isEditing && currentAstrologer) {
// reset({
//   name: currentAstrologer.name,
//   email: currentAstrologer.email,
//   firstName: currentAstrologer.firstName,
//   lastName: currentAstrologer.lastName,
//   phoneNumber: currentAstrologer.phoneNumber,
//   specialties: currentAstrologer.specialties.map((s) => s._id),
//   experience: currentAstrologer.experience,
//   bio: currentAstrologer.bio,
//   profileImage: currentAstrologer.profileImage,
//   pricing: currentAstrologer.pricing,
//   isAvailable: currentAstrologer.isAvailable,
// });
//     }
//   }, [isEditing, currentAstrologer, reset]);

//   console.log("currentAstrologer", currentAstrologer);

//   const form = useForm({
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//       firstName: "",
//       lastName: "",
//       phoneNumber: "",
//       specialties: [],
//       experience: "",
//       bio: "",
//       profileImage: "",
//       pricing: "",
//       isAvailable: true,
//     },
//   });

//   const [selectedSpecialties, setSelectedSpecialties] = useState([]);

//   const handleSpecialtySelect = (specialtyId) => {
//     const updatedSpecialties = selectedSpecialties.includes(specialtyId)
//       ? selectedSpecialties.filter((id) => id !== specialtyId)
//       : [...selectedSpecialties, specialtyId];
//     setSelectedSpecialties(updatedSpecialties);
//     form.setValue("specialties", updatedSpecialties);
//   };

//   const removeSpecialty = (specialtyId) => {
//     const updatedSpecialties = selectedSpecialties.filter(
//       (id) => id !== specialtyId
//     );
//     setSelectedSpecialties(updatedSpecialties);
//     form.setValue("specialties", updatedSpecialties);
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <FormField
//             control={form.control}
//             name="name"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Name</FormLabel>
//                 <FormControl>
//                   <Input {...field} className="w-full" />
//                 </FormControl>
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="email"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Email</FormLabel>
//                 <FormControl>
//                   <Input type="email" {...field} className="w-full" />
//                 </FormControl>
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="firstName"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>First Name</FormLabel>
//                 <FormControl>
//                   <Input {...field} className="w-full" />
//                 </FormControl>
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="lastName"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Last Name</FormLabel>
//                 <FormControl>
//                   <Input {...field} className="w-full" />
//                 </FormControl>
//               </FormItem>
//             )}
//           />
//           {!isEditing && (
//             <FormField
//               control={form.control}
//               name="password"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Password</FormLabel>
//                   <FormControl>
//                     <Input type="password" {...field} className="w-full" />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />
//           )}
//           <FormField
//             control={form.control}
//             name="phoneNumber"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Phone Number</FormLabel>
//                 <FormControl>
//                   <Input {...field} className="w-full" />
//                 </FormControl>
//               </FormItem>
//             )}
//           />
//         </div>

//         <FormField
//           control={form.control}
//           name="specialties"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Specialties</FormLabel>
//               <FormControl>
//                 <div className="space-y-2">
//                   <Select onValueChange={handleSpecialtySelect}>
//                     <SelectTrigger className="w-full">
//                       <SelectValue placeholder="Select specialties" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {categories.categories.map((category) => (
//                         <SelectItem key={category._id} value={category._id}>
//                           {category.name}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>

//                   {/* <Select onValueChange={handleSpecialtySelect}>
//                     <SelectTrigger className="w-full">
//                       <SelectValue placeholder="Select specialties" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {Array.isArray(categories) && categories.length > 0 ? (
//                         categories.map((category) => (
//                           <SelectItem key={category._id} value={category._id}>
//                             {category.name}
//                           </SelectItem>
//                         ))
//                       ) : (
//                         <SelectItem disabled>
//                           No categories available
//                         </SelectItem>
//                       )}
//                     </SelectContent>
//                   </Select> */}

//                   <div className="flex flex-wrap gap-2">
//                     {selectedSpecialties.map((specialtyId) => {
//                       const specialty = categories.find(
//                         (c) => c._id === specialtyId
//                       );
//                       return (
//                         <Badge key={specialtyId} variant="secondary">
//                           {specialty.name}
//                           <button
//                             type="button"
//                             onClick={() => removeSpecialty(specialtyId)}
//                             className="ml-1 hover:text-red-500"
//                           >
//                             <X size={14} />
//                           </button>
//                         </Badge>
//                       );
//                     })}
//                   </div>
//                 </div>
//               </FormControl>
//             </FormItem>
//           )}
//         />

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <FormField
//             control={form.control}
//             name="experience"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Experience (years)</FormLabel>
//                 <FormControl>
//                   <Input type="number" {...field} className="w-full" />
//                 </FormControl>
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="pricing"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Pricing</FormLabel>
//                 <FormControl>
//                   <Input type="text" {...field} className="w-full" />
//                 </FormControl>
//               </FormItem>
//             )}
//           />
//         </div>

//         <FormField
//           control={form.control}
//           name="bio"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Biography</FormLabel>
//               <FormControl>
//                 <Textarea {...field} className="w-full" />
//               </FormControl>
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="profileImage"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Profile Image</FormLabel>
//               <FormControl>
//                 <Input
//                   type="file"
//                   onChange={(e) => field.onChange(e.target.files)}
//                   className="w-full"
//                 />
//               </FormControl>
//               {field.value && (
//                 <Avatar>
//                   <AvatarImage
//                     src={
//                       field.value instanceof FileList
//                         ? URL.createObjectURL(field.value[0])
//                         : field.value
//                     }
//                     alt="Profile Image"
//                     width={100}
//                     height={100}
//                   />
//                   <AvatarFallback>Profile</AvatarFallback>
//                 </Avatar>
//               )}
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="isAvailable"
//           render={({ field }) => (
//             <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
//               <FormControl>
//                 <Checkbox
//                   checked={field.value}
//                   onCheckedChange={field.onChange}
//                 />
//               </FormControl>
//               <div className="space-y-1 leading-none">
//                 <FormLabel>Available</FormLabel>
//               </div>
//             </FormItem>
//           )}
//         />

//         <Button type="submit" className="w-full">
//           {isEditing ? "Update" : "Create"}
//         </Button>
//       </form>
//     </Form>
//   );
// };

// export default AstrologerForm;
//==========================================
// import React, { useEffect, useState } from "react";
// import { useForm, Controller } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
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
// import { Checkbox } from "@/components/ui/checkbox";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { X } from "lucide-react";

// const AstrologerForm = ({
//   currentAstrologer,
//   isEditing,
//   onSubmit,
//   categories,
// }) => {
//   const { control, handleSubmit, setValue, getValues, reset, watch } = useForm({
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//       firstName: "",
//       lastName: "",
//       phoneNumber: "",
//       specialties: [],
//       experience: "",
//       bio: "",
//       profileImage: "",
//       pricing: "",
//       isAvailable: true,
//     },
//   });

//   useEffect(() => {
//     if (isEditing && currentAstrologer) {
//       reset({
//         name: currentAstrologer.name,
//         email: currentAstrologer.email,
//         firstName: currentAstrologer.firstName,
//         lastName: currentAstrologer.lastName,
//         phoneNumber: currentAstrologer.phoneNumber,
//         specialties: currentAstrologer.specialties.map((s) => s._id),
//         experience: currentAstrologer.experience,
//         bio: currentAstrologer.bio,
//         profileImage: currentAstrologer.profileImage,
//         pricing: currentAstrologer.pricing,
//         isAvailable: currentAstrologer.isAvailable,
//       });
//     }
//   }, [isEditing, currentAstrologer, reset]);

//   const selectedSpecialties = watch("specialties");

//   const handleSpecialtySelect = (value) => {
//     const currentSpecialties = getValues("specialties");
//     if (currentSpecialties.includes(value)) {
//       setValue(
//         "specialties",
//         currentSpecialties.filter((id) => id !== value)
//       );
//     } else {
//       setValue("specialties", [...currentSpecialties, value]);
//     }
//   };

//   const removeSpecialty = (specialtyId) => {
//     const updatedSpecialties = selectedSpecialties.filter(
//       (id) => id !== specialtyId
//     );
//     setValue("specialties", updatedSpecialties);
//   };

//   return (
//     <Form>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <FormField
//             control={control}
//             name="name"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Name</FormLabel>
//                 <FormControl>
//                   <Input {...field} className="w-full" />
//                 </FormControl>
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={control}
//             name="email"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Email</FormLabel>
//                 <FormControl>
//                   <Input type="email" {...field} className="w-full" />
//                 </FormControl>
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={control}
//             name="firstName"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>First Name</FormLabel>
//                 <FormControl>
//                   <Input {...field} className="w-full" />
//                 </FormControl>
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={control}
//             name="lastName"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Last Name</FormLabel>
//                 <FormControl>
//                   <Input {...field} className="w-full" />
//                 </FormControl>
//               </FormItem>
//             )}
//           />
//           {!isEditing && (
//             <FormField
//               control={control}
//               name="password"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Password</FormLabel>
//                   <FormControl>
//                     <Input type="password" {...field} className="w-full" />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />
//           )}
//           <FormField
//             control={control}
//             name="phoneNumber"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Phone Number</FormLabel>
//                 <FormControl>
//                   <Input {...field} className="w-full" />
//                 </FormControl>
//               </FormItem>
//             )}
//           />
//         </div>

//         <FormField
//           control={control}
//           name="specialties"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Specialties</FormLabel>
//               <FormControl>
//                 <div className="space-y-2">
//                   <Select onValueChange={handleSpecialtySelect}>
//                     <SelectTrigger className="w-full">
//                       <SelectValue placeholder="Select specialties" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {categories.map((category) => (
//                         <SelectItem key={category._id} value={category._id}>
//                           {category.name}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                   <div className="flex flex-wrap gap-2">
//                     {selectedSpecialties.map((specialtyId) => {
//                       const specialty = categories.find(
//                         (c) => c._id === specialtyId
//                       );
//                       return (
//                         <Badge key={specialtyId} variant="secondary">
//                           {specialty.name}
//                           <button
//                             type="button"
//                             onClick={() => removeSpecialty(specialtyId)}
//                             className="ml-1 hover:text-red-500"
//                           >
//                             <X size={14} />
//                           </button>
//                         </Badge>
//                       );
//                     })}
//                   </div>
//                 </div>
//               </FormControl>
//             </FormItem>
//           )}
//         />

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <FormField
//             control={control}
//             name="experience"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Experience (years)</FormLabel>
//                 <FormControl>
//                   <Input type="number" {...field} className="w-full" />
//                 </FormControl>
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={control}
//             name="pricing"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Pricing</FormLabel>
//                 <FormControl>
//                   <Input type="text" {...field} className="w-full" />
//                 </FormControl>
//               </FormItem>
//             )}
//           />
//         </div>

//         <FormField
//           control={control}
//           name="bio"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Biography</FormLabel>
//               <FormControl>
//                 <Textarea {...field} className="w-full" />
//               </FormControl>
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={control}
//           name="profileImage"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Profile Image</FormLabel>
//               <FormControl>
//                 <Input
//                   type="file"
//                   onChange={(e) => {
//                     if (e.target.files && e.target.files[0]) {
//                       const file = e.target.files[0];
//                       setValue("profileImage", file);
//                     }
//                   }}
//                   className="w-full"
//                 />
//               </FormControl>
//               {getValues("profileImage") && (
//                 <Avatar>
//                   <AvatarImage
//                     src={
//                       getValues("profileImage") instanceof File
//                         ? URL.createObjectURL(getValues("profileImage"))
//                         : getValues("profileImage")
//                     }
//                     alt="Profile Image"
//                     width={100}
//                     height={100}
//                   />
//                   <AvatarFallback>Profile</AvatarFallback>
//                 </Avatar>
//               )}
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={control}
//           name="isAvailable"
//           render={({ field }) => (
//             <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
//               <FormControl>
//                 <Checkbox
//                   checked={field.value}
//                   onCheckedChange={field.onChange}
//                 />
//               </FormControl>
//               <div className="space-y-1 leading-none">
//                 <FormLabel>Available</FormLabel>
//               </div>
//             </FormItem>
//           )}
//         />

//         <Button type="submit" className="w-full">
//           {isEditing ? "Update" : "Create"}
//         </Button>
//       </form>
//     </Form>
//   );
// };

// export default AstrologerForm;
//==========================================
// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
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
// import { Checkbox } from "@/components/ui/checkbox";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { X } from "lucide-react";

// // Reusable Input Field Component
// const TextField = ({ name, label, type = "text", form }) => (
//   <FormField
//     control={form.control}
//     name={name}
//     render={({ field }) => (
//       <FormItem>
//         <FormLabel>{label}</FormLabel>
//         <FormControl>
//           <Input type={type} {...field} className="w-full" />
//         </FormControl>
//       </FormItem>
//     )}
//   />
// );

// // Reusable Select Field for specialties
// const SpecialtiesField = ({
//   categories,
//   selectedSpecialties,
//   setSelectedSpecialties,
//   form,
// }) => {
//   const handleSpecialtySelect = (specialtyId) => {
//     const updatedSpecialties = selectedSpecialties.includes(specialtyId)
//       ? selectedSpecialties.filter((id) => id !== specialtyId)
//       : [...selectedSpecialties, specialtyId];
//     setSelectedSpecialties(updatedSpecialties);
//     form.setValue("specialties", updatedSpecialties);
//   };

//   const removeSpecialty = (specialtyId) => {
//     const updatedSpecialties = selectedSpecialties.filter(
//       (id) => id !== specialtyId
//     );
//     setSelectedSpecialties(updatedSpecialties);
//     form.setValue("specialties", updatedSpecialties);
//   };

//   return (
//     <FormField
//       control={form.control}
//       name="specialties"
//       render={() => (
//         <FormItem>
//           <FormLabel>Specialties</FormLabel>
//           <FormControl>
//             <div className="space-y-2">
//               <Select onValueChange={handleSpecialtySelect}>
//                 <SelectTrigger className="w-full">
//                   <SelectValue placeholder="Select specialties" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {categories.map((category) => (
//                     <SelectItem key={category._id} value={category._id}>
//                       {category.name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//               <div className="flex flex-wrap gap-2">
//                 {selectedSpecialties.map((specialtyId) => {
//                   const specialty = categories.find(
//                     (c) => c._id === specialtyId
//                   );
//                   return (
//                     <Badge key={specialtyId} variant="secondary">
//                       {specialty.name}
//                       <button
//                         type="button"
//                         onClick={() => removeSpecialty(specialtyId)}
//                         className="ml-1 hover:text-red-500"
//                       >
//                         <X size={14} />
//                       </button>
//                     </Badge>
//                   );
//                 })}
//               </div>
//             </div>
//           </FormControl>
//         </FormItem>
//       )}
//     />
//   );
// };

// const AstrologerForm = ({
//   currentAstrologer,
//   isEditing,
//   onSubmit,
//   categories,
// }) => {
//   const { reset, control } = useForm();
//   const [selectedSpecialties, setSelectedSpecialties] = useState([]);

//   useEffect(() => {
//     if (isEditing && currentAstrologer) {
//       reset({
//         ...currentAstrologer,
//         specialties: currentAstrologer.specialties.map((s) => s._id),
//       });
//       setSelectedSpecialties(currentAstrologer.specialties.map((s) => s._id));
//     }
//   }, [isEditing, currentAstrologer, reset]);

//   const form = useForm({
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//       firstName: "",
//       lastName: "",
//       phoneNumber: "",
//       specialties: [],
//       experience: "",
//       bio: "",
//       profileImage: "",
//       pricing: "",
//       isAvailable: true,
//     },
//   });

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <TextField name="name" label="Name" form={form} />
//           <TextField name="email" label="Email" type="email" form={form} />
//           <TextField name="firstName" label="First Name" form={form} />
//           <TextField name="lastName" label="Last Name" form={form} />
//           {!isEditing && (
//             <TextField
//               name="password"
//               label="Password"
//               type="password"
//               form={form}
//             />
//           )}
//           <TextField name="phoneNumber" label="Phone Number" form={form} />
//         </div>

//         <SpecialtiesField
//           categories={categories.categories}
//           selectedSpecialties={selectedSpecialties}
//           setSelectedSpecialties={setSelectedSpecialties}
//           form={form}
//         />

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <TextField
//             name="experience"
//             label="Experience (years)"
//             type="number"
//             form={form}
//           />
//           <TextField name="pricing" label="Pricing" form={form} />
//         </div>

//         <FormField
//           control={form.control}
//           name="bio"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Biography</FormLabel>
//               <FormControl>
//                 <Textarea {...field} className="w-full" />
//               </FormControl>
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="profileImage"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Profile Image</FormLabel>
//               <FormControl>
//                 <Input
//                   type="file"
//                   onChange={(e) => field.onChange(e.target.files)}
//                   className="w-full"
//                 />
//               </FormControl>
//               {field.value && (
//                 <Avatar>
//                   <AvatarImage
//                     src={
//                       field.value instanceof FileList
//                         ? URL.createObjectURL(field.value[0])
//                         : field.value
//                     }
//                     alt="Profile Image"
//                     width={100}
//                     height={100}
//                   />
//                   <AvatarFallback>Profile</AvatarFallback>
//                 </Avatar>
//               )}
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="isAvailable"
//           render={({ field }) => (
//             <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
//               <FormControl>
//                 <Checkbox
//                   checked={field.value}
//                   onCheckedChange={field.onChange}
//                 />
//               </FormControl>
//               <div className="space-y-1 leading-none">
//                 <FormLabel>Available</FormLabel>
//               </div>
//             </FormItem>
//           )}
//         />

//         <Button type="submit" className="w-full">
//           {isEditing ? "Update" : "Create"}
//         </Button>
//       </form>
//     </Form>
//   );
// };

// export default AstrologerForm;
//====================================================
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

// Reusable Input Field Component
const TextField = ({ name, label, type = "text", control }) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input type={type} {...field} className="w-full" />
        </FormControl>
      </FormItem>
    )}
  />
);

// Reusable Select Field for specialties
const SpecialtiesField = ({ categories, control, value, onChange }) => {
  const handleSpecialtySelect = (specialtyId) => {
    const updatedSpecialties = value.includes(specialtyId)
      ? value.filter((id) => id !== specialtyId)
      : [...value, specialtyId];
    onChange(updatedSpecialties);
  };

  const removeSpecialty = (specialtyId) => {
    const updatedSpecialties = value.filter((id) => id !== specialtyId);
    onChange(updatedSpecialties);
  };

  // Helper function to get category name
  const getCategoryName = (categoryId) => {
    const category = categories?.find((c) => c._id === categoryId);
    return category?.name || "Unknown Category";
  };

  return (
    <FormField
      control={control}
      name="specialties"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Specialties</FormLabel>
          <FormControl>
            <div className="space-y-2">
              <Select onValueChange={handleSpecialtySelect}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select specialties" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((category) => (
                    <SelectItem
                      key={category._id}
                      value={category._id}
                      disabled={value.includes(category._id)}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex flex-wrap gap-2">
                {value.map((specialtyId) => (
                  <Badge key={specialtyId} variant="secondary">
                    {getCategoryName(specialtyId)}
                    <button
                      type="button"
                      onClick={() => removeSpecialty(specialtyId)}
                      className="ml-1 hover:text-red-500"
                    >
                      <X size={14} />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

const AstrologerForm = ({
  currentAstrologer,
  isEditing,
  onSubmit,
  categories,
}) => {
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

  const { control, reset, setValue, watch } = form;
  const specialties = watch("specialties");

  useEffect(() => {
    if (isEditing && currentAstrologer) {
      const specialtyIds = currentAstrologer.specialties.map((s) => s._id);
      reset({
        ...currentAstrologer,
        specialties: specialtyIds,
        password: undefined, // Don't include password when editing
      });
    }
  }, [isEditing, currentAstrologer, reset]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField name="name" label="Name" control={control} />
          <TextField
            name="email"
            label="Email"
            type="email"
            control={control}
          />
          <TextField name="firstName" label="First Name" control={control} />
          <TextField name="lastName" label="Last Name" control={control} />
          {!isEditing && (
            <TextField
              name="password"
              label="Password"
              type="password"
              control={control}
            />
          )}
          <TextField
            name="phoneNumber"
            label="Phone Number"
            control={control}
          />
        </div>

        <SpecialtiesField
          categories={categories?.categories || []}
          control={control}
          value={specialties}
          onChange={(newSpecialties) => setValue("specialties", newSpecialties)}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField
            name="experience"
            label="Experience (years)"
            type="number"
            control={control}
          />
          <TextField name="pricing" label="Pricing" control={control} />
        </div>

        <FormField
          control={control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Biography</FormLabel>
              <FormControl>
                <Textarea {...field} className="w-full" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="profileImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  onChange={(e) => field.onChange(e.target.files)}
                  className="w-full"
                />
              </FormControl>
              {field.value && (
                <Avatar>
                  <AvatarImage
                    src={
                      field.value instanceof FileList
                        ? URL.createObjectURL(field.value[0])
                        : field.value
                    }
                    alt="Profile Image"
                    width={100}
                    height={100}
                  />
                  <AvatarFallback>Profile</AvatarFallback>
                </Avatar>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="isAvailable"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Available</FormLabel>
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {isEditing ? "Update" : "Create"}
        </Button>
      </form>
    </Form>
  );
};

export default AstrologerForm;
