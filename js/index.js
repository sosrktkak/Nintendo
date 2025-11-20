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

    // 슬라이더로 스크롤 이동하는 함수
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

    // 게임 아이템 클릭 시 슬라이더 이동 + 스크롤
    gameItems.forEach(function(item, index) {
        item.addEventListener('click', function() {
            if (index < slides.length) {
                showSlide(index);
                scrollToSlider(); // 슬라이더로 스크롤
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
    console.log('푸터 아코디언 초기화 시작');

    const footerColumns = document.querySelectorAll('.footer-menu-column');
    console.log('찾은 푸터 컬럼 개수:', footerColumns.length);

    footerColumns.forEach(function(column, index) {
        const title = column.querySelector('.footer-menu-title');
        console.log(`컬럼 ${index + 1} 제목:`, title);
        
        if (title) {
            title.addEventListener('click', function(e) {
                console.log('클릭 감지! 현재 화면 너비:', window.innerWidth);
                
                if (window.innerWidth <= 480) {
                    const wasActive = column.classList.contains('active');
                    column.classList.toggle('active');
                    
                    console.log('상태 변경:', wasActive ? '열림→닫힘' : '닫힘→열림');
                    console.log('현재 클래스:', column.className);
                } else {
                    console.log('화면이 너무 큼 (480px 초과)');
                }
            });
            
            console.log(`컬럼 ${index + 1} 이벤트 리스너 추가 완료`);
        } else {
            console.log(`컬럼 ${index + 1} 제목 없음!`);
        }
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth > 480) {
            footerColumns.forEach(function(column) {
                column.classList.remove('active');
            });
            console.log('화면 확대: 모든 메뉴 닫힘');
        }
    });

    console.log('푸터 아코디언 초기화 완료');
});