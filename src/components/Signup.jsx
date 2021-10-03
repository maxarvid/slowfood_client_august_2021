import axios from "axios";
import React, { useState } from "react";
import { Container, Modal, Form, Input, Button } from "semantic-ui-react";

const Signup = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [validEmail, setValidEmail] = useState(true);
  const [validPasswords, setValidPasswords] = useState(true);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    axios({
      method: "post",
      url: "https://slowfood.heroku.com/api/auth/",
      params: {
        email: userEmail,
        password: userPassword,
        password_confirmation: userConfirmPassword,
        confirm_success_url: "placeholder",
      },
    }).then(setOpen(true));
  };

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setValidEmail(re.test(String(email).toLowerCase()));
  };

  const validatePasswords = (password) => {
    setValidPasswords(false)
    if (userPassword === password) {
      setValidPasswords(true);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Field
          data-cy="email-input"
          control={Input}
          label="Email"
          id="form-input-control-error-email"
          placeholder="example@email.com"
          value={userEmail}
          onChange={(e) => {
            setUserEmail(e.target.value);
            validateEmail(e.target.value);
          }}
          error={
            validEmail
              ? null
              : {
                  content: "Please enter a valid email address",
                  pointing: "below",
                }
          }
        />
        <Form.Field
          data-cy="password-input"
          type='password'
          control={Input}
          label="Password"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <Form.Field
          data-cy="confirm-password-input"
          type='password'
          control={Input}
          label="Confirm Password"
          value={userConfirmPassword}
          onChange={(e) => {
            setUserConfirmPassword(e.target.value);
            validatePasswords(e.target.value);
          }}
          error={
            validPasswords
              ? null
              : { content: "Passwords must match", pointing: "below" }
          }
        />
        <Form.Field
          data-cy="btn-signup"
          id="form-button-control-public"
          control={Button}
          content="Submit"
        />
      </Form>
      <Modal
        basic
        closeIcon
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        size="small"
      >
        <Modal.Content>
          <h1 data-cy="registration-message">Registration successful</h1>
        </Modal.Content>
      </Modal>
    </Container>
  );
};

export default Signup;
