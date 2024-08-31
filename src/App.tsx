import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Box, Container, Typography } from "@mui/material";
import type React from "react";
import { useState } from "react";
import { HexToHsl, hexToPrefixedHex, hexToRgb } from "./utils";

function App() {
	const [colorValue, setColorValue] = useState({
		defaultValue: "#0ca3b1",
		rgb: hexToRgb("#0ca3b1"),
		hsl: HexToHsl("#0ca3b1"),
		prefixedHex: hexToPrefixedHex("#0ca3b1"),
	});

	function convertValue(hex: string) {
		setColorValue({
			defaultValue: hex,
			rgb: hexToRgb(hex),
			prefixedHex: hexToPrefixedHex(hex),
			hsl: HexToHsl(hex),
		});
	}

	function CopyColorValue({
		colorValueName,
	}: {
		colorValueName: "RGB" | "HEX" | "HSL" | "HEX (prefixed for Three.JS usage)";
	}) {
		function getColorValue() {
			switch (colorValueName) {
				case "RGB":
					return colorValue.rgb;
				case "HSL":
					return colorValue.hsl;
				case "HEX (prefixed for Three.JS usage)":
					return colorValue.prefixedHex;
				default:
					return colorValue.defaultValue;
			}
		}

		return (
			<Typography
				onClick={() => navigator.clipboard.writeText(getColorValue())}
				sx={{
					cursor: "pointer",
					transition: "color 0.2s ease",
					":first-of-type": { mt: "0" },
					":hover": { textDecoration: "underline" },
				}}
				variant="h5"
				component="p"
				mt="2rem"
				title={`Click to copy ${colorValueName} value`}
			>
				<ContentCopyIcon /> {colorValueName}: {getColorValue()}
			</Typography>
		);
	}

	return (
		<Container>
			<Typography mt="2rem" textAlign="center" variant="h2" component="h1">
				Color Picker
			</Typography>

			<Typography variant="h5" component="p" m="2rem" textAlign="center">
				Pick your favourite color & click it to copy it to your clipboard!
			</Typography>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					maxWidth: "800px",
					margin: "0 auto",
				}}
			>
				<input
					style={{
						width: "100%",
						backgroundColor: "transparent",
						border: "2px groove silver",
						height: "200px",
						maxWidth: "200px",
						maxHeight: "200px",
						boxShadow: "rgba(0, 0, 0, 0.65) 0px 1px 4px",
						margin: "0",
						padding: "0",
						cursor: "pointer",
						borderRadius: "50%",
						overflow: "hidden",
					}}
					type="color"
					value={colorValue.defaultValue}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						convertValue(e.target.value)
					}
				/>
				<Box>
					<CopyColorValue colorValueName="RGB" />
					<CopyColorValue colorValueName="HSL" />
					<CopyColorValue colorValueName="HEX" />
					<CopyColorValue colorValueName="HEX (prefixed for Three.JS usage)" />
				</Box>
			</Box>
		</Container>
	);
}

export default App;
