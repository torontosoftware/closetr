import { of } from 'rxjs';
import { clickTest } from './utils';

export const loggedUserRedirectDashboard = (
  service, component, fixture, router
) => {
  service.currentUserValue = of("fides");
  component.ngOnInit();
  fixture.detectChanges();
  expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
}

export const userNotRedirectDashboard = (router) => {
  expect(router.navigate).not.toHaveBeenCalledWith(['/dashboard']);
}

export const toggleEditModeShouldToggle = (
  component, fixture, button
) => {
  [1, 2, 3].forEach((i) => {
    clickTest(button, fixture);
    expect(component.toggleEditMode).toHaveBeenCalledTimes(i + 1);
    expect(component.editMode).toEqual(i % 2 === 0);
  });
}
