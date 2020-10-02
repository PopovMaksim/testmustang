function scrollLink() {
    const catalog = document.querySelector('.catalog__content');
    //const catalog = document.querySelectorAll('.catalog__content'); и сделать через forEach все дальнейшие действия
    const catalogHeight = catalog.offsetTop;
    const linkCategory = document.querySelectorAll('.catalog__navigation-category');

    function deleteActiveLink() {
        let activeLink = document.querySelector('.navigation-category_active');
        if (activeLink) {
            activeLink.classList.remove('navigation-category_active');
        }
    }

    linkCategory.forEach( elem => {
        elem.addEventListener('click', () => {
            const category = elem.getAttribute('data-category');
            const item = catalog.querySelector(`.catalog__products-category[data-category="${category}"]`).offsetTop;
            
            catalog.scrollTop = item - catalogHeight;
            deleteActiveLink();
            elem.classList.add("navigation-category_active");
        });
    });

    function activeScroll() {  
        const categorys = document.querySelectorAll('.catalog__products-category');
        const categoryScroll = {};
        categorys.forEach((elem, i) => {
            categoryScroll[i] = elem.offsetTop - catalogHeight;
        });
        catalog.addEventListener('scroll', function() {
            for (let key in categoryScroll) {
                if (catalog.scrollTop <= categoryScroll[key] + 100) {
                    deleteActiveLink();
                    linkCategory[key].classList.add("navigation-category_active");
                    return;
                }
            }           
        });
    }

    activeScroll();
}

function showInfo() {
    const btnInfo = document.querySelector('.header__info');
    const info = document.querySelector('.header__info-content');

    btnInfo.addEventListener('mouseover', () => {
        info.style.display = 'flex';
    });
    btnInfo.addEventListener('mouseout', () => {
        function removeFlex() {
            info.style.display = '';
        }
        setTimeout(removeFlex, 3000);
    });
}

function changeWeight(elem) {
    const weightNumber = elem.parentNode.querySelector('.products-weight__number');

    function upWeight() {
        weightNumber.textContent = Number(weightNumber.textContent) + 5;
    }
    function downWeight() {
        if (Number(weightNumber.textContent) > 5) {
            weightNumber.textContent = Number(weightNumber.textContent) - 5;
        } 
    }

    if (elem.classList.value === 'products-weight__up') upWeight();
    else if (elem.classList.value === 'products-weight__down') downWeight();   
}

function clickChangeWeight() {
    const list = document.querySelector('.catalog');
    let switchWeigth;

    list.addEventListener('click', e => {
        switchWeigth = list.querySelectorAll('.products-weight button');
        switchWeigth.forEach( btn => {
            if (e.target === btn) {
                changeWeight(e.target);
            }
        });
    });
}


// function changeWeight() {
//     const list = document.querySelector('.catalog');
//     let switchWeigth;

//     list.addEventListener('click', (e) => {
//         switchWeigth = list.querySelectorAll('.products-weight button');
//         switchWeigth.forEach((btn) => {
//             if (e.target === btn) {
//                 const weight = e.target.parentNode;
//                 const weightUp = weight.querySelector('.products-weight__up');
//                 const weightDown = weight.querySelector('.products-weight__down');
//                 const weightNumber = weight.querySelector('.products-weight__number');
        
//                 weightUp.addEventListener('click', () => {
//                     weightNumber.textContent = Number(weightNumber.textContent) + 5;
//                 }, false);
//                 weightDown.addEventListener('click', () => {
//                     if (Number(weightNumber.textContent) > 5) {
//                         weightNumber.textContent = Number(weightNumber.textContent) - 5;
//                     } 
//                 });

//                 // weigth.forEach( elem => {
//                 //     const weightUp = elem.querySelector('.products-weight__up');
//                 //     const weightDown = elem.querySelector('.products-weight__down');
//                 //     const weightNumber = elem.querySelector('.products-weight__number');
            
//                 //     weightUp.addEventListener('click', () => {
//                 //         weightNumber.textContent = Number(weightNumber.textContent) + 5;
//                 //     }, false);
//                 //     weightDown.addEventListener('click', () => {
//                 //         if (Number(weightNumber.textContent) > 5) {
//                 //             weightNumber.textContent = Number(weightNumber.textContent) - 5;
//                 //         } 
//                 //     });
//                 // });

//             }
//         })
//     });

    
// }

function addProduct() {
    const btnProducts = document.querySelectorAll('.catalog__products-button');
    const basketProducts = document.querySelector('.catalog__aside-products');

    btnProducts.forEach(elem => {
        elem.addEventListener('click', function() {
            const product = elem.parentNode;
            const categoryProduct = product.parentNode.getAttribute('data-category');
            const weight = product.querySelector('.products-weight__number').textContent;
            const nameProduct = product.querySelector('.catalog__products-title').textContent;

            const addedCategory = basketProducts.querySelector(`[data-category="${categoryProduct}"]`)

            addedCategory.style.display = 'list-item';

            const addedProduct = basketProducts.querySelectorAll('.basket-product');

            let k;

            addedProduct.forEach((elem) => {
                if (nameProduct === elem.querySelector('h6').textContent) {
                    let w = elem.querySelector('.products-weight__number').textContent;
                    w = Number(w) + Number(this.parentNode.querySelector('.products-weight__number').textContent);
                    elem.querySelector('.products-weight__number').textContent = w;
                    k = 0; //return не выходит
                } 
            })
            if (k === 0) {
                return; 
            }

            let element = document.createElement('div');
            element.classList.add('basket-product');
            let headingProduct = document.createElement('div');
            headingProduct.classList.add('basket-product__heading');
            let elementTitle = document.createElement('h6');
            elementTitle.textContent = nameProduct;
            let footerProduct = document.querySelector('.products-weight').cloneNode(true);
            footerProduct.querySelector('.products-weight__number').textContent = weight;
            let elementContainer = document.createElement('div');
            elementContainer.classList.add('basket-product__container');
            if (product.getAttribute('data-container') === 'bag') {
                elementContainer.textContent = 'Мешки 25 кг';
            } else if (product.getAttribute('data-container') === 'bucket') {
                elementContainer.textContent = 'Ведра по 1 и 5 кг';
            }
            let elementBtn = document.createElement('div');
            elementBtn.classList.add('basket-product__btn');
            for(let i = 0; i < 3; i++){
                elementBtn.appendChild(document.createElement('span'));
            }
            let elementContent = document.createElement('section');
            elementContent.classList.add('basket-product__btn-content');
            let elementLink = document.createElement('div');
            elementLink.classList.add('basket-product__btn-content_info');
            elementLink.textContent = 'Узнать о продукте';
            let elementDelete = document.createElement('div');
            elementDelete.classList.add('basket-product__btn-content_delete');
            elementDelete.textContent = 'Удалить продукт';
            elementContent.appendChild(elementLink);
            elementContent.appendChild(elementDelete);
            elementBtn.appendChild(elementContent);

            headingProduct.appendChild(elementTitle);
            headingProduct.appendChild(elementContainer);
            headingProduct.appendChild(elementBtn);
            element.appendChild(headingProduct);
            element.appendChild(footerProduct);
            addedCategory.appendChild(element);

            function addBtnArrange() {
                const aside = document.querySelector('.catalog__aside');
                const btnArrange = document.createElement('input');
                btnArrange.classList.add('catalog__aside-arrange');
                btnArrange.setAttribute('type', 'submit');
                btnArrange.setAttribute('value', 'Оформить');
                aside.appendChild(btnArrange);
            }
            
            function menuProduct() {
                const btnMenu = document.querySelectorAll('.basket-product__btn');
                btnMenu.forEach((elem) => {
                    elem.addEventListener('mouseover', function() {
                        this.querySelector('.basket-product__btn-content').style.display = 'block';
                    });
                    elem.addEventListener('mouseout', function() {
                        this.querySelector('.basket-product__btn-content').style.display = '';
                    })
                });
            }

            function deleteProduct() {
                const deleteProduct = document.querySelectorAll('.basket-product');
                const deleteBtn = document.querySelectorAll('.basket-product__btn-content_delete');
                const category = document.querySelectorAll('.catalog__aside-category li');

                function deleteCategory() {
                    category.forEach(elem => {
                        const deleteCategory = elem.querySelector('.basket-product');
                        if (!deleteCategory) {
                            elem.style.display = 'none';
                        }
                    });
                }
                function deleteArrange() {
                    const btn = document.querySelector('.catalog__aside-arrange');
                    btn.remove();
                }

                deleteBtn.forEach((elem, i) => {
                    elem.addEventListener('click', () => {
                        deleteProduct[i].remove();

                        deleteCategory();
                        
                        const el = document.querySelector('.basket-product');
                        if (!el) deleteArrange();
                    });
                }); 
            }
            
            if (!document.querySelector('.catalog__aside-arrange')) {
                addBtnArrange();
            }
            
            menuProduct(); 
            deleteProduct();      
        });
    })
}

function menuProduct() {
    const btnMenu = document.querySelector('.basket-product__btn');
    btnMenu.forEach((elem) => {
        elem.addEventListener('click', ()=> {
            elem.querySelector('.basket-product__btn-content').style.display = 'block';
        });
    });
}

function switchCatalog() {
    const btnForm = document.querySelector('.catalog__content-radio');

    btnForm.addEventListener('click', (e) => {
        const target = e.target;
        const main = 'main-catalog';
        const personal = 'personal-catalog';
        const mainCat = document.querySelector('.catalog__product-catalog[data-catalog="main"]');
        const personalCat = document.querySelector('.catalog__product-catalog[data-catalog="personal"]');

        if (target.getAttribute('data-btn') === 'switch') {
            if (target.id === main) {
                mainCat.style.display = 'block';
                personalCat.style.display = 'none';
            } else if (target.id === personal) {
                personalCat.style.display = 'block';
                mainCat.style.display = 'none';
            }
        }  
    });
}


switchCatalog()
scrollLink();
showInfo();
addProduct();
clickChangeWeight();