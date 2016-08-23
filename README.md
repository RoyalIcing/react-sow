# react-sow
Customizable styling for React components

## Installation

```sh
npm install react-sow --save
```

## Example

Create the styles you wish to use using `sow()`.
To render based on props, pass a function returning the style rules.
Otherwise, just pass the style rules.

You can attach child stylers by using the second parameter.

```javascript
// styles.js

import sow from 'react-sow';

export const listStyler = sow(({ darkMode }) => ({
	// Styles
	listStyle: 'none',
	backgroundColor: ? darkMode : 'black' : 'white',
}));

export const itemStyler = sow(({ darkMode }) => ({
	display: 'block',
	color: ? darkMode : 'white' : 'black',
}));
```

In your pure components, accept the prop `styler`,
defaulting it to `defaultStyler` (imported from 'react-sow/default').

Then on your main component, call and spread `styler()`,
optionally passing props.

```javascript
// List.js
import React from 'react';
import defaultStyler from 'react-sow/default';

function Item({ title, darkMode, styler = defaultStyler }) {
	return (
		<li { ...styler({ darkMode }) }>
			{ title }
		</li>
	);
}

export default function List({ items, darkMode, styler = defaultStyler, itemStyler = defaultStyler }) { 
	return (
	  <ul { ...styler({ darkMode }) }>
		{ items.map(item => (
			<Item { ...item } darkMode={ darkMode } styler={ itemStyler } />
		)) }
	  </ul>  
	);
}
```

Then in your controller components, import your stylers and
render your pure components with them.

```javascript
// ListController.js
import React from 'react';
import List from './List';
import { listStyler, itemStyler } from './styles';

export default React.createClass({
	constructor(props) {
		super(props);
		
		// State...
	},
	
	displayName: 'ListController',
	
	render() {
		const { items, darkMode } = this.state;
		return (
			<List items={ items } darkMode={ darkMode } styler={ listStyler } itemStyler={ itemStyler } />
		);
	}
});
```

## Combining stylers

```javascript
import sow from 'react-sow';

const orangeTextStyler = sow({
	color: 'orange'
});

const largeTextStyler = sow({
	fontSize: '2em'
});

const headingStyler = sow.combine([
	orangeTextStyler,
	largeTextStyler
]);
```

## :before and :after support

You can even use `:before` and `:after` in stylers, using `fallow()`
This works by lazily creating `<style>` elements and inserting
them into the `<head>` for you.

```javascript
import sow from 'react-sow';
import { fallow } from 'react-sow/dom';

const getMakeGreatAgainClass = fallow({
	before: {
		content: 'Make '
	},
	after: {
		content: ' great again'
	}
});

function Slogan({ subject }) {
	return (
		<h2 className={ getMakeGreatAgainClass() }>
			{ slogan }
		</h2>
	);
}
```

You can use fallow with stylers by passing it to
the `classes` style prop:

```javascript
const makeGreatAgainStyler = sow({
	classes: [getMakeGreatAgainClass],
});

function Slogan({ subject }) {
	return (
		<h2 { ...makeGreatAgainStyler() }>
			{ slogan }
		</h2>
	);
}
```

In fact, you can use any function that returns a class name,
or even a string:

```javascript
var tookRedPill = true;

function getRealityClass() {
	if (tookRedPill) {
		return 'real-world';
	}
	else {
		return 'the-matrix';
	}
}

const makeGreatAgainStyler = sow({
	classes: [getRealityClass, 'use-crazy-fonts'],
});
```

The function could even lazily create a class when rendering,
and that in fact is exactly how `fallow()` works.
