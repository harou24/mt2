import React, { useEffect, useState } from "react";
import style from "./Map/ZonesWithDots/styles";

import Slider, { Handle } from "rc-slider";

import * as d3Array from "d3-array";
import { scaleLinear } from "d3-scale";

import camData from "../content/camData.json";
import densityPeakPerDay from "../content/densityData.json";
import weatherData from "../content/weatherData.json";

import {
	isAutoPlaying,
	startingDate,
} from "../remarkableDates";

import Park from "./Map/ZonesWithDots/Park";
import Binnenhaven from "./Map/ZonesWithDots/Binnenhaven";
import Fitness from './Map/ZonesWithDots/Fitness';
import Kade from "./Map/ZonesWithDots/Kade";
import BarChart from "./BarChart";
import SvgMapWrapper from "./Map/Map";
import { Wrapper } from "./Wrapper";
import { TempStrip } from "./TempStrip";
import { VerticalNeedle, TopComponent, LegendWrapper, Legend, Row, Metrics, DataLayers, sliderStyle, DataLabel, Button} from "./sliderStyle";

const weatherDataDates = weatherData.map((el) => el.date.substring(0, 10));
const weatherDataAverageTemp = weatherData.map((el) => el.TG / 10);

const markPoints = {};

const temperatureMin = d3Array.min(weatherDataAverageTemp);
const temperatureMax = d3Array.max(weatherDataAverageTemp);

const tempColors = scaleLinear()
	.domain([temperatureMin, 10, temperatureMax])
	.range(["cyan", "white", "red"]);

export const temperatureColors = weatherDataAverageTemp.map((t) => {
	return tempColors(t);
});

const calculateDensity = (value) => {
    value = Math.round(value, 0);

	// undefined becomes 0
	if (!value) {
		return 0;
	}

	// console.error
	if (value < 0) {
		console.error('Negative density found', value)
	}

	return value;
};

const getTotal = weatherDataDates.map((element, index) => {
	if (!densityPeakPerDay[element]) {
	//	console.error('Invalid Date', element)
		return 0;
	}
	
    let visitors = calculateDensity(densityPeakPerDay[element]['Fitness'] || 0);
    visitors += calculateDensity(densityPeakPerDay[element]['Picnic'] || 0);
    visitors += calculateDensity(densityPeakPerDay[element]['SwimmingArea'] || 0);
    visitors += calculateDensity(densityPeakPerDay[element]['Terrace'] || 0);

	return Math.round(visitors);
});

const handle = (props) => {
	const { value, dragging, index, ...restProps } = props;
	return (
	<Handle value={value} {...restProps}>
		<VerticalNeedle />
	</Handle>
	);
};

const ZonesColors = () => {
	const [dateIndex, setDateIndex] = useState(weatherDataDates.indexOf(startingDate));
	const [intervalId, setIntervalId] = useState(undefined);
	const [isPlaying, setIsPlaying] = useState(isAutoPlaying);

	const getDensity = (areaName) => {
		let areaAlias = {
			'Fitness': 'fitness',
			'SwimmingArea': 'water',
			'Terrace': 'gate',
			'Picnic': 'picnic'
		}

		if (
			camData.content[areaAlias[areaName]][weatherDataDates[dateIndex]] !== 0 &&
			densityPeakPerDay[weatherDataDates[dateIndex]] &&
			densityPeakPerDay[weatherDataDates[dateIndex]][areaName] !== "" &&
			densityPeakPerDay[weatherDataDates[dateIndex]][areaName] !== 0
		) {
			return Math.round(calculateDensity(densityPeakPerDay[weatherDataDates[dateIndex]][areaName]) * 6);
		} else {
			return 0;
		}
	};

	useEffect(() => {
		if (dateIndex === weatherDataDates.length) {
			setDateIndex((dateIndex) => 0);
		}
	}, [dateIndex, intervalId]);

	useEffect(() => {
		if (isAutoPlaying === true) {
			playSlider()
		}
	}, [setDateIndex]);

	const playSlider = () => {
		if (isPlaying === true && intervalId) {
			clearInterval(intervalId);
			setIsPlaying(false);
			return;
		}
		let intervalIds = setInterval(() => {
			setDateIndex((dateIndex) => dateIndex + 1)

		}, 1000);
		setIntervalId(intervalIds);
		setIsPlaying(true);
	};

	const stopSlider = () => {
		if (isPlaying === true && intervalId) {
			clearInterval(intervalId);
			setIsPlaying(false);
			return;
		}
	};

	return (
	<Wrapper>
		<TopComponent>
			<LegendWrapper
				id="colors"
				style={{
					justifyContent: "center",
					alignItems: "start",
					width: "200px",
					margin: "15px auto",
				}}
			>
				<Legend style={{ color: "lightblue" }}>Binnenhaven</Legend>
				<Legend style={{ color: "orange" }}>Kade</Legend>
				<Legend style={{ color: "yellow" }}>Fitnesstuin</Legend>
				<Legend style={{ color: "lightgreen" }}>Park / Voowerf</Legend>
			</LegendWrapper>
			<LegendWrapper
				id="infos"
				style={{
					flexDirection: "column",
					justifyContent: "end",
					width: "300px",
					margin: "15px auto",
				}}
			>
				{markPoints[dateIndex] && (
				<>
					<Metrics>
						<a href={markPoints[dateIndex].link} target="_blank">
							<strong>{markPoints[dateIndex].label}</strong>
						</a>
					</Metrics>
					<Legend style={{margin: "0"}}>{markPoints[dateIndex].undertitle}</Legend>
				</>
				)}
			</LegendWrapper>

			<Row id="map">
				<SvgMapWrapper>
				<Binnenhaven
					amount={getDensity("SwimmingArea")}
					date={dateIndex}
				></Binnenhaven>
				<Fitness 
					amount={getDensity("Fitness")}
					date={dateIndex}
				></Fitness>
				<Kade
					amount={getDensity("Terrace")}
					polygonPoints="M249.65 293.65l13.2-4.8 56.3 135.9 260 240-13.3 14.1-9-8.4v-.6h-1.2l-15 8.4-74.4-75 6.6-7.2-31.8-31.2-6.6 6.6-100.2-98.4-26.4-30-57.6-149.4"
					date={dateIndex}
				>
					<path
					id="gate"
					d="M249.65 293.65l13.2-4.8 56.3 135.9 260 240-13.3 14.1-9-8.4v-.6h-1.2l-15 8.4-74.4-75 6.6-7.2-31.8-31.2-6.6 6.6-100.2-98.4-26.4-30-57.6-149.4"
					style={style.zones}
					/>
				</Kade>
				<Park amount={getDensity("Picnic")} date={dateIndex}></Park>
				</SvgMapWrapper>
			</Row>
		</TopComponent>

		<Row style={{ justifyContent: "space-evenly", width: "100%", margin: "20px 0" }}>
		<div
			style={{
				alignItems: "center",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<div>temperature</div>
			<Metrics>{weatherDataAverageTemp[dateIndex]}°C</Metrics>
		</div>
		<div
			style={{
				alignItems: "center",
				display: "flex",
				flexDirection: "column",
				width: "200px",
			}}
		>
			<div>date</div>
			<Row>
				<Metrics>
					{new Date(weatherDataDates[dateIndex]).getDate()}
				</Metrics>
				<div style={{ margin: "0 5px" }}>-</div>
				<Metrics>
					{new Date(weatherDataDates[dateIndex]).getMonth() + 1}
				</Metrics>
				<div style={{ margin: "0 5px" }}>-</div>
				<Metrics>
					{new Date(weatherDataDates[dateIndex]).getFullYear()}
				</Metrics>
			</Row>
		</div>
		<div
			style={{
			alignItems: "center",
			display: "flex",
			flexDirection: "column",
			}}
		>
			<div>visitors</div>
			{getTotal[dateIndex] ? (
				<Metrics>{getTotal[dateIndex]}</Metrics>
			) : (
				<Metrics style={{ fontSize: "14px", marginTop: "5px" }}>no data</Metrics>
			)}
		</div>
		</Row>

		<Row>
			<div
				style={{
					WebkitTouchCallout: "none",
					WebkitUserSelect: "none",
					KhtmlUserSelect: "none",
					MozUserSelect: "none",
					MsUserSelect: "none",
					UserSelect: "none",
					WebkitTapHighlightColor: "rgba(0,0,0,0)",
					display: "flex",
					flexDirection: "column",
					width: "80vw",
					marginBottom: "5%",
				}}
			>
				<DataLayers>
				<Row style={sliderStyle}>
					<DataLabel>Crowd</DataLabel>
					<BarChart
					data={getTotal}
					height="100"
					width="4000"
					/>
				</Row>
				<Row style={sliderStyle}>
					<DataLabel>Temp</DataLabel>
					<TempStrip />
				</Row>
				</DataLayers>

				<Row
				onClick={stopSlider}
				style={{ ...sliderStyle, marginTop: "30px" }}
				>
				<DataLabel></DataLabel>
				<Slider
					style={{ width: "100%" }}
				//	marks={markPoints}
					min={0}
					max={weatherDataDates.length - 1}
					included={false}
					onChange={(value) => setDateIndex(value)}
					value={dateIndex}
					railStyle={{ backgroundColor: "darkgrey", height: 2 }}
					handleStyle={{
					borderColor: "darkgrey",
					height: 28,
					width: 28,
					marginLeft: 0,
					marginTop: -13,
					backgroundColor: "rgba(0,0,0,0)",
					}}
					dotStyle={{
					borderColor: "black",
					backgroundColor: "white",
					height: "20px",
					width: "20px",
					marginLeft: "-10px",
					bottom: "-7px",
					}}
					handle={handle}
				/>
				</Row>
				<Row>
					{ <Button onClick={playSlider}>{isPlaying ? "Pause" : "Play"} animation</Button> }
				</Row>
			</div>
		</Row>
	</Wrapper>
	);
};
export default ZonesColors;
