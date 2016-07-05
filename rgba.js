function RGBA(r, g, b, a) {
	this.r = r;
	this.g = g;
	this.b = b;
	this.a = (typeof a === 'undefined' ? 1 : a);
}

RGBA.prototype.get = function(key) {
	return this[key]
}

RGBA.prototype.mapRGB = function(mapper) {
	return new RGBA(
		mapper(this.r, 'r'),
		mapper(this.g, 'g'),
		mapper(this.b, 'b'),
		this.a
	)
}

RGBA.prototype.mapAlpha = function(mapper) {
	return new RGBA(
		this.r,
		this.g,
		this.b,
		mapper(this.a)
	)
}

// Used by React to automatically convert to a string
RGBA.prototype.toString = function() {
	return 'rgba(' + [this.r, this.g, this.b, this.a].join(',') + ')';
};

// We want the underlying RGBA type to be an implementation detail
function rgba(r, g, b, a) {
	return new RGBA(r, g, b, a);
}

function whiteValue(whiteAmount, a) {
	return new RGBA(whiteAmount, whiteAmount, whiteAmount, a);
}

rgba.whiteValue = whiteValue;
module.exports = rgba; 