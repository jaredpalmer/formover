declare module 'react-key-handler' {
  import * as React from 'react';

  export interface KeyHandlerProps {
    keyEventName: 'keydown' | 'keypress' | 'keyup';
    keyValue: KeyboardEvent['key'];
    onKeyHandle: (event: KeyboardEvent) => void;
  }

  export default class KeyHandler extends React.Component<
    KeyHandlerProps,
    any
  > {}
}
