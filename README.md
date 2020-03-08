# Portfolio API

Step by step building blocks of how popular framework work. Once all major aspects are covered we will move to an actual framework


### Current version:  __2__

## Version description:

> NOTE: These just show a **really simple** implementation of how some frameworks work

Shows how server is started and how routes are handled. Also how routes are stored and registered.


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

 * Route handlers are now second parameter in routes.js routes registration
 * Handler returns must be explicitly defined as *res.end* with *JSON.stringify*


## Improvements

* Separated server start into *Ignitor*
* Separated route handlers into *Route*
* Separated routes into *routes*
* Introduced support for route methods (Only major ones supported ( *GET, POST, PATCH, PUT, DELETE* )



## Tasks

* Get familiar with the updated project and how things work (compare to previous versions)
* Create your own routes and handlers

Don't create specific rest endpoints (/posts/:id) because it won't work yet

## CODE OF CONDUCT

### Current branches

Master [production, locked]

Dev [development, all dev sub branches should merge in this one]

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