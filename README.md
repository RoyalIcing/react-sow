# react-sow
Customizable styling for React components

## Installation

```sh
npm install react-sow --save
```

## Example

```javascript
// styles.js

import sow from 'react-sow';

export function listStyler = sow(({ darkMode }) => ({
    // Styles
    listStyle: 'none',
    backgroundColor: ? darkMode : 'black' : 'white',
}, { // Children
    item: itemStyler,
}));

function itemStyler = sow(({ darkMode }) => ({
    display: 'block',
    color: ? darkMode : 'white' : 'black',
}));
```

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
    
    render() {
        const { items, darkMode } = this.state;
        return (
            <List items={ items } darkMode={ darkMode } styler={ listStyle } />
        );
    }
};
```
