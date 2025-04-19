# Weather Server

A Model Context Protocol (MCP) server that provides weather information using the Open-Meteo API.

## Features

- Fetch current weather data for any city
- Get detailed weather information including:
  - Temperature
  - Precipitation
  - Rain
  - Relative humidity
  - Wind speed
  - Day/night indication
- Hourly temperature forecasts

## Prerequisites

- Node.js (latest LTS version recommended)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd mcp-fetch-weather
```

2. Install dependencies:
```bash
npm install
```

## Usage

The server provides the following tool:

### fetch-weather

Fetches weather data for a specified city.

**Parameters:**
- `city` (string): Name of the city to get weather data for

**Returns:**
- Current weather conditions including temperature, precipitation, humidity, and wind speed
- Hourly temperature forecast

**Example Response:**
```json
{
  "latitude": 40.4375,
  "longitude": -3.6875,
  "current": {
    "temperature_2m": 20.5,
    "relative_humidity_2m": 65,
    "precipitation": 0,
    "rain": 0,
    "wind_speed_10m": 15.2,
    "is_day": 1
  },
  "hourly": {
    "temperature_2m": [...]
  }
}
```

## Visual Studio Code Integration

To use this weather server in Visual Studio Code:

1. Open your VS Code `settings.json` file (Press `Cmd+,` on macOS or `Ctrl+,` on Windows/Linux and click on "Edit in settings.json")

2. Add the following configuration:
```json
{
  ...
  "mcp": {
    "servers": {
        "weather": {
            "command": "npx",
            "args": [
                "-y",
                "tsx",
                "/Users/PATH TO YOUR FOLDER/main.ts"
            ]
        },
    }
}
```

3. Restart VS Code to apply the changes

4. Test the integration by opening the Command Palette (`Cmd+Shift+P` or `Ctrl+Shift+P`) and typing "Weather". You should see the weather commands available.


## Error Handling

The server handles two main types of errors:

- CODE 001: City not found
- CODE 002: API or network error

## API Dependencies

This server uses the following external APIs:

- [Open-Meteo Geocoding API](https://geocoding-api.open-meteo.com)
- [Open-Meteo Weather Forecast API](https://api.open-meteo.com)

## License

This project is licensed under the terms included in the [LICENSE](LICENSE) file.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For support or questions, please open an issue in the repository.