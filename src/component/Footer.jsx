import styled from "styled-components";
import line from "../images/line.png";
import twitter from "../images/twitter.png";
import facebook from "../images/facebook.png";

function Footer() {
	return (
		<FooterSec>
			<FooterBox>
				<FooterText>
					<Left1>關於STYLiSH</Left1>
					<Left2>服務條款</Left2>
					<Left3>隱私政策</Left3>
					<Right1>聯絡我們</Right1>
					<Right2>FAQ</Right2>
				</FooterText>
				<FooterIcon>
					<Line />
					<Twitter />
					<Facebook />
				</FooterIcon>
				<CopyRight>
					<CopyRightText>Ⓒ 2018.All rights reserved.</CopyRightText>
				</CopyRight>
			</FooterBox>
		</FooterSec>
	);
}

export default Footer;

const FooterSec = styled.footer`
	position: relative;
	background-color: #313538;
	margin-top: 35px;
	@media screen and (max-width: 1279px) {
		padding-bottom: 60px;
	}
`;

const FooterBox = styled.div`
	width: 1160px;
	height: 115px;
	display: flex;
	margin: auto;
	align-items: center;
	@media screen and (max-width: 1279px) {
		position: relative;
		width: 360px;
		height: 146px;
		justify-content: center;
	}
`;

const FooterText = styled.div`
	flex-grow: 1;
	@media screen and (max-width: 1279px) {
		flex-grow: 0;
		width: 217px;
		flex-wrap: wrap;
	}
`;

const FooterTextBasic = styled.a`
	display: inline-block;
	color: #f5f5f5;
	text-align: center;
	width: 134px;
	height: 22px;
	border-right: solid 1px #f5f5f5;
	@media screen and (max-width: 1279px) {
		display: inline-block;
		text-align: left;
		width: 85px;
		height: 20px;
		font-size: 13.5px;
		color: #d3d3d3;
		position: absolute;
		left: 40px;
	}
`;

const Left1 = styled(FooterTextBasic)`
	@media screen and (max-width: 1279px) {
		top: 23px;
		border-right: none;
	}
`;

const Left2 = styled(FooterTextBasic)`
	@media screen and (max-width: 1279px) {
		top: 51px;
		border-right: none;
	}
`;

const Left3 = styled(FooterTextBasic)`
	@media screen and (max-width: 1279px) {
		top: 79px;
		border-right: none;
	}
`;

const Right1 = styled(FooterTextBasic)`
	@media screen and (max-width: 1279px) {
		left: 161px;
		top: 23px;
		border-right: none;
	}
`;

const Right2 = styled(FooterTextBasic)`
	border-right: none;
	@media screen and (max-width: 1279px) {
		left: 161px;
		top: 51px;
	}
`;

const FooterIcon = styled.div`
	@media screen and (max-width: 1279px) {
		position: absolute;
		right: 10px;
		top: 41px;
	}
`;

const FooterIconBtn = styled.button`
	width: 50px;
	height: 50px;
	margin-right: 30px;
	@media screen and (max-width: 1279px) {
		width: 20px;
		height: 20px;
		margin-right: 14px;
		background-size: contain;
	}
`;

const Line = styled(FooterIconBtn)`
	background-image: url(${line});
`;

const Twitter = styled(FooterIconBtn)`
	background-image: url(${twitter});
`;

const Facebook = styled(FooterIconBtn)`
	background-image: url(${facebook});
`;

const CopyRight = styled.div`
	font-size: 12px;
	color: #828282;
	@media screen and (max-width: 1279px) {
		position: absolute;
		bottom: 20px;
	}
`;

const CopyRightText = styled.p``;
