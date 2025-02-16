import { ToastProvider } from "./components/Toast/Toast";
import { GlobalStyled } from "./pages/global/styled";
import { QueryClient, QueryClientProvider } from "react-query";
import AppRoutes from "./router/AppRoutes";

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <GlobalStyled />
      <ToastProvider>
        <QueryClientProvider client={queryClient}>
          <AppRoutes />
        </QueryClientProvider>
      </ToastProvider>
    </>
  );
}

export default App;
