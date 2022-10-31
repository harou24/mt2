import React, { useEffect, useState } from "react";

import { generateRandomPoints, usePrevious } from "../../../utils/generateRandomPoints";

import style from "./styles";

const Binnenhaven = ({ amount, date }) => {
	const polygonPoints =
	"M142.85,546.85l41.4,-16.2l31.8,81l67.8,-32.4l46.8,66l-33,29.4l-2.4,-3l-25.8,-36.6l-76.8,37.2l-49.8,-125.4";
	const [randomPoints, setRandomPoints] = useState([]);

	useEffect(() => {
		setRandomPoints( generateRandomPoints(polygonPoints, Math.floor(amount / 6)) );
	}, [amount, date]);

	return (
	<>
		<path id="water" d={polygonPoints} style={style.zones} />
		{randomPoints.length &&
		randomPoints.map((point, index) => (
			<circle
			key={index}
			fill={"lightBlue"}
			cx={point[0]}
			cy={point[1]}
			r={style.dots.radius}
			/>
		))}
	</>
	);
};

export default Binnenhaven;
