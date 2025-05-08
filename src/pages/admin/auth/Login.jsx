import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { keyframes } from "@emotion/react";
import { AUTH } from "../../../redux/types/action.types"; // 👈 Needed for dispatch

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
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validate = () => {
    const newErrors = {
      email: formData.email.trim() ? "" : "Email is required",
      password: formData.password.trim() ? "" : "Password is required",
    };
    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = () => {
    if (validate()) {
      dispatch({
        type: AUTH.LOGIN_REQUEST,
        payload: formData,
      });
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
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

        {error && (
          <Typography color="error" sx={{ mb: 2, textAlign: "center" }}>
            {typeof error === "string" ? error : "Login failed. Please try again."}
          </Typography>
        )}

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              variant="outlined"
              value={formData.email}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email}
              sx={{
                input: { color: "#fff" },
                label: { color: "#aaa" },
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "& fieldset": { borderColor: "#00FFFF44" },
                  "&:hover fieldset": { borderColor: "#00FFFFAA" },
                  "&.Mui-focused fieldset": {
                    borderColor: "#00FFFF",
                    boxShadow: "0 0 5px #00FFFF",
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              type={passwordVisible ? "text" : "password"}
              variant="outlined"
              value={formData.password}
              onChange={handleInputChange}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setPasswordVisible(!passwordVisible)}
                      edge="end"
                      sx={{ color: "#00FFFF" }}
                    >
                      {passwordVisible ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                input: { color: "#fff" },
                label: { color: "#aaa" },
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "& fieldset": { borderColor: "#00FFFF44" },
                  "&:hover fieldset": { borderColor: "#00FFFFAA" },
                  "&.Mui-focused fieldset": {
                    borderColor: "#00FFFF",
                    boxShadow: "0 0 5px #00FFFF",
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              onClick={handleLogin}
              disabled={loading}
              sx={{
                background: "linear-gradient(135deg, #00ffff 0%, #1e90ff 100%)",
                color: "#000",
                fontWeight: "bold",
                borderRadius: 2,
                py: 1.5,
                "&:hover": {
                  background: "linear-gradient(135deg, #00dddd 0%, #1c86ee 100%)",
                },
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Log In"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Login;
