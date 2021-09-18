# prevent-back

[![gzip size](http://img.badgesize.io/https://unpkg.com/prevent-back/dist/prevent-back.min.mjs?compression=gzip&label=gzip%20size&style=flat-square)](https://unpkg.com/prevent-back/dist/)
[![downloads](https://img.shields.io/npm/dm/prevent-back.svg?style=flat-square)](https://www.npmtrends.com/prevent-back)
[![module formats: umd, cjs, and es](https://img.shields.io/badge/module%20formats-umd%2C%20cjs%2C%20es-green.svg?style=flat-square)](https://unpkg.com/prevent-back/dist/)
[![jsdelivr](https://data.jsdelivr.com/v1/package/npm/prevent-back/badge)](https://www.jsdelivr.com/package/npm/prevent-back)

[![Build Status](https://img.shields.io/travis/fisker/prevent-back.svg?style=flat-square)](https://travis-ci.org/fisker/prevent-back)
[![Code Coverage](https://img.shields.io/codecov/c/github/fisker/prevent-back.svg?style=flat-square)](https://codecov.io/github/fisker/prevent-back)
[![MIT License](https://img.shields.io/npm/l/prevent-back.svg?style=flat-square)](https://github.com/fisker/prevent-back/blob/master/license)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

> Prevent vistor go back to previous page

## Install

```sh
yarn add prevent-back
```

## Usage

```html
<script type="module">
  import preventBack from 'https://unpkg.com/prevent-back?module'

  preventBack((stay, leave) => {
    const confirmedToLeave = confirm('Are you sure you want leave?')
    if (confirmedToLeave) {
      leave()
    } else {
      stay()
    }
  })
</script>
```

## API

```js
import preventBack, {stay, leave} from 'prevent-back'
```

### `preventBack(onAttemptToLeave)`

```js
import preventBack from 'prevent-back'

preventBack((stay, leave) => {
  const confirmedToLeave = confirm('Are you sure you want leave?')
  if (confirmedToLeave) {
    leave()
  } else {
    stay()
  }
})
```

### `stay` and `leave`

```js
import preventBack, {stay, leave} from 'prevent-back'

document.querySelector('#js-stay-button').addEventListener('click', stay)
document.querySelector('#js-leave-button').addEventListener('click', leave)

preventBack(() => {
  document.querySelector('#js-dialog').showModal()
})
```
