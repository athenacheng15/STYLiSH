import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import logoImg from "../images/logo.png";
import search from "../images/search.png";
import cart from "../images/cart.png";
import carthover from "../images/cart-h.png";
import login from "../images/login.png";
import loginh from "../images/login-h.png";

function Header(props) {
	const [type, setType] = useState("");
	const params = useParams();
	const Navigate = useNavigate();

	useEffect(() => {
		setType(params.type);
	}, [params.type]);

	function searching(e) {
		if (e.keyCode === 13 && e.target.value !== "") {
			Navigate(`/products/search?keyword=${e.target.value}`);
			e.target.value = "";
		}
	}

	return (
		<>
			<HeaderSec>
				<HeaderContent>
					<LogoImg>
						<Link to="/products/all">
							<LogoImgPng src={logoImg}></LogoImgPng>
						</Link>
					</LogoImg>
					<Category>
						<CategoryBtnR current={type === "women"}>
							<Link to="/products/women">女 裝</Link>
						</CategoryBtnR>
						<CategoryBtnR current={type === "men"}>
							<Link to="/products/men">男 裝</Link>
						</CategoryBtnR>
						<CategoryBtn current={type === "accessories"}>
							<Link to="/products/accessories">配 件</Link>
						</CategoryBtn>
					</Category>
					<DashBoard>
						<HeaderInput>
							<InputArea onKeyUp={searching} />
							<HeaderSearch />
						</HeaderInput>
						<CartBtn>
							<Link to="/order/checkout">
								<Cart />
								<CartDot>
									<CartNum>{props.num}</CartNum>
								</CartDot>
							</Link>
						</CartBtn>
						<Login />
					</DashBoard>
				</HeaderContent>
				<HeaderBlack />
				<MHeader>
					<MHeaderBox>
						<MLogoImg>
							<Link to="/products/all">
								<MLogo src={logoImg} />
							</Link>
						</MLogoImg>
						<MHeaderSearch />
					</MHeaderBox>
					<MHeaderBlack>
						<MCategoryBtnR current={type === "women"}>
							<Link to="/products/women">女 裝</Link>
						</MCategoryBtnR>
						<MCategoryBtnR current={type === "men"}>
							<Link to="/products/men">男 裝</Link>
						</MCategoryBtnR>
						<MCategoryBtn current={type === "accessories"}>
							<Link to="/products/accessories">配 件</Link>
						</MCategoryBtn>
					</MHeaderBlack>
				</MHeader>
			</HeaderSec>
		</>
	);
}

export default Header;

const HeaderSec = styled.header`
	position: fixed;
	display: block;
	width: 100%;
	z-index: 2;

	@media screen and (max-width: 1279px) {
		position: static;
	}
`;

const HeaderContent = styled.div`
	display: flex;
	flex-wrap: none;
	justify-content: flex-start;
	width: 100%;
	height: 100px;
	background-color: white;
	@media screen and (max-width: 1279px) {
		display: none;
	}
`;

const HeaderBlack = styled.div`
	width: 100%;
	height: 40px;
	background-color: #313538;
	@media screen and (max-width: 1279px) {
		display: none;
	}
`;

const LogoImg = styled.div`
	width: 258px;
	margin-top: 26px;
	margin-left: 60px;
	margin-right: 57px;
`;

const LogoImgPng = styled.img`
	cursor: pointer;
`;

// --------------- Category --------------- //
const Category = styled.div`
	flex: auto;
`;

const CategoryBtn = styled.div`
	display: inline-block;
	width: 150px;
	height: 28px;
	margin-top: 44px;
	font-size: 20px;
	text-align: center;
	word-spacing: 20px;
	color: ${(props) => (props.current ? "#8b572a" : "#313538")};
	cursor: pointer;
	:hover {
		color: #8b572a;
	}
`;

const CategoryBtnR = styled(CategoryBtn)`
	border-right: solid 1px black;
`;

/* ---------- Dash Board ---------- */

const DashBoard = styled.div`
	margin-right: 54px;
	margin-top: 28px;
`;

const HeaderInput = styled.div`
	display: inline-block;
	vertical-align: top;
`;

const InputArea = styled.input`
	width: 214px;
	height: 44px;
	padding-left: 20px;
	font-size: 20px;
	color: #8b572a;
	border: solid 1px #979797;
	border-radius: 20px;
`;

const HeaderSearch = styled.button`
	position: absolute;
	right: 236px;
	width: 44px;
	height: 44px;
	margin-left: 42px;
	background-image: url(${search});
	cursor: pointer;
`;

const CartBtn = styled.div`
	display: inline-block;
	position: relative;
`;

const Cart = styled.button`
	margin-left: 42px;
	width: 44px;
	height: 44px;
	background-image: url(${cart});
	cursor: pointer;
	:hover {
		background-image: url(${carthover});
	}
`;

const CartDot = styled.div`
	position: absolute;
	background-color: #8b572a;
	color: #ffffff;
	text-align: center;
	border-radius: 12px;
	right: 0;
	bottom: 0;
	width: 24px;
	height: 24px;
`;

const CartNum = styled.p``;

const Login = styled.button`
	width: 44px;
	height: 44px;
	background-image: url(${login});
	cursor: pointer;
	margin-left: 42px;
	:hover {
		background-image: url(${loginh});
	}
`;

const MHeader = styled.div`
	display: none;
	@media screen and (max-width: 1279px) {
		background-color: #ffffff;
		display: block;
	}
`;

const MHeaderBox = styled.div`
	display: flex;
	height: 52px;
	width: 100%;
`;

const MLogoImg = styled.div`
	margin: auto;
	cursor: pointer;
`;

const MLogo = styled.img`
	height: 24px;
`;

const MHeaderSearch = styled.button`
	position: absolute;
	right: 16px;
	top: 6px;
	width: 40px;
	height: 40px;
	background-image: url(${search});
`;

const MHeaderBlack = styled.div`
	display: flex;
	width: 100%;
	height: 50px;
	color: #828282;
	justify-content: space-around;
	align-items: center;
	background-color: #313538;
`;

const MCategoryBtn = styled.div`
	flex: auto;
	text-align: center;
	display: inline-block;
	width: auto;
	color: ${(props) => (props.current ? "#f5f5f5" : "#828282")};
	cursor: pointer;
	:hover {
		color: #f5f5f5;
	}
`;

const MCategoryBtnR = styled(MCategoryBtn)`
	border-right: solid 1px #828282;
`;
