(() => {

    //alert(`please click any of the three color pallet and adjust it with the ajustment pannel`)
    
    const setColor = {
        defaultPalletColor: [
            {
                red: 255,
                green: 157,
                blue: 0
        }, {
                red: 70,
                green: 134,
                blue: 154
        }, {
                red: 98,
                green: 76,
                blue: 56
        }],
        color: {
            red: NaN,
            geen: NaN,
            blue: NaN
        }
    }



    const create = tag => document.createElement(tag) // To easily Create Elements

    const body = document.querySelector('.mainBody');

    const createElem = function () {
        //Creating The preview Box and its child contents
        const createPreviewContainer = create('div');
        createPreviewContainer.classList.add('preview-container')

        const createPreviewElem = create('div')
        createPreviewElem.classList.add('preview')
        createPreviewContainer.appendChild(createPreviewElem)

        createPreviewElem.appendChild(create('h1'))
        
        body.appendChild(createPreviewContainer)

        //Creating colorSelector Containner and it's child Elements and content
        const createSelectContainer = create('div')
        createSelectContainer.classList.add('selector-container')

        const colorName = ['red', 'green', 'blue']
        const initial = 'label';
        for (let i = 0; i < colorName.length; i++) {
            const createColorCover = create('div')
            createColorCover.classList.add(colorName[i] + '-' + initial)

            const input = create('input')
            input.setAttribute('type', 'range')
            input.setAttribute('mix', 0)
            input.setAttribute('max', 256)
            input.setAttribute('data-color-name', colorName[i])
            input.value = 0
            input.classList.add(colorName[i])
            createColorCover.appendChild(input)

            createSelectContainer.appendChild(createColorCover)
        }

        body.appendChild(createSelectContainer)


        const createPalletContainer = create('div')

        //Creating Pallet containner and it's child Elements and content
        createPalletContainer.classList.add('pallet-container')


        for (let i = 0; i < 3; i++) {
            const pallet = create('div')

            pallet.setAttribute('data-store-red', setColor.defaultPalletColor[i].red)
            pallet.setAttribute('data-store-green', setColor.defaultPalletColor[i].green)
            pallet.setAttribute('data-store-blue', setColor.defaultPalletColor[i].blue)

            pallet.classList.add(`pallet-${i}`)
            createPalletContainer.appendChild(pallet)

        }

        body.appendChild(createPalletContainer)

        //This will be used to determine the number of e
    }

    createElem()
    const inputHolder = document.querySelectorAll('.selector-container > div')
    const input = document.querySelectorAll('.selector-container input[type=range]')
    const preview = document.querySelector('.preview')
    const pallet = document.querySelectorAll('.pallet-container > div');
    const h1 = document.querySelector('.preview h1')
    
    const redInput = input[0]
    const greenInput = input[1]
    const blueInput = input[2]

    const defaultSeting = function () {
        //input.forEach(node => node.style.pointerEvents = 'none')
        
        inputHolder.forEach(node => node.classList.add('disabled') )
        h1.innerText = window.getComputedStyle(preview).backgroundColor
    } 
    
    window.onload = function(){
        
    }
    defaultSeting()


    //Update the preview box when you click on any pallet
    const updatePallet = function () {
        const node = event.target

        //input.forEach(node => node.style.pointerEvents = 'auto' )
        inputHolder.forEach(node => node.classList.remove('disabled') )

        h1.innerText = getComputedStyle(node).backgroundColor

        preview.style.backgroundColor = getComputedStyle(node).backgroundColor

        setColor.color.red = node.getAttribute('data-store-red')
        setColor.color.green = node.getAttribute('data-store-green')
        setColor.color.blue = node.getAttribute('data-store-blue')


        redInput.value = setColor.color.red
        greenInput.value = setColor.color.green
        blueInput.value = setColor.color.blue

        pallet.forEach(item => item.classList.remove('active-pallet'))
        node.classList.add('active-pallet')
    }

    
    pallet.forEach(node => { //Set an event listener to all pallet
        node.addEventListener('click', function () {
            updatePallet()
        })
    })



    // Change the color of pallet and preview when ever the the range input is being used
    //const input = document.querySelectorAll('selector-container input[type=range]')
    
    
    const msg = create('div');// create a message box whe no pallet is chossen 
    msg.classList.add('msg')//Adding a class to the message box
    const msgPara = create('p');
    const msgButton = create('button')
    msg.appendChild(msgPara)
    msg.appendChild(msgButton)
    msgButton.innerText = 'close'
    msgPara.innerText = 'Please Select any of the pallet below to apply changes to it'
    
    msgButton.onclick = function(){
        msg.classList.remove('active')
    }
    
    const colorChanger = function (inputColor) {
        
        let activePallet = document.querySelector('.active-pallet');
        
        if(activePallet === null){
            msg.classList.add('active')
            body.appendChild(msg)
            
           return
        } 
        
        msg.classList.remove('active')
        
        //Update the color object 
        setColor.color[inputColor] = event.target.value


        let rgb = `rgb(${setColor.color.red} , ${setColor.color.green} , ${setColor.color.blue})`

        event.target.setAttribute(`data-store-${inputColor}`, event.target.value)
        activePallet.style.background = rgb
        preview.style.background = rgb
        h1.innerText = rgb
    }
    //add event to all range input elements
    input.forEach(node => node.oninput = () => colorChanger(node.getAttribute('data-color-name')))

})()
