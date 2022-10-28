import React from "react";
import {
  TextField,
  Grid,
  InputAdornment,
  IconButton,
  TextFieldProps,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

type FormInputProps = {
  name: string;
  half?: boolean;
  handleChange: (e: any) => void;
  handleShowPassword?: () => void;
} & TextFieldProps;

const Input: React.FC<FormInputProps> = ({
  name,
  handleChange,
  label,
  half,
  autoFocus,
  type,
  value,
  handleShowPassword,
}) => (
  <Grid item sm={12} margin={2}>
    <TextField
      name={name}
      onChange={handleChange}
      variant="outlined"
      required
      fullWidth
      label={label}
      autoFocus={autoFocus}
      type={type}
      value={value}
      InputProps={
        name === "password"
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword}>
                    {type === "password" ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : undefined
      }
    />
  </Grid>
);

export default Input;
