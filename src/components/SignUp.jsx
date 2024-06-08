import { useState, useEffect } from "react";
import axios from "axios";
import { rootAPI } from "../utils/ip";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import loginTheme from "../themes/loginTheme";

import {
  TextField,
  Button,
  ThemeProvider,
  Typography,
  Link,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";

import ImageCarousel from "./ImageCarousel";

const SignUp = () => {
  const navigate = useNavigate();
  const { role: tokenRole } = useAuth();

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [role, setRole] = useState("candidate");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!first_name || !last_name || !email || !password || !confirm_password) {
      setMsg("Please fill all the fields");
      return;
    } else if (password !== confirm_password) {
      setMsg("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await axios.post(`${rootAPI}/register`, {
        first_name,
        last_name,
        role,
        email,
        password,
        confirm_password,
      });

      setMsg("");
      navigate("/login");
    } catch (error) {
      setMsg(error.response.data.msg);
      console.log(error.response.data.msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tokenRole === "candidate") {
      navigate("/code-problem");
    } else if (tokenRole === "recruiter") {
      navigate("/cv-matching");
    }
  }, [tokenRole]);

  return (
    <ThemeProvider theme={loginTheme}>
      <div className="flex flex-col sm:flex-row w-full h-[100vh] rounded-xl bg-white p-3">
        <div className="hidden sm:flex flex-col justify-between w-3/5 bg-primary500 rounded-xl text-white py-20 px-14">
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
            }}
          >
            SREC
          </Typography>
          <div className="">
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Start your new <br />
              recruitment with us.
            </Typography>
            <Typography variant="body1" className="opacity-80">
              Discover our advanced recruitment platform, <br />
              offering a seamless evaluation process for both <br />
              hard and soft skills.
            </Typography>
          </div>
          <ImageCarousel />
        </div>

        <div className="flex flex-col sm:w-full h-full text-left p-5 sm:p-20">
          <div className="flex flex-col">
            <Typography variant="h3" sx={{ fontWeight: "bold" }}>
              Sign up
            </Typography>
            <Typography variant="body2">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                sx={{
                  fontWeight: "bold",
                  color: "#10a1fc",
                  "&:hover": {
                    color: "#0077d1",
                  },
                }}
              >
                Sign Up
              </Link>
            </Typography>
          </div>

          <div className="mt-24 flex flex-col gap-5">
            <div className="flex justify-between gap-5">
              <TextField
                label="First Name"
                variant="outlined"
                type="text"
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
                sx={{ width: "50%" }}
              />

              <TextField
                label="Last Name"
                variant="outlined"
                type="text"
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
                sx={{ width: "50%" }}
              />
            </div>

            <FormControl fullWidth>
              <InputLabel id="role-label" sx={{ background: "#fff", px: 1 }}>
                Who are you?
              </InputLabel>
              <Select
                labelId="role-label"
                id="role-select"
                value={role}
                label="Age"
                onChange={(e) => setRole(e.target.value)}
              >
                <MenuItem value={"candidate"}>Recruiter</MenuItem>
                <MenuItem value={"recruiter"}>Candidate</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Email"
              variant="outlined"
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <TextField
              label="Confirm Password"
              variant="outlined"
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {msg && (
              <Typography variant="body2" className="text-red-500">
                {msg}
              </Typography>
            )}

            <Button
              variant="contained"
              onClick={handleRegister}
              className="self-end w-1/5 text-white py-2 sm:py-3 rounded-md"
              sx={{
                backgroundColor: "#10a1fc",
                textTransform: "none",
                fontWeight: "bold",
                fontSize: "1rem",
                "&:hover": {
                  backgroundColor: "#0077d1",
                  textTransform: "none",
                },
              }}
            >
              { loading ? <CircularProgress size={25} color="inherit" /> : "Sign Up"}
            </Button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default SignUp;
