export const parseSection = (section: string): { title: string; points: string[] } => {
  const [rawTitle, ...contentLines] = section.split("\n");

  const cleanTitle = rawTitle.startsWith("#")
    ? rawTitle.substring(1).trim()
    : rawTitle.trim();

  const points: string[] = [];
  let currentPoint = "";

  contentLines.forEach((line) => {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith(".")) {
      if (currentPoint) {
        points.push(currentPoint.trim());
      }
      currentPoint = trimmedLine;
    } else if (!trimmedLine) {
      if (currentPoint) {
        points.push(currentPoint.trim());
      }
      currentPoint = "";
    } else {
      currentPoint += " " + trimmedLine;
    }
  });

  if (currentPoint) {
    points.push(currentPoint.trim());
  }

  return {
    title: cleanTitle,
    points: points.filter((point) => point && !point.startsWith("[Choose]")),
  };
};