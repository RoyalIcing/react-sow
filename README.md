# react-sow
Customizable styling for React components

## Installation

```sh
npm install react-sow --save
```

## Example

Create the styles you wish to use using *sow()*:

```javascript
// styles.js

import sow from 'react-sow';

export function listStyler = sow(({ darkMode }) => ({
    // Styles
    listStyle: 'none',
    backgroundColor: ? darkMode : 'black' : 'white',
}), { // Children
    item: itemStyler,
});

function itemStyler = sow(({ darkMode }) => ({
    display: 'block',
    color: ? darkMode : 'white' : 'black',
}));
```

In your pure components, accept the prop `styler`,
defaulting it to `defaultStyler` (imported from 'react-sow/default').

Then on your main component, spread `styler`, calling it with the
props you wish to pass.

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

export default function List({ items, darkMode, styler = defaultStyler }) {
    return (
      <ul { ...styler({ darkMode }) }>
        { items.map(item => (
            <Item { ...item } darkMode={ darkMode } styler={ styler.item } />
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
import { listStyler } from './styles';

export default React.createClass({
    constructor(props) {
        super(props);
        
        // State...
    },
    
    displayName: 'ListController',
    
    render() {
        const { items, darkMode } = this.state;
        return (
            <List items={ items } darkMode={ darkMode } styler={ listStyler } />
        );
    }
});
```
