import styled from "styled-components";
import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";

import trash from "../images/trash.png";

export default function Checkout(props) {
	const [cartList, setCartList] = useState([]);
	const [itemValueChanged, setItemValueChanged] = useState(false);
	const [totlaPay, setTotalpay] = useState(0);
	console.log(cartList);

	useEffect(() => {
		setCartList(JSON.parse(localStorage.getItem("cartList")));
	}, []);

	useEffect(() => {
		localStorage.setItem("cartList", JSON.stringify(cartList));
		props.handleNum(cartList.length);
	}, [cartList]);

	const initCartTotal = (num) => {
		setTotalpay((current) => current + num);
	};

	const checkValueChange = (stsatusFromItem) => {
		setItemValueChanged(stsatusFromItem);
	};

	const currentTotal = cartList.reduce((acc, item) => {
		return acc + item.checkOut.qty * item.checkOut.price;
	}, 0);

	if (itemValueChanged) {
		setTotalpay(currentTotal);
		setItemValueChanged(false);
	}

	return (
		<>
			<CheckoutSec>
				<CheckoutBox>
					<CartTitle>
						<Carth1>購物車({cartList.length})</Carth1>
						<TitleBox>
							<CartP>數量</CartP>
						</TitleBox>
						<TitleBox>
							<CartP>單價</CartP>
						</TitleBox>
						<TitleBox>
							<CartP>小計</CartP>
						</TitleBox>
					</CartTitle>
					<CartItemBox>
						{cartList.length !== 0 ? (
							cartList.map((item) => {
								return (
									<SingleItem
										key={`${item.checkOut.id}${item.checkOut.size}${item.checkOut.color.name}`}
										imgSrc={item.imgSrc}
										name={item.checkOut.name}
										pId={item.checkOut.id}
										size={item.checkOut.size}
										color={item.checkOut.color.name}
										price={item.checkOut.price}
										qty={item.checkOut.qty}
										backendStock={item.backendStock}
										cartList={cartList}
										checkValueChange={checkValueChange}
										initCartTotal={initCartTotal}
										setCartList={setCartList}
									/>
								);
							})
						) : (
							<Link to="/products/all">
								<IsNothing>您的購物車沒有商品，點此回首頁繼續購物</IsNothing>
							</Link>
						)}
					</CartItemBox>
					<Total>
						<Charge>
							<TotalBox>
								<TotalBoxP>總金額</TotalBoxP>
								<TotalBoxP>
									NT.<TotalBoxSp>{totlaPay}</TotalBoxSp>
								</TotalBoxP>
							</TotalBox>
							<TotalBox>
								<TotalBoxP>運費</TotalBoxP>
								<TotalBoxP>
									NT.<TotalBoxSp>{totlaPay !== 0 ? 30 : 0}</TotalBoxSp>
								</TotalBoxP>
							</TotalBox>
							<TotalHr />
							<TotalBox>
								<TotalBoxP>應付金額</TotalBoxP>
								<TotalBoxP>
									NT.
									<TotalBoxSp>{totlaPay !== 0 ? totlaPay + 30 : 0}</TotalBoxSp>
								</TotalBoxP>
							</TotalBox>
						</Charge>
						<Submit>確認付款</Submit>
					</Total>
				</CheckoutBox>
			</CheckoutSec>
		</>
	);
}

function SingleItem(props) {
	const [choosedItemQty, setChoosedItemQty] = useState(props.qty);

	useEffect(() => {
		props.initCartTotal(choosedItemQty * props.price);
	}, []);

	const handleRemoveItem = (e) => {
		console.log(props.cartList);
		props.setCartList(
			props.cartList.filter(
				(item) =>
					item.checkOut.id !== props.pId ||
					item.checkOut.color.name !== props.color ||
					item.checkOut.size !== props.size
			)
		);
		props.checkValueChange(true);
	};

	return (
		<CartItem>
			<BasicData>
				<ItemImg src={props.imgSrc} />
				<BasicText>
					<BasicDataP>{props.name}</BasicDataP>
					<CId>{props.pId}</CId>
					<CColor>顏色｜{props.color}</CColor>
					<CSize>尺寸｜{props.size}</CSize>
				</BasicText>
			</BasicData>
			<Quantity>
				<QData>
					<MCartTitle>數量</MCartTitle>
					<QuantitySel
						value={choosedItemQty}
						onChange={(e) => {
							setChoosedItemQty(e.target.value);
							props.cartList.forEach((item) => {
								if (
									item.checkOut.id === props.pId &&
									item.checkOut.color.name === props.color &&
									item.checkOut.size === props.size
								) {
									item.checkOut.qty = e.target.value;
								}
							});
							props.setCartList(props.cartList);
							localStorage.setItem("cartList", JSON.stringify(props.cartList));
							props.checkValueChange(true);
						}}
					>
						{Array.from({ length: props.backendStock }, (_, i) => i + 1).map(
							(item) => {
								return (
									<QuantityOpt key={item} value={item}>
										{item}
									</QuantityOpt>
								);
							}
						)}
					</QuantitySel>
				</QData>
				<QData>
					<MCartTitle>單價</MCartTitle>
					<PriceP>TWD.{props.price}</PriceP>
				</QData>
				<QData>
					<MCartTitle>小計</MCartTitle>
					<PriceP>TWD.{choosedItemQty * props.price}</PriceP>
				</QData>
			</Quantity>
			<Trash>
				<TrashBtn onClick={handleRemoveItem} />
			</Trash>
		</CartItem>
	);
}

const CheckoutSec = styled.section``;

const CheckoutBox = styled.div`
	width: 1160px;
	height: auto;
	max-width: 1160px;
	margin: auto;
	padding-top: 191px;
	@media screen and (max-width: 1279px) {
		width: 100%;
		max-width: 1160px;
		padding-top: 20px;
	}
`;

const CartTitle = styled.div`
	display: flex;
	margin-bottom: 16px;
`;

const Carth1 = styled.h1`
	width: 458px;
	font-size: 16px;
	font-weight: 700;
	@media screen and (max-width: 1279px) {
		padding-left: 30px;
		width: 100%;
	}
`;

const TitleBox = styled.div`
	@media screen and (max-width: 1279px) {
		display: none;
	}
`;

const CartP = styled.p`
	text-align: center;
	width: 192px;
`;

const CartItemBox = styled.div`
	flex-wrap: nowrap;
	width: 100%;
	height: auto;
	border: solid 1px #979797;
	padding: 25px 29px;
	@media screen and (max-width: 1279px) {
		border: none;
		padding: 0 24px;
	}
`;

const CartItem = styled.div`
	position: relative;
	height: 182px;
	display: flex;
	padding-top: 15px;
	padding-bottom: 15px;
	align-items: center;
	@media screen and (max-width: 1279px) {
		height: auto;
		flex-wrap: wrap;
		padding: 20px 0;
		border-top: solid 1px #3f3a3a;
	}
`;

const BasicData = styled.div`
	width: 428px;
	height: 100%;
	display: flex;
`;

const ItemImg = styled.img`
	width: 114px;
	height: 152px;
`;

const BasicText = styled.div`
	padding-left: 16px;
`;

const BasicDataP = styled.p`
	font-size: 16px;
	height: 19px;
	@media screen and (max-width: 1279px) {
		font-size: 14px;
	}
`;

const CId = styled(BasicDataP)`
	margin-top: 18px;
`;
const CColor = styled(BasicDataP)`
	margin-top: 22px;
`;
const CSize = styled(BasicDataP)`
	margin-top: 10px;
`;

const Quantity = styled.div`
	height: 100%;
	width: 576px;
	display: flex;
	align-items: center;
	@media screen and (max-width: 1279px) {
		margin-top: 20px;
		width: 100%;
	}
`;

const QData = styled.div`
	width: 192px;
	flex: auto;
	justify-content: center;
	align-items: center;
	text-align: center;
	@media screen and (max-width: 1279px) {
		width: 100%;
	}
`;

const MCartTitle = styled.p`
	display: none;
	@media screen and (max-width: 1279px) {
		display: block;
		height: 17px;
		font-size: 14px;
	}
`;

const QuantitySel = styled.select`
	width: 80px;
	height: 32px;
	background-color: #f3f3f3;
	border: solid 1px #979797;
	border-radius: 8px;
	padding-left: 16px;
	align-items: center;
	cursor: pointer;
	@media screen and (max-width: 1279px) {
		height: 30px;
		margin-top: 12px;
	}
`;

const QuantityOpt = styled.option``;

const PriceP = styled.p`
	@media screen and (max-width: 1279px) {
		height: 30px;
		font-size: 14px;
		margin-top: 12px;
		padding-top: 5px;
	}
`;

const Trash = styled.div`
	width: 96px;
	display: flex;
	justify-content: flex-end;
`;
const TrashBtn = styled.button`
	width: 44px;
	height: 44px;
	right: 0;
	background-image: url(${trash});
	cursor: pointer;
	@media screen and (max-width: 1279px) {
		position: absolute;
		top: 20px;
	}
`;

const Total = styled.div`
	margin-bottom: 138px;
	display: flex;
	flex-direction: column;
	@media screen and (max-width: 1279px) {
		margin-right: 24px;
		margin-left: 24px;
		margin-bottom: 28px;
	}
`;

const Charge = styled.div`
	display: block;
	width: 240px;
	margin-top: 30px;
	margin-left: auto;
`;

const TotalBox = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 10px;
	margin-bottom: 10px;
`;

const TotalBoxP = styled.p`
	font-size: 16px;
	line-height: 36px;
	display: flex;
`;
const TotalBoxSp = styled.span`
	font-size: 30px;
	margin-left: 8px;
`;

const TotalHr = styled.hr`
	border: solid 1px #3f3a3a;
	width: 100%;

	margin-top: 10px;
	margin-bottom: 10px;
`;

const Submit = styled.button`
	display: block;
	width: 240px;
	height: 64px;
	background-color: black;
	color: white;
	text-align: center;
	font-size: 20px;
	letter-spacing: 4px;
	margin-top: 40px;
	margin-left: auto;
	cursor: pointer;
	@media screen and (max-width: 1279px) {
		width: 100%;
		height: 44px;
		font-size: 16px;
	}
`;

const IsNothing = styled.p`
	color: #8b572a;
	cursor: pointer;
	font-size: 18px;
	font-weight: 700;
	text-align: center;
`;
