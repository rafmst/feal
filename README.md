<h1 align="center"> Feal </h1> <br>
<p align="center">
  <a href="https://nodei.co/npm/feal/">
    <img alt="Feal CLI" title="Feal CLI" src="https://i.imgur.com/2cIOtEo.png" width="120">
  </a>
</p>

<p align="center">
  Feal is an API boilerplate that uses Koa with Typescript and MongoDB, with its own CLI tool.
</p>

## Table of Contents

- [Getting started](#getting-started)
- [Documentation](#documentation)
  - [Routes](#routes)
    - [Methods](#methods)
    - [Prefixed routes](#prefixed-routes)
  - [Controllers](#controllers)
    - [Example](#example)
    - [Context](#context)

## Getting started

The best way to start a new project is by using feal-cli tool, to know more about it go [here](https://github.com/rafmst/feal-cli).

```
$ feal init my-project-name
$ cd my-project-name
$ npm run dev
```

## Documentation

### Routes

Routes are stored in the root of the project inside the file `./routes.ts`, pretty self explanatory.

#### Methods

All the common methods in REST API's are available here with some extra sugar, these include: `get`, `post`, `put`, `del`, `all`. For more information check the original package in the [koa-router](https://github.com/ZijianHe/koa-router) repository.

#### Prefixed routes

Its easy to prefix routes by creating new routers and pushing them to the main `routersGroup` variable. This should be obvious but avoid pushing routes after they are beeing added to the main router by the `routerGroups.map` function.

```ts
// Books router group
routerGroups.push(
  new Router({ prefix: '/books' })
    .get('/', BooksController.all)
    .get('/:id', BooksController.one)
)
```

In this example, the routes accessible will be: `/books` and `/books/:id`.

### Controllers

Controllers are simple classes that contain functions, these are very simples classes that help separting methods/functions with related functions. To create a new Controller simply add a new file to the `./controllers` directory. Check the example bellow or copy it to make your coding faster.

#### Example

```ts
import { Context, Next } from 'koa'

class BooksController {
  /**
   * Single book
   * @param ctx Context
   * @param next Next
   */
  public async one(ctx: Context, next: Next) {
    ctx.body = {
      id: ctx.params.id,
      title: 'Lord of the Rings',
    }

    await next()
    return
  }

  /**
   * All books
   * @param ctx Context
   * @param next Next
   */
  public async all(ctx: Context, next: Next) {
    ctx.body = [
      {
        id: 1,
        title: 'Lord of the Rings',
      },
      {
        id: 2,
        title: 'Harry Potter',
      },
    ]

    await next()
    return
  }
}

export default new BooksController()
```

#### Context

Every method receives a parameter of type Context, to quote the main package documentation:

> Context encapsulates node's request and response objects into a single object which provides many helpful methods for writing web applications and APIs.

Please visit this [page](https://github.com/koajs/koa/blob/master/docs/api/context.md) to learn more about the Context object.
