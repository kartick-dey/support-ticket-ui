import * as moment from 'moment';

export class DateFormat {
  public formatToDisplay(date: any) {
    return moment(date).format('ddd, MMM Do YYYY, h:mm:ss a');
  }

  public getDurationBetweenDates(startDate: any, endDate: any) {
    return moment(endDate).diff(moment(startDate), 'days');
  }

  public formatToDisplayWithoutDay(date: any) {
    return moment(date).format("MMM Do YYYY, h:mm:ss a")
  }

  public getTimeFromNow(date: any) {
    return moment(date).fromNow()
  }
}
