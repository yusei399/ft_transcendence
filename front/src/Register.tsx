import React, { useState } from "react";
import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Box
} from "@chakra-ui/react";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState<string | Blob | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      formData.append("confirmPassword", confirmPassword);
      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      const res = await axios.post("/users/register", formData);
      console.log(res.data);
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
    }

    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setProfileImage(null);
  };

  const isUsernameEmpty = username.trim() === "";
  const isPasswordEmpty = password.trim() === "";
  const isConfirmPasswordEmpty = confirmPassword.trim() === "";

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
	  <FormControl isRequired isInvalid={isUsernameEmpty}>
          <FormLabel>Username</FormLabel>
          <Input
            placeholder="username"
            variant="outline"
            sx={{ borderWidth: "1px", borderColor: isUsernameEmpty ? "red.300" : "blue.500" }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {isUsernameEmpty && (
            <FormErrorMessage color="red">Username is required.</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isRequired isInvalid={isPasswordEmpty}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="password"
            variant="outline"
            sx={{ borderWidth: "1px", borderColor: isPasswordEmpty ? "red.300" : "blue.500" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isPasswordEmpty && (
            <FormErrorMessage color="red">Password is required.</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isRequired isInvalid={isConfirmPasswordEmpty}>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            type="password"
            placeholder="confirm password"
            variant="outline"
            sx={{ borderWidth: "1px", borderColor: isConfirmPasswordEmpty ? "red.300" : "blue.500" }}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {isConfirmPasswordEmpty && (
            <FormErrorMessage color="red">Confirm Password is required.</FormErrorMessage>
          )}
        </FormControl>

        <FormControl>
          <FormLabel>Profile Image</FormLabel>
          <Input type="file" accept="image/*" onChange={handleProfileImageChange} />
        </FormControl>

        <Button type="submit">Submit</Button>
      </form>

      {isSubmitted && (
        <Box mt={4} color="green">Registration successful! You can now log in.</Box>
      )}

      <h1>#Register Page</h1>
    </>
  );
};

export default Register;
