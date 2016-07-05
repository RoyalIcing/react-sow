var isFunction = require('lodash.isfunction');


function createStyler(renderStyle) {
	if (!isFunction(renderStyle)) {
		var style = renderStyle;
		renderStyle = function() {
			return style;
		};
	}

	return function renderProps(props) {
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
		// Flatten 'style' prop
		return stylers.reduce(function(combined, styler) {
			var output = sow(styler)(props);
			Object.assign(combined.style, output.style);
			return combined;
		}, { style: {} });
	}
	
	// Copy child stylers.
	Object.assign.apply(Object, [newStyler].concat(stylers));
	
	return newStyler;
}

sow.combine = combine;
module.exports = sow;
