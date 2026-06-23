import { parseConfig } from "./parser";
import { validateConfig } from "./validator";

export function runRuntime(json: string) {
  const parsed = parseConfig(json);

  if (!parsed.success) {
    return parsed;
  }

  const validationError = validateConfig(parsed.data);

  if (validationError) {
    return {
      success: false,
      data: null,
      error: validationError,
    };
  }

  return {
    success: true,
    data: parsed.data,
    error: null,
  };
}