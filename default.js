module.exports = function defaultStyler(props) {
	var output = {};

	if (props.children) {
		output.children = props.children;
	}

	return output;
};