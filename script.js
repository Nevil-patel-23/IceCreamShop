document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav ul');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('fa-times');
            this.classList.toggle('fa-bars');
        });
    }

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (window.innerWidth <= 768 && nav) {
                    nav.classList.remove('active');
                    mobileMenuBtn.classList.remove('fa-times');
                    mobileMenuBtn.classList.add('fa-bars');
                }
            }
        });
    });

    // Animate stats when about section comes into view
    function animateValue(id, start, end, duration) {
        const obj = document.getElementById(id);
        if (!obj) return;
        
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            obj.textContent = id === 'happyCustomers' ? value.toLocaleString() : value;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    function isInViewport(element) {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    let statsAnimated = false;
    window.addEventListener('scroll', function() {
        const aboutSection = document.getElementById('about');
        if (isInViewport(aboutSection)) {
            if (!statsAnimated) {
                animateValue('years', 0, 13, 2000);
                animateValue('flavorsCount', 0, 50, 1500);
                animateValue('happyCustomers', 0, 10000, 2500);
                statsAnimated = true;
            }
        }
    });

    // All flavors data
    const allFlavors = {
        classic: [
            {
                name: "Classic Vanilla",
                description: "Creamy Madagascar vanilla bean with rich, smooth texture.",
                price: "₹120",
                image: "./Images/vanilla.jpeg",
                featured: true,
                popular: true
            },
            {
                name: "Rich Chocolate",
                description: "Decadent Belgian chocolate with fudge ribbons.",
                price: "₹150",
                image: "./Images/chocolate.jpeg",
                featured: true,
                popular: true
            },
            {
                name: "Strawberry Swirl",
                description: "Fresh strawberries swirled through creamy vanilla.",
                price: "₹140",
                image: "./Images/strawberry.jpeg"
            },
            {
                name: "Mint Chocolate Chip",
                description: "Cool mint with dark chocolate chunks.",
                price: "₹160",
                image: "./Images/mintchocochip.jpeg",
                featured: true
            },
            {
                name: "Cookies & Cream",
                description: "Vanilla ice cream with Oreo cookie pieces.",
                price: "₹150",
                image: "./Images/cookieandcream.jpeg",
                featured: true,
                popular: true
            },
            {
                name: "Butter Pecan",
                description: "Buttery vanilla with roasted pecans.",
                price: "₹170",
                image: "./Images/butterpecan.jpeg"
            }
        ],
        fruit: [
            {
                name: "Alphonso Mango",
                description: "Seasonal Alphonso mango pulp ice cream.",
                price: "₹130",
                image: "./Images/alphonsomango.jpeg",
                featured: true,
                popular: true
            },
            {
                name: "Mixed Berry",
                description: "Combination of strawberries, blueberries and raspberries.",
                price: "₹140",
                image: "./Images/mixedberries.jpeg"
            },
            {
                name: "Coconut Pineapple",
                description: "Tropical coconut with pineapple chunks.",
                price: "₹150",
                image: "./Images/coconutpineapple.jpeg"
            },
            {
                name: "kiwi Punch",
                description: "Refreshing lemon sorbet, dairy-free.",
                price: "₹120",
                image: "./Images/kiwi.jpeg",
                popular: true
            }
        ],
        specialty: [
            {
                name: "Malai Kulfi",
                description: "Traditional Indian kulfi with cardamom.",
                price: "₹110",
                image: "./Images/malaikulfi.jpeg",
                featured: true
            },
            {
                name: "Salted Caramel",
                description: "Buttery caramel with sea salt crystals.",
                price: "₹170",
                image: "./Images/caramel.jpeg",
                featured: true,
                popular: true
            },
            {
                name: "Pistachio",
                description: "Premium pistachios blended into creamy base.",
                price: "₹180",
                image: "./Images/pistachio.jpeg",
                featured: true
            },
            {
                name: "Coffee Crunch",
                description: "Arabica coffee with toffee chunks.",
                price: "₹160",
                image: "./Images/coffee.jpeg",
                featured: true,
                popular: true
            }
        ]
    };

    // Load featured flavors on homepage
    const flavorGrid = document.getElementById('flavorGrid');
    if (flavorGrid) {
        const featuredFlavors = [...allFlavors.classic, ...allFlavors.fruit, ...allFlavors.specialty]
            .filter(flavor => flavor.featured)
            .slice(0, 6);
        
        featuredFlavors.forEach(flavor => {
            const flavorCard = document.createElement('div');
            flavorCard.className = 'flavor-card';
            
            flavorCard.innerHTML = `
                <div class="flavor-img">
                    <img src="${flavor.image}" alt="${flavor.name}" loading="lazy">
                </div>
                <div class="flavor-info">
                    <h3>${flavor.name}</h3>
                    <p>${flavor.description}</p>
                    <span class="price">${flavor.price}</span>
                </div>
            `;
            
            flavorGrid.appendChild(flavorCard);
        });
    }

    // Load all flavors into menu page
    function loadMenuFlavors() {
        const classicContainer = document.getElementById('classicFlavors');
        const fruitContainer = document.getElementById('fruitFlavors');
        const specialtyContainer = document.getElementById('specialtyFlavors');

        if (!classicContainer || !fruitContainer || !specialtyContainer) return;

        allFlavors.classic.forEach(flavor => {
            classicContainer.appendChild(createFlavorCard(flavor));
        });

        allFlavors.fruit.forEach(flavor => {
            fruitContainer.appendChild(createFlavorCard(flavor));
        });

        allFlavors.specialty.forEach(flavor => {
            specialtyContainer.appendChild(createFlavorCard(flavor));
        });
    }

    function createFlavorCard(flavor) {
        const card = document.createElement('div');
        card.className = 'menu-item';
        
        const popularTag = flavor.popular ? 
            `<span class="popular-tag">Bestseller</span>` : '';
        
        card.innerHTML = `
            <div class="menu-item-img">
                ${popularTag}
                <img src="${flavor.image}" alt="${flavor.name}" loading="lazy">
            </div>
            <div class="menu-item-info">
                <h4>${flavor.name}</h4>
                <p>${flavor.description}</p>
                <span class="price">${flavor.price}</span>
            </div>
        `;
        return card;
    }

    // Initialize menu page
    if (document.querySelector('.full-menu')) {
        loadMenuFlavors();
    }

    // Contact form submission
    const contactForm = document.getElementById('messageForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.className = 'form-success';
            successMsg.innerHTML = `
                <p>Thank you, ${name}! We've received your message.</p>
                <p>We'll contact you at ${email} soon.</p>
            `;
            contactForm.parentNode.insertBefore(successMsg, contactForm.nextSibling);
            contactForm.reset();
            
            // Remove message after 5 seconds
            setTimeout(() => {
                successMsg.remove();
            }, 5000);
        });
    }
});

