import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import {
  clickTest,
  clickAndTestCalledWithMult
} from './utils';
import {
  mockUserOne,
  mockClosetListRenderedTable
} from './objects';

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

export const toggleDateRangeShouldToggle = (
  component, fixture, button
) => {
  [1, 2, 3].forEach((i) => {
    clickTest(button, fixture);
    expect(button.checked).toEqual(i % 2 === 0);
    expect(component.isDateRange).toEqual(i % 2 === 0);
  });
}

export const editButtonTests = (
  component, fixture, hostElement
) => {
  let editButton;
  beforeEach(() => {
    editButton = hostElement.querySelector('#edit-button button');
    clickTest(editButton, fixture);
  });
  it(`should call toggleEditMode method, and
    change the editMode variable (multiple toggles)`, () => {
    toggleEditModeShouldToggle(component, fixture, editButton);
  });
  describe(`the save button`, () => {
    let saveButton;
    beforeEach(() => {
      saveButton = hostElement.querySelector('#save-button button');
    });
    it(`should hide save button when editMode is off`, () => {
      expect(saveButton.hidden).toBeFalsy();
      clickTest(editButton, fixture);
      expect(saveButton.hidden).toBeTruthy();
    });
    it(`should call save, and toggleEditMode functions
      when save button is clicked`, () => {
      clickAndTestCalledWithMult(
        saveButton,
        fixture,
        [{func: component.save}, {func: component.toggleEditMode}]
      );
    });
  });
}

export const getAllClothesComponent = (
  component, fixture, closetService
) => {
  component.getAllClothes();
  fixture.detectChanges();
  expect(closetService.getAllClothes).toHaveBeenCalledWith(mockUserOne);
  expect(component.closetList).toEqual(mockClosetListRenderedTable);
}

export const purchaseTableShouldRender = (
  component, fixture, dateFormatService, isBudgetWidget = false
) => {
  let mockPurchaseTable = {
    bindBold: "clothingCost",
    bindRegular: "clothingName",
    filter: "date",
    filterBy: "clothingPurchaseDate",
    filterCriteria: {
      dateFrom: dateFormatService.dateRangeForFrom("last month"),
      dateTo: dateFormatService.newDate()
    },
    items: mockClosetListRenderedTable
  };
  (isBudgetWidget &&
    (mockPurchaseTable.filterCriteria.dateRangeFor = "last month"));
  let purchaseTable = fixture.debugElement.query(
    By.css('#purchase-table')
  ).componentInstance;
  component.ngOnInit();
  fixture.detectChanges();
  expect(purchaseTable.bindBold).toEqual(mockPurchaseTable.bindBold);
  expect(purchaseTable.bindRegular).toEqual(mockPurchaseTable.bindRegular);
  expect(purchaseTable.filter).toEqual(mockPurchaseTable.filter);
  expect(purchaseTable.filterBy).toEqual(mockPurchaseTable.filterBy);
  expect(purchaseTable.filterCriteria).toEqual(mockPurchaseTable.filterCriteria);
  expect(purchaseTable.items).toEqual(mockPurchaseTable.items);
}
