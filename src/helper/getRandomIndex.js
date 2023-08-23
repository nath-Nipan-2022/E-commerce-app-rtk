export const getRandomIndex = (arr) => {
  if (arr.length === 1) return 0;
  if (arr.length >= 2) {
    return Math.floor(Math.random() * (arr.length - 1));
  }
}