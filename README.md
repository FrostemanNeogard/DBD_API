# DBD API

## Overview

DBD API is a RESTful API that provides access to data related to the popular video game "Dead by Daylight". It allows users to retrieve information about characters, perks, items, and more from the game.

## Getting Started

### Base URL

This API is currently not publicly hosted anywhere, however, if you were to set it up locally, it will listen to port 3000.

### Response Format

All responses will be in JSON format.



## Endpoint: `/addons`



### Get all addons
```bash
GET /addons
```
Fetches data for all addons currently in the game.

#### Query parameters
- `role` (optional): Fetch all addons by role ("killer" or "survivor").



### Get all addons for owner
```bash
GET /addons/:owner
```

#### Parameters
- `owner`: The killer or survivor item which owns the addon.

#### Query Parameters
- `name` (optional): Fetch data for only the given addon by name.



### Get random addons by owner
```bash
GET /addons/:owner/random
```
Retrieve a selection of random addons owned by a given killer or survivor item.

#### Parameters
- `owner`: The killer or survivor item that owns the addons.

#### Query Parameters
- `amount` (optional): The number of random addons to retrieve. Defaults to 2.

### Response
```json
[
  {
    "quality": "string",
    "name": "string",
    "description": "string",
    "imageSrc": "string",
    "href": "string"
  }
]
```




## Endpoint: `/items`



### Get all items
```bash
GET /items
```
Fetches data for all survivor items currently in the game.

#### Query parameters
- `name` (optional): Fetch data only for the given item by name.



### Get random items
```bash
GET /items/random
```
Retrieve a random survivor item.

### Response
```json
[
  {
    "name": "string",
    "rarity": "string",
  }
]
```



## Endpoint: `/killers`



### Get all killers
```bash
GET /killers
```
Fetches data for killer(s) currently in the game.

#### Query parameters
- `name` (optional): Name of the specified killer to fetch data for.



### Get random killer
```bash
GET /killers/random
```

Fetches data for a randomly selected killer.

### Response
```json
[
  {
    "name": "string",
    "description": "string",
    "perks": [
      {
        "name": "string"
      }
    ]
  }
]
```



## Endpoint: `/offerings`



### Get all offerings
```bash
GET /offerings
```
Fetches data for offering(s) currently in the game.

#### Query parameters
- `name` (optional): Name of the specified killer to fetch data for.
- `role` (optional): Name of the specified role to fetch data for ("killer" or "survivor").



### Get random offering
```bash
GET /offerings/random
```
Fetches data for a randomly selected offering.

#### Query parameters
- `role` (optional): Name of the specified role to fetch data for ("killer" or "survivor").


### Response
```json
[
  {
    "name": "string",
    "description": "string",
  }
]
```



## Endpoint: `/perks`



### Get Perks
```bash
GET /perks
```

Fetches data for perks currently in the game.

#### Query Parameters

- `role` (optional): Role of the perks to be returned. Either "killer" or "survivor".
- `name` (optional): Name of the specified perk to fetch data for.

### Get Random Perks
```bash
GET /perks/random
```
Fetches data for a randomly selected set of perks.

#### Query Parameters

- `role` (optional): Role of the perks to be returned. Either "killer" or "survivor".
- `amount` (optional): Amount of perks to return data for.

### Response

```json
[
  {
    "name": "string",
    "image": "string",
    "info": "string",
    "character": "string"
  }
]
```



## Endpoint: `/survivors`



### Get All Survivors
```bash
GET /survivors
```
Fetches data for survivors currently in the game.

#### Query Parameters

- `name` (optional): Name of the specified survivor to fetch data for.

### Get Random Survivor
```bash
GET /survivors/random
```
Fetches data for a randomly selected survivor.

### Response

```json
[
  {
    "name": "string",
    "description": "string",
    "perks": [
      {
        "name": "string",
        "image": "string",
        "info": "string",
        "character": "string"
      }
    ]
  }
]
```