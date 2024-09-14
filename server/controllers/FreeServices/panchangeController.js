// // panchangController.js
// const Panchang = require("../models/Panchang");
// const {
//   getDailyPanchang,
//   toJulianDay,
//   getSunPosition,
//   getMoonPosition,
//   getZodiacSign,
// } = require("../../helpers/astroUtils");

// exports.getDailyPanchang = async (req, res) => {
//   try {
//     const { date, latitude, longitude } = req.query;

//     // Convert date string to Date object
//     const panchangDate = date ? new Date(date) : new Date();

//     // Use default values if latitude and longitude are not provided
//     const lat = parseFloat(latitude) || 28.6139; // Default: New Delhi latitude
//     const long = parseFloat(longitude) || 77.209; // Default: New Delhi longitude

//     // Check if panchang for this date and location already exists in the database
//     let panchang = await Panchang.findOne({
//       createdAt: {
//         $gte: new Date(panchangDate.setHours(0, 0, 0, 0)),
//         $lt: new Date(panchangDate.setHours(23, 59, 59, 999)),
//       },
//       "additionalInfo.latitude": lat,
//       "additionalInfo.longitude": long,
//     });

//     if (!panchang) {
//       // If not found, calculate and save new panchang
//       const panchangData = await getDailyPanchang(panchangDate, lat, long);
//       const sunPosition = await getSunPosition(toJulianDay(panchangDate));
//       const moonPosition = await getMoonPosition(toJulianDay(panchangDate));

//       panchang = new Panchang({
//         tithi: panchangData.panchang.tithi,
//         nakshatra: panchangData.panchang.nakshatra,
//         yoga: panchangData.panchang.yoga,
//         karana: panchangData.panchang.karana,
//         day: panchangDate.toLocaleDateString("en-US", { weekday: "long" }),
//         inauspiciousTimes: panchangData.inauspiciousTimes,
//         auspiciousTimes: panchangData.auspiciousTimes,
//         additionalInfo: {
//           ...panchangData.additionalInfo,
//           sunSign: getZodiacSign(sunPosition.longitude),
//           moonSign: getZodiacSign(moonPosition.longitude),
//           paksha: panchangData.panchang.tithi <= 15 ? "Shukla" : "Krishna",
//           latitude: lat,
//           longitude: long,
//         },
//       });

//       await panchang.save();
//     }

//     res.json(panchang);
//   } catch (error) {
//     console.error("Error in getDailyPanchang:", error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while fetching the panchang" });
//   }
// };
//=================================================
// const Panchang = require("../../models/FreeServices/panchangSchema");
// const {
//   toJulianDay,
//   fromJulianDay,
//   calculateSunPosition,
//   calculateMoonPosition,
//   calculateSunriseSunset,
//   calculateMoonriseMoonset,
//   calculateLunarPhase,
//   calculateTithi,
//   calculateNakshatra,
//   calculateYoga,
//   calculateKarana,
//   calculateAuspiciousTimes,
//   calculateInauspiciousTimes,
//   getShakaSamvatYear,
//   getZodiacSign,
//   getTithiName,
//   getNakshatraName,
//   getYogaName,
//   getKaranaName,
// } = require("../../helpers/astroUtils");

// // Get Panchang Data
// const getPanchangData = async (req, res) => {
//   try {
//     const date = new Date();
//     const { latitude, longitude } = req.body;
//     if (!date || !latitude || !longitude) {
//       return res
//         .status(400)
//         .json({ message: "Date, latitude, and longitude are required" });
//     }

//     const panchangDate = new Date(date);
//     const jd = toJulianDay(panchangDate);

//     // Calculate Panchang details
//     const sunLong = calculateSunPosition(jd);
//     const moonLong = calculateMoonPosition(jd);

//     const { sunrise, sunset } = calculateSunriseSunset(
//       panchangDate,
//       latitude,
//       longitude
//     );
//     const { moonrise, moonset } = calculateMoonriseMoonset(
//       panchangDate,
//       latitude,
//       longitude
//     );
//     const tithi = calculateTithi(sunLong, moonLong);
//     const nakshatra = calculateNakshatra(moonLong);
//     const yoga = calculateYoga(sunLong, moonLong);
//     const karana = calculateKarana(sunLong, moonLong);

//     const auspiciousTimes = calculateAuspiciousTimes(
//       panchangDate,
//       latitude,
//       longitude
//     );
//     const inauspiciousTimes = calculateInauspiciousTimes(
//       panchangDate,
//       latitude,
//       longitude
//     );

//     // Format results
//     const result = {
//       date: panchangDate.toISOString().split("T")[0],
//       shakaSamvatYear: getShakaSamvatYear(panchangDate),
//       sunrise: sunrise ? sunrise.toISOString().split("T")[1].slice(0, 5) : null,
//       sunset: sunset ? sunset.toISOString().split("T")[1].slice(0, 5) : null,
//       moonrise: moonrise
//         ? moonrise.toISOString().split("T")[1].slice(0, 5)
//         : null,
//       moonset: moonset ? moonset.toISOString().split("T")[1].slice(0, 5) : null,
//       tithi: getTithiName(tithi),
//       nakshatra: getNakshatraName(nakshatra),
//       yoga: getYogaName(yoga),
//       karana: getKaranaName(karana),
//       lunarPhase: calculateLunarPhase(jd),
//       auspiciousTimes,
//       inauspiciousTimes,
//       zodiacSign: getZodiacSign(sunLong),
//     };

//     res.json(result);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error retrieving Panchang data" });
//   }
// };

// //   // Save Panchang Data
// //   const savePanchangData = async (req, res) => {
// //     try {
// //       const {
// //         date,
// //         latitude,
// //         longitude,
// //         sunrise,
// //         sunset,
// //         moonrise,
// //         moonset,
// //         tithi,
// //         nakshatra,
// //         yoga,
// //         karana,
// //         lunarPhase,
// //         auspiciousTimes,
// //         inauspiciousTimes,
// //         shakaSamvatYear,
// //         zodiacSign,
// //       } = req.body;

// //       if (!date || !latitude || !longitude) {
// //         return res.status(400).json({ message: 'Date, latitude, and longitude are required' });
// //       }

// //       const panchang = new Panchang({
// //         date,
// //         latitude,
// //         longitude,
// //         sunrise,
// //         sunset,
// //         moonrise,
// //         moonset,
// //         tithi,
// //         nakshatra,
// //         yoga,
// //         karana,
// //         lunarPhase,
// //         auspiciousTimes,
// //         inauspiciousTimes,
// //         shakaSamvatYear,
// //         zodiacSign,
// //       });

// //       await panchang.save();
// //       res.status(201).json({ message: 'Panchang data saved successfully', panchang });
// //     } catch (error) {
// //       console.error(error);
// //       res.status(500).json({ message: 'Error saving Panchang data' });
// //     }
// //   };

// module.exports = {
//   getPanchangData,
//   //   savePanchangData,
// };
//=======================================================
// const Panchang = require("../../models/FreeServices/panchangSchema");
// const {
//   toJulianDay,
//   fromJulianDay,
//   calculateSunPosition,
//   calculateMoonPosition,
//   calculateSunriseSunset,
//   calculateMoonriseMoonset,
//   calculateLunarPhase,
//   calculateTithi,
//   calculateNakshatra,
//   calculateYoga,
//   calculateKarana,
//   calculateAuspiciousTimes,
//   calculateInauspiciousTimes,
//   getShakaSamvatYear,
//   getZodiacSign,
//   getTithiName,
//   getNakshatraName,
//   getYogaName,
//   getKaranaName,
//   formatPanchangWith12HourTimes, // Added import for formatting
// } = require("../../helpers/astroUtils");

// // Get Panchang Data
// const getPanchangData = async (req, res) => {
//   try {
//     const date = new Date();
//     const { latitude, longitude } = req.body;
//     if (!date || !latitude || !longitude) {
//       return res
//         .status(400)
//         .json({ message: "Date, latitude, and longitude are required" });
//     }

//     const panchangDate = new Date(date);
//     const jd = toJulianDay(panchangDate);

//     // Calculate Panchang details
//     const sunLong = calculateSunPosition(jd);
//     const moonLong = calculateMoonPosition(jd);

//     const { sunrise, sunset } = calculateSunriseSunset(
//       panchangDate,
//       latitude,
//       longitude
//     );
//     const { moonrise, moonset } = calculateMoonriseMoonset(
//       panchangDate,
//       latitude,
//       longitude
//     );
//     const tithi = calculateTithi(sunLong, moonLong);
//     const nakshatra = calculateNakshatra(moonLong);
//     const yoga = calculateYoga(sunLong, moonLong);
//     const karana = calculateKarana(sunLong, moonLong);

//     const auspiciousTimes = calculateAuspiciousTimes(
//       panchangDate,
//       latitude,
//       longitude
//     );
//     const inauspiciousTimes = calculateInauspiciousTimes(
//       panchangDate,
//       latitude,
//       longitude
//     );

//     // Prepare result object
//     const result = {
//       date: panchangDate.toISOString().split("T")[0],
//       shakaSamvatYear: getShakaSamvatYear(panchangDate),
//       sunrise: sunrise ? sunrise.toISOString().split("T")[1].slice(0, 5) : null,
//       sunset: sunset ? sunset.toISOString().split("T")[1].slice(0, 5) : null,
//       moonrise: moonrise
//         ? moonrise.toISOString().split("T")[1].slice(0, 5)
//         : null,
//       moonset: moonset ? moonset.toISOString().split("T")[1].slice(0, 5) : null,
//       tithi: getTithiName(tithi),
//       nakshatra: getNakshatraName(nakshatra),
//       yoga: getYogaName(yoga),
//       karana: getKaranaName(karana),
//       lunarPhase: calculateLunarPhase(jd),
//       auspiciousTimes,
//       inauspiciousTimes,
//       zodiacSign: getZodiacSign(sunLong),
//     };

//     // Format results with 12-hour time
//     const formattedResult = formatPanchangWith12HourTimes(result);

//     res.json(formattedResult);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error retrieving Panchang data" });
//   }
// };

// // Save Panchang Data (commented out in the provided code)
// // const savePanchangData = async (req, res) => {
// //   try {
// //     const {
// //       date,
// //       latitude,
// //       longitude,
// //       sunrise,
// //       sunset,
// //       moonrise,
// //       moonset,
// //       tithi,
// //       nakshatra,
// //       yoga,
// //       karana,
// //       lunarPhase,
// //       auspiciousTimes,
// //       inauspiciousTimes,
// //       shakaSamvatYear,
// //       zodiacSign,
// //     } = req.body;

// //     if (!date || !latitude || !longitude) {
// //       return res.status(400).json({ message: 'Date, latitude, and longitude are required' });
// //     }

// //     const panchang = new Panchang({
// //       date,
// //       latitude,
// //       longitude,
// //       sunrise,
// //       sunset,
// //       moonrise,
// //       moonset,
// //       tithi,
// //       nakshatra,
// //       yoga,
// //       karana,
// //       lunarPhase,
// //       auspiciousTimes,
// //       inauspiciousTimes,
// //       shakaSamvatYear,
// //       zodiacSign,
// //     });

// //     await panchang.save();
// //     res.status(201).json({ message: 'Panchang data saved successfully', panchang });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: 'Error saving Panchang data' });
// //   }
// // };

// module.exports = {
//   getPanchangData,
//   // savePanchangData,
// };
//===================================================
const Panchang = require("../../models/FreeServices/panchangSchema");
const {
  toJulianDay,
  fromJulianDay,
  calculateSunPosition,
  calculateMoonPosition,
  calculateSunriseSunset,
  calculateMoonriseMoonset,
  calculateLunarPhase,
  calculateTithi,
  calculateNakshatra,
  calculateYoga,
  calculateKarana,
  calculateAuspiciousTimes,
  calculateInauspiciousTimes,
  getShakaSamvatYear,
  getZodiacSign,
  getTithiName,
  getNakshatraName,
  getYogaName,
  getKaranaName,
  formatPanchangWith12HourTimes, // Added import for formatting
} = require("../../helpers/astroUtils");

// Get Panchang Data
const getPanchangData = async (req, res) => {
  try {
    const date = new Date();
    const { latitude, longitude } = req.body;
    if (!date || !latitude || !longitude) {
      return res
        .status(400)
        .json({ message: "Date, latitude, and longitude are required" });
    }

    const panchangDate = new Date(date);
    const jd = toJulianDay(panchangDate);

    // Calculate Panchang details
    const sunLong = calculateSunPosition(jd);
    const moonLong = calculateMoonPosition(jd);

    const { sunrise, sunset } = calculateSunriseSunset(
      panchangDate,
      latitude,
      longitude
    );
    const { moonrise, moonset } = calculateMoonriseMoonset(
      panchangDate,
      latitude,
      longitude
    );
    const tithi = calculateTithi(sunLong, moonLong);
    const nakshatra = calculateNakshatra(moonLong);
    const yoga = calculateYoga(sunLong, moonLong);
    const karana = calculateKarana(sunLong, moonLong);

    const auspiciousTimes = calculateAuspiciousTimes(
      panchangDate,
      latitude,
      longitude
    );
    const inauspiciousTimes = calculateInauspiciousTimes(
      panchangDate,
      latitude,
      longitude
    );

    // Format results
    const result = {
      date: panchangDate.toISOString().split("T")[0],
      shakaSamvatYear: getShakaSamvatYear(panchangDate),
      sunrise: sunrise ? sunrise.toISOString().split("T")[1].slice(0, 5) : null,
      sunset: sunset ? sunset.toISOString().split("T")[1].slice(0, 5) : null,
      moonrise: moonrise
        ? moonrise.toISOString().split("T")[1].slice(0, 5)
        : null,
      moonset: moonset ? moonset.toISOString().split("T")[1].slice(0, 5) : null,
      tithi: tithi ? getTithiName(tithi) : "Unknown Tithi",
      nakshatra: getNakshatraName(nakshatra),
      yoga: getYogaName(yoga),
      karana: getKaranaName(karana),
      lunarPhase: calculateLunarPhase(jd),
      auspiciousTimes: {
        abhijitMuhurat: auspiciousTimes.abhijitMuhurat || "Not Available",
        amritKalam: auspiciousTimes.amritKalam || "Not Available",
      },
      inauspiciousTimes: {
        rahukalam: inauspiciousTimes.rahukalam || "Not Available",
        yamaganda: inauspiciousTimes.yamaganda || "Not Available",
        gulikai: inauspiciousTimes.gulikai || "Not Available",
        varjyamKalam: inauspiciousTimes.varjyamKalam || "Not Available",
        durMuhurtam: inauspiciousTimes.durMuhurtam || "Not Available",
        gulikaiKalam: inauspiciousTimes.gulikaiKalam || "Not Available",
      },
      zodiacSign: getZodiacSign(sunLong),
    };

    // Format results with 12-hour time
    const formattedResult = formatPanchangWith12HourTimes(result);

    res.json(formattedResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving Panchang data" });
  }
};

// Save Panchang Data (commented out in the provided code)
// const savePanchangData = async (req, res) => {
//   try {
//     const {
//       date,
//       latitude,
//       longitude,
//       sunrise,
//       sunset,
//       moonrise,
//       moonset,
//       tithi,
//       nakshatra,
//       yoga,
//       karana,
//       lunarPhase,
//       auspiciousTimes,
//       inauspiciousTimes,
//       shakaSamvatYear,
//       zodiacSign,
//     } = req.body;

//     if (!date || !latitude || !longitude) {
//       return res.status(400).json({ message: 'Date, latitude, and longitude are required' });
//     }

//     const panchang = new Panchang({
//       date,
//       latitude,
//       longitude,
//       sunrise,
//       sunset,
//       moonrise,
//       moonset,
//       tithi,
//       nakshatra,
//       yoga,
//       karana,
//       lunarPhase,
//       auspiciousTimes,
//       inauspiciousTimes,
//       shakaSamvatYear,
//       zodiacSign,
//     });

//     await panchang.save();
//     res.status(201).json({ message: 'Panchang data saved successfully', panchang });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error saving Panchang data' });
//   }
// };

module.exports = {
  getPanchangData,
  // savePanchangData,
};
