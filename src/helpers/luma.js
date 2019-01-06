export function luma(hex) {
	if (hex) {
		console.log(hex);
		hex = hex.substring(1); // strip #
		var rgb = parseInt(hex, 16); // convert rrggbb to decimal
		var r = (rgb >> 16) & 0xff; // extract red
		var g = (rgb >> 8) & 0xff; // extract green
		var b = (rgb >> 0) & 0xff; // extract blue

		var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
		console.log(luma);

		if (luma < 60) {
			//128?
			console.log('too dark!');
		}
	}
}
