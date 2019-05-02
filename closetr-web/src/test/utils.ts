import { HttpTestingController } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

export const inputDispatch = (
  input: HTMLInputElement,
  value: any,
  dispatch: string = 'input'
) => {
  input.value = value;
  input.dispatchEvent(new Event(dispatch));
}

export const inputDispatchAndCount = (
  input: HTMLInputElement,
  value: any,
  hostElement: any,
  queryElement: string,
  expectedCount: number,
  fixture: any,
  dispatch: string = 'input'
) => {
  inputDispatch(input, value, dispatch);
  fixture.detectChanges();
  let elementList = hostElement.querySelectorAll(queryElement);
  expect(elementList.length).toEqual(expectedCount);
}

export const inputDispatchAndCheckArgs = (
  input: HTMLInputElement,
  value: any,
  expectedValue: any,
  spySubject: any,
  fixture: any,
  dispatch: string = 'input'
) => {
  inputDispatch(input, value, dispatch);
  fixture.detectChanges();
  expect(spySubject.calls.allArgs()).toEqual(expectedValue);
}

export const multTestCompare = (
  subjects: Array<any>,
  property,
  value
) => {
  for (let subject of subjects) {
    expect(subject[property]).toEqual(value);
  };
};

export const multInputDispatchAndChange = (
  inputs: Array<any>,
  fixture
) => {
  for (let inputValue of inputs) {
    let { input, value, dispatch = 'input'} = inputValue;
    inputDispatch(input, value, dispatch);
  }
  fixture.detectChanges();
};

export const clickBackAndTestNavigate = (
  hostElement: any,
  router: any,
  result: any,
  fixture: any
) => {
  let backButton = hostElement.querySelector('#back-button button');
  clickAndTestNavigate(backButton, router, result, fixture);
}

export const clickAndTestNavigate = (
  button: any,
  router: any,
  result: any,
  fixture: any
) => {
  clickAndTestCalledWith(button, fixture, router.navigate, [result]);
};

export const clickTest = (
  button: any,
  fixture: any
) => {
  button.click();
  fixture.detectChanges();
}

const testCalled = (func: any, result: any) => {
  if (result) {
    expect(func).toHaveBeenCalledWith(result);
  } else {
    expect(func).toHaveBeenCalled();
  }
}

export const clickAndTestCalledWith = (
  button: any,
  fixture: any,
  func: any,
  result: any = undefined
) => {
  clickTest(button, fixture);
  testCalled(func, result);
}

export const clickAndTestCalledWithMult = (
  button: any,
  fixture: any,
  tests: any
) => {
  clickTest(button, fixture);
  tests.forEach(({func, result}) => {
    testCalled(func, result);
  });
}

export const httpTestHelper = (
  httpTestingController: HttpTestingController
) => (
  method: any,
  subject: any,
  url: string,
  type: string,
  methodParam: any = subject,
  subjectFlush: any = subject
) => {
  method(methodParam).subscribe(result => expect(result).toEqual(subject));
  const req = httpTestingController.expectOne(url);
  expect(req.request.method).toEqual(type);
  req.flush(subjectFlush);
}

export const searchCriteriaDateRange = (dateFormatService) => (
  dateRangeFor, dateFrom, dateTo
) => {
  return {
    property: "clothingPurchaseDate",
    dateRangeFor: dateRangeFor,
    dateFrom: dateFormatService.newDate(dateFrom[0], dateFrom[1], dateFrom[2]),
    dateTo: dateFormatService.newDate(dateTo[0], dateTo[1], dateTo[2]),
    dateFromFormatted:
      `${dateFrom[0]}-0${dateFrom[1]}-0${dateFrom[2]}`,
    dateToFormatted:
      `${dateTo[0]}-0${dateTo[1]}-0${dateTo[2]}`
  };
}

export const searchCriteriaDateRangeFor = (dateFormatService) => (
  dateRangeFor
) => {
  return {
    property: "clothingPurchaseDate",
    dateRangeFor: dateRangeFor,
    dateFrom: dateFormatService.dateRangeForFrom(dateRangeFor),
    dateTo: dateFormatService.newDate(),
    dateFromFormatted: dateFormatService.formatDateString(
      dateFormatService.dateRangeForFrom(dateRangeFor)),
    dateToFormatted: dateFormatService.formatDateString(new Date())
  };
}

export const inputChangeTestClassname = (
  component, fixture
) => (
  subject, inputType, inputValue, className
) => {
  component[inputType] = inputValue;
  fixture.detectChanges();
  expect(subject.className.includes(className)).toBeTruthy();
}

export const uiIconSizedTest = ( fixture, size, className ) => {
  let iconSized = fixture.debugElement.query(
    By.css('i')).componentInstance;
  expect(iconSized.className).toEqual(className);
  expect(iconSized.size).toEqual(size);
}
