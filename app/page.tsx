"use client";

import { useUser, useCart } from "@/context";

const DEMO_PRODUCTS = [
  { id: "1", name: "Running Shoes", price: 129.99, image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" },
  { id: "2", name: "Classic Sneakers", price: 89.99, image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" },
] as const;

export default function Home() {
  const { user, isAuthenticated, login, logout } = useUser();
  const { items, totalItems, totalPrice, addItem, removeItem, clearCart } = useCart();

  return (
    <div className="min-h-screen p-6">
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="navbar mb-6 rounded-box bg-zinc-900 px-4 shadow-sm">
        <div className="flex-1">
          <span className="text-xl font-bold text-white">Context Store</span>
        </div>
        <div className="flex items-center gap-3">
          {/* Cart badge */}
          <div className="indicator">
            {totalItems > 0 && (
              <span className="badge indicator-item badge-primary badge-sm">
                {totalItems}
              </span>
            )}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
          </div>

          {/* Auth button */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-white">{user?.name}</span>
              <button className="btn btn-outline btn-sm text-white" onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            <button
              className="btn btn-primary btn-sm"
              onClick={() =>
                login({ id: "1", name: "John Doe", email: "john@example.com" })
              }
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* ── Main grid ──────────────────────────────────────── */}
      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-3">
        {/* Product cards */}
        <div className="space-y-6 lg:col-span-2">
          <h2 className="text-2xl font-bold text-white">Products</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {DEMO_PRODUCTS.map((product) => (
              <div key={product.id} className="card bg-zinc-900 shadow-sm">
                <figure>
                  <img src={product.image} alt={product.name} />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-white">{product.name}</h2>
                  <p className="text-lg font-semibold text-zinc-300">
                    ${product.price.toFixed(2)}
                  </p>
                  <div className="card-actions justify-end">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => addItem(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart sidebar */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Cart</h2>
          <div className="card bg-zinc-900 shadow-sm">
            <div className="card-body">
              {items.length === 0 ? (
                <p className="text-zinc-500">Your cart is empty.</p>
              ) : (
                <>
                  <ul className="space-y-3">
                    {items.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="font-medium text-white">{item.name}</p>
                          <p className="text-sm text-zinc-400">
                            {item.quantity} x ${item.price.toFixed(2)}
                          </p>
                        </div>
                        <button
                          className="btn btn-ghost btn-xs text-error"
                          onClick={() => removeItem(item.id)}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>

                  <div className="divider before:bg-zinc-700 after:bg-zinc-700" />

                  <div className="flex justify-between text-lg font-bold text-white">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>

                  <button
                    className="btn btn-error btn-sm mt-2"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
