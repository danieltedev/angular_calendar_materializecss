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
  day: Array<Day> = new Array();
  openModal: boolean;
  openModalMonth: boolean;
  detalheOption: ModalOptions;
  detalheOptionMonth: ModalOptions;

  listYears: Array<Array<number>> = new Array();
  listMonths: Array<Array<string>> = new Array();

  weekdays: Array<string> = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];

  selectMonth: { id: number, name: string };
  monthYear: { month: string, year: number };

  changeMonthYear(date: Date): void {
    const locale = 'en-us';

    this.monthYear = {
      month: date.toLocaleString(locale, { month: 'long' }).toUpperCase().substring(0, 3),
      year: date.getFullYear()
    };
  }

  nextMonthYear(): void {
    let month = this.actualDate.getMonth();
    let year = this.actualDate.getFullYear();
    year = month === 12 ? year + 1 : year;
    month = month === 12 ? month - 11 : month + 1;
    this.actualDate = new Date(year, month, this.actualDate.getDate());
    this.changeMonthYear(this.actualDate);
    this.buildMonth(this.actualDate.getFullYear(), this.actualDate.getMonth(), this.actualDate.getDate());
  }

  previusMonthYear(): void {
    let month = this.actualDate.getMonth();
    let year = this.actualDate.getFullYear();
    year = month === 12 ? year - 1 : year;
    month = month === 12 ? month + 11 : month - 1;
    this.actualDate = new Date(year, month, this.actualDate.getDate());
    this.changeMonthYear(this.actualDate);
    this.buildMonth(this.actualDate.getFullYear(), this.actualDate.getMonth(), this.actualDate.getDate());
  }

  selectedDate(day: Day): void {
    this.month.forEach((m) => m.forEach((d) => {
      if (d !== null) {
        d.selected = false;
      }

      if (d && day.day === d.day) {
        d.selected = true;
      }
    }));
  }

  tableYears(): void {
    let year = 0;
    this.listYears = new Array();
    for (let i = 0; i < 5; i++) {
      const years: Array<number> =  new Array();
      for (let e = 0; e < 5; e++) {
        years.push(this.actualDate.getFullYear() + year);
        year++;
      }
      this.listYears.push(years);
    }
    console.log(this.listYears);
  }

  tableMonth(): void {
    const locale = 'en-us';
    let month = 0;
    this.listMonths = new Array();
    for (let i = 0; i < 2; i++) {
      const months: Array<string> =  new Array();
      for (let e = 0; e < 6; e++) {
        const date = new Date(this.actualDate.getMonth(), month, 1);
        months.push(date.toLocaleString(locale, { month: 'long' }).toUpperCase().substring(0, 3));
        month++;
      }
      this.listMonths.push(months);
    }
    console.log(this.listMonths);
  }

  selectedYear(year: number) {
    this.actualDate = new Date(year, this.actualDate.getMonth(), this.actualDate.getDate());
    this.changeMonthYear(this.actualDate);
    this.buildMonth(this.actualDate.getFullYear(), this.actualDate.getMonth(), this.actualDate.getDate());
  }

  selectedMonth(month: number) {
    this.actualDate = new Date(this.actualDate.getFullYear(), month, this.actualDate.getDate());
    this.changeMonthYear(this.actualDate);
    this.buildMonth(this.actualDate.getFullYear(), this.actualDate.getMonth(), this.actualDate.getDate());
  }

  private buildMonth(year: number, month: number, currentDay: number): void {
    this.month = new Array();
    const firstDate: Date = new Date(year, month, 1);
    const lastDate: Date = new Date(year, month + 1, 0);
    const allday = lastDate.getDate() + firstDate.getDay();
    const totalRow = Math.trunc(allday / 7);
    let day = 1;
    for (let e = 0; e <= totalRow; e++) {
      this.day = new Array();
      for (let i = 0; i < 7; i++) {
        if (e === 0 && i >= firstDate.getDay()) {
          this.day.push({
            day: day++
          });
        } else if (e > 0 && e < totalRow) {
          this.day.push({
            day: day++
          });
        } else if (e > 0 && i <= lastDate.getDay() && day <= lastDate.getDate()) {
          this.day.push({
            day: day++
          });
        } else {
          this.day.push(null);
        }
      }
      this.month.push(this.day);
    }

    this.month = this.month.filter((e) => e.filter((i) => {
      if (i && month === new Date().getMonth() && year === new Date().getFullYear()) {
        i.current = currentDay === i.day;
      }
      return i !== null;
    }).length > 0);
  }

  today(): void {
    this.actualDate = new Date();
    this.changeMonthYear(this.actualDate);
    this.buildMonth(this.actualDate.getFullYear(), this.actualDate.getMonth(), this.actualDate.getDate());
  }

  showModal(): void {
    this.tableYears();
    this.openModal = true;
  }

  showModalMonth(): void {
    this.tableMonth();
    this.openModalMonth = true;
  }

  ngOnInit(): void {
    this.changeMonthYear(this.actualDate);
    this.buildMonth(this.actualDate.getFullYear(), this.actualDate.getMonth(), this.actualDate.getDate());
    this.detalheOption = {
      onCloseStart: () => {
        this.openModal = false;
      }
    };

    this.detalheOptionMonth = {
      onCloseStart: () => {
        this.openModalMonth = false;
      }
    };

    MaterializeCss.AutoInit();
  }

}
