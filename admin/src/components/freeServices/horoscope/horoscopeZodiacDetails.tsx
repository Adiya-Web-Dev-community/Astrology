// import { useQuery } from "@tanstack/react-query";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { useParams } from "react-router-dom";
// import axiosInstance from "@/api/client";

// const useHoroscopeData = (zodiacSign) => {
//   return useQuery({
//     queryKey: ["horoscope", zodiacSign],
//     queryFn: async () => {
//       if (!zodiacSign) return null;
//       const response = await axiosInstance.get(
//         `/free-services/horoscope/${zodiacSign}`
//       );
//       return response;
//     },
//     enabled: !!zodiacSign,
//   });
// };

// const formatDate = (dateString, format) => {
//   const date = new Date(dateString);
//   switch (format) {
//     case "daily":
//       return date.toLocaleDateString(undefined, {
//         weekday: "long",
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//       });
//     case "monthly":
//       return date.toLocaleDateString(undefined, {
//         year: "numeric",
//         month: "long",
//       });
//     case "yearly":
//       return date.getFullYear().toString();
//     default:
//       return dateString;
//   }
// };

// const HoroscopeSection = ({ title, data, dateKey, format }) => (
//   <div className="space-y-4">
//     <h2 className="text-xl font-semibold">{title}</h2>
//     {dateKey && data[dateKey] && (
//       <p className="text-lg font-medium">
//         For: {formatDate(data[dateKey], format)}
//       </p>
//     )}
//     {Object.entries(data).map(([key, value]) => {
//       if (key !== dateKey) {
//         return (
//           <p key={key}>
//             <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{" "}
//             {value || "N/A"}
//           </p>
//         );
//       }
//       return null;
//     })}
//   </div>
// );

// const HoroscopeZodiacDetails = () => {
//   const { zodiacSign } = useParams();
//   const { data: horoscopeData, isLoading } = useHoroscopeData(zodiacSign);

//   const capitalizedZodiacSign =
//     zodiacSign?.charAt(0).toUpperCase() + zodiacSign?.slice(1);

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">
//         Horoscope Details for {capitalizedZodiacSign}
//       </h1>

//       {isLoading && <p>Loading...</p>}

//       {!isLoading && horoscopeData && (
//         <div className="mt-8">
//           <Tabs defaultValue="daily">
//             <TabsList>
//               <TabsTrigger value="daily">Daily Horoscope</TabsTrigger>
//               <TabsTrigger value="monthly">Monthly Horoscope</TabsTrigger>
//               <TabsTrigger value="yearly">Yearly Horoscope</TabsTrigger>
//             </TabsList>

//             <TabsContent value="daily">
//               <HoroscopeSection
//                 title="Daily Horoscope"
//                 data={horoscopeData.daily}
//                 dateKey="date"
//                 format="daily"
//               />
//             </TabsContent>

//             <TabsContent value="monthly">
//               <HoroscopeSection
//                 title="Monthly Horoscope"
//                 data={horoscopeData.monthly}
//                 dateKey="month"
//                 format="monthly"
//               />
//             </TabsContent>

//             <TabsContent value="yearly">
//               <HoroscopeSection
//                 title="Yearly Horoscope"
//                 data={horoscopeData.yearly}
//                 dateKey="year"
//                 format="yearly"
//               />
//             </TabsContent>
//           </Tabs>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HoroscopeZodiacDetails;
//=================================================
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import axiosInstance from "@/api/client";
import AdminHoroscopeUpdate from "./horoscopeUpdate";

const useHoroscopeData = (zodiacSign) => {
  return useQuery({
    queryKey: ["horoscope", zodiacSign],
    queryFn: async () => {
      if (!zodiacSign) return null;
      const response = await axiosInstance.get(
        `/free-services/horoscope/${zodiacSign}`
      );
      return response;
    },
    enabled: !!zodiacSign,
  });
};

const formatDate = (dateString, format) => {
  const date = new Date(dateString);
  switch (format) {
    case "daily":
      return date.toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    case "monthly":
      return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
      });
    case "yearly":
      return date.getFullYear().toString();
    default:
      return dateString;
  }
};

const HoroscopeSection = ({ title, data, dateKey, format }) => (
  <div className="space-y-4">
    <h2 className="text-xl font-semibold">{title}</h2>
    {dateKey && data[dateKey] && (
      <p className="text-lg font-medium">
        For: {formatDate(data[dateKey], format)}
      </p>
    )}
    {Object.entries(data).map(([key, value]) => {
      if (key !== dateKey) {
        return (
          <p key={key}>
            <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{" "}
            {value || "N/A"}
          </p>
        );
      }
      return null;
    })}
  </div>
);

const HoroscopeZodiacDetails = () => {
  const { zodiacSign } = useParams();
  const { data: horoscopeData, isLoading } = useHoroscopeData(zodiacSign);

  const [editMode, setEditMode] = useState(false); // State for toggling between view and edit modes

  const capitalizedZodiacSign =
    zodiacSign?.charAt(0).toUpperCase() + zodiacSign?.slice(1);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Horoscope Details for {capitalizedZodiacSign}
      </h1>

      {isLoading && <p>Loading...</p>}

      {!isLoading && horoscopeData && (
        <div className="mt-8">
          {!editMode ? ( // Conditionally render based on edit mode
            <>
              <Tabs defaultValue="daily">
                <TabsList>
                  <TabsTrigger value="daily">Daily </TabsTrigger>
                  <TabsTrigger value="monthly">Monthly </TabsTrigger>
                  <TabsTrigger value="yearly">Yearly </TabsTrigger>
                </TabsList>

                <TabsContent value="daily">
                  <HoroscopeSection
                    title="Daily Horoscope"
                    data={horoscopeData.daily}
                    dateKey="date"
                    format="daily"
                  />
                </TabsContent>

                <TabsContent value="monthly">
                  <HoroscopeSection
                    title="Monthly Horoscope"
                    data={horoscopeData.monthly}
                    dateKey="month"
                    format="monthly"
                  />
                </TabsContent>

                <TabsContent value="yearly">
                  <HoroscopeSection
                    title="Yearly Horoscope"
                    data={horoscopeData.yearly}
                    dateKey="year"
                    format="yearly"
                  />
                </TabsContent>
              </Tabs>

              {/* Edit Button - conditionally shown, for example, to admins */}
              <Button onClick={() => setEditMode(true)} className="mt-4">
                Edit Horoscope
              </Button>
            </>
          ) : (
            <AdminHoroscopeUpdate
              zodiacSign={zodiacSign}
              onUpdateSuccess={() => setEditMode(false)}
              onCancel={() => setEditMode(false)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default HoroscopeZodiacDetails;
