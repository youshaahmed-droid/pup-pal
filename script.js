        // Countdown Timer
        function startCountdown() {
            const countdownElement = document.getElementById('countdown');
            let time = 172799; // 48 hours in seconds
            
            setInterval(() => {
                const hours = Math.floor(time / 3600);
                const minutes = Math.floor((time % 3600) / 60);
                const seconds = time % 60;
                
                countdownElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                
                if (time > 0) time--;
            }, 1000);
        }
        
        // Breed Calculator
        document.getElementById('fitnessCalculator').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const breed = document.getElementById('breed').value;
            const weight = document.getElementById('weight').value;
            const age = document.getElementById('age').value;
            
            if (breed && weight && age) {
                // Calculate based on breed and weight
                let baseSteps = 10000;
                let baseMinutes = 60;
                let baseCalories = 300;
                
                // Adjust based on breed
                if (breed === 'bulldog' || breed === 'dachshund') {
                    baseSteps *= 0.7;
                    baseMinutes *= 0.7;
                } else if (breed === 'labrador' || breed === 'german-shepherd') {
                    baseSteps *= 1.2;
                    baseMinutes *= 1.2;
                }
                
                // Adjust based on age
                if (age === 'puppy') {
                    baseSteps *= 0.8;
                    baseMinutes *= 1.2;
                } else if (age === 'senior') {
                    baseSteps *= 0.6;
                    baseMinutes *= 0.6;
                }
                
                // Adjust calories based on weight
                baseCalories = Math.round(weight * 25);
                
                document.getElementById('steps').textContent = Math.round(baseSteps).toLocaleString();
                document.getElementById('activeMinutes').textContent = Math.round(baseMinutes);
                document.getElementById('calories').textContent = Math.round(baseCalories);
                
                document.getElementById('results').classList.remove('hidden');
            }
        });
        
        // FAQ Accordion
        function toggleFAQ(index) {
            const content = document.querySelectorAll('.accordion-content')[index];
            const icon = document.querySelectorAll('.faq-button svg')[index];
            
            content.classList.toggle('active');
            icon.classList.toggle('rotate-180');
        }
        
        // Fade in animation on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
        
        // Sticky Buy Button
        window.addEventListener('scroll', function() {
            const stickyButton = document.querySelector('.sticky-buy');
            if (window.scrollY > 600) {
                stickyButton.style.display = 'block';
            } else {
                stickyButton.style.display = 'none';
            }
        });
        
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Initialize countdown on page load
        startCountdown();