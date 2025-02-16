export interface TravelScheduleForm {
  time: string | number;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
  tripId: number;
}
export function secondsToHHMM(seconds: number) {
  const totalMinutes = Math.floor(seconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}`;
}

export const HHMMToSeconds = (time: string) => {
  const [h, m] = String(time).split(':')
  const seconds = +h * 60 * 60 + +m * 60
  return seconds;
}
export interface DayForWeek {
  initial: string;
  threeLetters: string;
  fullName: string;
  index: number

}
export const daysOfWeek: Record<string, DayForWeek> = {
  sunday: {
    initial: 'D',     // Dom
    threeLetters: 'Dom', // Dom
    fullName: 'Domingo',
    index: 0,
  },
  monday: {
    initial: 'S',
    threeLetters: 'Seg',
    fullName: 'Segunda-feira',
    index: 1,
  },
  tuesday: {
    initial: 'T',
    threeLetters: 'Ter',
    fullName: 'Terça-feira',
    index: 2,
  },
  wednesday: {
    initial: 'Q',
    threeLetters: 'Qua',
    fullName: 'Quarta-feira',
    index: 3
  },
  thursday: {
    initial: 'Q',
    threeLetters: 'Qui',
    fullName: 'Quinta-feira',
    index: 4,
  },
  friday: {
    initial: 'S',
    threeLetters: 'Sex',
    fullName: 'Sexta-feira',
    index: 5,
  },
  saturday: {
    initial: 'S',
    threeLetters: 'Sáb',
    fullName: 'Sábado',
    index: 6,
  },
};
