export const formateDate = (str = "") => {
  return new Date(str)
    .toDateString()
    .split(" ")
    .map((s, i) => (i == 2 ? s + ", " : s))
    .join(" ");
};
