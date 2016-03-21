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

module.exports = createStyler;
