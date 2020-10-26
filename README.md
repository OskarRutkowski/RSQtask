# RSQtask

> ClickColor The Game is web app. You can choose your difficulty level like: easy, mid and hard and than play the game! After clicking block color which has at least one neighbor, you can gain as many points as wide is connected blocks area. The higher difficulty level, the bigger play board and wider range of colors is.

### Clone

- Clone this repo from `https://github.com/OskarRutkowski/RSQtask.git`

---

### Setup

```shell
$ cd RSQtask
$ cd rsq-task
$ npm install
```

---

### Run
```shell
$ npm start
```

Development server should start automatically on `http://localhost:3000/`

---


### How it works

> After choosing difficulty level, playTable is created and fulfilled. Every block has their own {x,y} values and color type. At start of game every block is colored randomly. After clicking on block, function for finding neighbors is run in every direction (up, down, right, left) and than recursively again in further directions. If width of color area is more than 1, user score is updated and play board is rerendered.

---

### Build with

- React 17.0.0
- React Router DOM 5.2.0
- MobX 6.0.1

---

## Why MobX?

> ClickColor The Game is very small project and complexity of Redux seemed to be too overwhelming. In MobX there is much less code needed, components are only decorated with MobX decorators and store is available in whole app just like in Redux.
