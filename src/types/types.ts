// --- auth
export interface IAuth {
  user: {
    id: string | null;
    email: string | null;
  };
  token?: string | null;
  isLoggedIn: boolean;
}

export interface IUserState {
  auth: IAuth;
  products: IProductState;
}

// --- products
export interface SerializedError {
  name?: string;
  message?: string;
  stack?: string;
  code?: string;
}

export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  category: string;
  images: string[];
}

export interface IProductState {
  data: IProduct[];
  newProduct: IProduct | null;
  deletedProduct: null;
  isLoading: boolean;
  error: null | SerializedError;
}

export interface INewProduct {
  title: string;
  author: string;
  year: number | '';
  rating: number | '';
}

export enum columnTitlesType {
  id,
  title,
  description,
  price,
  images,
  rating,
  stock,
  category,
}

export type IColumnTitles = keyof typeof columnTitlesType;

export const columnsTitles = [
  'id',
  'title',
  'description',
  'price',
  'images',
  'rating',
  'stock',
  'category',
] as const;

export type ITitles = typeof columnsTitles;

// export interface Activity {
//   id?: string;
//   type: Item;
// }
