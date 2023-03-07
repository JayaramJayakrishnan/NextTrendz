import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0
      let orderTotal
      let cartItemsCount

      if (!showEmptyView) {
        const productTotalPriceList = cartList.map(
          product => product.price * product.quantity,
        )
        orderTotal = productTotalPriceList.reduce(
          (price1, price2) => price1 + price2,
        )
        cartItemsCount = cartList.length
      }

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                {!showEmptyView && (
                  <button
                    type="button"
                    className="remove-all-button"
                    onClick={removeAllCartItems}
                  >
                    Remove All
                  </button>
                )}
                <CartListView />
                {!showEmptyView && (
                  <>
                    <div className="order-summary-container">
                      <h1 className="order-total-text">
                        Order Total:{' '}
                        <span className="order-total-price">
                          Rs {orderTotal}/-{' '}
                        </span>
                      </h1>
                      <p className="cart-items-count">
                        {cartItemsCount} items in cart
                      </p>
                      <button type="button" className="checkout-button-md">
                        Checkout
                      </button>
                    </div>
                    <button type="button" className="checkout-button-sm">
                      Checkout
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
