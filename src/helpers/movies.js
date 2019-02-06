//remove spaces and set to lower for use in url
export function tidyLink(link) {
	link = link.replace(/[^\w ]/g, '');
	return link.replace(/\s+/g, '-').toLowerCase();
}

//format runtime of movie
export function runtime(time) {
	var mm = time % 60;
	var hh = (time - mm) / 60;
	var hhmm = hh.toString() + 'h ' + mm.toString() + 'm';

	return hhmm;
}
