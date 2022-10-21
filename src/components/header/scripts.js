document.addEventListener('DOMContentLoaded', function () {
    const windowHeight = window.innerHeight;

    if(document.querySelector('.jsHeader')){
        window.header = {
            main: document.querySelector('.jsHeader'),
            menu: document.querySelector('.jsBurger'),
            burgerTrigger: document.querySelector('.jsBurgerTrigger'),
            burgerClose: document.querySelector('.jsBurgerClose'),
            rotateIndex: 0,
       
            rotate: function (index){
                index += 1;
                window.header.burgerTrigger.style.transform = 'rotate('+ (index * 360) +'deg)';
                return index
            },

            open: function(){
                window.header.main.classList.add('is-active')
                window.header.menu.classList.add('is-active')
                window.header.burgerTrigger.classList.add('is-active')
                // document.querySelector('body').classList.add('_lock');
                window.header.rotateIndex = window.header.rotate(window.header.rotateIndex);
            },

            close: function (){
                window.header.main.classList.remove('is-active')
                window.header.menu.classList.remove('is-active')
                window.header.burgerTrigger.classList.remove('is-active')
                // document.querySelector('body').classList.remove('_lock');
                window.header.rotateIndex = window.header.rotate(window.header.rotateIndex);
            }
        };
        
        window.header.burgerTrigger.addEventListener('click', function(){
            if (window.header.main.classList.contains('is-active')) {
                window.header.close();
            } else{
                window.header.open();
            }
        })

        window.header.burgerClose.addEventListener('click', function(){
            if (window.header.main.classList.contains('is-active')) {
                window.header.close();
            }
        })
        
        document.addEventListener('click', e => {
            const target = e.target 
            if (window.header.main.classList.contains('is-active')) {
                if (!target.closest('.jsHeader')) {
                    window.header.close();
                }
            }
        })
        

        document.addEventListener('scroll', function(){
            if(window.pageYOffset >= (windowHeight * 0.25)){
                window.header.main.classList.add('is-fixed')
            } else{
                window.header.main.classList.remove('is-fixed')
            }
        })
    }
})