function createStyler(renderStyle, children) {
	return Object.assign(
		function(props) {
			return {
				style: Object.assign({},
					renderStyle(props || {}),
					!!props ? props.style : undefined
				)
			};
		},
		children
	);
}

function combine(stylers) {
	return function(props) {
		return stylers.reduce(function(combined, styler) {
			var output = styler(props);
			Object.assign(combined.style, output.style);
			return combined;
		}, { style: {} });
	}
}

createStyler.combine = combine;

module.exports = createStyler;
