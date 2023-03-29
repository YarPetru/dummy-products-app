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
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
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
