import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import OrderHistory from './components/OrderHistory';
import Settings from './components/Settings';
import LogoutModal from './components/LogoutModal';

// Lazy load screen components
const HomeScreen = lazy(() => import('./screens/HomeScreen'));
const ProductScreen = lazy(() => import('./screens/ProductScreen'));
const CartScreen = lazy(() => import('./screens/CartScreen'));
const LoginScreen = lazy(() => import('./screens/LoginScreen'));
const RegisterScreen = lazy(() => import('./screens/RegisterScreen'));
const ProfileScreen = lazy(() => import('./screens/ProfileScreen'));
const ShippingScreen = lazy(() => import('./screens/ShippingScreen'));
const PaymentScreen = lazy(() => import('./screens/PaymentScreen'));
const PlaceOrderScreen = lazy(() => import('./screens/PlaceOrderScreen'));
const OrderScreen = lazy(() => import('./screens/OrderScreen'));
const UserListScreen = lazy(() => import('./screens/UserListScreen'));
const UserEditScreen = lazy(() => import('./screens/UserEditScreen'));
const ProductListScreen = lazy(() => import('./screens/ProductListScreen'));
const ProductEditScreen = lazy(() => import('./screens/ProductEditScreen'));
const OrderListScreen = lazy(() => import('./screens/OrderListScreen'));
const WishlistScreen = lazy(() => import('./screens/WishlistScreen'));
const FilterScreen = lazy(() => import('./screens/FilterScreen'));
const NotFound = lazy(() => import('./screens/NotFound'));

function App() {
    return (
        <Router>
            <Header />
            <main className="flex flex-col items-center">
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route exact path="/" element={<HomeScreen />} />
                        <Route path="*" element={<NotFound />} />
                        <Route path="/products" element={<FilterScreen />} />
                        <Route path="/register" element={<RegisterScreen />} />
                        <Route path="/login" element={<LoginScreen />} />
                        <Route path="/shipping" element={<ShippingScreen />} />
                        <Route path="/payment" element={<PaymentScreen />} />
                        <Route
                            path="/placeorder"
                            element={<PlaceOrderScreen />}
                        />
                        <Route path="/order/:id" element={<OrderScreen />} />
                        <Route path="/profile/" element={<ProfileScreen />}>
                            <Route
                                index
                                path="settings"
                                element={<Settings />}
                            />
                            <Route
                                path="order-history"
                                element={<OrderHistory />}
                            />
                            <Route path="cart" element={<CartScreen />} />
                            <Route path="logout" element={<LogoutModal />} />
                        </Route>
                        <Route
                            path="/product/:id"
                            element={<ProductScreen />}
                        />
                        <Route path="/cart/:id?" element={<CartScreen />} />
                        <Route
                            path="/favorites/:id?"
                            element={<WishlistScreen />}
                        />
                        <Route
                            path="/admin/userlist"
                            element={<UserListScreen />}
                        />
                        <Route
                            path="/admin/user/:id/edit"
                            element={<UserEditScreen />}
                        />

                        <Route
                            path="/admin/productlist"
                            exact
                            element={<ProductListScreen />}
                        />
                        <Route
                            path="/admin/product/:id/edit"
                            element={<ProductEditScreen />}
                        />
                        <Route
                            path="/admin/orderlist"
                            element={<OrderListScreen />}
                        />
                        <Route
                            path="/search/:keyword"
                            element={<HomeScreen />}
                        />
                    </Routes>
                </Suspense>
            </main>
            <Footer />
        </Router>
    );
}

export default App;
