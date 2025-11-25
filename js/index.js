// 통합 스크립트
document.addEventListener('DOMContentLoaded', function() {
    // ========== 슬라이더 기능 ==========
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    const gameItems = document.querySelectorAll('.game-item');
    
    let currentSlide = 0;
    let autoSlideInterval;

    function showSlide(index) {
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        if (slides[currentSlide]) slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    function scrollToSlider() {
        const sliderContainer = document.querySelector('.slider-container');
        if (sliderContainer) {
            sliderContainer.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        });
    }

    dots.forEach(function(dot, index) {
        dot.addEventListener('click', function() {
            showSlide(index);
            stopAutoSlide();
            startAutoSlide();
        });
    });

    gameItems.forEach(function(item, index) {
        item.addEventListener('click', function() {
            if (index < slides.length) {
                showSlide(index);
                scrollToSlider();
                stopAutoSlide();
                startAutoSlide();
            }
        });
    });

    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopAutoSlide);
        sliderContainer.addEventListener('mouseleave', startAutoSlide);
    }

    if (slides.length > 0) {
        showSlide(0);
        startAutoSlide();
    }

    // ========== 맨 위로 버튼 ==========
    const scrollTopBtn = document.querySelector('.scroll-top-button');
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ========== 푸터 아코디언 ==========
    const footerColumns = document.querySelectorAll('.footer-menu-column');

    footerColumns.forEach(function(column) {
        const title = column.querySelector('.footer-menu-title');
        
        if (title) {
            title.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                if (window.innerWidth <= 768) {
                    footerColumns.forEach(function(otherColumn) {
                        if (otherColumn !== column) {
                            otherColumn.classList.remove('active');
                        }
                    });
                    
                    column.classList.toggle('active');
                }
            });
        }
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            footerColumns.forEach(function(column) {
                column.classList.remove('active');
            });
        }
    });

});  