# Portfolio API

Step by step building blocks of how popular framework work. Once all major aspects are covered we will move to an actual framework


### Current version:  __4__

## Version description:

> NOTE: These just show a **really simple** implementation of how some frameworks work

Server object handles the incoming requests as well as middleware registration. There is also a separation in Route and RouteHandler, RouteHandler taking care of saving and accessing routes as well as assigning middlewares to routes. Route itself  hold the actual handler class and method.

There are also MiddlewareHandler that takes care of building up the middleware array and based on that building the chained middlewares. For actual middleware execution there is Runner class. 


## Installation

```
yarn install 
```
or
```
npm install
```

 Copy .env.example to .env
```
cp .env.example .env
```

Start server using git bash (or similiar)
```
yarn dev
```


## Breaking changes

 * Route was divided into Route and RouteHandler
 * Server is now in charge of handling incoming requests
 * RouteHandler is in charge of saving and accessing routes


## Improvements

* Moved request handling to Server
* Introduced middlewares
* MiddlewareHandler handles middleware compilation 
* Runner handles middleware execution
* Moved resolving of preloaded items back to Ignitor
* Separated Route and RouteHandler
* Introduced Context for easier request/response access
* Introducted kernel as a place to register middlewares in system
* Added middleware function to routes to attach middleware to route

## Tasks

* Get familiar with the updated project and how things work (compare to previous versions)
* Create your middlewares

Don't create specific rest endpoints (/posts/:id) because it won't work yet

## CODE OF CONDUCT

**Write titles and descriptions for your PRs**


### Current branches

Master -> production, locked

Dev -> development, all dev sub branches should merge in this one

v* -> These are previous versions

**Always branch out**

Naming convention for branching

 {*githubusername*}/{*type*}/{*mini desc* OR *Jira task number*}

Examples:

```
backspacerhino/fix/route-handler
```
```
backspacerhino/feature/specific-endpoint-handler
```

Or in case of JIRA tasks (we don't have this but it's good to know)

```
backspacerhino/fix/PA-32
```
```
backspacerhino/feature/PA-11
```