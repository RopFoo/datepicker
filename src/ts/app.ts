import '../scss/main.scss';
import { date } from './date';
import getJSONfromHTMLdata from './utils/getJSONfromHTMLdata';

const dateDiv: HTMLElement | HTMLInputElement | null = document.getElementById(
  'datepicker'
);

type options = {
  yearRange: number[];
  customTopOffset: number;
  language: String;
};

let options: options = {
  yearRange: [1930, 2020],
  customTopOffset: 1000,
  language: 'EN',
};

dateDiv?.dataset.datepicker &&
  (options = JSON.parse(dateDiv?.dataset.datepicker));

//console.log(options);
getJSONfromHTMLdata('yearRange: 1930-2009, customTopOffset: 30, language: EN');

date(
  dateDiv,
  {
    startYear: options.yearRange[0],
    endYear: options.yearRange[1],
  },
  options.customTopOffset
);
