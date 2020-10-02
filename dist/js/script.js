function scrollLink() {
    const catalog = document.querySelectorAll('.catalog__content');
    catalog.forEach((catalogActive) => {
        const catalogHeight = catalogActive.offsetTop;
        console.log(catalogHeight);
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
                const item = catalogActive.querySelector(`.catalog__products-category[data-category="${category}"]`).offsetTop;
                
                catalogActive.scrollTop = item - catalogHeight;
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
            catalogActive.addEventListener('scroll', function() {
                for (let key in categoryScroll) {
                    if (catalogActive.scrollTop <= categoryScroll[key] + 100) {
                        deleteActiveLink();
                        linkCategory[key].classList.add("navigation-category_active");
                        return;
                    }
                }           
            });
        };
    
        activeScroll();
    });
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

    function searchParent(e) {
        e = e.parentNode;
        if (e.getAttribute('data-container')) return e;
        else return searchParent(e);
    }
    function upWeight() {
        weightNumber.textContent = Number(weightNumber.textContent) + weight;
    }
    function downWeight() {
        if (Number(weightNumber.textContent) > 5) {
            weightNumber.textContent = Number(weightNumber.textContent) - weight;
        } 
    }

    let weightContainer = searchParent(elem);
    let weight;
    if (weightContainer.getAttribute('data-container') === 'bag') {
        weight = 25;
    } else if (weightContainer.getAttribute('data-container') === 'bucket') {
        weight = 1;
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
            if (e.target.closest('button') === btn) {
                changeWeight(e.target.closest('button'));
            }
        });
    });
}

function showScrollBar() {
    const aside = document.querySelector('.catalog__aside');
    if (aside.scrollHeight >= aside.offsetHeight) {
        const line = document.createElement('div');
        line.classList.add('scrollBar-line');
        aside.appendChild(line);
    }
}

function addProduct() {
    const btnProducts = document.querySelectorAll('.catalog__products-button');
    const basketProducts = document.querySelector('.catalog__aside-products');

    btnProducts.forEach(elem => {
        elem.addEventListener('click', function() {
            showScrollBar();
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
            
            let footerProduct = document.querySelector('.products-weight').cloneNode(true);
            footerProduct.querySelector('.products-weight__number').textContent = weight;
            let container = {};

            if (product.getAttribute('data-container') === 'bag') {
                container = {
                    string: 'Мешки 25 кг',
                    attribute: 'bag'
                }
            } else if (product.getAttribute('data-container') === 'bucket') {
                container = {
                    string: 'Ведра по 1 и 5 кг',
                    attribute: 'bucket'
                }
            }
            element.setAttribute('data-container', container.attribute);

            const divProduct = `<div class="basket-product__heading">
                                    <h6>${nameProduct}</h6>
                                    <div class="basket-product__right">
                                        <div class="basket-product__container">${container.string}</div>
                                        <div class="basket-product__btn">
                                            <span class="basket-product__btn-item"></span><span class="basket-product__btn-item"></span><span class="basket-product__btn-item"></span>
                                            <div class="basket-product__btn-content">
                                                <div class="basket-product__background">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="193" height="103" viewBox="0 0 193 102.603">
                                                        <defs>
                                                            <filter id="vvt9q0m26a" width="193" height="102.603" x="0" y="0" filterUnits="userSpaceOnUse">
                                                                <feOffset dy="3"/>
                                                                <feGaussianBlur result="blur" stdDeviation="3"/>
                                                                <feFlood flood-opacity=".161"/>
                                                                <feComposite in2="blur" operator="in"/>
                                                                <feComposite in="SourceGraphic"/>
                                                            </filter>
                                                        </defs>
                                                        <g filter="url(#vvt9q0m26a)">
                                                            <path fill="#fff" d="M-4077-2087.4a8 8 0 0 1-8-8v-57a8 8 0 0 1 8-8h148.44l18.56-11.6v76.6a8 8 0 0 1-8 8z" transform="translate(4094 2178)"/>
                                                        </g>
                                                    </svg>
                                                </div>
                                                <div class="basket-product__btn-content_info">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13">
                                                        <path fill="#2ec0d1" d="M0 6.5A6.5 6.5 0 1 1 6.5 13 6.508 6.508 0 0 1 0 6.5zm1.625 0A4.875 4.875 0 1 0 6.5 1.625 4.881 4.881 0 0 0 1.625 6.5zM5.69 8.936v-3.25h1.625v3.25zm0-4.875a.813.813 0 1 1 .812.812.812.812 0 0 1-.814-.812z"/>
                                                    </svg>
                                                    Узнать о продукте
                                                </div>
                                                <span class="basket-product__btn-content_border"></span>
                                                <div class="basket-product__btn-content_delete">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13">
                                                        <path fill="#2ec0d1" d="M8.125 11.916H2.709a1.093 1.093 0 0 1-.779-.324 1.007 1.007 0 0 1-.3-.715l-.5-6h-.047A1.084 1.084 0 0 1 0 3.792V2.709a1.085 1.085 0 0 1 1.083-1.084h1.626v-.542A1.084 1.084 0 0 1 3.792 0h3.25a1.085 1.085 0 0 1 1.083 1.083v.542H9.75a1.085 1.085 0 0 1 1.083 1.084v1.083A1.084 1.084 0 0 1 9.75 4.875h-.043l-.5 5.958a1.084 1.084 0 0 1-1.082 1.083zM2.214 4.875l.495 5.958h5.416v-.045l.492-5.913zM1.083 2.709v1.083H9.75V2.709H1.083zm2.709-1.626v.542h3.25v-.542z" transform="translate(1.083 .542)"/>
                                                    </svg>
                                                    Удалить продукт
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="products-weight">
                                    ${footerProduct.innerHTML}
                                </div>`;

            element.innerHTML = divProduct;
            addedCategory.appendChild(element);

            function addBtnArrange() {
                const aside = document.querySelector('.catalog__aside');
                const formArrange = document.createElement('form');
                formArrange.setAttribute('action', '#');
                let btn = `<input class="catalog__aside-arrange" type="submit" value="Оформить">`;
                formArrange.innerHTML = btn;
                aside.appendChild(formArrange);
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
            
            deleteProduct();      
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