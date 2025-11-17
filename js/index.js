<script>
        let currentSlide = 0;
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        const totalSlides = slides.length;
        let autoSlideInterval;

        function showSlide(n) {
            if (n >= totalSlides) currentSlide = 0;
            if (n < 0) currentSlide = totalSlides - 1;
            
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        function nextSlide() {
            currentSlide++;
            showSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide--;
            showSlide(currentSlide);
        }

        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 4000);
        }

        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }

        document.querySelector('.slider-btn.next').addEventListener('click', () => {
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        });

        document.querySelector('.slider-btn.prev').addEventListener('click', () => {
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
                stopAutoSlide();
                startAutoSlide();
            });
        });

        document.querySelector('.slider-container').addEventListener('mouseenter', stopAutoSlide);
        document.querySelector('.slider-container').addEventListener('mouseleave', startAutoSlide);

        startAutoSlide();
    </script>
