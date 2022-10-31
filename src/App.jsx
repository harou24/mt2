import * as React from "react";
import styled from "styled-components";
import breakpoint from "./styles/globalStyle";

import ZonesColors from "./components/zonesColors";

const MainWrapper = styled.div`
	margin: 15px auto !important;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;

	font-family: "Overpass", sans-serif !important;
	margin: auto !important;
	background-color: #222222 !important;
	color: #f2f2f2 !important;

	a {
	color: #f2f2f2 !important;
	}

	.row {
	display: flex !important;
	}
	margin: auto;
	@media only screen and ${breakpoint.device.xs} {
	margin: 15px auto;
	width: 95%;
	}
	@media only screen and ${breakpoint.device.sm} {
	margin: 15px auto;
	width: 95%;
	}
	@media only screen and ${breakpoint.device.lg} {
	padding: 30px 30px;
	max-height: 98vh;
	}
`;

// markup
const App = () => {
	return (
	<MainWrapper>
		<ZonesColors />
	</MainWrapper>
	);
};

export default App;
