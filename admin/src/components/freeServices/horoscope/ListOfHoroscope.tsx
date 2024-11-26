// import { useState, useEffect } from "react";

// import {
//   IconAdjustmentsHorizontal,
//   IconSortAscendingLetters,
//   IconSortDescendingLetters,
// } from "@tabler/icons-react";
// import { Layout } from "@/components/custom/layout";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Separator } from "@/components/ui/separator";
// import ThemeSwitch from "@/components/theme-switch";
// import { UserNav } from "@/components/user-nav";
// import axiosInstance from "@/api/client";

// const zodiacSigns = [
//   "Aries",
//   "Taurus",
//   "Gemini",
//   "Cancer",
//   "Leo",
//   "Virgo",
//   "Libra",
//   "Scorpio",
//   "Sagittarius",
//   "Capricorn",
//   "Aquarius",
//   "Pisces",
// ];

// export default function HoroscopeList() {
//   const [sort, setSort] = useState("ascending");
//   const [zodiacSignFilter, setZodiacSignFilter] = useState("all");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [horoscopes, setHoroscopes] = useState([]);

//   useEffect(() => {
//     // Fetch horoscope data from the API
//     const fetchHoroscopes = async () => {
//       try {
//         const response = await axiosInstance.get("/free-services/horoscopes");
//         setHoroscopes(response);
//       } catch (error) {
//         console.error("Error fetching horoscope data", error);
//       }
//     };

//     fetchHoroscopes();
//   }, []);

//   const filteredHoroscopes = horoscopes
//     .sort((a, b) =>
//       sort === "ascending"
//         ? a.zodiacSign.localeCompare(b.zodiacSign)
//         : b.zodiacSign.localeCompare(a.zodiacSign)
//     )
//     .filter((horoscope) =>
//       zodiacSignFilter === "all"
//         ? true
//         : horoscope.zodiacSign === zodiacSignFilter
//     )
//     .filter((horoscope) =>
//       horoscope.daily.description
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase())
//     );

//   return (
//     <Layout fixed>
//       {/* ===== Top Heading ===== */}
//       <Layout.Header>
//         <div className="flex w-full items-center justify-between">
//           <Input
//             placeholder="Search horoscopes..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <div className="flex items-center space-x-4">
//             <ThemeSwitch />
//             <UserNav />
//           </div>
//         </div>
//       </Layout.Header>

//       {/* ===== Content ===== */}
//       <Layout.Body className="flex flex-col">
//         <div>
//           <h1 className="text-2xl font-bold tracking-tight">Horoscope List</h1>
//           <p className="text-muted-foreground">
//             Here's a list of horoscopes for different zodiac signs!
//           </p>
//         </div>
//         <div className="my-4 flex items-end justify-between sm:my-0 sm:items-center">
//           <div className="flex flex-col gap-4 sm:my-4 sm:flex-row">
//             <Select
//               value={zodiacSignFilter}
//               onValueChange={setZodiacSignFilter}
//             >
//               <SelectTrigger className="w-36">
//                 <SelectValue>
//                   {zodiacSignFilter === "all" ? "All Signs" : zodiacSignFilter}
//                 </SelectValue>
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Signs</SelectItem>
//                 {zodiacSigns.map((sign) => (
//                   <SelectItem key={sign} value={sign}>
//                     {sign}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           <Select value={sort} onValueChange={setSort}>
//             <SelectTrigger className="w-16">
//               <SelectValue>
//                 <IconAdjustmentsHorizontal size={18} />
//               </SelectValue>
//             </SelectTrigger>
//             <SelectContent align="end">
//               <SelectItem value="ascending">
//                 <div className="flex items-center gap-4">
//                   <IconSortAscendingLetters size={16} />
//                   <span>Ascending</span>
//                 </div>
//               </SelectItem>
//               <SelectItem value="descending">
//                 <div className="flex items-center gap-4">
//                   <IconSortDescendingLetters size={16} />
//                   <span>Descending</span>
//                 </div>
//               </SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//         <Separator className="shadow" />
//         <ul className="faded-bottom no-scrollbar grid gap-4 overflow-auto pb-16 pt-4 md:grid-cols-2 lg:grid-cols-3">
//           {filteredHoroscopes.map((horoscope) => (
//             <li
//               key={horoscope.zodiacSign}
//               className="rounded-lg border p-4 hover:shadow-md"
//             >
//               <div className="mb-8 flex items-center justify-between">
//                 <div className="flex items-center justify-center size-10 rounded-lg bg-muted p-2">
//                   {horoscope.zodiacSign}
//                 </div>
//               </div>
//               <div>
//                 <h2 className="mb-1 font-semibold">{horoscope.zodiacSign}</h2>
//                 <p className="text-gray-500">
//                   {horoscope.daily?.description ||
//                     "No daily horoscope available."}
//                 </p>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </Layout.Body>
//     </Layout>
//   );
// }
//=================================================
import { useState, useEffect } from "react";
import {
  IconAdjustmentsHorizontal,
  IconSortAscendingLetters,
  IconSortDescendingLetters,
} from "@tabler/icons-react";
import { Layout } from "@/components/custom/layout";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import ThemeSwitch from "@/components/theme-switch";
import { UserNav } from "@/components/user-nav";
import axiosInstance from "@/api/client";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const zodiacSigns = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
];

const zodiacDateRanges = {
  Aries: "March 21 - April 19",
  Taurus: "April 20 - May 20",
  Gemini: "May 21 - June 20",
  Cancer: "June 21 - July 22",
  Leo: "July 23 - August 22",
  Virgo: "August 23 - September 22",
  Libra: "September 23 - October 22",
  Scorpio: "October 23 - November 21",
  Sagittarius: "November 22 - December 21",
  Capricorn: "December 22 - January 19",
  Aquarius: "January 20 - February 18",
  Pisces: "February 19 - March 20",
};

export default function HoroscopeList() {
  const [sort, setSort] = useState("ascending");
  const [zodiacSignFilter, setZodiacSignFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [horoscopes, setHoroscopes] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Fetch horoscope data from the API
    const fetchHoroscopes = async () => {
      try {
        const response = await axiosInstance.get("/free-services/horoscopes");
        setHoroscopes(response);
      } catch (error) {
        console.error("Error fetching horoscope data", error);
      }
    };

    fetchHoroscopes();
  }, []);

  const filteredHoroscopes = horoscopes
    .sort((a, b) =>
      sort === "ascending"
        ? a.zodiacSign.localeCompare(b.zodiacSign)
        : b.zodiacSign.localeCompare(a.zodiacSign)
    )
    .filter((horoscope) =>
      zodiacSignFilter === "all"
        ? true
        : horoscope.zodiacSign === zodiacSignFilter
    )
    .filter((horoscope) =>
      horoscope.daily.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

  const handleItemClick = (zodiacSign) => {
    navigate(`/free-services/horoscope/${zodiacSign.toLowerCase()}`); // Navigate to details page with the zodiac sign
  };

  return (
    <Layout fixed>
      {/* ===== Top Heading ===== */}
      <Layout.Header>
        <div className="flex w-full items-center justify-between">
          <Input
            placeholder="Search horoscopes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex items-center space-x-4">
            <ThemeSwitch />
            <UserNav />
          </div>
        </div>
      </Layout.Header>

      {/* ===== Content ===== */}
      <Layout.Body className="flex flex-col">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Horoscope List</h1>
          <p className="text-muted-foreground">
            Here's a list of horoscopes for different zodiac signs!
          </p>
        </div>
        <div className="my-4 flex items-end justify-between sm:my-0 sm:items-center">
          <div className="flex flex-col gap-4 sm:my-4 sm:flex-row">
            <Select
              value={zodiacSignFilter}
              onValueChange={setZodiacSignFilter}
            >
              <SelectTrigger className="w-36">
                <SelectValue>
                  {zodiacSignFilter === "all" ? "All Signs" : zodiacSignFilter}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Signs</SelectItem>
                {zodiacSigns.map((sign) => (
                  <SelectItem key={sign} value={sign}>
                    {sign}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-16">
              <SelectValue>
                <IconAdjustmentsHorizontal size={18} />
              </SelectValue>
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="ascending">
                <div className="flex items-center gap-4">
                  <IconSortAscendingLetters size={16} />
                  <span>Ascending</span>
                </div>
              </SelectItem>
              <SelectItem value="descending">
                <div className="flex items-center gap-4">
                  <IconSortDescendingLetters size={16} />
                  <span>Descending</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Separator className="shadow" />
        <ul className="faded-bottom no-scrollbar grid gap-4 overflow-auto pb-16 pt-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredHoroscopes.map((horoscope) => (
            <li
              key={horoscope.zodiacSign}
              className="rounded-lg border p-4 hover:shadow-md cursor-pointer"
              onClick={() => handleItemClick(horoscope.zodiacSign)} // Navigate on click
            >
              <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center justify-center size-10 rounded-lg bg-muted p-2">
                  {horoscope.zodiacSign}
                </div>
              </div>
              <div>
                <h2 className="mb-1 font-semibold">{horoscope.zodiacSign}</h2>
                <p className="text-gray-500">
                  {horoscope.daily?.description ||
                    "No daily horoscope available."}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Layout.Body>
    </Layout>
  );
}
