import $ from 'jquery'

export const previewInit = () => {
    var timer;
    var x = 0
    $('.card-box').mouseover(function (e) {
        if (x === 0) {
            timer = setTimeout(function () {
                console.log($(window).width())
                const windowWidth = $(window).width()
                $('.copied-preview').remove()
                var cardbox = e.target
                if (!e.target.classList.contains('card-box')) {
                    cardbox = e.target.closest('.card-box')
                }
                // target = card-preview div element
                var target = cardbox.querySelector('.card-preview')
                const styleFromTarget = getComputedStyle(target)
                const destination = document.querySelector('#root');

                var bodyRect = document.body.getBoundingClientRect(),
                    elemRect = cardbox.getBoundingClientRect(),
                    topOffset = elemRect.top - bodyRect.top
                var dataPlacementValue = elemRect.left < windowWidth / 2 ? 'right' : 'left'
                // the number 300 is hard coded is because % width does not work in this case.
                var widthOfTarget = parseInt(styleFromTarget.width.slice(0,-2))

                var xaxis = elemRect.left < windowWidth / 2 ? elemRect.right : elemRect.left - widthOfTarget
              

                // handle copied one
                var copiedOne = target.cloneNode(true)
                copiedOne.classList.add('copied-preview')
                copiedOne.style.display = 'block'
                copiedOne.style.top = `${topOffset - 20}px`
                copiedOne.style.left = `${xaxis}px`
                copiedOne.style.transition = '0.2s'
                copiedOne.setAttribute('data-placement', dataPlacementValue)

                copiedOne.addEventListener('mouseover', () => {
                    target.classList.add('moved-preview')
                    // target.style.position = 'absolute'
                    target.style.display = 'block'
                    target.style.top = `${topOffset - 20}px`
                    target.style.left = `${xaxis}px`
                    target.setAttribute('data-placement', dataPlacementValue)

                    destination.appendChild(target)
                })

                target.addEventListener('mouseleave', (e) => {
                    target.classList.remove('moved-preview')
                    target.style.display = 'none'
                    cardbox.appendChild(target)

                    var criteria = elemRect.right
                    if (elemRect.right > e.pageX && criteria < 600) {
                        copiedOne.style.display = 'block'
                    }
                    else if (elemRect.left < e.pageX && criteria > 600) {
                        copiedOne.style.display = 'block'
                    }
                })

                // because event keep happening when mouse is hovering on element
                if (!document.querySelector('.copied-preview')) {
                    destination.appendChild(copiedOne)
                }
            }, 500);
            x = x + 1
        }
    }).mouseleave(function () {
        x = 0

        $('.copied-preview').hide()
        clearTimeout(timer);
    })
        .click(() => {
            $('.copied-preview').remove()
            clearTimeout(timer)
        })
}


