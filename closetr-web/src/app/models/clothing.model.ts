export class Clothing {
  clothingID: string;
  clothingName: string;
  clothingWorn: number;
  clothingCost: number;
  clothingCategory: string;
  clothingPurchaseDate: string;
  userID: string;
  bindBold: any;
  bindRegular: any;

  public static clothingCategories = [
    "Top",
    "Blouse",
    "Sweater",
    "Jacket/Coat",
    "Bottom",
    "Pants",
    "Skirt",
    "Accesory"
  ];

  constructor(clothing: any = {} as Clothing) {
    let {
      clothingID = null,
      clothingName = '',
      clothingWorn = 0,
      clothingCost = 0,
      clothingCategory = 'Top',
      clothingPurchaseDate = '',
      userID = '',
      bindBold = '',
      bindRegular = ''
    } = clothing;

    this.clothingID = clothingID;
    this.clothingName = clothingName;
    this.clothingWorn = clothingWorn;
    this.clothingCost = clothingCost;
    this.clothingCategory = clothingCategory;
    this.clothingPurchaseDate = clothingPurchaseDate;
    this.userID = userID;
    this.bindBold = bindBold;
    this.bindRegular = bindRegular;
  }

  /*
  Returns true if clothing object should be able to be saved.
  */
  enableClothingSave(): boolean {
    return !(this.clothingName.length === 0
        || !this.clothingCost === null
        || this.clothingCategory.length === 0
        || !this.clothingWorn === null
        || this.clothingPurchaseDate.length === 0);
  }

}
