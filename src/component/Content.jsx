import styled, { keyframes } from "styled-components";
import { useState, useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";

export default function Content() {
	const [allData, setallData] = useState();
	const [atBottom, setAtBottom] = useState(false);
	const [nextPage, setNextPage] = useState(undefined);
	const [loading, setLoading] = useState(true);
	const [noResult, setNoResult] = useState(false);
	const params = useParams();
	const [searchParams, setSearchParams] = useSearchParams();

	// main fetch
	useEffect(() => {
		let url;
		let currentKeyword = searchParams.get("keyword");

		if (params.type === "search") {
			url = `https://api.appworks-school.tw/api/1.0/products/${params.type}?keyword=${currentKeyword}`;
		} else {
			url = `https://api.appworks-school.tw/api/1.0/products/${params.type}`;
		}

		fetch(url)
			.then((response) => response.json())
			.then((response) => {
				setallData(response.data);
				setNoResult(false);
				if (response.next_paging !== undefined) {
					setLoading(true);
					setNextPage(response.next_paging);
				} else {
					setLoading(false);
				}
				if (response.data.length === 0) {
					setNoResult(true);
				}
			});
	}, [params]);

	// manager paging fatch
	useEffect(() => {
		window.addEventListener("scroll", detectBottom);
		if (params.type !== "search" && atBottom && nextPage !== undefined) {
			loadNextPage();
		}
	}, [atBottom]);

	function loadNextPage() {
		fetch(
			`https://api.appworks-school.tw/api/1.0/products/${params.type}?paging=${nextPage}`
		)
			.then((response) => response.json())
			.then((response) => {
				setallData((item) => [...item, ...response.data]);
				if (response.next_paging !== undefined) {
					setNextPage(response.next_paging);
					setLoading(true);
				} else {
					setNextPage(undefined);
					setLoading(false);
				}
			});
	}

	function detectBottom() {
		const endOfPage =
			window.innerHeight + window.pageYOffset >= document.body.offsetHeight;

		if (endOfPage) {
			setAtBottom(true);
		} else {
			setAtBottom(false);
		}
	}

	if (allData === undefined) {
		return <></>;
	}
	return (
		<>
			<ContentSec>
				<Nothing isShown={noResult}>找不到您搜尋的商品</Nothing>
				<ContentBox>
					{allData.map((item) => {
						return (
							<SingleItem
								key={item.id}
								src={item.main_image}
								allColor={item.colors}
								name={item.title}
								price={item.price}
								pId={item.id}
							/>
						);
					})}
				</ContentBox>
			</ContentSec>
			<Loader showLoader={loading}>
				<LoaderCircle />
				<LoaderCircle />
			</Loader>
		</>
	);
}

function SingleItem(props) {
	return (
		<Item>
			<Link to={`/products/details?id=${props.pId}`}>
				<ItemImg src={props.src} />
			</Link>
			<ColorArea>
				{props.allColor.map((color) => {
					return <Color theColor={color.code} />;
				})}
			</ColorArea>
			<TextArea>
				<ItemName>{props.name}</ItemName>
				<ItemPrice>TWD.{props.price}</ItemPrice>
			</TextArea>
		</Item>
	);
}

const ContentSec = styled.div`
	width: 100%;
	height: auto;
	display: flex;
	margin: auto;
	padding-top: 70px;
	padding-bottom: 0px;
	justify-content: center;
	@media screen and (max-width: 1279px) {
		padding-top: 15px;
		width: 100%;
	}
`;

const ContentBox = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	margin: auto;
	width: 1200px;
	font-size: 0;
	@media screen and (max-width: 1279px) {
		margin: auto;
		width: max-content;
		padding-left: 21px;
		padding-right: 21px;
	}
`;

const Item = styled.div`
	width: 360px;
	height: 602px;
	margin-bottom: 64px;
	margin-left: 20px;
	margin-right: 20px;
	@media screen and (max-width: 1279px) {
		flex: auto;
		height: auto;
		width: 50%;
		max-width: 50%;
		min-width: 153px;
		margin-bottom: 24px;
		padding-left: 3px;
		padding-right: 3px;
		margin-left: 0px;
		margin-right: 0px;
	}
`;

const ItemImg = styled.img`
	@media screen and (max-width: 1279px) {
		display: block;
		width: 100%;
	}
`;

const ColorArea = styled.div`
	display: inline-block;
	margin-top: 20px;
	width: 100%;
	height: 24px;
	@media screen and (max-width: 1279px) {
		margin-top: 8px;
		height: auto;
	}
`;

const Color = styled.div`
	display: inline-block;
	margin-right: 10px;
	width: 24px;
	height: 24px;
	border: solid 1px #d3d3d3;
	background-color: #${(props) => props.theColor};
	@media screen and (max-width: 1279px) {
		margin-right: 6px;
		width: 12px;
		height: 12px;
	}
`;

const TextArea = styled.div`
	display: block;
	margin-top: 20px;
	font-weight: 400;
	font-size: 20px;
	line-height: 24px;
	letter-spacing: 4px;
	@media screen and (max-width: 1279px) {
		display: block;
		margin-top: 10px;
		font-size: 12px;
		line-height: 14px;
		letter-spacing: 2.4px;
	}
`;

const ItemName = styled.p``;

const ItemPrice = styled.p`
	margin-top: 10px;
	@media screen and (max-width: 1279px) {
		margin-top: 8px;
	}
`;

const ripple = keyframes`
0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  4.9% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  5% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
`;

const Loader = styled.div`
	display: ${(prop) => (prop.showLoader ? "block" : "none")};
	position: relative;
	width: 80px;
	height: 80px;
	margin: auto;
`;

const LoaderCircle = styled.div`
	position: absolute;
	border: 4px solid rgba(0, 0, 0, 0.8);
	opacity: 1;
	border-radius: 50%;
	animation: ${ripple} 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
	:nth-child(2) {
		animation-delay: -0.5s;
	}
`;

const Nothing = styled.p`
	display: ${(props) => (props.isShown ? "block" : "none")};
	position: absolute;
	width: auto;
	height: 30px;
	text-align: center;
`;
