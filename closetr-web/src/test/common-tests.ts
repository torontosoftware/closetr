import { of } from 'rxjs';

export const loggedUserRedirectDashboard = (service, component, fixture) => {
  service.currentUserValue = of("fides");
  component.ngOnInit();
  fixture.detectChanges();
}

export const userNotRedirectDashboard = (component, fixture) => {
  fixture.detectChanges();
  component.ngOnInit();
}
