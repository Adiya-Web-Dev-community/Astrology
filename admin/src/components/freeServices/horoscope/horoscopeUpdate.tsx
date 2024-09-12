// import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
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

// const zodiacSigns = [
//   "aries",
//   "taurus",
//   "gemini",
//   "cancer",
//   "leo",
//   "virgo",
//   "libra",
//   "scorpio",
//   "sagittarius",
//   "capricorn",
//   "aquarius",
//   "pisces",
// ];

// const AdminHoroscopeUpdate = () => {
//   const [selectedZodiac, setSelectedZodiac] = useState("");
//   const queryClient = useQueryClient();
//   const form = useForm({
//     defaultValues: {
//       daily: { description: "", luckyColor: "", luckyNumber: "" },
//       monthly: { description: "", career: "", love: "", health: "", money: "" },
//       yearly: { description: "", career: "", love: "", health: "", money: "" },
//     },
//   });

//   const { data: horoscopeData, isLoading } = useQuery({
//     queryKey: ["horoscope", selectedZodiac],
//     queryFn: async () => {
//       if (!selectedZodiac) return null;
//       const response = await axiosInstance.get(
//         `/free-services/horoscope/${selectedZodiac}`
//       );
//       return response;
//     },
//     enabled: !!selectedZodiac,
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
//     mutationFn: (data) => axiosInstance.post("/free-services/horoscope", data),
//     onSuccess: () => {
//       queryClient.invalidateQueries(["horoscope", selectedZodiac]);
//       toast({
//         title: "Success",
//         description: "Horoscope updated successfully!",
//       });
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
//     updateHoroscopeMutation.mutate({ zodiacSign: selectedZodiac, ...data });
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Update Horoscope</h1>

//       <Select onValueChange={(value) => setSelectedZodiac(value)}>
//         <SelectTrigger className="w-[180px]">
//           <SelectValue placeholder="Select Zodiac Sign" />
//         </SelectTrigger>
//         <SelectContent>
//           {zodiacSigns.map((sign) => (
//             <SelectItem key={sign} value={sign}>
//               {sign.charAt(0).toUpperCase() + sign.slice(1)}
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>

//       {isLoading && <p>Loading...</p>}

//       {selectedZodiac && !isLoading && (
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//             <div>
//               <h2 className="text-xl font-semibold mt-4 mb-2">
//                 Daily Horoscope
//               </h2>
//               <FormField
//                 control={form.control}
//                 name="daily.description"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Description</FormLabel>
//                     <FormControl>
//                       <Textarea {...field} />
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="daily.luckyColor"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Lucky Color</FormLabel>
//                     <FormControl>
//                       <Input {...field} />
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="daily.luckyNumber"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Lucky Number</FormLabel>
//                     <FormControl>
//                       <Input {...field} />
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />
//             </div>

//             <div>
//               <h2 className="text-xl font-semibold mt-4 mb-2">
//                 Monthly Horoscope
//               </h2>
//               {["description", "career", "love", "health", "money"].map(
//                 (field) => (
//                   <FormField
//                     key={field}
//                     control={form.control}
//                     name={`monthly.${field}`}
//                     render={({ field: fieldProps }) => (
//                       <FormItem>
//                         <FormLabel>
//                           {field.charAt(0).toUpperCase() + field.slice(1)}
//                         </FormLabel>
//                         <FormControl>
//                           <Textarea {...fieldProps} />
//                         </FormControl>
//                       </FormItem>
//                     )}
//                   />
//                 )
//               )}
//             </div>

//             <div>
//               <h2 className="text-xl font-semibold mt-4 mb-2">
//                 Yearly Horoscope
//               </h2>
//               {["description", "career", "love", "health", "money"].map(
//                 (field) => (
//                   <FormField
//                     key={field}
//                     control={form.control}
//                     name={`yearly.${field}`}
//                     render={({ field: fieldProps }) => (
//                       <FormItem>
//                         <FormLabel>
//                           {field.charAt(0).toUpperCase() + field.slice(1)}
//                         </FormLabel>
//                         <FormControl>
//                           <Textarea {...fieldProps} />
//                         </FormControl>
//                       </FormItem>
//                     )}
//                   />
//                 )
//               )}
//             </div>

//             <Button type="submit" disabled={updateHoroscopeMutation.isLoading}>
//               {updateHoroscopeMutation.isLoading
//                 ? "Updating..."
//                 : "Update Horoscope"}
//             </Button>
//           </form>
//         </Form>
//       )}
//     </div>
//   );
// };

// export default AdminHoroscopeUpdate;
//==========================================
import { useEffect } from "react";
import { useForm } from "react-hook-form";
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

const AdminHoroscopeUpdate = ({ zodiacSign, onUpdateSuccess, onCancel }) => {
  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      daily: { description: "", luckyColor: "", luckyNumber: "" },
      monthly: { description: "", career: "", love: "", health: "", money: "" },
      yearly: { description: "", career: "", love: "", health: "", money: "" },
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

  useEffect(() => {
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
      });
    }
  }, [horoscopeData, form]);

  const updateHoroscopeMutation = useMutation({
    mutationFn: (data) =>
      axiosInstance.post(`/free-services/horoscope/${zodiacSign}`, data),
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
