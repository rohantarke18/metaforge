import { parseConfig } from "./parser";
import { validateConfig } from "./validator";

export function runRuntime(json: string) {
  if (!json || json.trim() === "") {
    return {
      success: false,
      data: null,
      error: "Configuration is empty.",
    };
  }

  const parsed = parseConfig(json);

  if (!parsed.success) {
    return {
      success: false,
      data: null,
      error: parsed.error ?? "Invalid JSON.",
    };
  }

  const validationError = validateConfig(parsed.data);

  if (validationError) {
    return {
      success: false,
      data: parsed.data,
      error: validationError,
    };
  }

  if (!parsed.data.pages) {
    return {
      success: false,
      data: parsed.data,
      error: 'Missing required "pages" property.',
    };
  }

  if (!Array.isArray(parsed.data.pages)) {
    return {
      success: false,
      data: parsed.data,
      error: '"pages" must be an array.',
    };
  }

  return {
    success: true,
    data: parsed.data,
    error: null,
  };
}