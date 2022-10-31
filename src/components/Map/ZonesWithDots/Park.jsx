import React, { useEffect, useState, memo } from "react";

import { generateRandomPoints, usePrevious } from "../../../utils/generateRandomPoints";

import style from "./styles";

const Park = ({ amount, date }) => {
	const polygonPoints =
	"M434.45 571.45l-10.2-10.2-125.4 112.2 30.6 45.6 6-4.2 64.8 94.8 26.4-13.2-.6-1.8 2.4-7.2 14.4-7.8 11.4 3 15-6.6 84-84.6-87-88.8-2.4 1.8-31.8 33-28.2-27.6 10.2-10.2-4.2-3.6 24.6-24.6";
	const [randomPoints, setRandomPoints] = useState([]);

	useEffect(() => {
		setRandomPoints( generateRandomPoints(polygonPoints, Math.floor(amount / 6)) );
	}, [amount, date]);

	return (
	<g>
		<path id="picnic" d={polygonPoints} fill="white" style={style.zones} />
		{randomPoints &&
		randomPoints.map((point, index) => (
			<circle
			key={index}
			fill={"lightgreen"}
			cx={point[0]}
			cy={point[1]}
			r={style.dots.radius}
			/>
		))}
	</g>
	);
};

export default memo(Park);
