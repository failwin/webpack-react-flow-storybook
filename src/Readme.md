React component example:

```js
<App size="large">Push Me</App>
```

You can add a custom props to an example wrapper:

```js { "props": { "className": "checks" } }
<App>I’m transparent!</App>
```

Or disable an editor by passing a `noeditor` modifier:

```jsx noeditor
<App>Push Me</App>
```

To render an example as highlighted source code add a `static` modifier:

```jsx static
import React from 'react';
```

Examples with all other languages are rendered only as highlighted source code, not an actual component:

```html
<App size="large">Push Me</App>