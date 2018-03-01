# Learning and Practicing
Code examples from ramp up on either new technologies/ideas worth playing around with.

## Tools
1.  [Node Redis](https://github.com/NodeRedis/node_redis)
2. [Micro](https://github.com/zeit/micro)
3. [Level](https://www.npmjs.com/package/level)
4. [Then Levelup](https://www.npmjs.com/package/then-levelup)

## How to use `redis` cache
- An `express` API that fetches a Github user's number of stars
- Caches data returned for a specific user and destroys after a minute
- If user makes a request, it first looks in the `redis` cache
- If it's not found in the cache it makes a call to the Github API

## How to use `redis` pub and sub
- Publishes a message every 6 seconds using a channel name
- A client listens to this message by subscribing to the publisher's channel

## How to use the micro for NodeJS microservices
- Starts a service that checks the number of visits a route has
- Stores the number of visits for each route in a `level` `db`
- Uses the `then-levelup` library to `promisify` the `db`

