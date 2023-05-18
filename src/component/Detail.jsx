import styled from "styled-components";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function Detail(props) {
	const [detailData, setDetailData] = useState();
	const [searchParams, setSearchParams] = useSearchParams();
	let currentId = searchParams.get("id");

	const [clickedSize, setClickedSize] = useState("");
	const [clickedColor, setClickedColor] = useState("");
	const [sizeDisabled, setSizeDisabled] = useState(false);
	const [tragetStock, setTargetStock] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const [submitBtnText, setSubmitBtnText] = useState("請選擇尺寸");

	const [cartList, setCartList] = useState(
		JSON.parse(localStorage.getItem("cartList")) || []
	);

	useEffect(() => {
		fetch(
			`https://api.appworks-school.tw/api/1.0/products/details?id=${currentId}`
		)
			.then((response) => response.json())
			.then((response) => {
				setDetailData(response.data);
				setClickedColor(response.data.colors[0].code);
			});
	}, []);

	useEffect(() => {
		if (detailData !== undefined) {
			detailData.variants.forEach((item) => {
				if (clickedColor === item.color_code && clickedSize === item.size) {
					setTargetStock(item.stock);
				}
			});
		}
	}, [clickedSize]);

	function addQty() {
		if (quantity < tragetStock) {
			setQuantity(quantity + 1);
		}
	}

	function minusQty() {
		if (quantity <= 1) {
			setQuantity(1);
		} else {
			setQuantity(quantity - 1);
		}
	}

	function handleAddCart() {
		if (submitBtnText !== "加入購物車") {
			alert(submitBtnText);
		} else {
			let cartColor = {
				code: "",
				name: "",
			};
			detailData.colors.forEach((color) => {
				if (color.code === clickedColor) {
					cartColor.code = color.code;
					cartColor.name = color.name;
				}
			});
			let cartItem = {
				imgSrc: detailData.main_image,
				backendStock: tragetStock,
				checkOut: {
					id: detailData.id,
					name: detailData.title,
					price: detailData.price,
					color: cartColor,
					size: clickedSize,
					qty: quantity,
				},
			};

			cartList.push(cartItem);
			setCartList(cartList);
			localStorage.setItem("cartList", JSON.stringify(cartList));

			props.handleNum(cartList.length);

			setClickedSize("");
			setSubmitBtnText("請選擇尺寸");
			alert("成功加入商品");
		}
	}

	if (detailData === undefined) {
		return <></>;
	}

	return (
		<ProductSec>
			<ProductBox>
				<TopBox>
					<ItemImg src={detailData.main_image} />
					<DetailBox>
						<PName>{detailData.title}</PName>
						<PId>{detailData.id}</PId>
						<PPrice>TWD.{detailData.price}</PPrice>
						<DetailHr />
						<ColorBox>
							<DetailTitle>顏色｜</DetailTitle>
							<PColor>
								{detailData.colors.map((color) => {
									return (
										<PColorBoder
											active={color.code === clickedColor}
											innerColor={color.code}
										>
											<PColorBtn
												color={color.code}
												onClick={() => {
													setClickedColor(color.code);
													setClickedSize("");
													setSizeDisabled("");
													setTargetStock(0);
													setQuantity(1);
													setSubmitBtnText("請選擇尺寸");
													detailData.variants.forEach((item) => {
														if (
															item.color_code === color.code &&
															item.stock === 0
														) {
															setSizeDisabled(item.size);
														}
													});
												}}
											/>
										</PColorBoder>
									);
								})}
							</PColor>
						</ColorBox>
						<PSizeBox>
							<DetailTitle>尺寸｜</DetailTitle>
							<PSize>
								{detailData.sizes.map((size) => {
									return (
										<PSizeBtn
											key={size}
											onClick={(e) => {
												setQuantity(1);
												setClickedSize(e.target.textContent);
												setSubmitBtnText("加入購物車");
											}}
											active={clickedSize === size}
											disabled={sizeDisabled === size}
										>
											{size}
										</PSizeBtn>
									);
								})}
							</PSize>
						</PSizeBox>
						<PCountBox>
							<CountTitle>數量｜</CountTitle>
							<PCount>
								<PCountBtn onClick={minusQty}>-</PCountBtn>
								<PNum>{quantity}</PNum>
								<PCountBtn onClick={addQty}>+</PCountBtn>
							</PCount>
						</PCountBox>
						<PAddCart onClick={handleAddCart}>{submitBtnText}</PAddCart>
						<DetailTextBox>
							<DetailText>{detailData.note}</DetailText>
							<BreakLine />
							<DetailText>{detailData.texture}</DetailText>
							<DetailText>厚薄：薄</DetailText>
							<DetailText>彈性：無</DetailText>
							<BreakLine />
							<DetailText>清洗：{detailData.wash}</DetailText>
							<DetailText>產地：{detailData.place}</DetailText>
						</DetailTextBox>
					</DetailBox>
				</TopBox>
				<BottomBox>
					<Split>
						<SplitText>更多產品資訊</SplitText>
						<SplitLine />
					</Split>
					<Story>{detailData.story}</Story>
					<DetailImgBox>
						{detailData.images.map((image) => {
							return <BottomImg src={image} />;
						})}
					</DetailImgBox>
				</BottomBox>
			</ProductBox>
		</ProductSec>
	);
}

const ProductSec = styled.section``;

const ProductBox = styled.div`
	width: 960px;
	margin: auto;
	padding-top: 205px;
	@media screen and (max-width: 1279px) {
		padding-top: 0;
		width: 100%;
		max-width: 960px;
	}
`;

const TopBox = styled.div`
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	align-items: center;
	margin-bottom: 50.33px;
	@media screen and (max-width: 1279px) {
		margin-bottom: 28px;
	}
`;

const ItemImg = styled.img`
	display: flex;
	width: 560px;
	@media screen and (max-width: 1279px) {
		width: 100%;
		flex: auto;
	}
`;

// ---------------------- Detail ---------------------- //

const DetailBox = styled.div`
	width: 360px;
	height: 742px;
	@media screen and (max-width: 1279px) {
		flex: auto;
		width: 100%;
		height: auto;
		padding-left: 24px;
		padding-right: 24px;
	}
`;

const PName = styled.h1`
	height: 38px;
	font-size: 32px;
	letter-spacing: 6.4px;
	@media screen and (max-width: 1279px) {
		height: 24px;
		font-size: 20px;
		letter-spacing: 4px;
		margin-top: 17px;
	}
`;

const PId = styled.p`
	height: 24px;
	font-size: 20px;
	letter-spacing: 4px;
	color: #bababa;
	margin-top: 16px;
	@media screen and (max-width: 1279px) {
		height: 19px;
		font-size: 16px;
		letter-spacing: 3.2px;
		color: #bababa;
		margin-top: 10px;
	}
`;

const PPrice = styled.h1`
	font-size: 30px;
	margin-top: 40px;
	height: 36px;
	@media screen and (max-width: 1279px) {
		font-size: 20px;
		margin-top: 20px;
		height: 24px;
	}
`;

const DetailHr = styled.hr`
	border: 1px solid #3f3a3a;
	margin-top: 20px;
	@media screen and (max-width: 1279px) {
		border: 1px solid #3f3a3a;
		margin-top: 20px;
	}
`;

const DetailTitle = styled.p`
	font-size: 20px;
	letter-spacing: 4px;
	display: inline-flex;
	@media screen and (max-width: 1279px) {
		font-size: 14px;
		letter-spacing: 2.8px;
	}
`;

const CountTitle = styled(DetailTitle)`
	@media screen and (max-width: 1279px) {
		display: none;
	}
`;

// ---------------------- Color ---------------------- //
const ColorBox = styled.div`
	margin-top: 30px;
	display: flex;
	align-items: center;
`;

const PColor = styled.div`
	display: inline-flex;
	margin-left: 22px;
`;

const PColorBoder = styled.div`
	width: 36px;
	height: 36px;
	border: solid 1px;
	border-color: white;
	margin-right: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-color: ${(props) => (props.active ? "#979797" : "none")};
`;

const PColorBtn = styled.button`
	position: relative;
	width: 24px;
	height: 24px;
	border: solid 1px #d3d3d3;
	margin: auto;
	background-color: #${(props) => props.color};
	z-index: 1;
	cursor: pointer;
`;

// ---------------------- Size ---------------------- //

const PSizeBox = styled.div`
	margin-top: 30px;
`;

const PSize = styled.div`
	display: inline-flex;
	margin-left: 22px;
`;

const PSizeBtn = styled.button`
	width: 36px;
	height: 36px;
	border-radius: 16px;
	text-align: center;
	margin-right: 20px;

	background-color: ${(props) =>
		props.disabled
			? "rgba(236, 236, 236, 0.25)"
			: props.active
			? "black"
			: "#ececec"};
	color: ${(props) =>
		props.disabled
			? "rgba(63, 58, 58, 0.25);"
			: props.active
			? "white"
			: "black"};

	cursor: pointer;
`;

// ---------------------- Count ---------------------- //

const PCountBox = styled.div`
	margin-top: 19px;
	display: flex;
	align-items: center;
`;

const PCount = styled.div`
	width: 160px;
	height: 44px;
	padding-left: 15px;
	padding-right: 15px;
	border: solid 1px #979797;
	justify-content: space-between;
	margin-left: 24px;
	display: flex;
	align-items: center;
	@media screen and (max-width: 1279px) {
		width: 100%;
		height: 44px;
		padding-left: 35px;
		padding-right: 35px;
		border: solid 1px #979797;
		justify-content: space-between;
		margin: auto;
	}
`;

const PNum = styled.p`
	font-size: 16px;
	color: #8b572a;
`;

const PCountBtn = styled.button`
	cursor: pointer;
`;

// ---------------------- Cart ---------------------- //

const PAddCart = styled.button`
	text-align: center;
	font-size: 20px;
	letter-spacing: 4px;
	color: #ffffff;
	background-color: black;
	border: solid 1px #979797;
	width: 100%;
	height: 64px;
	margin-top: 29px;
	cursor: pointer;
	@media screen and (max-width: 1279px) {
		font-size: 16px;
		letter-spacing: 3.2px;
		height: 44px;
		margin-top: 10px;
	}
`;

const DetailTextBox = styled.div`
	margin-top: 40px;
	font-size: 20px;
	line-height: 30px;
	@media screen and (max-width: 1279px) {
		margin-top: 28px;
		font-size: 14px;
		line-height: 24px;
	}
`;

const DetailText = styled.p``;

const BreakLine = styled.br``;

// ---------------------- Bottom ---------------------- //

const BottomBox = styled.div`
	@media screen and (max-width: 1279px) {
		padding-left: 24px;
		padding-right: 24px;
	}
`;

const Split = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const SplitText = styled.p`
	min-width: 138px;
	margin-right: 61px;
	font-size: 20px;
	letter-spacing: 3px;
	color: #8b572a;
	@media screen and (max-width: 1279px) {
		min-width: 115px;
		margin-right: 35px;
		font-size: 16px;
		letter-spacing: 3px;
		color: #8b572a;
	}
`;

const SplitLine = styled.hr`
	border: solid 1px #3f3a3a;
	width: 100%;
`;

const Story = styled.p`
	margin-top: 28px;
	@media screen and (max-width: 1279px) {
		margin-top: 12px;
		font-size: 14px;
	}
`;

const DetailImgBox = styled.div``;

const BottomImg = styled.img`
	margin-top: 30px;
`;
