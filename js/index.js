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
        gameItems.forEach(item => item.classList.remove('active'));

        if (slides[currentSlide]) slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) dots[currentSlide].classList.add('active');
        if (gameItems[currentSlide]) {
            gameItems[currentSlide].classList.add('active');
        }
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
            const rect = sliderContainer.getBoundingClientRect();
            const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
            
            if (!isVisible) {
                sliderContainer.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
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
        item.addEventListener('mouseenter', function() {
            if (index < slides.length) {
                showSlide(index);
                stopAutoSlide();
            }
        });
        
        item.addEventListener('mouseleave', function() {
            startAutoSlide();
        });
        
        item.addEventListener('click', function() {
            if (index < slides.length) {
                scrollToSlider();
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

    // ========== 맨 위로 버튼만 제외하고 # 링크 기본 동작 막기 ==========
    document.querySelectorAll('a[href="#"]').forEach(function(link) {
        // 맨 위로 버튼이 아닌 경우만 기본 동작 막기
        if (!link.closest('.scroll-top-button')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
            });
        }
    });

    // ========== 맨 위로 버튼 ==========
    const scrollTopBtn = document.querySelector('.scroll-top-button');
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ 
                top: 0, 
                behavior: 'smooth' 
            });
        });
    }

    // ========== 푸터 아코디언 (767px 이하에서만) ==========
    const footerColumns = document.querySelectorAll('.footer-menu-column');

    footerColumns.forEach(function(column) {
        const title = column.querySelector('.footer-menu-title');
        
        if (title) {
            title.addEventListener('click', function(e) {
                // 767px 이하에서만 작동
                if (window.innerWidth <= 767) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // 현재 컬럼 토글
                    column.classList.toggle('active');
                }
            });
        }
    });

    // 화면 크기 변경 시 767px 초과하면 모든 아코디언 닫기
    window.addEventListener('resize', function() {
        if (window.innerWidth > 767) {
            footerColumns.forEach(function(column) {
                column.classList.remove('active');
            });
        }
    });

});