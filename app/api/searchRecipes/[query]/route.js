const GET = async (req, { params }) => {
  const query = await params.query;
  const apiKey = process.env.SPOONACULAR_API_KEY;
  const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}`;

  try {
    const spoonacularResponse = await fetch(url);
    const data = await spoonacularResponse.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Błąd podczas pobierania przepisów" });
  }
};

export { GET };
