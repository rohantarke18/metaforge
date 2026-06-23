export function parseConfig(json: string) {
  try {
    return {
      success: true,
      data: JSON.parse(json),
      error: null,
    };
  } catch {
    return {
      success: false,
      data: null,
      error: "Invalid JSON",
    };
  }
}