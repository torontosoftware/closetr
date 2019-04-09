export const httpHandlerDefault = (apiCall: any) => {
  return apiCall.pipe(map(
    (data: any) => data,
    error => { console.log(error) }
  ));
}
