document.addEventListener('DOMContentLoaded', function () {

    let jsTabs = document.querySelectorAll('.jsTabs');

    for (let index = 0; index < jsTabs.length; index++){
        let item = jsTabs[index];
        let link = item.querySelectorAll('.jsTabLink');
        let body = item.querySelectorAll('.jsTabItem');

        initTabs()

        for (let index = 0; index < link.length; index++){
            let thisLink = link[index];
            let thisIndex = thisLink.getAttribute('data-tab');
    
            thisLink.addEventListener('click', function(){
                clear()
                thisLink.classList.add('is-active');
                item.querySelector('.jsTabItem[data-tab="'+ thisIndex +'"]').classList.add('is-open');
            })

            if(link.length < 2){
                link[0].classList.add('is-active');
                item.querySelector('.jsTabItem[data-tab="'+ link[0].getAttribute('data-tab') +'"]').classList.add('is-open');
            }
        }

 
 


        function initTabs(){
            initGroup(link);
            initGroup(body);

            function initGroup(group) {
                for (let index = 0; index < group.length; index++){
                    let groupItem = group[index]
                    groupItem.setAttribute('data-tab', index);
                }
            }
        }

        function clear() {
            for (let index = 0; index < link.length; index++){
                let linkItem = link[index]
                linkItem.classList.remove('is-active');
            }
            for (let index = 0; index < body.length; index++){
                let bodyItem = body[index]
                bodyItem.classList.remove('is-open');
            }
        }
    }
})