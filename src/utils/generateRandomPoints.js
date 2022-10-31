import svgPathBbox from "svg-path-bbox"
import pointInSvgPoylgon from 'point-in-svg-polygon'
import { randomPoint } from '@turf/random'

import * as d3Array from 'd3-array'

export function generateRandomPoints(polygonShape, amount, bbox) {

	const pathBbox = bbox || svgPathBbox(polygonShape)
	const coordinatesArray = d3Array.range(amount).map(() => {

		const point = randomPoint(1, { bbox: pathBbox });

		if (pointInSvgPoylgon.isInside(point.features[0].geometry.coordinates, polygonShape) === true) {

			return point.features[0].geometry.coordinates;
		} else {
			return generateRandomPoints(polygonShape, 1, pathBbox)[0];
		}
	});

	return coordinatesArray
}