function RGBA(r, g, b, a) {
	this.r = r;
	this.g = g;
	this.b = b;
	this.a = (typeof a === 'undefined' ? 1 : a);
}

RGBA.prototype.toString = function() {
	return 'rgba(' + [this.r, this.g, this.b, this.a].join(',') + ')';
};

function rgba(r, g, b, a) {
	return new RGBA(r, g, b, a);
}

module.exports = rgba; 