export default async function handler(req, res) {
  const { endpoint, lat, lon } = req.query;

  if (!endpoint) {
    return res.status(400).json({ error: 'Missing endpoint parameter' });
  }

  const apiKey = '8a04768157074a48ae27cfba484ea2f6';
  let apiUrl = `https://api.checkwx.com/${endpoint}`;

  if (endpoint === 'station/nearest' && lat && lon) {
    apiUrl += `?lat=${lat}&lon=${lon}&radius=50`;
  }

  try {
    const response = await fetch(apiUrl, {
      headers: { 'X-API-Key': apiKey },
    });
    const data = await response.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch METAR data' });
  }
}
