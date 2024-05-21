import slugify from "slugify";
import { generateRandomString } from "oslo/crypto";

export function generateSlug(name: string) {
  return `${slugify(name, { lower: true, replacement: "-" })}-${generateRandomString(6, "abcdefghijklmnopqrstuvwxyz1234567890")}`;
}
