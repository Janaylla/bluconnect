import React, { useState } from 'react';
import {
    TextField,
    InputAdornment,
    IconButton,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useToast } from '../../components/Toast/Toast';
import { useResetPassword } from '../../request/auth/useResetPassword';

interface ChangePasswordProps {
    email: string;
    resetCode: string;
    open: boolean;
    handleClose: () => void;
    handleClodeDialog: () => void;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({
    email,
    resetCode,
    handleClose,
    handleClodeDialog,
    open,
}) => {
    const [form, setForm] = useState({
        password: '',
        confirmPassword: '',
    });

    const { mutateAsync: resetPassword } = useResetPassword()
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };
    const { toast } = useToast()
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (form.password === form.confirmPassword) {
            resetPassword({
                email,
                newPassword: form.password,
                resetCode
            })
                .then(() => handleClodeDialog())
                .catch(() => { })
        } else {
            toast({
                message: 'Corriga e tente novamente',
                title: 'As senhas não coincidem',
                type: 'error'
            })
        }
    };

    return (<Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
            component: 'form',
            onSubmit: handleSubmit,
            sx: { backgroundImage: 'none' },
        }}
        
    >
        <DialogTitle>
            Alterar Senha</DialogTitle>
        <DialogContent
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
        >

            <TextField
                name="password"
                placeholder="Nova Senha"
                type={showPassword ? 'text' : 'password'}
                required
                fullWidth
                variant="outlined"
                margin="normal"
                value={form.password}
                onChange={handleChange}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />

            <TextField
                name="confirmPassword"
                placeholder="Confirmar Senha"
                type={showPassword ? 'text' : 'password'}
                required
                fullWidth
                variant="outlined"
                margin="normal"
                value={form.confirmPassword}
                onChange={handleChange}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />

            <Button variant="contained" color="primary" type="submit" fullWidth>
                Alterar Senha
            </Button>
        </DialogContent>
    </Dialog>
    )
}

export default ChangePassword;
