import { Component, OnInit } from '@angular/core';
import { MaterializeCss } from './shared/model/Materializecss';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'calendario';

  actualDate: Date = new Date();
  month: Array<Array<Day>> = new Array();
  daySelected: Day;
  openModalDay: boolean;
  openModalMonth: boolean;
  openModalYear: boolean;
  modalOptionsDay: ModalOptions;
  modalOptionsMonth: ModalOptions;
  modalOptionsYear: ModalOptions;

  years: Array<Array<number>> = new Array();
  months: Array<Array<Month>> = new Array();

  weekdays: Array<string> = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  monthYear: { month: string, year: number };

  nextMonthYear(): void {
    let month = this.actualDate.getMonth();
    let year = this.actualDate.getFullYear();
    year = month === 12 ? year + 1 : year;
    month = month === 12 ? month - 11 : month + 1;
    this.actualDate = new Date(year, month, this.actualDate.getDate());
    this.changeMonthYear(this.actualDate);
    this.buildMonth(this.actualDate.getFullYear(), this.actualDate.getMonth());
  }

  previusMonthYear(): void {
    let month = this.actualDate.getMonth();
    let year = this.actualDate.getFullYear();
    year = month === 12 ? year - 1 : year;
    month = month === 12 ? month + 11 : month - 1;
    this.actualDate = new Date(year, month, this.actualDate.getDate());
    this.changeMonthYear(this.actualDate);
    this.buildMonth(this.actualDate.getFullYear(), this.actualDate.getMonth());
  }

  selectedDate(day: Day): void {
    this.daySelected = null;
    this.openModalDay = false;
    this.month.forEach((m) => m.forEach((d) => {
      if (d !== null) {
        d.selected = false;
      }

      if (d && day.day === d.day) {
        d.selected = true;
        this.daySelected = d;
        this.openModalDay = true;
      }
    }));
  }

  showModalYear(): void {
    this.tableYears();
    this.openModalYear = true;
  }

  lessTableYear(): void {
    const firstMonth = this.years[0][0] - 25;
    this.tableYears(firstMonth);
  }

  moreTableYear(): void {
    const firstMonth = this.years.slice(-1).pop().slice(-1).pop() + 25;
    this.tableYears(firstMonth);
  }

  selectedYear(year: number) {
    this.actualDate = new Date(year, this.actualDate.getMonth(), this.actualDate.getDate());
    this.changeMonthYear(this.actualDate);
    this.buildMonth(this.actualDate.getFullYear(), this.actualDate.getMonth());
    this.openModalYear = false;
  }

  showModalMonth(): void {
    this.tableMonth();
    this.openModalMonth = true;
  }

  selectedMonth(month: number) {
    this.actualDate = new Date(this.actualDate.getFullYear(), month, this.actualDate.getDate());
    this.changeMonthYear(this.actualDate);
    this.buildMonth(this.actualDate.getFullYear(), this.actualDate.getMonth());
    this.openModalMonth = false;
  }

  today(): void {
    this.actualDate = new Date();
    this.changeMonthYear(this.actualDate);
    this.buildMonth(this.actualDate.getFullYear(), this.actualDate.getMonth());
  }

  private getDay(date: Date): Day {
    return {
      day: date.getDate(),
      dateFull: date,
      current: date.getDate() === new Date().getDate()
        && date.getMonth() === new Date().getMonth()
        && date.getFullYear() === new Date().getFullYear(),
      hours: new Array<HourDay>(24).fill({}).map((v, i) => {
        v = { hour: i, minute: 0, second: 0 };
        return v;
      })
    };
  }

  private buildMonth(year: number, month: number): void {
    this.month = new Array();

    let date = new Date(year, month, 0);
    this.month = new Array(8).fill(new Array(7).fill(null)).map((v: Array<Day>) => {
      return v.map((val: Day, ind: number) => {
        date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
        if (ind >= date.getDay() && date.getMonth() === month) {
          val = this.getDay(date);
        } else {
          date = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
        }
        return date.getMonth() === month ? val : null;
      });
    });

    this.month = this.month.filter((e) => e.filter((i) => {
      return i !== null;
    }).length > 0);
  }

  private getMonth(date: Date, locale?: 'en-us'): Month {
    return {
      id: date.getMonth(),
      name: date.toLocaleString(locale, { month: 'long' }).toUpperCase().substring(0, 3)
    };
  }

  private tableMonth(): void {
    const locale = 'en-us';
    let month = 0;

    this.months = new Array(2).fill(new Array(6).fill(null)).map((v: Array<Month>) => {
      return v.map((val: Month) => {
        const date = new Date(this.actualDate.getFullYear(), month, 1);
        month++;
        return val = this.getMonth(date, locale);
      });
    });
  }

  private changeMonthYear(date: Date): void {
    const locale = 'en-us';
    this.monthYear = {
      month: date.toLocaleString(locale, { month: 'long' }).toUpperCase().substring(0, 3),
      year: date.getFullYear()
    };
  }

  private tableYears(currencyYear?: number): void {
    currencyYear = currencyYear ? currencyYear : new Date().getFullYear();
    let year = 0;
    this.years = new Array(5).fill(new Array(5).fill(null)).map((v: Array<number>) => {
      return v.map((val: number) => {
        val = currencyYear + year;
        year++;
        return val;
      });
    });
  }

  ngOnInit(): void {
    this.changeMonthYear(this.actualDate);
    this.buildMonth(this.actualDate.getFullYear(), this.actualDate.getMonth());
    this.modalOptionsYear = {
      onCloseStart: () => {
        this.openModalYear = false;
      }
    };

    this.modalOptionsMonth = {
      onCloseStart: () => {
        this.openModalMonth = false;
      }
    };

    this.modalOptionsDay = {
      onCloseStart: () => {
        this.openModalDay = false;
      }
    };

    MaterializeCss.AutoInit();
  }

}
