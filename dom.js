var state = {
	classCounter: 0,
	outputter: outputAsDocumentStylesheet
};

function camelCaseToKebabCase(key) {
	return key.replace(/([A-Z])/, function(match) { return '-' + match.toLowerCase() });
}

function convertValueToCSS(key, value) {
	switch (key) {
	case 'content':
		return '"' + value + '"';
	default:
		return value;
	}
}

function convertRulesToCSS(rules) {
	return Object.keys(rules).map(function(inputKey) {
		var cssKey = camelCaseToKebabCase(inputKey);
		var cssValue = convertValueToCSS(inputKey, rules[inputKey]);
		return cssKey + ': ' + cssValue + ';'
	}).join('\n');
}

function renderStyle(styleDeclaration) {
	var rules = [];
	
	var className = styleDeclaration.className;
	
	if (styleDeclaration.before) {
		rules.push('.' + className + ':before {\n' + convertRulesToCSS(styleDeclaration.before) + '\n}');
	}
	if (styleDeclaration.after) {
		rules.push('.' + className + ':after {\n' + convertRulesToCSS(styleDeclaration.after) + '\n}');
	}
	
	return rules.join('\n');
}

function outputAsDocumentStylesheet(className, styleDeclaration, renderStyle) {
	var elementID = 'style-' + className;
	if (!!document.getElementById(elementID)) {
		return;
	}
	
	var css = renderStyle(styleDeclaration);
	var styleElement = document.createElement('style');
	styleElement.id = elementID;
	styleElement.appendChild(document.createTextNode(css));
	document.head.appendChild(styleElement);
}

function useStyle(styleDeclaration) {
	state.outputter(styleDeclaration.className, styleDeclaration, renderStyle);
}

function fallow(styleDeclaration) {
	var className = styleDeclaration.className;
	if (typeof className === 'undefined') {
		className = 'sow-fallow-' + state.classCounter;
		styleDeclaration.className = className;
		state.classCounter++;
	}
	
	return function() {
		useStyle(styleDeclaration);
		return className;
	};
}

function resetFallow() {
	state.classCounter = 0;
}

function registerFallowOutputter(outputter) {
	state.outputter = outputter;
}

exports.fallow = fallow;
exports.resetFallow = resetFallow;
exports.registerFallowOutputter = registerFallowOutputter;
