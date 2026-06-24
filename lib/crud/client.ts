export async function getAllApps() {
  const response = await fetch("/api/apps", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch apps");
  }

  return response.json();
}