import * as PIXI from 'pixi.js'

class Space {
    app
    constructor(htmlDom) {
        this.start(htmlDom)
    }
    start = (element) => {
        this.app = new PIXI.Application({
            view: element, 
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: 0xffffff
        })
        const spaceTexture = PIXI.Texture.from('/assets/bg.jpg')
        const newSpace = new PIXI.TilingSprite(
            spaceTexture,
            this.app.screen.width, 
            this.app.screen.height
        )
        this.app.stage.addChild(newSpace)
    }
    addOnStage = (object) => {
        console.log(this.app.stage)
        this.app.stage.addChild(object)
    }
    launchRockets = (rocketArray) => {
        let count = 0
        //rocket.y is moved by different amounts to fit on screen, otherwise the biggest rocket goes off screen
        this.app.ticker.add(() => {
            if (rocketArray[0].firstFuel > 1) {
                rocketArray[0].y -= 0.2
                rocketArray[0].firstFuel -= 1
                rocketArray[0].children[2].scale.y = 0.2 + Math.sin(count) * 0.01;
                rocketArray[0].children[2].scale.x = 0.2 + Math.sin(count) * 0.01;
            } else if (rocketArray[0].secondFuel > 1) {
                rocketArray[0].y -= 0.2
                rocketArray[0].secondFuel -= 1
                const rocketBottom = rocketArray[0].children[1]
                rocketBottom.y += 0.3
                rocketBottom.rotation -= 0.01
                rocketArray[0].children[2] && rocketArray[0].children[2].destroy()
            } else {
                rocketArray[0].children[0].alpha -= 0.1
                rocketArray[0].children[1].alpha -= 0.1
            }
            if (rocketArray[1].firstFuel > 1) {
                rocketArray[1].y -= 0.3
                rocketArray[1].firstFuel -= 1
                rocketArray[1].children[2].scale.y = 0.7 + Math.sin(count) * 0.01;
                rocketArray[1].children[2].scale.x = 0.4 + Math.sin(count) * 0.01;
            } else if (rocketArray[1].secondFuel > 1) {
                rocketArray[1].y -= 0.3
                rocketArray[1].secondFuel -= 1
                const rocketBottom = rocketArray[1].children[1]
                rocketBottom.y += 0.3
                rocketBottom.rotation -= 0.01
                rocketArray[1].children[2] && rocketArray[1].children[2].destroy()
            } else {
                rocketArray[1].children[0].alpha -= 0.1
                rocketArray[1].children[1].alpha -= 0.1
            }
            if (rocketArray[2].firstFuel > 1) {
                rocketArray[2].y -= 0.2
                rocketArray[2].firstFuel -= 1
                console.log(count)
                rocketArray[2].children[2].scale.y = 0.7 + Math.sin(count) * 0.01;
                rocketArray[2].children[2].scale.x = 1.35 + Math.sin(count) * 0.03;
            } else if (rocketArray[2].secondFuel > 1) {
                rocketArray[2].y -= 0.2
                rocketArray[2].secondFuel -= 1
                const rocketBottom = rocketArray[2].children[1]
                rocketBottom.y += 0.2
                rocketBottom.rotation -= 0.01
                rocketArray[2].children[2] && rocketArray[2].children[2].destroy()
            } else {
                rocketArray[2].children[0].alpha -= 0.1
                rocketArray[2].children[1].alpha -= 0.1
            }
            if (rocketArray[3].firstFuel > 1) {
                rocketArray[3].y -= 0.1
                rocketArray[3].firstFuel -= 1
                rocketArray[3].children[2].scale.y = 1.2 + Math.sin(count) * 0.01;
                rocketArray[3].children[2].scale.x = 0.95 + Math.sin(count) * 0.03;
            } else if (rocketArray[3].secondFuel > 1) {
                rocketArray[3].y -= 0.1
                rocketArray[3].secondFuel -= 1
                const rocketBottom = rocketArray[3].children[1]
                rocketBottom.y += 0.5
                rocketBottom.rotation -= 0.03
                rocketArray[3].children[2] && rocketArray[3].children[2].destroy()
            } else {
                rocketArray[3].children[0].alpha -= 0.1
                rocketArray[3].children[1].alpha -= 0.1
                const successDiv = document.getElementsByClassName('hidden')[0]
                successDiv.id = "successContainer"
                successDiv.className = ""
            }
            count += 0.5
        })
    }
}

class Rocket {
    createRocketContainer = (rocketTop, rocketBottom, rocketFlame, firstFuel, secondFuel, id, posX, posY) => {
        const rocket = new PIXI.Container
        rocket.firstFuel = firstFuel
        rocket.secondFuel = secondFuel
        rocket.id = id
        rocket.addChild(rocketTop)
        rocket.addChild(rocketBottom)
        rocket.addChild(rocketFlame)
        return rocket
    }
}

class RocketBottom {
    createRocketBottom = (posX, posY, width, height) => {
        const rocketBottom = PIXI.Sprite.from('/assets/rocket_bottom.png')
        rocketBottom.anchor.set(1);
        rocketBottom.x = posX;
        rocketBottom.y = posY;
        rocketBottom.width = width;
        rocketBottom.height = height;
        console.log(rocketBottom)
        return rocketBottom
    }
}

class RocketTop {
    createRocketTop = (posX, posY, width, height) => {
        const rocketTop = PIXI.Sprite.from('/assets/rocket_top.png')
        rocketTop.anchor.set(1);
        rocketTop.x = posX;
        rocketTop.y = posY;
        rocketTop.width = width;
        rocketTop.height = height;
        console.log(rocketTop)
        return rocketTop
    }
}

class RocketFlame {
    createRocketFlame = (posX, posY, width, height) => {
        const rocketFlame = PIXI.Sprite.from('/assets/thrust.png')
        rocketFlame.anchor.set(1);
        rocketFlame.x = posX;
        rocketFlame.y = posY;
        rocketFlame.width = width;
        rocketFlame.height = height;
        return rocketFlame
    }
}

const main = () => {
    fetch("https://api.spacexdata.com/v2/rockets")
    .then(res => res.json())
    .then(res => {
        console.log(res)
        const rocket = new Rocket();
        const rocketTop = new RocketTop();
        const rocketBottom = new RocketBottom();
        const rocketFlame = new RocketFlame();
        const startX = window.innerWidth / 4
        let posX = startX
        const posY = window.innerHeight - 10;
        for (let i in res) {
            console.log(res[i])
            const width = res[i].diameter.meters * 10
            const height = res[i].height.meters 
            const heightBottom = res[i].height.meters / 2
            const firstFuel = res[i].first_stage.fuel_amount_tons
            const secondFuel = res[i].second_stage.fuel_amount_tons
            const rocketId = res[i].rocketid
            const rocketTopSprite = rocketTop.createRocketTop(posX, posY - heightBottom, width, height)
            const rocketBottomSprite = rocketBottom.createRocketBottom(posX, posY, width, heightBottom)
            const rocketFlameSprite = rocketFlame.createRocketFlame(posX - width / 4, posY + height, width / 2, height)
            space.addOnStage(rocket.createRocketContainer(rocketTopSprite, rocketBottomSprite, rocketFlameSprite, firstFuel, secondFuel, rocketId, posX, posY))
            posX = posX + 200
        }
        const rocketsArray = space.app.stage.children
        const finalRockets = rocketsArray.slice(1)
        console.log(finalRockets)
        space.launchRockets(finalRockets)
    })
    const HTML_DOM = document.getElementById("stage")
    const space = new Space(HTML_DOM)
    console.log(space.app.stage)
}

main()


document.getElementsByClassName('replayBtn')[0].addEventListener('click', () => {
    const successDiv = document.getElementById('successContainer')
    successDiv.className = "hidden"
    successDiv.id = ""
    console.log(successDiv)
    main()
})