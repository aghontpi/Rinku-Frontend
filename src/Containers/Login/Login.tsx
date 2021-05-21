import { Container, Grid, Form, Button, Segment } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAppDispatch } from '../../Hooks/app.hook';
import { loginAction } from '../../Store/user.store';

const Login = () => {
  const dispatch = useAppDispatch();
  const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
    initialValues: {
      user: '',
      password: '',
      captcha: '',
    },
    onSubmit: ({ user, password }) => {
      dispatch(loginAction({ username: user, password }));
    },
    validationSchema: yup.object({
      user: yup.string().required('required'),
      password: yup.string().required('required'),
    }),
  });
  return (
    <div style={{ paddingTop: '8%' }}>
      <Container>
        <Grid columns="2" centered>
          <Grid.Column width="6">
            <Segment padded>
              <h3 style={{ textAlign: 'center', marginBottom: '16px' }}>Welcome Back!</h3>
              <Form>
                <Form.Input
                  icon="user"
                  iconPosition="left"
                  label="Username"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="user"
                  value={values.user}
                  error={touched.user && errors.user}
                />
                <Form.Input
                  icon="lock"
                  iconPosition="left"
                  label="Password"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  error={touched.password && errors.password}
                />

                <Grid.Row textAlign="center" style={{ textAlign: 'center' }}>
                  <Button type="button" content="Login" primary onClick={() => handleSubmit()} />
                </Grid.Row>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
};

export { Login };
