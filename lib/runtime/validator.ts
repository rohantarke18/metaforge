export function validateConfig(config: any) {
  if (!config.app) {
    return "Missing app configuration.";
  }

  if (!config.pages) {
    return "Missing pages.";
  }

  if (!Array.isArray(config.pages)) {
    return "Pages should be an array.";
  }

  return null;
}