export function getTextSnippet(
  str: string | undefined | null,
  first = 6,
  last = 12,
) {
  if (!str) {
    return "";
  }

  if (str.length <= 24) {
    return str;
  }

  return `${str.slice(0, first)}...${str.slice(str.length - last, str.length)}`;
}
