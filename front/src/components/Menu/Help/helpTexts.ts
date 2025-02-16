
import imgAbout from '../../../assets/img/about.jpeg'
import imgBusSchedules from '../../../assets/img/bus-schedules.jpeg'
import imgbusStop from '../../../assets/img/bus-stop.jpeg'
import imgCreateBusStop from '../../../assets/img/create-bus-stop.png'
import imgCreateTravelSchedule from '../../../assets/img/create-travel-schedule.jpeg'
import imgCreateTrip from '../../../assets/img/create-trip.png'
import imgHome from '../../../assets/img/home.jpeg'
import imgTravelCchedule from '../../../assets/img/travel-schedule.jpeg'
import imgTrip from '../../../assets/img/trip.jpeg'
//  Home,
//  Horários dos Ônubus,
//  Sobre Nós,
//  Pontos de Ônibus,
//  Editar Ponto de Ônibus,
//  Criar Ponto de Ônibus,
//  Viagens de Ônibus,
//  Editar Viagens de Ônibus,
//  Criar Viagens de Ônibus,
//  Horários dos Ônibus,
//  Editar os Horários dos Ônibus,
//  Criar Horário dos Ônibus,
export interface HelpTextFocus {
    top: number;
    left: number;
    width: number;
    height: number;
}
export interface HelpText {
    help: Array<{
        highlight: string,
        text: string,
        focus: HelpTextFocus
    }>,
    title: string,
    img: string;
}

export const helpTexts: HelpText[] = [
    {
        help: [
            {
                highlight: 'Selecione os Pontos de Partida e Chegada',
                text: 'Você pode escolher de onde você está saindo e para onde deseja ir usando os menus de seleção disponíveis.',
                focus: {
                    height: 25,
                    left: 15,
                    top: 10,
                    width: 85,
                }
            },
            {
                highlight: 'Veja a Rota no Mapa',
                text: 'Depois de selecionar os pontos, a página calcula a melhor rota entre eles e mostra essa rota em um mapa.',
                focus: {
                    height: 65,
                    left: 15,
                    top: 35,
                    width: 85,
                }
            }],
        title: 'Home',
        img: imgHome,
    },
    {
        help: [
            {
                highlight: 'Filtrar por Horário ou Dia da Semana',
                text: 'Você pode filtrar a lista de viagens por horário ou por dia da semana. Para isso, a página tem componentes de filtro que permitem você buscar viagens em horários específicos ou em dias específicos (segunda, terça, etc.)..',
                focus: {
                    height: 25,
                    left: 15,
                    top: 10,
                    width: 85,
                },
            },
            {
                highlight: 'Verificação Visual dos Dias',
                text: 'A tabela usa ícones de checkbox para mostrar se uma viagem está programada para um determinado dia. Se uma viagem ocorre naquele dia, você verá um ícone de checkbox marcado; caso contrário, o ícone estará desmarcado.',
                focus: {
                    height: 75,
                    left: 15,
                    top: 25,
                    width: 85,
                }
            },
        ],
        title: 'Horários dos Ônibus',
        img: imgBusSchedules,
    },
    {
        help: [
            {
                highlight: 'Conteúdo Informativo',
                text: 'Abaixo do título, há uma série de parágrafos que explicam o propósito da plataforma.',
                focus: {
                    height: 85,
                    left: 15,
                    top: 10,
                    width: 85,
                }
            }
        ],
        title: 'Sobre Nós',
        img: imgAbout,
    },
    {
        help: [
            {
                highlight: 'Filtrar por Latitude e Longitude',
                text: 'A página permite que você filtre os pontos de ônibus por latitude e longitude, caso esteja procurando por um ponto específico em uma determinada área.',
                focus: {
                    height: 25,
                    left: 15,
                    top: 10,
                    width: 85,
                }
            },
            {
                highlight: 'Ver os Pontos de Ônibus',
                text: 'A tabela mostra os nomes dos pontos de ônibus junto com suas coordenadas geográficas (latitude e longitude).',
                focus: {
                    height: 75,
                    left: 15,
                    top: 25,
                    width: 85,
                }
            },
            {
                highlight: 'Excluir Pontos de Ônibus',
                text: 'Se precisar, você pode excluir um ponto de ônibus da lista usando a função de exclusão.',
                focus: {
                    height: 75,
                    left: 90,
                    top: 25,
                    width: 10,
                }
            },
        ],
        title: 'Pontos de ônibus',
        img: imgbusStop,
    },
    {
        help: [
            {
                highlight: 'Carregar a Editar Ponto de ônibus',
                text: 'Quando você acessa a página para criar ou editar uma parada de ônibus, a página carrega os dados da parada existente (se disponível) e preenche o formulário com essas informações. Se você estiver criando uma nova parada, o formulário começa vazio.',
                focus: {
                    height: 20,
                    left: 15,
                    top: 90,
                    width: 85,
                }
            },
            {
                highlight: 'Definir Localização da Parada',
                text: 'Você pode definir a localização da parada de ônibus diretamente no mapa interativo. O mapa exibe um marcador (ponteiro) na localização atual da parada, que você pode arrastar para ajustar a posição. A latitude e a longitude são atualizadas automaticamente com base na posição do marcador no mapa.',
                focus: {
                    height: 80,
                    left: 15,
                    top: 10,
                    width: 85,
                }
            },
            {
                highlight: 'Preencher Informações da Parada',
                text: 'Você deve preencher os detalhes da parada de ônibus, como nome, latitude e longitude. Esses detalhes são preenchidos em campos de entrada de texto no formulário.',
                focus: {
                    height: 20,
                    left: 15,
                    top: 90,
                    width: 85,
                }
            },
        ],
        title: 'Criar/Editar Ponto de Ônibus',
        img: imgCreateBusStop,
    },
    {
        help: [
            {
                highlight: 'Filtrar por Quantidade de Paradas',
                text: 'Se você quiser encontrar viagens com um número específico de paradas, a página permite que você filtre a lista com base na quantidade de paradas.',
                focus: {
                    height: 25,
                    left: 15,
                    top: 10,
                    width: 85,
                }
            },
            {
                highlight: 'Ver os Detalhes das Viagens',
                text: 'A tabela exibe uma lista de viagens, mostrando informações importantes como o código da viagem, o ponto inicial, o ponto final, e o número de paradas que a viagem faz.',
                focus: {
                    height: 75,
                    left: 15,
                    top: 25,
                    width: 85,
                }
            },
            {
                highlight: 'Excluir Viagens',
                text: 'Caso precise remover uma viagem da lista, você pode usar a função de exclusão disponível diretamente na tabela. Isso permite gerenciar as viagens de forma simples e eficiente.',
                focus: {
                    height: 75,
                    left: 90,
                    top: 25,
                    width: 10,
                }
            }
        ],
        title: 'Viagens de Ônibus',
        img: imgTrip,
    },
    {
        help: [
            {
                highlight: 'Criar e Editar Viagens',
                text: 'Quando você acessa a página para criar ou editar uma viagem, ela carrega os dados da viagem existente (se disponível) e preenche o formulário com essas informações. Se você estiver criando uma nova viagem, o formulário começa vazio.',
                focus: {
                    height: 50,
                    left: 15,
                    top: 50,
                    width: 85,
                }
            },
            {
                highlight: 'Adicionar e Remover Paradas de Ônibus',
                text: 'A página permite adicionar novas paradas de ônibus à viagem ou remover paradas existentes. Você pode adicionar novas paradas clicando em "Adicionar Parada de Ônibus". Para remover uma parada, clique no ícone de fechar ao lado da parada desejada.',
                focus: {
                    height: 50,
                    left: 15,
                    top: 50,
                    width: 85,
                }
            },
            {
                highlight: 'Selecionar Paradas de Ônibus e Definir Tempo de Espera',
                text: 'Para cada parada, você pode selecionar um ponto de ônibus e definir o tempo adicional (tempo médio mais tempo de espera) para essa parada. Isso é feito usando um componente de seleção e um campo de entrada de tempo.',
                focus: {
                    height: 50,
                    left: 15,
                    top: 50,
                    width: 85,
                }
            },
            {
                highlight: 'Visualizar Rota no Mapa',
                text: 'A página exibe um mapa interativo mostrando a rota da viagem com base nas paradas de ônibus. À medida que você adiciona ou modifica paradas, a rota no mapa é atualizada automaticamente',
                focus: {
                    height: 50,
                    left: 15,
                    top: 10,
                    width: 85,
                }
            },
        ],
        title: 'Criar/Editar Viagens de Ônibus',
        img: imgCreateTrip,
    },
    {
        help: [
            {
                highlight: 'Filtrar por Horário ou Dia da Semana',
                text: 'Você pode filtrar a lista de viagens por horário ou por dia da semana. Para isso, a página tem componentes de filtro que permitem você buscar viagens em horários específicos ou em dias específicos (segunda, terça, etc.)..',
                focus: {
                    height: 25,
                    left: 15,
                    top: 10,
                    width: 85,
                },
            },
            {
                highlight: 'Verificação Visual dos Dias',
                text: 'A tabela usa ícones de checkbox para mostrar se uma viagem está programada para um determinado dia. Se uma viagem ocorre naquele dia, você verá um ícone de checkbox marcado; caso contrário, o ícone estará desmarcado.',
                focus: {
                    height: 75,
                    left: 15,
                    top: 25,
                    width: 85,
                }
            },
            {
                highlight: 'Excluir Viagens (se permitido)',
                text: ' Se você tiver as permissões certas (dependendo se commonUser é verdadeiro ou falso), poderá excluir viagens diretamente da tabela.',
                focus: {
                    height: 75,
                    left: 90,
                    top: 25,
                    width: 10,
                }
            }
        ],
        title: 'Hórario dos Ônibus/ADM',
        img: imgTravelCchedule,
    },
    {
        help: [
            {
                highlight: 'Criar e Editar Horário de viagem',
                text: 'Quando você acessa a página, se estiver editando um horário de viagem existente, o formulário será preenchido com os dados atuais desse horário. Se estiver criando um novo horário, o formulário começa vazio.',
                focus: {
                    height: 50,
                    left: 15,
                    top: 10,
                    width: 85,
                }
            },
            {
                highlight: 'Preencher Informações dos Hóriarios',
                text: 'Você insere o horário, seleciona a viagem associada e define a disponibilidade semanal.',
                focus: {
                    height: 50,
                    left: 15,
                    top: 10,
                    width: 85,
                }
            },
        ],
        title: 'Criar/Editar Horário dos Ônibus',
        img: imgCreateTravelSchedule,
    },
]