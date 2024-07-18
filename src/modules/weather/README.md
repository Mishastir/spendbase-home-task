# Weather

As far as it is not so clear from task description what
should be formatted to
```json
{
      "sunrise": 1684926645,
      "sunset": 1684977332,
      "temp": 292.55,
      "feels_like": 292.87,
      "pressure": 1014,
      "humidity": 89,
      "uvi": 0.16,
      "wind_speed": 3.13
}
```
only `data` or full response 
(this sounds a bit weird but everything is possible),
I've decided to create 2 endpoints with 2 interceptors
`@Get` formats only `data` end keeps other fields from DB
`@Get("v2")` keeps only `data`, formats it and returns as response
excluding all other fields from DB
