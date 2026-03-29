// 🚀 PREMIUM WEBSITE FUNCTIONALITY
document.addEventListener('DOMContentLoaded', function() {
    
    // 🎯 MOBILE MENU TOGGLE
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // 📱 HEADER SCROLL EFFECT
    let lastScroll = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(20px)';
        } else if (currentScroll > lastScroll && !header.classList.contains('hide')) {
            header.classList.add('hide');
        } else {
            header.classList.remove('hide');
            header.style.background = 'rgba(255, 255, 255, 1)';
        }
        
        lastScroll = currentScroll;
    });

    // 🔥 CAR DATA & FILTERING
    const carsData = [
        {
            id: 1,
            name: "Lamborghini Huracan STO",
            price: "$324,000",
            category: "sports",
            image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            badge: "New"
        },
        {
            id: 2,
            name: "Porsche 911 Turbo S",
            price: "$218,000",
            category: "sports",
            image: "https://images.unsplash.com/photo-1558618047-3c8c76fdd7f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            badge: "Demo"
        },
        {
            id: 3,
            name: "Mercedes G63 AMG",
            price: "$189,000",
            category: "suv",
            image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            badge: "New"
        },
        {
            id: 4,
            name: "BMW M8 Competition",
            price: "$145,000",
            category: "sedan",
            image: "https://images.unsplash.com/photo-1583121274601-c59d515b8869?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            badge: "Low Mileage"
        },
        {
            id: 5,
            name: "Range Rover SV",
            price: "$235,000",
            category: "suv",
            image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            badge: "New"
        },
        {
            id: 6,
            name: "Audi RS7 Performance",
            price: "$128,000",
            category: "sedan",
            image: "https://images.unsplash.com/photo-1571171638497-3323f4e485c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            badge: "Certified"
        },
        {
            id: 7,
            name: "Ferrari SF90 Stradale",
            price: "$525,000",
            category: "sports",
            image: "https://images.unsplash.com/photo-1584667879649-5a0b0c68be71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            badge: "Limited"
        },
        {
            id: 8,
            name: "Rolls-Royce Ghost",
            price: "$375,000",
            category: "sedan",
            image: "https://images.unsplash.com/photo-1606890658317-7d14490b76fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            badge: "New"
        }
    ];

    // Initialize cars grid
    const carsGrid = document.getElementById('carsGrid');
    let allCars = [...carsData];

    function renderCars(cars) {
        carsGrid.innerHTML = cars.map(car => `
            <div class="car-card" data-category="${car.category}">
                <div class="car-image">
                    <img src="${car.image}" alt="${car.name}" loading="lazy">
                    ${car.badge ? `<div class="car-badge">${car.badge}</div>` : ''}
                </div>
                <div class="car-info">
                    <h3 class="car-name">${car.name}</h3>
                    <div class="car-price">${car.price}</div>
                    <button class="btn car-cta">
                        <i class="fas fa-eye"></i>
                        View Details
                    </button>
                </div>
            </div>
        `).join('');
        
        // Animate cards
        setTimeout(() => {
            document.querySelectorAll('.car-card').forEach((card, index) => {
                card.style.transitionDelay = `${index * 0.1}s`;
                card.classList.add('animate');
            });
        }, 100);
    }

    // Filter functionality
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active filter
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            if (filter === 'all') {
                renderCars(allCars);
            } else {
                const filteredCars = allCars.filter(car => car.category === filter);
                renderCars(filteredCars);
            }
        });
    });

    // Initial render
    renderCars(allCars);

    // 🎨 INTERSECTION OBSERVER FOR ANIMATIONS
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(section);
    });

    // 🌟 HERO SLIDER AUTO-PLAY
    const heroImages = document.querySelectorAll('.hero-slider img');
    let currentHeroImage = 0;

    function nextHeroImage() {
        heroImages[currentHeroImage].style.opacity = '0';
        currentHeroImage = (currentHeroImage + 1) % heroImages.length;
        heroImages[currentHeroImage].style.opacity = '1';
    }

    // Auto-play hero images
    setInterval(nextHeroImage, 5000);

    // 💌 CONTACT FORM
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('.btn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('🎉 Thank you! Your message has been sent. We\'ll contact you within 24 hours.');
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });

    // 🎯 SMOOTH SCROLLING FOR NAV LINKS
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

    // ✨ CAR CARD INTERACTIONS
    carsGrid.addEventListener('click', (e) => {
        if (e.target.closest('.car-cta')) {
            const carCard = e.target.closest('.car-card');
            const carName = carCard.querySelector('.car-name').textContent;
            
            // Simulate modal or detail view
            showNotification(`Viewing details for ${carName}`);
        }
    });

    // 📱 MOBILE OPTIMIZATIONS
    function handleMobile() {
        if (window.innerWidth <= 768) {
            // Touch-friendly enhancements
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.style.padding = '1.2rem 1.8rem';
            });
        }
    }

    window.addEventListener('resize', handleMobile);
    handleMobile();

    // 🔔 NOTIFICATION SYSTEM
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 1rem 2rem;
            border-radius: 12px;
            box-shadow: 0 20px 40px rgba(102, 126, 234, 0.4);
            z-index: 10000;
            transform: translateX(400px);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            font-weight: 500;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 400);
        }, 3000);
    }

    // 🚀 PERFORMANCE OPTIMIZATION
    if ('IntersectionObserver' in window) {
        // Lazy load images
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img').forEach(img => {
            if (img.dataset.src) {
                imageObserver.observe(img);
            }
        });
    }

    // 🎵 SCROLL INDICATOR
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        // Update progress bar if exists
        const progressBar = document.querySelector('.scroll-progress');
        if (progressBar) {
            progressBar.style.width = scrollPercent + '%';
        }
    });

    console.log('🚀 Velocity Motors - Premium Car Website Loaded Successfully!');
    console.log('📱 Fully Responsive | 🔥 Smooth Animations | ⚡ Fast Performance');
});