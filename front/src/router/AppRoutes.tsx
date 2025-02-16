import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalPage from "../pages/global";
import { routes } from "./router";
import ProtectedRoute from "./ProtectedRoute"; // Importe o componente de rota protegida
import Login from "../pages/login/Login";
import NotFoundPage from "../pages/notFound/NotFound";
interface RouteChildrenProps {
    children: React.ReactElement;
    admin?: boolean;
}
const ProtectedRouteAdmin = ({ children, admin }: RouteChildrenProps) => {
    return admin ? <ProtectedRoute>{children}</ProtectedRoute> : <>{children}</>;
}

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/login"
                    element={
                        <Login />}
                />
                {routes.map((route) =>
                    route.routes.map((routeChildren) => {
                        const isAdminRoute = route.path === "admin";
                        return (
                            <Route
                                key={routeChildren.path}
                                path={route.path + "/" + routeChildren.path}
                                element={
                                    <ProtectedRouteAdmin admin={isAdminRoute}>
                                        <GlobalPage routes={routes}>
                                            <routeChildren.Component />
                                        </GlobalPage>
                                    </ProtectedRouteAdmin>
                                }

                            />
                        );
                    })
                )}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
