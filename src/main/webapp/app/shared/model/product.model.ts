import { IWishList } from '@/shared/model/wish-list.model';
import { ICategory } from '@/shared/model/category.model';

export interface IProduct {
  id?: number;
  title?: string;
  keywords?: string;
  description?: string;
  rating?: number;
  dateAdded?: Date;
  dateModified?: Date;
  wishList?: IWishList;
  categories?: ICategory[];
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public title?: string,
    public keywords?: string,
    public description?: string,
    public rating?: number,
    public dateAdded?: Date,
    public dateModified?: Date,
    public wishList?: IWishList,
    public categories?: ICategory[]
  ) {}
}
