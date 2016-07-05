module.exports = function defaultStyler(props) {
	let output = {};

	if (props.children) {
		output.children = props.children;
	}

	return output;
};