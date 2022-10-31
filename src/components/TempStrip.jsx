import React from "react";
import { temperatureColors } from "./zonesColors";

export const TempStrip = () => {
	return (
		<svg height="10" width="100%">
			<defs>
				<linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
					{temperatureColors.map((color, idx) => {
						return (
							<stop
								key={idx}
								offset={idx / (temperatureColors.length - 1)}
								style={{
									stopColor: color,
									stopOpacity: 1,
								}} />
						);
					})}
				</linearGradient>
			</defs>
			<rect width="100%" height="15" fill="url('#grad1')" />
		</svg>
	);
};
