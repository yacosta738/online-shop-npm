import { ICategory } from '@/shared/model/category.model';
import { IProduct } from '@/shared/model/product.model';

export const enum CategoryStatus {
  AVAILABLE = 'AVAILABLE',
  RESTRICTED = 'RESTRICTED',
  DISABLED = 'DISABLED'
}

export interface ICategory {
  id?: number;
  description?: string;
  sortOrder?: number;
  dateAdded?: Date;
  dateModified?: Date;
  status?: CategoryStatus;
  parent?: ICategory;
  products?: IProduct[];
}

export class Category implements ICategory {
  constructor(
    public id?: number,
    public description?: string,
    public sortOrder?: number,
    public dateAdded?: Date,
    public dateModified?: Date,
    public status?: CategoryStatus,
    public parent?: ICategory,
    public products?: IProduct[]
  ) {}
}
