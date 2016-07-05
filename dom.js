var camelCaseToKebabCase = require('./camelCaseToKebabCase');

var state = {
	classCounter: 0,
	outputter: outputAsDocumentStylesheet
};

function useClassCounter() {
	const current = state.classCounter;
	state.classCounter++;
	return current;
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

const ruleSpecs = [
	{ id: 'before', suffix: ':before' },
	{ id: 'after', suffix: ':after' },
	{ id: 'hover', suffix: ':hover' },
	{ id: 'focus', suffix: ':focus' },
	{ id: 'active', suffix: ':active' },
	{ id: 'visited', suffix: ':visited' }
]

function renderStyle(styleDeclaration) {
	var rules = [];
	
	var className = styleDeclaration.className;

	ruleSpecs.forEach(function(ruleSpec) {
		if (styleDeclaration[ruleSpec.id]) {
			rules.push('.' + className + ruleSpec.suffix + ' {\n' + convertRulesToCSS(styleDeclaration[ruleSpec.id]) + '\n}');
		}
	});
	
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
		className = 'sow-fallow-' + useClassCounter();
		styleDeclaration.className = className;
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
