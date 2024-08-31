export const FetchServerStats = async () => {
  try {
    const response = await fetch(
      "https://query.fakaheda.eu/185.180.2.105:27552.feed"
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      return errorData;
    }
  } catch (error) {
    return error;
  }
};
