import { Clothing } from '../app/models/clothing.model';
import { User } from '../app/models/user.model';

/*
Contains mock objects used for
testing purposes.
*/

export const filterOptions = [
  "no filter",
  "exclude Aritzia items",
  "sweaters only",
  "pants and sweaters only",
  "pants only"
];

export const sortOptions = [
  "cost ascending",
  "cost descending",
  "most recently purchased",
  "least recently purchased",
  "most worn"
];

export const mockClothingEmpty = new Clothing({userID: "1"});

export const mockClothingID = 'clothingID';

export const mockClothingOne = new Clothing({
  clothingID: '24681',
  clothingName: "Zara Mockneck Tee",
  clothingWorn: 4,
  clothingCost: 10,
  clothingCategory: "Top",
  clothingPurchaseDate: "2019-02-03",
  userID: "1"
});

export const mockClothingTwo = new Clothing({
  clothingID: '12345',
  clothingName: 'White Button Down Shirt',
  clothingWorn: 12,
  clothingCost: 45,
  clothingCategory: "Top",
  clothingPurchaseDate: '2018-03-14',
  userID: "1"
});

export const mockClosetList = [
  new Clothing({clothingID: '1', clothingName: 'tshirt', userID: '1'}),
  new Clothing({clothingID: '2', clothingName: 'jeans', userID: '1'}),
  new Clothing({clothingID: '3', clothingName: 'shoes', userID: '1'})
];

export const mockClosetListRenderedTable = mockClosetList.map((clothing) => {
  clothing.bindBold = 0;
  clothing.bindRegular = clothing.clothingName;
  return clothing;
});

export const mockUserOneObject = {
  id: '1',
  userID: 'fideslinga',
  userName: 'Fides Linga',
  userDesc: 'description',
  userPassword: 'password'
};

export const mockUserTwoObject = {
  id: '1',
  userID: 'fideslinga',
  userName: 'Fidessa Linga',
  userDesc: 'a big chungus',
  userPassword: 'password'
};

export const mockUserCallbackWithToken = {
  data: mockUserTwoObject,
  token: 'token'
};

export const mockUserOne = new User(mockUserOneObject);

export const mockUserTwo = new User(mockUserTwoObject);

export const mockOutfitClothingList = mockClosetList.map((clothing) => {
  return {
    outfitEntryID: clothing.clothingID,
    clothing: clothing
  }
});

export const mockOutfitEntryID = "outfitEntryID";

export const mockOutfitEntry = {
  clothing: mockClothingOne,
  date: "2019-03-26",
  user: "userID",
  _id: mockOutfitEntryID
}

export const mockOutfitEntryCriteria = {
  date: "2019-03-26",
  userID: "userID"
}

export const mockOutfitEntryList = mockClosetList;

export const mockSearchFilterPipeParams = [[
  mockClosetList, 'shirt', 'clothingName'
]];

export const mockLoginData = {
  userID: 'fides',
  userPassword: 'password'
};
