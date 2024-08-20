"use client"

import { LatLngExpression, LatLngTuple } from "leaflet"
import { MapContainer, TileLayer } from "react-leaflet"

import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import "leaflet/dist/leaflet.css"

interface MapProps {
	posix: LatLngExpression | LatLngTuple
	zoom?: number
}

const defaults = {
	zoom: 19,
}

const Map = (Map: MapProps) => {
	const { zoom = defaults.zoom, posix } = Map

	return (
		<MapContainer
			center={posix}
			zoom={zoom}
			scrollWheelZoom={true}
			style={{
				height: "100%",
				width: "100%",
				minHeight: "200px",
				minWidth: "100px",
			}}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
		</MapContainer>
	)
}

export default Map
