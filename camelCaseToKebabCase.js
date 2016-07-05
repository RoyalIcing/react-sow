function camelCaseToKebabCase(key) {
	return key.replace(/([A-Z])/, function(match) { return '-' + match.toLowerCase() });
}

module.exports = camelCaseToKebabCase;
