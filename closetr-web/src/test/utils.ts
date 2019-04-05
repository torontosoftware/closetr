export const inputDispatch = (input: HTMLInputElement, value: any, dispatch: string = 'input') => {
  input.value = value;
  input.dispatchEvent(new Event(dispatch));
}
