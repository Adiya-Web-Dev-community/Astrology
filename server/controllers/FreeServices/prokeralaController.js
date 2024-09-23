// controllers/prokeralaController.js
const axios = require('axios');

exports.getTodaysPanchang = async (req, res) => {
  try {
    const apiKey = process.env.PROKERALA_API_KEY;
    const { location } = req.body;

    const url = `https://api.prokerala.com/v2/astrology/panchang`;

    const response = await axios.post(
      url,
      {
        date: new Date().toISOString().split('T')[0],
        location: {
          latitude: location.latitude,
          longitude: location.longitude,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching today\'s Panchang:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getJanamKundali = async (req, res) => {
  try {
    const apiKey = process.env.PROKERALA_API_KEY;
    const { date, time, location } = req.body;

    const url = `https://api.prokerala.com/v2/astrology/kundali`;

    const response = await axios.post(
      url,
      {
        datetime: `${date} ${time}`,
        location: {
          latitude: location.latitude,
          longitude: location.longitude,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching Janam Kundali:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getKundaliMatch = async (req, res) => {
  try {
    const apiKey = process.env.PROKERALA_API_KEY;
    const { maleDetails, femaleDetails } = req.body;

    const url = `https://api.prokerala.com/v2/astrology/kundali/match`;

    const response = await axios.post(
      url,
      {
        male: {
          datetime: `${maleDetails.date} ${maleDetails.time}`,
          location: {
            latitude: maleDetails.location.latitude,
            longitude: maleDetails.location.longitude,
          },
        },
        female: {
          datetime: `${femaleDetails.date} ${femaleDetails.time}`,
          location: {
            latitude: femaleDetails.location.latitude,
            longitude: femaleDetails.location.longitude,
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching Kundali Match:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getShubhMuhurat = async (req, res) => {
  try {
    const apiKey = process.env.PROKERALA_API_KEY;
    const { date, eventType, location } = req.body;

    const url = `https://api.prokerala.com/v2/astrology/muhurat/${eventType}`;

    const response = await axios.post(
      url,
      {
        date: date,
        location: {
          latitude: location.latitude,
          longitude: location.longitude,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching Shubh Muhurat:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getVratUpvaas = async (req, res) => {
  try {
    const apiKey = process.env.PROKERALA_API_KEY;
    const { year, month } = req.query;

    const url = `https://api.prokerala.com/v2/astrology/vrat-upvaas`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      params: {
        year: year,
        month: month,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching Vrat and Upvaas:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getHoroscope = async (req, res) => {
  try {
    const apiKey = process.env.PROKERALA_API_KEY;
    const { zodiacSign } = req.params;

    const url = `https://api.prokerala.com/v2/astrology/horoscope/${zodiacSign}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching horoscope:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};