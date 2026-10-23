export const getWeatherDescription = (code: number): { text: string } => {
  switch (code) {
    case 0:
      return { text: "Trời quang" };
    case 1:
    case 2:
    case 3:
      return { text: "Nhiều mây" };
    case 61:
    case 62:
    case 63:
    case 64:
    case 65:
      return { text: "Mưa" };
    case 95:
      return { text: "Dông" };
    default:
      return { text: "Bình thường" };
  }
};
