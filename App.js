import React, { createContext, useContext, useEffect, useState } from 'react';

const AppCtx = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const u = localStorage.getItem('user');
      return u ? JSON.parse(u) : null;
    } catch (e) {
      return null;
    }
  });

  const [cart, setCart] = useState(() => {
    try {
      const c = localStorage.getItem('cart');
      return c ? JSON.parse(c) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => { localStorage.setItem('cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { if (user) localStorage.setItem('user', JSON.stringify(user)); else localStorage.removeItem('user'); }, [user]);

  const login = (userObj) => setUser(userObj);
  const logout = () => { setUser(null); setCart([]); localStorage.removeItem('cart'); };

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === item.id);
      if (existing) return prev.map(p => p.id === item.id ? { ...p, qty: p.qty + 1 } : p);
      return [...prev, { ...item, qty: 1 }];
    });
  };
  const updateQty = (id, qty) => {
    setCart(prev => prev.map(p => p.id === id ? { ...p, qty } : p).filter(p => p.qty > 0));
  };
  const clearCart = () => setCart([]);
  const totalCost = cart.reduce((s, it) => s + (it.price || 0) * it.qty, 0);

  return (
    <AppCtx.Provider value={{ user, login, logout, cart, addToCart, updateQty, clearCart, totalCost }}>
      {children}
    </AppCtx.Provider>
  );
}

export const useApp = () => useContext(AppCtx);
