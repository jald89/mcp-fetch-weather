#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'

const server = new McpServer({
    name: 'Weather Server',
    version: '0.1.0',
})

server.tool(
    'fetch-weather',
    'Tool to fetch weather data',
    {
        city: z.string().describe('City name'),
    },
    async ({ city }) => {
        try {
            const cityResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`)
            const cityData = await cityResponse.json()
            
            if (!cityData.results || cityData.results.length === 0) {
                return {
                    content: [
                        {
                            type: 'text',
                            text: `Could not find location data for ${city} - CODE: 001`
                        }
                    ]
                }
            }

            const { latitude, longitude } = cityData.results[0]
            const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&current=precipitation,rain,temperature_2m,relative_humidity_2m,is_day,wind_speed_10m`)
            const weatherData = await weatherResponse.json()

            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify(weatherData, null, 2)
                    }
                ]
            }
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error fetching weather data: ${errorMessage}  - CODE: 002`
                    }
                ]
            }
        }
    }
)

const transport = new StdioServerTransport()
await server.connect(transport)