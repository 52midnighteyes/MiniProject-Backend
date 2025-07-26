import { customAlphabet } from "nanoid";

export function randomCodeGenerator(prefix: string) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const generateId = customAlphabet(alphabet, 5);

  return prefix + generateId();
}
