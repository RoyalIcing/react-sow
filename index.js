function createStyler(renderStyle, children) {
	return Object.assign(
		function(props) {
			// Render
			var outputStyle = renderStyle(props || {});
			// Make copy, with custom props merged
			outputStyle = Object.assign({}, 
				outputStyle,
				!!props ? props.style : undefined
			);
			
			var outputClassName = (props && props.className) || '';
			
			// Use classes, if present
			if (outputStyle.classes) {
				outputStyle.classes.forEach(function(useClass) {
					var className;
					if (typeof useClass === 'string') {
						className = useClass;
					}
					else {
						className = useClass();
					}
					
					outputClassName += ' ' + className;
				});
				
				// Remove from outputted rules
				delete outputStyle.classes;
			}
			
			// Return output props
			return {
				style: outputStyle,
				className: outputClassName
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
