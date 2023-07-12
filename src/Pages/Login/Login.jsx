import { Avatar, Box, Button, Container, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import "./Login.scss"
import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    navigate("/dashboard");
  }
  return (
    <Container sx={{ paddingTop: "2rem" }}>
      <Stack direction="column" alignItems="center" justifyContent="space-evenly" spacing={3}>
        <Avatar sx={{ bgcolor: 'primary.main' }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">Sign in</Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Stack direction="column" spacing={2}>
            <TextField label="Adresse email" required fullWidth name="email" autoComplete="email" autoFocus />
            <TextField label="Mot de passe" required fullWidth name="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }} />
            <Button type="submit" fullWidth variant="contained">Se connecter</Button>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default Login;