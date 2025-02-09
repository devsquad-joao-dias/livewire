import NProgress from 'nprogress'
import { getNonce } from '@/utils'

NProgress.configure({
    minimum: 0.1,
    trickleSpeed: 200,
    showSpinner: false,
})

injectStyles()

let inProgress = false
export function showAndStartProgressBar() {
    inProgress = true
    // Only show progress bar if it's been a little bit...
    setTimeout(() => {
        if (! inProgress) return
        NProgress.start()
    }, 150)

    // createBar()

    // incrementBar()
}

export function finishAndHideProgressBar() {
    inProgress = false
    NProgress.done()
    NProgress.remove()

    // finishProgressBar(); destroyBar()
}

function createBar() {
    let bar = document.createElement('div')

    bar.setAttribute('id', 'alpine-progress-bar')
    bar.setAttribute('x-navigate:persist', 'alpine-progress-bar')
    bar.setAttribute('style', `
        width: 100%;
        height: 5px;
        background: black;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        transition: all 0.5s ease;
        transform: scaleX(0);
        transform-origin: left;
    `)

    document.body.appendChild(bar)

    return bar
}

function incrementBar(goal = .1) {
    let bar = document.getElementById('alpine-progress-bar')

    if (! bar) return

    let percentage = Number(bar.style.transform.match(/scaleX\((.+)\)/)[1])

    if (percentage > 1) return

    bar.style.transform = 'scaleX(' + goal + ')'

    setTimeout(() => {
        incrementBar(percentage + .1)
    }, 50)
}

function finishProgressBar(callback) {
    let bar = document.getElementById('alpine-progress-bar')
    bar.style.transform = 'scaleX(1)'
}

function destroyBar() {
    document.getElementById('alpine-progress-bar').remove()
}

function injectStyles() {
    let style = document.createElement('style')
    style.innerHTML = `/* Make clicks pass-through */

    #nprogress {
      pointer-events: none;
    }

    #nprogress .bar {
      background: var(--livewire-progress-bar-color, #29d);

      position: fixed;
      z-index: 1031;
      top: 0;
      left: 0;

      width: 100%;
      height: 2px;
    }

    /* Fancy blur effect */
    #nprogress .peg {
      display: block;
      position: absolute;
      right: 0px;
      width: 100px;
      height: 100%;
      box-shadow: 0 0 10px var(--livewire-progress-bar-color, #29d), 0 0 5px var(--livewire-progress-bar-color, #29d);
      opacity: 1.0;

      -webkit-transform: rotate(3deg) translate(0px, -4px);
          -ms-transform: rotate(3deg) translate(0px, -4px);
              transform: rotate(3deg) translate(0px, -4px);
    }

    /* Remove these to get rid of the spinner */
    #nprogress .spinner {
      display: block;
      position: fixed;
      z-index: 1031;
      top: 15px;
      right: 15px;
    }

    #nprogress .spinner-icon {
      width: 18px;
      height: 18px;
      box-sizing: border-box;

      border: solid 2px transparent;
      border-top-color: var(--livewire-progress-bar-color, #29d);
      border-left-color: var(--livewire-progress-bar-color, #29d);
      border-radius: 50%;

      -webkit-animation: nprogress-spinner 400ms linear infinite;
              animation: nprogress-spinner 400ms linear infinite;
    }

    .nprogress-custom-parent {
      overflow: hidden;
      position: relative;
    }

    .nprogress-custom-parent #nprogress .spinner,
    .nprogress-custom-parent #nprogress .bar {
      position: absolute;
    }

    @-webkit-keyframes nprogress-spinner {
      0%   { -webkit-transform: rotate(0deg); }
      100% { -webkit-transform: rotate(360deg); }
    }
    @keyframes nprogress-spinner {
      0%   { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    `

    nonce = getNonce()
    if (nonce) {
      style.nonce = nonce
    }

    document.head.appendChild(style)
}
