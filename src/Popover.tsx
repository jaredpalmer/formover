import * as React from 'react';
import { Toggle, TogglerComponentProps } from './Toggle';
import { Target, Manager, Popper as Pop, IPopperProps } from 'react-popper';
// const ClickOutHandler = require('react-onclickout');
// const KeyHandler = require('react-key-handler');

/** Popover Render Props */
export interface PopoverProps {
  /** Is the popover open? */
  isOpen: boolean;
  /** Manually toggle the popover */
  toggle: () => void;
  /** Manually close the popover */
  close: () => void;
  /** Manually open the popover */
  open: () => void;
}

export type PopoverTargetProps = PopoverProps & {
  getTargetProps: (
    props?: any
  ) => { ref?: HTMLElement } & TogglerComponentProps;
};

export interface PopoverConfig {
  /** Toggle component render prop (i.e. usually a button) */
  target: (props: PopoverTargetProps) => React.ReactNode;
  /** Fired after popover toggles */
  onToggle?: (on: boolean) => void;
  /** Popover placement */
  placement?: IPopperProps['placement'];
  children: React.ReactNode | ((props: PopoverProps) => React.ReactNode);
  /** Is the popover open */
  isOpen?: boolean;
}

export class Popover extends React.Component<PopoverConfig> {
  render() {
    const { target, placement, children, onToggle, isOpen } = this.props;

    return (
      <Toggle on={isOpen} onToggle={onToggle}>
        {({ on, getTogglerProps, setOff: close, setOn: open, toggle }) =>
          console.log(on) || (
            <Manager>
              <Target>
                {({ targetProps }) =>
                  target({
                    getTargetProps: (props?: any) =>
                      getTogglerProps({ ...props, innerRef: targetProps.ref }),
                    isOpen: on,
                    toggle,
                    close,
                    open,
                  })
                }
              </Target>
              {on && (
                <Pop placement={placement}>
                  {typeof children === 'function'
                    ? children({
                        isOpen: on,
                        toggle,
                        close,
                        open,
                      })
                    : children}
                </Pop>
              )}
            </Manager>
          )
        }
      </Toggle>
    );
  }
}
