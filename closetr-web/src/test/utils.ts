import { HttpTestingController } from '@angular/common/http/testing';

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
  clickAndTestCalledWith(button, router.navigate, [result], fixture);
};

export const clickAndTestCalledWith = (
  button: any,
  func: any,
  result: any,
  fixture: any
) => {
  button.click();
  fixture.detectChanges();
  expect(func).toHaveBeenCalledWith(result);
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
