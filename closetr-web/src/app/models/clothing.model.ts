export class Clothing {
  clothingID: string;
  clothingName: string;
  clothingWorn: number;
  clothingCost: number;
  clothingCategory: string;
  clothingPurchaseDate: string;

  static clothingCategories = [
    "Top",
    "Blouse",
    "Sweater",
    "Jacket/Coat",
    "Bottom",
    "Pants",
    "Skirt",
    "Accesory"
  ];

  constructor(clothing: Clothing = {} as Clothing) {
    let {
      clothingID = null,
      clothingName = '',
      clothingWorn = 0,
      clothingCost = 0,
      clothingCategory = 'Top',
      clothingPurchaseDate = new Date()
    } = clothing;

    this.clothingID = clothingID;
    this.clothingName = clothingName;
    this.clothingWorn = clothingWorn;
    this.clothingCost = clothingCost;
    this.clothingCategory = clothingCategory;
    this.clothingPurchaseDate = clothingPurchaseDate;
  }

  /*
  get clothingID
  */
  getClothingID(): string {
    return this.clothingID;
  }

  /*
  set clothingID
  */
  setClothingID(clothingID: string): void {
    this.clothingID = clothingID;
  }

  /*
  get clothingName
  */
  getClothingName(): string {
    return this.clothingName;
  }

  /*
  set clothingName
  */
  setClothingName(clothingName: string): void{
    this.clothingName = clothingName;
  }

  /*
  get clothingWorn (number of times clothing item has been worn)
  */
  getClothingWorn(): number {
    return this.clothingWorn;
  }

  /*
  set clothingWorn (number of times clothing item has been worn)
  */
  setClothingWorn(clothingWorn: number): void{
    this.clothingWorn = clothingWorn;
  }

  /*
  get clothingCost
  */
  getClothingCost(): number {
    return this.clothingCost;
  }

  /*
  set clothingCost
  */
  setClothingCost(clothingCost: number): void{
    this.clothingCost = clothingCost;
  }

  /*
  get clothingCategory
  */
  getClothingCategory(): string {
    return this.clothingCategory;
  }

  /*
  set clothingCategory
  */
  setClothingCategory(clothingCategory: string): void{
    this.clothingCategory = clothingCategory;
  }

  /*
  get clothingPurchaseDate
  */
  getClothingPurchaseDate(): Date {
    return this.clothingPurchaseDate;
  }

  /*
  set clothingPurchaseDate
  */
  setClothingPurchaseDate(clothingPurchaseDate: Date): void{
    this.clothingPurchaseDate = clothingPurchaseDate;
  }

  /*
  return clothing categories
  */
  static getClothingCategories(): Array<string> {
    return this.clothingCategories;
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
