var isFunction = require('lodash.isfunction');


function createStyler(renderStyle) {
	if (!isFunction(renderStyle)) {
		var style = renderStyle;
		renderStyle = function() {
			return style;
		};
	}

	return function renderProps(props) {
		props = props || {};
		// Render
		var outputStyle = renderStyle(props);
		// Make copy, with custom props merged
		outputStyle = Object.assign({}, 
			outputStyle,
			props.style
		);
		
		var outputClassName = (props && props.className) || '';
		var children = props.children;
		
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

		if (outputStyle.children) {
			children = outputStyle.children;

			delete outputStyle.children;
		}
		
		// Return output props
		var output = {
			style: outputStyle,
			className: outputClassName.trim()
		};

		if (children) {
			output.children = children;
		}

		return output;
	}
}

function sow(renderStyle, children) {
	return Object.assign(
		!!renderStyle.isSow ? (
			renderStyle
		) : (
			createStyler(renderStyle)
		),
		{ isSow: true },
		children
	);
}

function combine(stylers) {
	var newStyler = function(props) {
		// Combine `style` and `classes` props
		return stylers.reduce(function(combined, styler) {
			var output = sow(styler)(props);

			if (output.style) {
				if (output.className) {
					// Concat to existing classes
					combined.className = [combined.className].concat(output.className).join(' ').trim();
				}

				if (output.children) {
					combined.children = output.children; 
				}

				// Merge all style props
				Object.assign(combined.style, output.style);
			}

			return combined;
		}, { style: {}, className: '' });
	}
	
	// Copy child stylers.
	Object.assign.apply(Object, [newStyler].concat(stylers));
	
	return newStyler;
}

sow.combine = combine;
module.exports = sow;
