const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/nearby-hospitals", async (req, res) => {
    const { lat, lon } = req.body;
    if (!lat || !lon) {
        return res.status(400).json({ error: "lat and lon required" });
    }

    try {
        // Overpass query: find hospitals within 3000 meters
        const query = `
[out:json];
(
  node["amenity"="hospital"](around:30000,17.7513547,75.9695465);
  way["amenity"="hospital"](around:30000,17.7513547,75.9695465);
  relation["amenity"="hospital"](around:30000,17.7513547,75.9695465);
);
out center;


    `;

        const url = "https://overpass-api.de/api/interpreter";
        const response = await axios.post(url, query, {
            headers: { "Content-Type": "text/plain" },
        });

        // Parse hospitals with extended details
        const hospitals = response.data.elements.map((h) => ({
            name: h.tags?.name || "Unnamed Hospital",
            address: h.tags?.["addr:full"] || null,
            district: h.tags?.["addr:district"] || null,
            subdistrict: h.tags?.["addr:subdistrict"] || null,
            state: h.tags?.["addr:state"] || null,
            postcode: h.tags?.["addr:postcode"] || null,
            source: h.tags?.source || null,
            location: { lat: h.lat, lon: h.lon },
        }));

        res.json({ hospitals });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Failed to fetch hospitals" });
    }
});


router.post("/nearby-policestation", async (req, res) => {
    const { lat, lon } = req.body;
    if (!lat || !lon) {
        return res.status(400).json({ error: "lat and lon required" });
    }

    try {
        // Overpass query: find police stations within 3000 meters of given lat/lon
        const query = `
          [out:json];
          node["amenity"="police"](around:15000,${lat},${lon});
          out;
        `;

        const url = "https://overpass-api.de/api/interpreter";
        const response = await axios.post(url, query, {
            headers: { "Content-Type": "text/plain" },
        });

        // Parse police stations
        const policeStations = response.data.elements.map((p) => ({
            name: p.tags?.name || "Unnamed Police Station",
            location: { lat: p.lat, lon: p.lon },
        }));

        res.json({ policeStations });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Failed to fetch police stations" });
    }
});

router.post("/nearby-hotels", async (req, res) => {
    const { lat, lon } = req.body;
    if (!lat || !lon) {
        return res.status(400).json({ error: "lat and lon required" });
    }

    try {
        // Overpass query: find hotels within 3000 meters
        const query = `
      [out:json];
      node["tourism"="hotel"](around:30000,${lat},${lon});
      out;
    `;

        const url = "https://overpass-api.de/api/interpreter";
        const response = await axios.post(url, query, {
            headers: { "Content-Type": "text/plain" },
        });

        // Parse hotels with extended details
        const hotels = response.data.elements.map((h) => ({
            name: h.tags?.name || "Unnamed Hotel",
            address: h.tags?.["addr:full"] || null,
            district: h.tags?.["addr:district"] || null,
            subdistrict: h.tags?.["addr:subdistrict"] || null,
            state: h.tags?.["addr:state"] || null,
            postcode: h.tags?.["addr:postcode"] || null,
            source: h.tags?.source || null,
            location: { lat: h.lat, lon: h.lon },
        }));

        res.json({ hotels });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Failed to fetch hotels" });
    }
});


module.exports = router;
