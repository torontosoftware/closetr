import { of } from 'rxjs';

export const loggedUserRedirectDashboard = (service, component, fixture, router) => {
  service.currentUserValue = of("fides");
  component.ngOnInit();
  fixture.detectChanges();
  expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
}

export const userNotRedirectDashboard = (component, fixture, router) => {
  fixture.detectChanges();
  component.ngOnInit();
  expect(router.navigate).not.toHaveBeenCalledWith(['/dashboard']);
}
