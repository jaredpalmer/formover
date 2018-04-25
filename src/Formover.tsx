import * as React from 'react';
import { Formik, FormikProps, FormikConfig, FormikActions } from 'formik';
import { Popover, PopoverConfig, PopoverProps } from './Popover';

export type FormoverConfig<T> = FormikConfig<T> &
  PopoverConfig & {
    children: (props: FormoverProps<T>) => React.ReactNode;
    onSubmit: (
      values: T,
      formikActions: FormikActions<T>,
      popoverActions: PopoverProps
    ) => void;
  };

export type FormoverProps<Values> = FormikProps<Values> & PopoverProps;

export class Formover<Values = {}> extends React.Component<
  FormoverConfig<Values>,
  {}
> {
  render() {
    const {
      target,
      children,
      validationSchema,
      validate,
      initialValues,
      isInitialValid,
      onSubmit,
      validateOnChange,
      validateOnBlur,
      isOpen,
      onToggle,
      placement,
    } = this.props;
    return (
      <Popover
        isOpen={isOpen}
        onToggle={onToggle}
        target={target}
        placement={placement}
      >
        {popProps => (
          <div>
            <Formik
              initialValues={initialValues}
              validateOnChange={validateOnChange}
              validate={validate}
              validateOnBlur={validateOnBlur}
              validationSchema={validationSchema}
              isInitialValid={isInitialValid}
              onSubmit={(values: Values, actions: FormikActions<Values>) =>
                onSubmit(values, actions, popProps)
              }
              render={(props: FormikProps<Values>) => (
                <>{children({ ...props, ...popProps })}</>
              )}
            />
          </div>
        )}
      </Popover>
    );
  }
}
