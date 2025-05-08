import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { loginRequest } from "../../redux/actions/auth.actions";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { keyframes } from "@emotion/react";

const ping = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.75;
  }
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
`;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const isLoading = useSelector((state) => state.auth.isLoading);
  const error = useSelector((state) => state.auth.error);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || "/dashboard";
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1000);
    }

    if (error) {
      Swal.fire("Error", error, "error");
    }
  }, [isAuthenticated, error, navigate, location]);

  const validate = () => {
    let newErrors = { email: "", password: "" };

    if (!userEmail.trim()) newErrors.email = "Username is required";
    if (!password.trim()) newErrors.password = "Password is required";

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleLogin = () => {
    if (validate()) {
      dispatch(loginRequest(userEmail, password));
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(to right, #0f2027, #203a43, #2c5364)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Box
        sx={{
          width: 400,
          p: 4,
          borderRadius: 4,
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(15px)",
          boxShadow: "0 0 30px rgba(0, 255, 255, 0.15)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: 64,
            height: 64,
            mx: "auto",
            mt: 2,
            mb: 4,
          }}
        >
          {/* Animated ping background */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              backgroundColor: "rgba(96, 165, 250, 0.4)",
              animation: `${ping} 1.5s cubic-bezier(0, 0, 0.2, 1) infinite`,
              zIndex: 0,
            }}
          />

          {/* Main icon circle */}
          <Box
            sx={{
              position: "relative",
              width: 64,
              height: 64,
              borderRadius: "50%",
              backgroundColor: "#1f2937",
              border: "1px solid #374151",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 20px rgba(30, 64, 175, 0.5)",
              zIndex: 1,
            }}
          >
            <LockOutlinedIcon sx={{ color: "#60A5FA", fontSize: 32 }} />
          </Box>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  "& fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.2)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#60A5FA",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "rgba(255, 255, 255, 0.7)",
                },
                "& .MuiInputBase-input": {
                  color: "white",
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              type={passwordVisible ? "text" : "password"}
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setPasswordVisible(!passwordVisible)}
                      edge="end"
                      sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                    >
                      {passwordVisible ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  "& fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.2)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#60A5FA",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "rgba(255, 255, 255, 0.7)",
                },
                "& .MuiInputBase-input": {
                  color: "white",
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleLogin}
              disabled={isLoading}
              sx={{
                mt: 2,
                height: 48,
                backgroundColor: "#60A5FA",
                "&:hover": {
                  backgroundColor: "#3B82F6",
                },
              }}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Login"
              )}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Login;
