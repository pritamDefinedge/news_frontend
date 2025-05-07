import React, { useState, useEffect } from "react";
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  IconButton, 
  InputAdornment,
  CircularProgress,
  Grid
} from "@mui/material";
import { 
  Visibility, 
  VisibilityOff,
  Fingerprint,
  Login as LoginIcon
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../../redux/Actions/authActions";
import { keyframes } from "@emotion/react";

// Glow animation
const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(0, 255, 255, 0.5); }
  50% { box-shadow: 0 0 20px rgba(0, 255, 255, 0.8); }
  100% { box-shadow: 0 0 5px rgba(0, 255, 255, 0.5); }
`;

// Scanline animation
const scanline = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: 0 100vh; }
`;

const CyberpunkLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    showPassword: false
  });
  const [errors, setErrors] = useState({ username: "", password: "" });
  
  // Redux state
  const { isLoading, error, isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
    if (error) {
      // Custom error alert
      const errorAlert = document.createElement('div');
      errorAlert.innerHTML = `
        <div style="
          position: fixed;
          top: 20px;
          right: 20px;
          background: rgba(255, 50, 50, 0.9);
          color: white;
          padding: 15px 25px;
          border-radius: 4px;
          border-left: 4px solid #ff0000;
          font-family: 'Courier New', monospace;
          box-shadow: 0 0 15px rgba(255, 0, 0, 0.5);
          z-index: 9999;
          animation: ${glow} 1.5s infinite;
        ">
          <strong>ACCESS DENIED:</strong> ${error}
        </div>
      `;
      document.body.appendChild(errorAlert);
      setTimeout(() => errorAlert.remove(), 5000);
    }
  }, [isAuthenticated, error, navigate]);

  const handleChange = (prop) => (event) => {
    setCredentials({ ...credentials, [prop]: event.target.value });
    if (errors[prop]) setErrors({ ...errors, [prop]: "" });
  };

  const handleTogglePassword = () => {
    setCredentials({ ...credentials, showPassword: !credentials.showPassword });
  };

  const validate = () => {
    const newErrors = { username: "", password: "" };
    let isValid = true;

    if (!credentials.username.trim()) {
      newErrors.username = "Username required";
      isValid = false;
    }

    if (!credentials.password) {
      newErrors.password = "Password required";
      isValid = false;
    } else if (credentials.password.length < 6) {
      newErrors.password = "Minimum 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(loginRequest(credentials.username, credentials.password));
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `
          linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%),
          repeating-linear-gradient(
            0deg,
            rgba(0, 255, 255, 0.05),
            rgba(0, 255, 255, 0.05) 1px,
            transparent 1px,
            transparent 2px
          )
        `,
        animation: `${scanline} 4s linear infinite`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 30%, rgba(0, 255, 255, 0.1) 0%, transparent 30%),
            radial-gradient(circle at 80% 70%, rgba(255, 0, 255, 0.1) 0%, transparent 30%)
          `,
          pointerEvents: "none",
        }
      }}
    >
      {/* Terminal-like login box */}
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          width: "100%",
          maxWidth: 450,
          p: 4,
          borderRadius: "4px",
          backgroundColor: "rgba(15, 20, 30, 0.85)",
          border: "1px solid rgba(0, 255, 255, 0.3)",
          boxShadow: `
            0 0 15px rgba(0, 255, 255, 0.3),
            inset 0 0 10px rgba(0, 255, 255, 0.2)
          `,
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #00ffff, #ff00ff, #00ffff)",
            animation: `${glow} 3s infinite`,
          }
        }}
      >
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Fingerprint sx={{ 
            fontSize: 60, 
            color: "#00ffff",
            mb: 1,
            filter: "drop-shadow(0 0 5px rgba(0, 255, 255, 0.7))"
          }} />
          <Typography 
            variant="h4" 
            sx={{ 
              color: "#fff", 
              fontWeight: "bold",
              textShadow: "0 0 10px rgba(0, 255, 255, 0.7)",
              mb: 1,
              fontFamily: "'Courier New', monospace"
            }}
          >
            SYSTEM LOGIN
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: "#aaa", 
              letterSpacing: "2px",
              fontFamily: "'Courier New', monospace"
            }}
          >
            ADMIN ACCESS REQUIRED
          </Typography>
        </Box>

        {/* Input fields */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="USERNAME"
              variant="outlined"
              value={credentials.username}
              onChange={handleChange("username")}
              error={!!errors.username}
              helperText={errors.username}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Box sx={{ 
                      width: 10, 
                      height: 10, 
                      borderRadius: "50%",
                      backgroundColor: "#00ffff",
                      mr: 1,
                      boxShadow: "0 0 5px #00ffff"
                    }} />
                  </InputAdornment>
                ),
                sx: {
                  input: { 
                    color: "#fff",
                    fontFamily: "'Courier New', monospace",
                    letterSpacing: "1px"
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#00ffff44",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#00ffffaa",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#00ffff",
                    boxShadow: "0 0 10px rgba(0, 255, 255, 0.5)",
                  },
                }
              }}
              InputLabelProps={{
                sx: {
                  color: "#00ffff",
                  fontWeight: "bold",
                  "&.Mui-focused": {
                    color: "#00ffff",
                  }
                }
              }}
              FormHelperTextProps={{
                sx: {
                  color: "#ff5555",
                  fontFamily: "'Courier New', monospace"
                }
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="PASSWORD"
              type={credentials.showPassword ? "text" : "password"}
              variant="outlined"
              value={credentials.password}
              onChange={handleChange("password")}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Box sx={{ 
                      width: 10, 
                      height: 10, 
                      borderRadius: "50%",
                      backgroundColor: "#00ffff",
                      mr: 1,
                      boxShadow: "0 0 5px #00ffff"
                    }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePassword}
                      edge="end"
                      sx={{ color: "#00ffff" }}
                    >
                      {credentials.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {
                  input: { 
                    color: "#fff",
                    fontFamily: "'Courier New', monospace",
                    letterSpacing: "1px"
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#00ffff44",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#00ffffaa",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#00ffff",
                    boxShadow: "0 0 10px rgba(0, 255, 255, 0.5)",
                  },
                }
              }}
              InputLabelProps={{
                sx: {
                  color: "#00ffff",
                  fontWeight: "bold",
                  "&.Mui-focused": {
                    color: "#00ffff",
                  }
                }
              }}
              FormHelperTextProps={{
                sx: {
                  color: "#ff5555",
                  fontFamily: "'Courier New', monospace"
                }
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={isLoading}
              startIcon={isLoading ? null : <LoginIcon />}
              sx={{
                background: "linear-gradient(45deg, #00ffff 0%, #00a8ff 100%)",
                color: "#000",
                fontWeight: "bold",
                py: 1.5,
                borderRadius: "2px",
                textTransform: "uppercase",
                letterSpacing: "1px",
                fontFamily: "'Courier New', monospace",
                boxShadow: "0 0 15px rgba(0, 255, 255, 0.5)",
                "&:hover": {
                  background: "linear-gradient(45deg, #00e0e0 0%, #0090e0 100%)",
                  boxShadow: "0 0 20px rgba(0, 255, 255, 0.8)",
                },
                "&.Mui-disabled": {
                  background: "#333",
                  color: "#666",
                  boxShadow: "none"
                }
              }}
            >
              {isLoading ? (
                <CircularProgress size={24} sx={{ color: "#000" }} />
              ) : (
                "AUTHENTICATE"
              )}
            </Button>
          </Grid>
        </Grid>

        {/* Footer */}
        <Box sx={{ 
          mt: 3, 
          textAlign: "center",
          color: "#00ffff88",
          fontFamily: "'Courier New', monospace",
          fontSize: "0.7rem",
          letterSpacing: "1px"
        }}>
          SECURE CONNECTION ESTABLISHED
        </Box>
      </Box>
    </Box>
  );
};

export default CyberpunkLogin;