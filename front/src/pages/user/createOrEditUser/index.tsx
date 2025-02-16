import React, { useState } from "react";
import { Box, Button, TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { userForm, UserForm } from "../user.type";
import { useCreateUser } from "../../../request/user/useCreateUser";
import { useToast } from "../../../components/Toast/Toast";

const CreateOrEditUser = () => {
    const [form, setForm] = useState<UserForm>({
        email: "",
        name: "",
        password: "",
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState<Record<string, boolean>>({}); // Controle do "olhinho"

    const { mutate: createUser } = useCreateUser();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const { toast } = useToast()
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (form.password !== form.confirmPassword) {
            toast({
                title: 'string',
                type: "warning",
                message: "A senha e a confirmação não coincidem!"
            });
            return;
        }
        createUser(form);
    };

    const togglePasswordVisibility = (key: string) => {
        setShowPassword((prev) => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    return (
        <Box>
            <form onSubmit={handleSubmit}>
                <Box marginY={2} gap={2} display={"flex"} flexDirection="column">
                    {Object.entries(userForm).map(([key, value]) => (
                        <TextField
                            fullWidth
                            size="medium"
                            key={key}
                            id="outlined-basic"
                            label={value.label}
                            required={value.required}
                            type={
                                value.type === 'password' && showPassword[key] ? "text" : value.type
                            }
                            name={key}
                            value={form[key as keyof UserForm]}
                            onChange={handleChange}
                            InputProps={
                                value.type === 'password'
                                    ? {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => togglePasswordVisibility(key)}>
                                                    {!showPassword[key] ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }
                                    : undefined
                            }
                        />
                    ))}

                    <Box>
                        <Button size="large" type="submit" variant="contained">
                            Salvar
                        </Button>
                    </Box>
                </Box>
            </form>
        </Box>
    );
};

export default CreateOrEditUser;
