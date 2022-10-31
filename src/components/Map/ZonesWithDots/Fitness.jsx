import React, { useEffect, useState } from "react";

import { generateRandomPoints, usePrevious } from "../../../utils/generateRandomPoints";

import style from "./styles";

const Fitness = ({ amount, date }) => {
	const polygonPoints =
	"M97.25,115.45l-11.4,-28.8l-84.6,94.8l31.2,79.8l105.6,-40.8l-31.8,-82.2l-42.6,79.2l-16.2,-9l49.8,-93";
	const [randomPoints, setRandomPoints] = useState([]);

	useEffect(() => {
		setRandomPoints( generateRandomPoints(polygonPoints, Math.floor(amount / 6)) );
	}, [amount, date]);

	return (
	<g>
		<path
		id="fitnesstuin"
		fill="white"
		d={polygonPoints}
		style={style.zones}
		/>
		{randomPoints &&
		randomPoints.map((point, index) => (
			<circle
			key={index}
			fill={"yellow"}
			cx={point[0]}
			cy={point[1]}
			r={style.dots.radius}
			/>
		))}
	</g>
	);
};
export default Fitness;
