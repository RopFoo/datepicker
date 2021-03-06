import createWeek from './createWeek';
import { displayDate, updateDate, currentDate } from '../datepicker';

export type yearRange = {
  startYear: number;
  endYear: number;
};

/**
 * Adds the year selection dropdown div to the calendar
 * @param {yearRange} yearRange - range of years being selectable
 * @param {displayDate} displayDate
 * @param {currentDate} currentDate - currently active date
 * @param {any} dateDiv - DOM date div
 * @param {string} language - selected language
 * @returns {HTMLDivElement} - year dropdown
 */
const createYears = (
  target: Element | HTMLElement | HTMLInputElement | null,
  yearRange: yearRange,
  displayDate: displayDate,
  currentDate: currentDate,
  dateDiv: HTMLElement | HTMLInputElement | null,
  language: string
): HTMLDivElement => {
  // create div wrapper element
  const yearDiv = document.createElement('div');
  yearDiv.classList.add('datepicker__year-section', 'rf-dp');
  // create dropdown element (select element)
  const yearDropdown = document.createElement('select');
  yearDropdown.classList.add('rf-dp');

  // loops over year range
  for (
    let selectedYear = yearRange.startYear;
    selectedYear <= yearRange.endYear;
    selectedYear++
  ) {
    // create div option element and append to dropdown
    const yearOption = document.createElement('option');
    yearOption.value = selectedYear.toString();
    yearOption.innerHTML = selectedYear.toString();
    yearDropdown.append(yearOption);
  }
  // sets current year value to last year of year range
  yearDropdown.value = yearRange.endYear.toString();
  yearDropdown.addEventListener('change', (e) => {
    if (dateDiv) {
      dateDiv.lastChild && dateDiv.lastChild.remove();
      const element = e.currentTarget as HTMLInputElement;
      displayDate.year = parseInt(element.value);
      dateDiv.append(createWeek(target, currentDate, displayDate, language));
      currentDate = updateDate(target, displayDate.format, displayDate);
      // adds 'rf-dp' class to all option elements
      Array.from(yearDropdown.children).forEach((option: any) => {
        option.classList.add('rf-dp');
      });
    }
  });
  yearDiv.append(yearDropdown);
  return yearDiv;
};

export default createYears;
