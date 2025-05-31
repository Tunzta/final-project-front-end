async function fetchModel(url, options = {}) {
  try {
    const response = await fetch(url, {
      credentials: "include", // cookie session
      ...options,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch model: ${response.statusText}`);
    }

    const models = await response.json();
    return models;
  } catch (error) {
    console.error("Error fetching model data:", error);
    return null;
  }
}

export default fetchModel;
