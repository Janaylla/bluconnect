import Home from "../pages/home";
import About from "../pages/about";
import CreateOrUpdateBusStop from "../pages/busStop/createOrEditBusStop";
import ListBusStop from "../pages/busStop/listBusStop";
import ListTrip from "../pages/trip/listTrip";
import CreateOrEditTravelSchedule from "../pages/travelSchedule/createOrEditTravelSchedule";
import ListTravelSchedule from "../pages/travelSchedule/listTravelSchedule";
import CreateOrEditTrip from "../pages/trip/createOrEditTrip";
import ListUser from "../pages/user/listUser";
import CreateOrEditUser from "../pages/user/createOrEditUser";
export interface CustomRoute {
  path: string;
  Component: () => JSX.Element;
  label: string;
  showInMenu?: boolean;
}

export interface CustomRouteMain {
  path: string;
  routes: CustomRoute[];
}
const routes: CustomRouteMain[] = [
  {
    path: "",
    routes: [
      {
        path: "", Component: Home, label: "Home", showInMenu: true,
      },
      {
        path: "bus-schedules",
        Component: () => <ListTravelSchedule commonUser={true} />,
        label: "Horários dos Ônubus",
        showInMenu: true,
      },
      {
        path: "about", Component: About, label: "Sobre Nós", showInMenu: true,
      },
    ],
  },
  {
    path: "admin",
    routes: [
      {
        path: "bus-stop",
        Component: ListBusStop,
        label: "Pontos de Ônibus",
        showInMenu: true,
      },
      {
        path: "bus-stop/edit/:id",
        Component: CreateOrUpdateBusStop,
        label: "Editar Ponto de Ônibus",
        showInMenu: false,
      },
      {
        path: "bus-stop/create",
        Component: CreateOrUpdateBusStop,
        label: "Criar Ponto de Ônibus",
        showInMenu: true,
      },
      {
        path: "trip",
        Component: ListTrip,
        label: "Viagens de Ônibus",
        showInMenu: true,
      },
      {
        path: "trip/edit/:id",
        Component: CreateOrEditTrip,
        label: "Editar Viagens de Ônibus",
        showInMenu: false,
      },
      {
        path: "trip/create",
        Component: CreateOrEditTrip,
        label: "Criar Viagens de Ônibus",
        showInMenu: true,
      },
      {
        path: "travel-schedule",
        Component: () => <ListTravelSchedule commonUser={false} />,
        label: "Horários dos Ônibus",
        showInMenu: true,
      },
      {
        path: "travel-schedule/edit/:id",
        Component: CreateOrEditTravelSchedule,
        label: "Editar os Horários dos Ônibus",
        showInMenu: false,
      },
      {
        path: "travel-schedule/create",
        Component: CreateOrEditTravelSchedule,
        label: "Criar Horário dos Ônibus",
        showInMenu: true,
      },
      {
        path: 'user',
        Component: ListUser,
        label: "Usuários",
        showInMenu: true,
      },
      {
        path: 'user/create',
        Component: CreateOrEditUser,
        label: "Criar Usuário",
        showInMenu: true,
      }
    ],
  },
];

export { routes };