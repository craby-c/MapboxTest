import moment from 'moment';

export const getTime = (time: any): string => {
    return moment(time).format('HH:mm:ss DD.MM.YYYY')
}

export const getDuration = (seconds: number): number => {
    const ms = seconds*1000;
    const minutes = moment.duration(ms).asMinutes();
    return Math.round(minutes)
  }
