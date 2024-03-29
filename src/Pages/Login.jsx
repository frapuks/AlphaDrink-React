import { Alert, Avatar, Box, Button, Container, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // Utils
  const navigate = useNavigate();
  const urlApi = process.env.REACT_APP_URL_API;
  
  // States
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Methods
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const response = await fetch(`${urlApi}/users/login`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        email: form.get('email'),
        password: form.get('password'),
      })
    });
    if (!response.ok) {
      setError(true);
      return;
    }
    const data = await response.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("isAdmin", data.user.isadmin);
    navigate("/dashboard");
  }

  
  return (
    <Container sx={{ paddingTop: "2rem" }}>
      <Stack direction="column" alignItems="center" justifyContent="space-evenly" spacing={3}>
        <Avatar sx={{ bgcolor: 'primary.main' }}><LockOutlined /></Avatar>
        <Typography component="h1" variant="h5">Sign in</Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Stack direction="column" spacing={2}>
            <TextField label="Adresse email" required fullWidth name="email" autoComplete="email" autoFocus />
            <TextField label="Mot de passe" required fullWidth name="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword}>{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton>
                </InputAdornment>
              )
            }} />
            <Button type="submit" fullWidth variant="contained">Se connecter</Button>
          </Stack>
        </Box>
        {error && <Alert severity="error">Erreur dans le mot de passe ou l'email</Alert>}
      </Stack>
    </Container>
  );
};

export default Login;