import React from 'react'
import { Cart, CartItemType, } from './types/cartItem'
//import { UserInfo } from './types/UserInfo'

type AppState = {
  
  //fullBox: boolean
  //userInfo?: UserInfo
  cart: Cart
}

const initialState: AppState = {
//   mode: localStorage.getItem('mode')
//     ? localStorage.getItem('mode')!
//     : window.matchMedia &&
//       window.matchMedia('(prefers-color-scheme: dark)').matches
//     ? 'dark'
//     : 'light',
//   fullBox: false,
//   userInfo: localStorage.getItem('userInfo')
//     ? JSON.parse(localStorage.getItem('userInfo')!)
//     : null,

  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems')!)
      : [],
    // shippingAddress: localStorage.getItem('shippingAddress')
    //   ? JSON.parse(localStorage.getItem('shippingAddress')!)
    //   : { location: {} },
 
    total: 0,
  },
}
type Action =
  | { type: 'SET_FULLBOX_ON' }
  | { type: 'SET_FULLBOX_OFF' }
  | { type: 'CART_ADD_ITEM'; payload: CartItemType }
  | { type: 'CART_REMOVE_ITEM'; payload: CartItemType }
  | { type: 'CART_CLEAR' }
  | { type: 'USER_SIGNOUT' }
//   | { type: 'SAVE_SHIPPING_ADDRESS'; payload: ShippingAddress }
  | { type: 'SAVE_PAYMENT_METHOD'; payload: string }
  | { type: 'SAVE_SHIPPING_ADDRESS_MAP_LOCATION'; payload: Location }

function reducer(state: AppState, action: Action): AppState | undefined {
  switch (action.type) {
  
    // case 'SET_FULLBOX_ON':
    //   return { ...state, fullBox: true }
    // case 'SET_FULLBOX_OFF':
    //   return { ...state, fullBox: false }

    case 'CART_ADD_ITEM':
      // add to cart
      const newItem = action.payload
      const existItem = state.cart.cartItems.find(
        (item: CartItemType) => item._id === newItem._id
      )
      const cartItems = existItem
        ? state.cart.cartItems.map((item: CartItemType) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem]
      localStorage.setItem('cartItems', JSON.stringify(cartItems))
      return { ...state, cart: { ...state.cart, cartItems } }
    case 'CART_REMOVE_ITEM': {
      const cartItems = state.cart.cartItems.filter(
        (item: CartItemType) => item._id !== action.payload._id
      )
      localStorage.setItem('cartItems', JSON.stringify(cartItems))
      return { ...state, cart: { ...state.cart, cartItems } }
    }
    case 'CART_CLEAR':
      return { ...state, cart: { ...state.cart, cartItems: [] } }
  }
    // case 'SAVE_SHIPPING_ADDRESS':
    //   return {
    //     ...state,
    //     cart: {
    //       ...state.cart,
    //       shippingAddress: action.payload,
    //     },
    //   }
    // case 'SAVE_SHIPPING_ADDRESS_MAP_LOCATION':
    //   return {
    //     ...state,
    //     cart: {
    //       ...state.cart,
    //       shippingAddress: {
    //         ...state.cart.shippingAddress!,
    //         location: action.payload,
    //       },
    //     },
     
}


const defaultDispatch: React.Dispatch<Action> = () => initialState

// const Store = React.createContext({
//   state: initialState,
//   dispatch: defaultDispatch,
// })
// function StoreProvider(props: React.PropsWithChildren<{}>) {
//   const [state, dispatch] = React.useReducer<React.Reducer<AppState, Action>>(
//     reducer,
//     initialState
//   )
//   return <Store.Provider value={{ state, dispatch }} {...props} />
// }
// }
// export { Store, StoreProvider }