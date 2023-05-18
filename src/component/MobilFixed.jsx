import styled from "styled-components";
import cartm from "../images/cart-m.png";
import loginm from "../images/login-m.png";
import { Link } from "react-router-dom";

function MobilFixed(props) {
	return (
		<MobilFix>
			<CartBox>
				<Link to="/order/checkout">
					<CartBtn>
						<MCart />
						<CartDot>
							<CartNum>{props.num}</CartNum>
						</CartDot>
					</CartBtn>
				</Link>
				<MobilP>購物車</MobilP>
			</CartBox>
			<LoginBox>
				<MLogin />
				<MobilP>會員</MobilP>
			</LoginBox>
		</MobilFix>
	);
}

export default MobilFixed;

const MobilFix = styled.div`
	display: none;
	align-items: center;
	width: 100%;
	height: 60px;
	position: fixed;
	bottom: 0;
	background-color: #313538;
	@media screen and (max-width: 1279px) {
		display: flex;
	}
`;

const CartBox = styled.div`
	display: flex;
	height: 24px;
	align-items: center;
	flex: auto;
	justify-content: center;
	border-right: solid 1px #828282;
`;

const CartBtn = styled.div`
	display: inline-block;
	position: relative;
	cursor: pointer;
`;

const MCart = styled.button`
	width: 44px;
	height: 44px;
	background-image: url(${cartm});
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

const LoginBox = styled.div`
	height: 24px;
	display: flex;
	align-items: center;
	flex: auto;
	justify-content: center;
`;

const MLogin = styled.button`
	width: 44px;
	height: 44px;
	background-image: url(${loginm});
	cursor: pointer;
`;

const MobilP = styled.p`
	color: #d3d3d3;
	display: inline-block;
	cursor: pointer;
`;
