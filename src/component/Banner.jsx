import styled from "styled-components";
import { useState, useEffect, useRef } from "react";

function Banner() {
	const [apiData, setApiData] = useState();
	const [dataId, setDataId] = useState(0);
	const start = useRef(0);

	useEffect(() => {
		fetch("https://api.appworks-school.tw/api/1.0/marketing/campaigns")
			.then((response) => response.json())
			.then((response) => {
				setApiData(response.data);

				start.current = setInterval(() => {
					setDataId((id) => (id < response.data.length - 1 ? id + 1 : 0));
				}, 5000);
			});
	}, []);

	let clicked = (e) => {
		setDataId(e.target.id - 1);
	};

	if (apiData === undefined) {
		return <div></div>;
	}

	return (
		<BannerSec
			onMouseEnter={() => {
				clearInterval(start.current);
			}}
			onMouseLeave={() => {
				start.current = setInterval(() => {
					setDataId((id) => (id < apiData.length - 1 ? id + 1 : 0));
				}, 5000);
			}}
		>
			<BannerImg src={apiData[dataId].picture} />
			<TextArea>
				<Text1>{apiData[dataId].story.split(/\r?\n/)[0]}</Text1>
				<Text1>{apiData[dataId].story.split(/\r?\n/)[1]}</Text1>
				<Text1>{apiData[dataId].story.split(/\r?\n/)[2]}</Text1>
				<Text2>{apiData[dataId].story.split(/\r?\n/)[3]}</Text2>
			</TextArea>
			<DotArea>
				{apiData.map((data) => {
					return (
						<Dot
							key={data.id}
							id={data.id}
							data-pid={data.product_id}
							currentIndex={data.id === dataId + 1}
							onClick={clicked}
						/>
					);
				})}
			</DotArea>
		</BannerSec>
	);
}

export default Banner;

const BannerSec = styled.div`
	position: relative;
	padding-top: 140px;
	height: 640px;
	display: flex;
	flex-wrap: nowrap;
	justify-content: center;
	@media screen and (max-width: 1279px) {
		height: 185px;
		padding-top: 0;
	}
`;

const BannerImg = styled.img`
	height: 500px;
	object-fit: cover;
	@media screen and (max-width: 1279px) {
		width: 100vw;
		height: 185px;
		object-fit: cover;
	}
`;

const TextArea = styled.div`
	position: absolute;
	width: 1160px;
	max-width: 1160px;
	flex: auto;
	top: 306px;
	padding-left: 27px;
	@media screen and (max-width: 1279px) {
		top: 36px;
		max-width: 1160px;
		width: 100%;
	}
`;

const Text1 = styled.p`
	font-size: 30px;
	line-height: 57px;
	@media screen and (max-width: 1279px) {
		font-size: 15px;
		line-height: 28px;
	}
`;

const Text2 = styled.p`
	font-size: 20px;
	line-height: 64px;
	@media screen and (max-width: 1279px) {
		font-size: 12px;
		line-height: 28px;
	}
`;

const DotArea = styled.div`
	position: absolute;
	display: flex;
	bottom: 34px;
	width: auto;
	height: 10px;
	margin: auto;
	justify-content: space-between;
	@media screen and (max-width: 1279px) {
		height: 4px;
		bottom: 18px;
	}
`;
const Dot = styled.div`
	display: inline-block;
	margin-left: 22px;
	margin-right: 22px;
	width: 10px;
	height: 10px;
	border-radius: 5px;
	background-color: ${(props) => (props.currentIndex ? "#8b572a" : "#ffffff")};
	opacity: ${(props) => (props.currentIndex ? 1 : 0.4)};
	cursor: pointer;
	@media screen and (max-width: 1279px) {
		margin-left: 4.4px;
		margin-right: 4.4px;
		width: 4px;
		height: 4px;
	}
`;
