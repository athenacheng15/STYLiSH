import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./Header";
import Banner from "./Banner";
import Content from "./Content";
import Detail from "./Detail";
import Checkout from "./Checkout";
import Footer from "./Footer";
import MobilFixed from "./MobilFixed";

export default function MainRoutes() {
	const cartList = JSON.parse(localStorage.getItem("cartList")) || [];
	const initNum = cartList.length;
	const [cartNum, setCartNum] = useState(initNum);
	const handleNum = (num) => {
		setCartNum(num);
	};
	useEffect(() => {
		setCartNum(initNum);
	}, []);

	return (
		<>
			<Routes>
				<Route path="/" element={<Navigate replace to="/products/all" />} />
				<Route path="/products/:type" element={<Header num={cartNum} />} />
				<Route path="/products/details" element={<Header num={cartNum} />} />
				<Route path="/order/checkout" element={<Header num={cartNum} />} />
			</Routes>
			<Routes>
				<Route path="/" element={<Navigate replace to="/products/all" />} />
				<Route path="/products/:type" element={<Banner />} />
				<Route path="/products/details" element={null} />
			</Routes>
			<Routes>
				<Route path="/" element={<Navigate replace to="/products/all" />} />
				<Route
					path="/products/:type"
					element={<Content handleNum={handleNum} />}
				/>
				<Route
					path="/products/details"
					element={<Detail handleNum={handleNum} />}
				/>
				<Route
					path="/order/checkout"
					element={<Checkout handleNum={handleNum} />}
				/>
			</Routes>

			<Footer />
			<MobilFixed num={cartNum} />
		</>
	);
}
