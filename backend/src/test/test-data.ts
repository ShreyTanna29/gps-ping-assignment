export function generateRandomLocation() {
  return {
    latitude: 37.7749 + (Math.random() - 0.5) * 0.1,
    longitude: -122.4194 + (Math.random() - 0.5) * 0.1,
  };
}
