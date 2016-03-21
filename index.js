function createStyler(renderStyle, children) {
	return Object.assign(
		(props) => ({
			style: Object.assign({}, 
                renderStyle(props || {}),
                props.style
            })
		}),
		children
	);
}

module.exports = createStyler;
