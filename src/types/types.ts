// --- auth
export interface IAuth {
  user: {
    id: string | null;
    email: string | null;
    // token: string | null;
  };
  token?: string | null;
  isLoggedIn: boolean;
  // isFetchingUser: boolean;
  // isPending: boolean;
}

export interface IUserState {
  auth: IAuth;
  products: IProductState;
}

// --- products
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

export interface SerializedError {
  name?: string;
  message?: string;
  stack?: string;
  code?: string;
}

export interface IProductState {
  data: IProduct[];
  isLoading: boolean;
  error: null | SerializedError;
}

//        "id": 1,
//       "title": "iPhone 9",
//       "description": "An apple mobile which is nothing like apple",
//       "price": 549,
//       "discountPercentage": 12.96,
//       "rating": 4.69,
//       "stock": 94,
//       "brand": "Apple",
//       "category": "smartphones",
//       "thumbnail": "...",
//       "images": ["...", "...", "..."]
