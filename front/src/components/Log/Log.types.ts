// Definindo as chaves como tipos e valores como constantes
export const LogMethods = {
    POST: 'Criou um(a)',
    PUT: 'Editou um(a)',
    DELETE: 'Deletou um(a)',
} as const;

// Extraindo os tipos das chaves
export type LogMethod = "POST" | "PUT" | "DELETE"

// Criando um objeto que contém os métodos de log
export const logMethods: Record<LogMethod, string> = {
    POST: LogMethods.POST,
    PUT: LogMethods.PUT,
    DELETE: LogMethods.DELETE,
};

// Definindo as chaves como tipos e valores como constantes
export const LogModels = {
    User: 'usuário',
    BusStop: 'parada de ônibus',
    Trip: 'viagem',
    TravelSchedule: 'horário de viagem',
    BusSchedule: 'horário de ônibus',
    BusRoute: 'rota de ônibus',
    Login: 'login',
} as const;

// Extraindo os tipos das chaves
export type LogModel = keyof typeof LogModels;

// Criando um objeto que contém os modelos de log
export const logModels: Record<LogModel, string> = {
    User: LogModels.User,
    BusStop: LogModels.BusStop,
    Trip: LogModels.Trip,
    TravelSchedule: LogModels.TravelSchedule,
    BusSchedule: LogModels.BusSchedule,
    BusRoute: LogModels.BusRoute,
    Login: LogModels.Login,
};
  
export type Log = {
    id: number;
    method: LogMethod;
    sucess: boolean;
    model: LogModel;
    user: {
        id: number;
        name: string;
    }
    timestamp: string;
}