//remove spaces and set to lower for use in url
export function tidyLink(link) {
  link = link.replace(/[^\w ]/g, "");
  return link.replace(/\s+/g, "-").toLowerCase();
}

//format runtime of movie
export function runtime(time) {
  var mm = time % 60;
  var hh = (time - mm) / 60;
  var hhmm = hh.toString() + "h " + mm.toString() + "m";

  return hhmm;
}

// select only the year
export function releaseYear(fullDate) {
  const releaseDate = new Date(fullDate);
  const DATE_YEAR = { year: "numeric" };
  if (fullDate) {
    return `${releaseDate.toLocaleDateString("en-US", DATE_YEAR)}`;
  }
}
