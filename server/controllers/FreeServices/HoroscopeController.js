const Horoscope = require("../../models/FreeServices/Horoscope");

// Create or Update Horoscope
exports.createOrUpdateHoroscope = async (req, res) => {
  const { zodiacSign, daily, monthly, yearly, dateRange, zodiacImage } =
    req.body;

  try {
    // Get current date information
    const currentDate = new Date();

    // Automatically generate the date for the daily horoscope
    const formattedDate = currentDate.toDateString(); // e.g., "Thu, 12 September 2024"

    // Automatically generate the month for the monthly horoscope
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const currentMonth = `${
      monthNames[currentDate.getMonth()]
    } ${currentDate.getFullYear()}`; // e.g., "September 2024"

    // Automatically generate the year for the yearly horoscope
    const currentYear = currentDate.getFullYear().toString(); // e.g., "2024"

    let horoscope = await Horoscope.findOne({ zodiacSign });

    if (horoscope) {
      // Update the existing horoscope
      horoscope.daily = {
        description: daily?.description || horoscope.daily.description,
        luckyColor: daily?.luckyColor || horoscope.daily.luckyColor,
        luckyNumber: daily?.luckyNumber || horoscope.daily.luckyNumber,
      };

      horoscope.monthly = {
        description: monthly?.description || horoscope.monthly.description,
        career: monthly?.career || horoscope.monthly.career,
        love: monthly?.love || horoscope.monthly.love,
        health: monthly?.health || horoscope.monthly.health,
        money: monthly?.money || horoscope.monthly.money,
      };

      horoscope.yearly = {
        description: yearly?.description || horoscope.yearly.description,
        career: yearly?.career || horoscope.yearly.career,
        love: yearly?.love || horoscope.yearly.love,
        health: yearly?.health || horoscope.yearly.health,
        money: yearly?.money || horoscope.yearly.money,
      };

      horoscope.dateRange = dateRange || horoscope.dateRange;
      horoscope.zodiacImage = zodiacImage || horoscope.zodiacImage;

      await horoscope.save();

      // Return response with date
      res.json({
        message: "Horoscope updated successfully",
        horoscope: {
          zodiacSign: horoscope.zodiacSign,
          daily: {
            date: formattedDate,
            ...horoscope.daily,
          },
          monthly: {
            month: currentMonth,
            ...horoscope.monthly,
          },
          yearly: {
            year: currentYear,
            ...horoscope.yearly,
          },
          dateRange: horoscope.dateRange,
          zodiacImage: horoscope.zodiacImage,
        },
      });
    } else {
      // Create new horoscope entry
      horoscope = new Horoscope({
        zodiacSign,
        daily: {
          description: daily?.description,
          luckyColor: daily?.luckyColor,
          luckyNumber: daily?.luckyNumber,
        },
        monthly: {
          description: monthly?.description,
          career: monthly?.career,
          love: monthly?.love,
          health: monthly?.health,
          money: monthly?.money,
        },
        yearly: {
          description: yearly?.description,
          career: yearly?.career,
          love: yearly?.love,
          health: yearly?.health,
          money: yearly?.money,
        },
        dateRange: dateRange || null,
        zodiacImage: zodiacImage || null,
      });

      await horoscope.save();

      // Return response with date
      res.json({
        message: "Horoscope created successfully",
        horoscope: {
          zodiacSign: horoscope.zodiacSign,
          daily: {
            date: formattedDate,
            ...horoscope.daily,
          },
          monthly: {
            month: currentMonth,
            ...horoscope.monthly,
          },
          yearly: {
            year: currentYear,
            ...horoscope.yearly,
          },
          dateRange: horoscope.dateRange,
          zodiacImage: horoscope.zodiacImage,
        },
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get All Horoscopes
exports.getAllHoroscopes = async (req, res) => {
  try {
    const horoscopes = await Horoscope.find().select(
      "zodiacSign zodiacImage daily.description"
    );
    res.json(horoscopes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get Horoscope by Zodiac Sign
exports.getHoroscopeByZodiac = async (req, res) => {
  const { zodiacSign } = req.params;

  try {
    const horoscope = await Horoscope.findOne({ zodiacSign });
    if (!horoscope) {
      return res.status(404).json({ error: "Horoscope not found" });
    }
    res.json(horoscope);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete Horoscope
exports.deleteHoroscope = async (req, res) => {
  const { zodiacSign } = req.params;

  try {
    const horoscope = await Horoscope.findOneAndDelete({ zodiacSign });
    if (!horoscope) {
      return res.status(404).json({ error: "Horoscope not found" });
    }
    res.json({ message: "Horoscope deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
