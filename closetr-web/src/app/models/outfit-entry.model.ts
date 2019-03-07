export class OutfitEntry {
  clothingID: string;
  userID: string;
  date: string;
  outfitEntryID: string;

  constructor(outfit_entry: any = {} as OutfitEntry) {
    let {
      clothingID = null,
      userID = '',
      date = '',
      outfitEntryID = ''
    } = outfit_entry;

    this.clothingID = clothingID;
    this.userID = userID;
    this.date = date;
    this.outfitEntryID = outfitEntryID;
  };
}
