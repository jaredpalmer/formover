import * as React from 'react';
const noop = () => {};

export interface ToggleConfig {
  defaultOn?: boolean;
  on?: boolean;
  onToggle?: (on: boolean, bag: ToggleProps) => void;
  children: (props: ToggleProps) => React.ReactNode;
}
export interface TogglerComponentProps {
  'aria-expanded': boolean;
  tabIndex: number;
  onClick: () => void;
  ref?: any;
}
export interface ToggleOptions {
  onClick: () => void;
  ref?: any;
}
export interface ToggleActions {
  getTogglerProps: (options?: ToggleOptions) => TogglerComponentProps;
  setOn: () => void;
  setOff: () => void;
  toggle: () => void;
}
export type ToggleProps = ToggleState & ToggleActions;

export interface ToggleState {
  on: boolean;
}

export class Toggle extends React.Component<ToggleConfig, ToggleState> {
  static defaultProps = {
    defaultOn: false,
    onToggle: noop,
  };

  toggleKeys: string[] = ['Enter', ' ']; // This matches <button> behavior

  state: ToggleState = {
    on: this.getOn({ on: !!this.props.defaultOn }),
  };

  componentWillReceiveProps({ on }: ToggleConfig) {
    if (on !== this.props.on && on !== this.state.on) {
      this.setOnState(on);
    }
  }

  setOn = () => this.setOnState(true);
  setOff = () => this.setOnState(false);
  toggle = () => this.setOnState();

  getOn(
    state: Partial<ToggleState> = this.state,
    props: ToggleConfig = this.props
  ): boolean {
    return this.isOnControlled() ? !!props.on : !!state.on;
  }

  isOnControlled() {
    return this.props.on !== undefined;
  }

  getTogglerProps = (props = {} as any) => ({
    'aria-expanded': Boolean(this.getOn()),
    tabIndex: 0,
    ...props,
    onClick: (...args: any[]) => {
      if (props.onClick) {
        props.onClick(...args);
      }
      this.toggle();
    },
  });

  getTogglerStateAndHelpers() {
    return {
      on: this.getOn(),
      getTogglerProps: this.getTogglerProps,
      setOn: this.setOn,
      setOff: this.setOff,
      toggle: this.toggle,
    };
  }

  setOnState = (state = !this.getOn()) => {
    const cb =
      this.getOn() === state
        ? noop
        : () => {
            this.props.onToggle!(state, this.getTogglerStateAndHelpers());
          };
    this.setState({ on: state }, cb);
  };

  render() {
    return this.props.children(this.getTogglerStateAndHelpers());
  }
}
