import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  OutlinedInput,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import { useForgotPassword } from '../../request/auth/useForgotPassword';
import { useConfirmCode } from '../../request/auth/useConfirmCode';
import ChangePassword from './ChangePassword';

interface ForgotPasswordProps {
  open: boolean;
  handleClose: () => void;
}

const ForgotPassword = ({ open, handleClose }: ForgotPasswordProps) => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [counter, setCounter] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const [isCodeConfirmed, setIsCodeConfirmed] = useState(false);
  const { mutateAsync: forgotPassword } = useForgotPassword();

  const { mutateAsync: confirmCode } = useConfirmCode();

  useEffect(() => {
    let timer: NodeJS.Timeout | string | number | undefined;
    if (isCodeSent && counter > 0) {
      timer = setInterval(() => {
        setCounter((prev) => prev - 1);
      }, 1000);
    }

    if (counter === 0) {
      setCanResend(true);
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isCodeSent, counter]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (!isCodeSent) {
      handleResendCode();
    } else {
      confirmCode({ email, resetCode: code })
        .then(() => setIsCodeConfirmed(true));
    };
  }

  const handleResendCode = () => {
    setCounter(30);
    forgotPassword(email)
      .then(() => setIsCodeSent(true))
      .catch(() => setIsCodeSent(false));
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit,
        sx: { backgroundImage: 'none' },
      }}
    >
      <DialogTitle>Recuperar senha</DialogTitle>
      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
      >
        <Typography>
          Digite o endereço de e-mail da sua conta e enviaremos o código para redefinir sua senha.
        </Typography>

        <OutlinedInput
          autoFocus
          required
          margin="dense"
          id="email"
          name="email"
          label="Email address"
          placeholder="Email address"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {isCodeSent && (
          <>
            <OutlinedInput
              margin="dense"
              id="code"
              name="code"
              label="Código de redefinição"
              placeholder="Código de redefinição"
              type="text"
              fullWidth
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            {/* <Typography variant="body2" color="textSecondary">
              {canResend ? (
                <Button onClick={handleResendCode}>Reenviar código</Button>
              ) : (
                <span>Reenviar código em {counter} segundos...</span>
              )}
            </Typography> */}

            <Button onClick={handleResendCode}>Reenviar código</Button>
          </>
        )}
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Continuar
        </Button>
        <ChangePassword
          open={isCodeConfirmed}
          email={email}
          handleClose={() => setIsCodeConfirmed(false)}
          handleClodeDialog={handleClose}
          resetCode={code}
        />
      </DialogActions>
    </Dialog>
  );
};

export default ForgotPassword;
