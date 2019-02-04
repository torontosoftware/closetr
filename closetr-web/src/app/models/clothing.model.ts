export class Clothing {
  clothingID: string;
  clothingName: string;
  clothingWorn: number;
  clothingCost: number;
  clothingCategory: string;
  clothingPurchaseDate: string;

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

}