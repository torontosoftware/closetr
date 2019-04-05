export const inputDispatch = (
  input: HTMLInputElement,
  value: any,
  dispatch: string = 'input'
) => {
  input.value = value;
  input.dispatchEvent(new Event(dispatch));
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
}
