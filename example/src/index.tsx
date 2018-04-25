import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
const logo = require('./logo.svg');
import { FormikActions, Form, Field } from 'formik';
import { FormoverProps, PopoverProps, Formover } from 'formover';

const Button: React.SFC<any> = ({ innerRef, ...props }) => (
  <button ref={innerRef} {...props} />
);

export interface FormValues {
  email: string;
}
const App = () => (
  <div className="App">
    <img className="App-logo" src={logo} alt="React" />
    <h1 className="App-Title">Formik + React-Popper = Formover</h1>

    <Formover
      onSubmit={(
        values: FormValues,
        formikActions: FormikActions<FormValues>,
        popperActions: PopoverProps
      ) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          formikActions.setSubmitting(false);
          popperActions.close();
        }, 500);
      }}
      initialValues={{ email: '' }}
      target={({ getTargetProps }) => (
        <Button {...getTargetProps()}>Hello</Button>
      )}
    >
      {(props: FormoverProps<FormValues>) => (
        <div
          style={{
            boxShadow: '0px 2px 2px rgba(0,0,0,.2)',
            borderRadius: 2,
            padding: 16,
          }}
        >
          <Form>
            <Field name="email" autoFocus={true} placeholder="Email" />
            <div style={{ marginTop: 16 }}>
              <button onClick={props.toggle} style={{ marginRight: 8 }}>
                Cancel
              </button>
              <button type="submit">Apply</button>
            </div>
          </Form>
        </div>
      )}
    </Formover>
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));

//Hot Module Replacement
if ((module as any).hot) {
  (module as any).hot.accept();
}
