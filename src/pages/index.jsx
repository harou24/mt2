import * as React from "react";
import styled from "styled-components";
import breakpoint from "../styles/globalStyle";

import ZonesColors from "../components/zonesColors";

const MainWrapper = styled.div`
	margin: auto;
	@media only screen and ${breakpoint.device.xs} {
	/* margin: auto; */
	width: 95vw;
	}
	@media only screen and ${breakpoint.device.sm} {
	}
	@media only screen and ${breakpoint.device.lg} {
	padding: 30px 30px;
	max-height: 98vh;
	}
`;

// markup
const IndexPage = () => {
	return (
	<MainWrapper>
		<ZonesColors />
	</MainWrapper>
	);
};

export default IndexPage;
