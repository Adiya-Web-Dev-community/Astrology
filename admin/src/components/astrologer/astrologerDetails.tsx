// import React from "react";
// import { useParams } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import axiosInstance from "@/api/client";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardHeader, CardContent } from "@/components/ui/card";
// import { Layout } from "../custom/layout";
// import Loader from "../loader";

// const AstrologerDetails = () => {
//   const { id } = useParams();

//   const {
//     isLoading,
//     error,
//     data: astrologer,
//   } = useQuery({
//     queryKey: ["astrologer", id],
//     queryFn: async () => {
//       const response = await axiosInstance.get(`/astrologers/${id}`);
//       return response.data;
//     },
//   });

//   if (isLoading) return <Loader />;
//   if (error) return <div>An error occurred: {error.message}</div>;

//   return (
//     <Layout>
//       <Layout.Body>
//         <div className="container mx-auto mt-8">
//           <Card className="max-w-3xl mx-auto">
//             <CardHeader className="flex items-center space-x-4">
//               <Avatar className="w-24 h-24">
//                 <AvatarImage
//                   src={astrologer.profileImage}
//                   alt={astrologer.name}
//                 />
//                 <AvatarFallback>{astrologer.name.charAt(0)}</AvatarFallback>
//               </Avatar>
//               <div>
//                 <h1 className="text-3xl font-bold">{astrologer.name}</h1>
//                 <p className="text-gray-500">{astrologer.email}</p>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <h2 className="text-xl font-semibold mb-2">
//                     Personal Information
//                   </h2>
//                   <p>
//                     <strong>Phone:</strong> {astrologer.phoneNumber}
//                   </p>
//                   <p>
//                     <strong>Experience:</strong> {astrologer.experience} years
//                   </p>
//                   <p>
//                     <strong>Pricing:</strong> ₹{astrologer.pricing}
//                   </p>
//                   <p>
//                     <strong>Availability:</strong>{" "}
//                     {astrologer.isAvailable ? "Available" : "Not Available"}
//                   </p>
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-semibold mb-2">Specialties</h2>
//                   <div className="flex flex-wrap gap-2">
//                     {astrologer.specialties.map((specialty) => (
//                       <Badge key={specialty._id} variant="secondary">
//                         {specialty.name}
//                       </Badge>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//               <div className="mt-6">
//                 <h2 className="text-xl font-semibold mb-2">Bio</h2>
//                 <p>{astrologer.bio}</p>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </Layout.Body>
//     </Layout>
//   );
// };

// export default AstrologerDetails;
//======================================================
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Layout } from "../custom/layout";
import Loader from "../loader";
import StarRating from "./StarRating";
import { Button } from "../ui/button";

const AstrologerDetails = () => {
  const { id } = useParams();

  const {
    isLoading,
    error,
    data: astrologer,
  } = useQuery({
    queryKey: ["astrologer", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/astrologers/${id}`);
      return response.data;
    },
  });

  if (isLoading) return <Loader />;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <Layout>
      <Layout.Body>
        <div className="container mx-auto mt-8">
          <Card className="max-w-3xl mx-auto">
            <CardHeader className="flex items-center space-x-4">
              <Avatar className="w-24 h-24">
                <AvatarImage
                  src={astrologer.profileImage}
                  alt={astrologer.name}
                />
                <AvatarFallback>{astrologer.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold">{astrologer.name}</h1>
                <p className="text-gray-500">{astrologer.email}</p>
                <div className="mt-2">
                  {/* <StarRating rating={astrologer.rating} /> */}
                  <Link to={`/astrologer/${id}/reviews`} className="ml-4">
                    <Button variant="link">View Reviews</Button>
                  </Link>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    Personal Information
                  </h2>
                  <p>
                    <strong>Phone:</strong> {astrologer.phoneNumber}
                  </p>
                  <p>
                    <strong>Experience:</strong> {astrologer.experience} years
                  </p>
                  <p>
                    <strong>Pricing:</strong> ₹{astrologer.pricing}
                  </p>
                  <p>
                    <strong>Availability:</strong>{" "}
                    {astrologer.isAvailable ? "Available" : "Not Available"}
                  </p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">Specialties</h2>
                  <div className="flex flex-wrap gap-2">
                    {astrologer.specialties.map((specialty) => (
                      <Badge key={specialty._id} variant="secondary">
                        {specialty.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Bio</h2>
                <p>{astrologer.bio}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout.Body>
    </Layout>
  );
};

export default AstrologerDetails;
