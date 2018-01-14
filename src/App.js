// @flow

import React from 'react';

function test(a: number) {
    return a + 10;
}
const a = test(2);
console.log(a);

export class App extends React.Component<{}> {

    render() {
        return (
            <div>1111</div>
        );
    }
}
