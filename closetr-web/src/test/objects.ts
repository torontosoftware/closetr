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

export const mockClothingEmpty = new Clothing();

export const mockClothingOne = new Clothing({
  clothingID: '24681',
  clothingName: "Zara Mockneck Tee",
  clothingWorn: 4,
  clothingCost: 10,
  clothingCategory: "Top",
  clothingPurchaseDate: "2019-02-03"
});

export const mockClothingTwo = new Clothing({
  clothingID: '12345',
  clothingName: 'White Button Down Shirt',
  clothingWorn: 12,
  clothingCost: 45,
  clothingCategory: "Top",
  clothingPurchaseDate: '2018-03-14'
});

export const mockClosetList = [
  new Clothing({clothingID: '1', clothingName: 'tshirt'}),
  new Clothing({clothingID: '2', clothingName: 'jeans'}),
  new Clothing({clothingID: '3', clothingName: 'shoes'})
];

export const mockClosetListRenderedTable = mockClosetList.map((clothing) => {
  clothing.bindBold = 0;
  clothing.bindRegular = clothing.clothingName;
  return clothing;
});

export const mockUserOne = new User({
  id: '1',
  userID: 'fideslinga',
  userName: 'Fides Linga',
  userDesc: 'description',
  userPassword: 'password'
});

export const mockUserTwo = new User({
  id: '1',
  userID: 'fideslinga',
  userName: 'Fidessa Linga',
  userDesc: 'a big chungus',
  userPassword: 'password'
});

export const mockOutfitClothingList = mockClosetList.map((clothing) => {
  return {
    outfitEntryID: clothing.clothingID,
    clothing: clothing
  }
});
