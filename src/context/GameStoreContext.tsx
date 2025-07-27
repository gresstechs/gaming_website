import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface Game {
  id: number;
  title: string;
  genre: string;
  platform: string;
  price: number;
  description: string;
  image: string;
  rating: number;
  releaseDate: string;
  developer: string;
  inStock: boolean;
}

export interface CartItem extends Game {
  quantity: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface Order {
  id: number;
  userId: number;
  items: CartItem[];
  total: number;
  status: string;
  date: string;
}

interface GameStoreState {
  games: Game[];
  cart: CartItem[];
  user: User | null;
  orders: Order[];
  searchResults: Game[];
}

type GameStoreAction =
  | { type: 'ADD_TO_CART'; payload: Game }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'REGISTER'; payload: User }
  | { type: 'PLACE_ORDER'; payload: Order }
  | { type: 'SEARCH_GAMES'; payload: Game[] }
  | { type: 'ADD_GAME'; payload: Game }
  | { type: 'UPDATE_GAME'; payload: Game }
  | { type: 'DELETE_GAME'; payload: number };

const initialGames: Game[] = [
  {
    id: 1,
    title: 'Cyberpunk 2077',
    genre: 'RPG',
    platform: 'PC, PS5, Xbox',
    price: 59.99,
    description: 'An open-world, action-adventure story set in Night City.',
    image: 'https://images.pexels.com/photos/7034602/pexels-photo-7034602.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.2,
    releaseDate: '2020-12-10',
    developer: 'CD Projekt Red',
    inStock: true
  },
  {
    id: 2,
    title: 'The Witcher 3: Wild Hunt',
    genre: 'RPG',
    platform: 'PC, PS4, Xbox, Switch',
    price: 39.99,
    description: 'A story-driven open world RPG set in a visually stunning fantasy universe.',
    image: 'https://images.pexels.com/photos/7915365/pexels-photo-7915365.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.8,
    releaseDate: '2015-05-19',
    developer: 'CD Projekt Red',
    inStock: true
  },
  {
    id: 3,
    title: 'Elden Ring',
    genre: 'Action RPG',
    platform: 'PC, PS5, Xbox',
    price: 69.99,
    description: 'A fantasy action-RPG adventure set within a world created by Hidetaka Miyazaki.',
    image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.9,
    releaseDate: '2022-02-25',
    developer: 'FromSoftware',
    inStock: true
  },
  {
    id: 4,
    title: 'Call of Duty: Modern Warfare II',
    genre: 'FPS',
    platform: 'PC, PS5, Xbox',
    price: 69.99,
    description: 'The ultimate weapon is team. Team up and fight alongside the iconic operators.',
    image: 'https://images.pexels.com/photos/687811/pexels-photo-687811.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.3,
    releaseDate: '2022-10-28',
    developer: 'Infinity Ward',
    inStock: true
  },
  {
    id: 5,
    title: 'FIFA 24',
    genre: 'Sports',
    platform: 'PC, PS5, Xbox, Switch',
    price: 59.99,
    description: 'The world\'s game powered by Football. Feel closer to the game with EA SPORTS FC 24.',
    image: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.1,
    releaseDate: '2023-09-29',
    developer: 'EA Sports',
    inStock: true
  },
  {
    id: 6,
    title: 'Grand Theft Auto V',
    genre: 'Action',
    platform: 'PC, PS5, Xbox',
    price: 29.99,
    description: 'When a young street hustler, a retired bank robber and a terrifying psychopath find themselves entangled.',
    image: 'https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.7,
    releaseDate: '2013-09-17',
    developer: 'Rockstar Games',
    inStock: true
  }
];

const initialState: GameStoreState = {
  games: initialGames,
  cart: [],
  user: null,
  orders: [],
  searchResults: []
};

function gameStoreReducer(state: GameStoreState, action: GameStoreAction): GameStoreState {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }]
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ).filter(item => item.quantity > 0)
      };

    case 'CLEAR_CART':
      return {
        ...state,
        cart: []
      };

    case 'LOGIN':
      return {
        ...state,
        user: action.payload
      };

    case 'LOGOUT':
      return {
        ...state,
        user: null,
        cart: []
      };

    case 'REGISTER':
      return {
        ...state,
        user: action.payload
      };

    case 'PLACE_ORDER':
      return {
        ...state,
        orders: [...state.orders, action.payload],
        cart: []
      };

    case 'SEARCH_GAMES':
      return {
        ...state,
        searchResults: action.payload
      };

    case 'ADD_GAME':
      return {
        ...state,
        games: [...state.games, action.payload]
      };

    case 'UPDATE_GAME':
      return {
        ...state,
        games: state.games.map(game =>
          game.id === action.payload.id ? action.payload : game
        )
      };

    case 'DELETE_GAME':
      return {
        ...state,
        games: state.games.filter(game => game.id !== action.payload)
      };

    default:
      return state;
  }
}

const GameStoreContext = createContext<{
  state: GameStoreState;
  dispatch: React.Dispatch<GameStoreAction>;
} | null>(null);

export function GameStoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameStoreReducer, initialState);

  return (
    <GameStoreContext.Provider value={{ state, dispatch }}>
      {children}
    </GameStoreContext.Provider>
  );
}

export function useGameStore() {
  const context = useContext(GameStoreContext);
  if (!context) {
    throw new Error('useGameStore must be used within a GameStoreProvider');
  }
  return context;
}