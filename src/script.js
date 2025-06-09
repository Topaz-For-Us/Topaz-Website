// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.querySelector('.navbar');
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.9)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    });
    
    // Smooth scrolling for navigation links (exclude legal modal links)
    document.querySelectorAll('a[href^="#"]:not(#privacyPolicyLink):not(#termsOfServiceLink)').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Initialize tokenomics chart
    initTokenomicsChart();
    
    // Add scroll animations
    observeElements();
    
    // Add button click effects
    addButtonEffects();
    
    // Initialize Buy Topaz modal
    initBuyModal();
});

// Tokenomics Chart
function initTokenomicsChart() {
    const ctx = document.getElementById('tokenomicsChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Public Sale', 'Development', 'Marketing', 'Team', 'Reserve'],
            datasets: [{
                data: [50, 20, 10, 10, 10],
                backgroundColor: [
                    '#DB1A50',
                    '#FF6B9D',
                    '#FFB5C5',
                    '#E8E8E8',
                    '#F5F5F5'
                ],
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(31, 31, 31, 0.9)',
                    titleColor: '#FFFFFF',
                    bodyColor: '#FFFFFF',
                    borderColor: '#DB1A50',
                    borderWidth: 1,
                    cornerRadius: 8,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });
}

// Scroll animations
function observeElements() {
    const animatedElements = document.querySelectorAll('.feature-card, .community-card, .feature-item, .tech-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Button click effects
function addButtonEffects() {
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Utility functions
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn-primary .ripple {
        background: rgba(255, 255, 255, 0.3);
    }
    
    .btn-secondary .ripple {
        background: rgba(219, 26, 80, 0.3);
    }
    
    .btn-outline .ripple {
        background: rgba(219, 26, 80, 0.2);
    }
`;
document.head.appendChild(style);

// Counter animation for hero stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        const numericValue = parseFloat(target.replace(/[^0-9.]/g, ''));
        const suffix = target.replace(/[0-9.]/g, '');
        
        let current = 0;
        const increment = numericValue / 100;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
                current = numericValue;
                clearInterval(timer);
            }
            
            if (suffix.includes('M')) {
                counter.textContent = '$' + current.toFixed(1) + 'M';
            } else if (suffix.includes('K')) {
                counter.textContent = Math.floor(current).toLocaleString() + 'K+';
            } else if (suffix.includes('ms')) {
                counter.textContent = Math.floor(current) + 'ms';
            }
        }, 20);
    });
}

// Trigger counter animation when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// Parallax effect for floating elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-element');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.2);
        const yPos = -(scrolled * speed);
        element.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add CSS for loading animation
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    .hero-title,
    .hero-description,
    .hero-buttons {
        transform: translateY(30px);
        opacity: 0;
        animation: slideInUp 0.8s ease forwards;
    }
    
    .hero-description {
        animation-delay: 0.2s;
    }
    
    .hero-buttons {
        animation-delay: 0.4s;
    }
    
    @keyframes slideInUp {
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(loadingStyle);

// Buy Topaz Modal functionality
function initBuyModal() {
    // Create modal HTML
    const modalHTML = `
        <div id="buyModal" class="buy-modal">
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Buy Topaz</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="wallet-options">
                        <button class="wallet-option" data-wallet="pump" data-url="https://pump.fun/coin/82YJmgGX88nBoT1nMqFzq5mC7zRmNk2p1xxvz8V7pump">
                            <div class="wallet-icon">
                                <i class="fas fa-capsules"></i>
                            </div>
                            <span>Pump.fun</span>
                        </button>
                        <button class="wallet-option" data-wallet="phantom" data-url="https://phantom.com/tokens/solana/82YJmgGX88nBoT1nMqFzq5mC7zRmNk2p1xxvz8V7pump?referralId=8wz1mmetwle">
                            <div class="wallet-icon">
                                <i class="fas fa-ghost"></i>
                            </div>
                            <span>Phantom</span>
                        </button>
                        <button class="wallet-option" data-wallet="bitget" data-url="
https://web3.bitget.com/id/swap/sol/82YJmgGX88nBoT1nMqFzq5mC7zRmNk2p1xxvz8V7pump?isShowHint=false&utm_source=KLineShare&inviteCode=YrcFnU">
                            <div class="wallet-icon">
                                <i class="fas fa-angle-right"></i>
                            </div>
                            <span>Bitget Wallet</span>
                        </button>
                    </div>
                    <div class="modal-divider">
                        <span>OR</span>
                    </div>
                    <div class="contract-section">
                        <label class="contract-label">Contract Address</label>
                        <p class="contract-caption">Copy this address to your DEX or Wallet</p>
                        <div class="contract-address" id="contractAddress">
                            <span class="contract-text">82YJmgGX88nBoT1nMqFzq5mC7zRmNk2p1xxvz8V7pump</span>
                            <button class="copy-btn" id="copyContract">
                                <i class="fas fa-copy"></i>
                            </button>
                        </div>
                        <div class="copy-feedback" id="copyFeedback">Copied to clipboard!</div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Get modal elements
    const modal = document.getElementById('buyModal');
    const modalOverlay = modal.querySelector('.modal-overlay');
    const modalClose = modal.querySelector('.modal-close');
    const copyBtn = document.getElementById('copyContract');
    const copyFeedback = document.getElementById('copyFeedback');
    
    // Add event listeners to Buy Topaz buttons
    document.querySelectorAll('.btn-primary').forEach(btn => {
        if (btn.textContent.includes('Buy Topaz') || btn.textContent.includes('Get Started')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }
    });
    
    // Close modal functionality
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    modalOverlay.addEventListener('click', closeModal);
    modalClose.addEventListener('click', closeModal);
    
    // Add click handlers for wallet buttons
    modal.querySelectorAll('.wallet-option').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const url = btn.getAttribute('data-url');
            if (url) {
                window.open(url, '_blank');
            }
        });
    });
    
    // Copy contract address
    copyBtn.addEventListener('click', async () => {
        const contractText = '82YJmgGX88nBoT1nMqFzq5mC7zRmNk2p1xxvz8V7pump';
        
        try {
            await navigator.clipboard.writeText(contractText);
            copyFeedback.classList.add('show');
            copyBtn.innerHTML = '<i class="fas fa-check"></i>';
            
            setTimeout(() => {
                copyFeedback.classList.remove('show');
                copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
            }, 2000);
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = contractText;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            copyFeedback.classList.add('show');
            copyBtn.innerHTML = '<i class="fas fa-check"></i>';
            
            setTimeout(() => {
                copyFeedback.classList.remove('show');
                copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
            }, 2000);
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Add modal styles
const modalStyles = document.createElement('style');
modalStyles.textContent = `
    .buy-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }
    
    .buy-modal.active {
        opacity: 1;
        visibility: visible;
    }
    
    .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(5px);
    }
    
    .modal-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.9);
        background: white;
        border-radius: 1rem;
        width: 90%;
        max-width: 500px;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        transition: all 0.3s ease;
    }
    
    .buy-modal.active .modal-content {
        transform: translate(-50%, -50%) scale(1);
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem 2rem 1rem;
        border-bottom: 1px solid #E5E7EB;
    }
    
    .modal-header h3 {
        margin: 0;
        color: #1F1F1F;
        font-size: 1.5rem;
        font-weight: 600;
    }
    
    .modal-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        color: #6B727E;
        cursor: pointer;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.2s ease;
    }
    
    .modal-close:hover {
        background: #F3F4F6;
        color: #1F1F1F;
    }
    
    .modal-body {
        padding: 1.5rem 2rem 2rem;
    }
    
    .wallet-options {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        margin-bottom: 2rem;
    }
    
    .wallet-option {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem 1.5rem;
        background: #F9FAFB;
        border: 2px solid #E5E7EB;
        border-radius: 0.75rem;
        text-decoration: none;
        color: #1F1F1F;
        font-weight: 500;
        transition: all 0.2s ease;
        cursor: pointer;
        width: 100%;
        text-align: left;
        font-family: inherit;
        font-size: inherit;
    }
    
    .wallet-option:hover {
        border-color: #DB1A50;
        background: #FFF5F8;
        transform: translateY(-2px);
    }
    
    .wallet-icon {
        width: 40px;
        height: 40px;
        background: linear-gradient(135deg, #DB1A50, #FF6B9D);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1.25rem;
    }
    
    .modal-divider {
        text-align: center;
        margin: 2rem 0;
        position: relative;
    }
    
    .modal-divider span {
        color: #6B727E;
        font-size: 0.875rem;
        font-weight: 500;
        letter-spacing: 0.5px;
    }
    
    .contract-section {
        text-align: center;
    }
    
    .contract-label {
        display: block;
        font-weight: 600;
        color: #1F1F1F;
        margin-bottom: 0.5rem;
        font-size: 1rem;
    }
    
    .contract-caption {
        color: #6B727E;
        font-size: 0.875rem;
        margin-bottom: 1rem;
    }
    
    .contract-address {
        display: flex;
        align-items: center;
        background: #F9FAFB;
        border: 2px solid #E5E7EB;
        border-radius: 0.75rem;
        padding: 1rem;
        margin-bottom: 1rem;
        gap: 1rem;
    }
    
    .contract-text {
        flex: 1;
        font-family: 'Courier New', monospace;
        font-size: 0.875rem;
        color: #1F1F1F;
        word-break: break-all;
        text-align: left;
    }
    
    .copy-btn {
        background: linear-gradient(135deg, #DB1A50, #FF6B9D);
        border: none;
        border-radius: 0.5rem;
        color: white;
        padding: 0.75rem;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        flex-shrink: 0;
    }
    
    .copy-btn:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(219, 26, 80, 0.3);
    }
    
    .copy-feedback {
        color: #059669;
        font-size: 0.875rem;
        font-weight: 500;
        opacity: 0;
        transform: translateY(10px);
        transition: all 0.3s ease;
    }
    
    .copy-feedback.show {
        opacity: 1;
        transform: translateY(0);
    }
    
    @media (max-width: 640px) {
        .modal-content {
            width: 95%;
            margin: 1rem;
        }
        
        .modal-header,
        .modal-body {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
        }
        
        .contract-text {
            font-size: 0.75rem;
        }
        
        .wallet-option {
            padding: 0.75rem 1rem;
        }
        
        .wallet-icon {
            width: 35px;
            height: 35px;
            font-size: 1rem;
        }
    }
`;
document.head.appendChild(modalStyles);

// Legal Content Data
const legalContent = {
    privacy: {
        title: 'Privacy Policy',
        sections: [
            {
                title: '1. Information We Collect',
                content: 'When you use Topaz services, we may collect certain information to provide you with the best possible experience. This includes:',
                list: [
                    'Wallet addresses and transaction data on the Solana blockchain',
                    'Technical information such as IP addresses, browser type, and device information',
                    'Usage data to improve our services and user experience',
                    'Communication data when you contact our support team'
                ]
            },
            {
                title: '2. How We Use Your Information',
                content: 'We use the collected information for the following purposes:',
                list: [
                    'To provide and maintain our cryptocurrency services',
                    'To process transactions and maintain blockchain records',
                    'To improve our website, services, and user experience',
                    'To communicate with you about updates, security alerts, and support',
                    'To comply with legal obligations and prevent fraudulent activities'
                ]
            },
            {
                title: '3. Information Sharing and Disclosure',
                content: 'We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:',
                list: [
                    'With your explicit consent',
                    'To comply with legal requirements or court orders',
                    'To protect our rights, property, or safety, or that of our users',
                    'In connection with a merger, acquisition, or sale of assets'
                ]
            },
            {
                title: '4. Data Security',
                content: 'We implement appropriate security measures to protect your information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.'
            },
            {
                title: '5. Blockchain Transparency',
                content: 'Please note that transactions on the Solana blockchain are public and immutable. While we don\'t link wallet addresses to personal identities, blockchain transactions are permanently recorded and publicly viewable.'
            },
            {
                title: '6. Your Rights',
                content: 'Depending on your jurisdiction, you may have the right to:',
                list: [
                    'Access the personal information we hold about you',
                    'Request correction of inaccurate or incomplete information',
                    'Request deletion of your personal information',
                    'Object to or restrict processing of your information'
                ]
            },
            {
                title: '7. Cookies and Tracking',
                content: 'We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and understand user preferences. You can control cookie settings through your browser preferences.'
            },
            {
                title: '8. International Data Transfers',
                content: 'Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your information in accordance with applicable data protection laws.'
            },
            {
                title: '9. Changes to This Privacy Policy',
                content: 'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.'
            },
            {
                title: '10. Contact Us',
                content: 'If you have any questions about this Privacy Policy or our data practices, please contact us through our official channels listed on our website.'
            }
        ]
    },
    terms: {
        title: 'Terms of Service',
        sections: [
            {
                title: '1. Acceptance of Terms',
                content: 'By accessing or using Topaz services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our services.'
            },
            {
                title: '2. Description of Service',
                content: 'Topaz is a meme cryptocurrency built on the Solana blockchain. Our services include:',
                list: [
                    'Information about the Topaz token and its ecosystem',
                    'Community platforms for discussion and engagement',
                    'Educational resources about blockchain and cryptocurrency',
                    'Tools and interfaces for interacting with the Topaz ecosystem'
                ]
            },
            {
                title: '3. Eligibility',
                content: 'To use our services, you must:',
                list: [
                    'Be at least 18 years old or the age of majority in your jurisdiction',
                    'Have the legal capacity to enter into binding agreements',
                    'Not be prohibited from using our services under applicable laws',
                    'Comply with all local laws regarding cryptocurrency usage'
                ]
            },
            {
                title: '4. Risk Disclosure',
                content: '<strong>Important:</strong> Cryptocurrency investments carry significant risks:',
                list: [
                    'Digital assets are highly volatile and speculative',
                    'You may lose part or all of your investment',
                    'Regulatory changes may affect the value and legality of tokens',
                    'Technical risks including smart contract vulnerabilities',
                    'Market manipulation and liquidity risks'
                ]
            },
            {
                title: '5. User Responsibilities',
                content: 'You are responsible for:',
                list: [
                    'Maintaining the security of your wallet and private keys',
                    'Conducting your own research before making investment decisions',
                    'Complying with all applicable laws and regulations',
                    'Understanding the risks associated with cryptocurrency',
                    'Reporting any security vulnerabilities or suspicious activities'
                ]
            },
            {
                title: '6. Prohibited Activities',
                content: 'You may not use our services to:',
                list: [
                    'Engage in illegal activities or money laundering',
                    'Manipulate markets or engage in fraudulent behavior',
                    'Violate intellectual property rights',
                    'Spam, harass, or abuse other users',
                    'Attempt to hack or compromise our systems'
                ]
            },
            {
                title: '7. Intellectual Property',
                content: 'All content, trademarks, and intellectual property related to Topaz are owned by the project team. You may not use our branding, logos, or content without explicit permission.'
            },
            {
                title: '8. Disclaimer of Warranties',
                content: 'Our services are provided "as is" without warranties of any kind. We do not guarantee:',
                list: [
                    'Uninterrupted or error-free service',
                    'The accuracy of information provided',
                    'The security of transactions or systems',
                    'Future performance or value of tokens'
                ]
            },
            {
                title: '9. Limitation of Liability',
                content: 'To the maximum extent permitted by law, Topaz and its team members shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from your use of our services.'
            },
            {
                title: '10. Indemnification',
                content: 'You agree to indemnify and hold harmless Topaz, its team members, and affiliates from any claims, damages, or expenses arising from your use of our services or violation of these terms.'
            },
            {
                title: '11. Governing Law',
                content: 'These terms shall be governed by and construed in accordance with applicable laws. Any disputes shall be resolved through binding arbitration.'
            },
            {
                title: '12. Changes to Terms',
                content: 'We reserve the right to modify these Terms of Service at any time. Continued use of our services after changes constitutes acceptance of the new terms.'
            },
            {
                title: '13. Contact Information',
                content: 'For questions about these Terms of Service, please contact us through our official communication channels listed on our website.'
            }
        ]
    }
};

// Legal Modals functionality
function initLegalModals() {
    const privacyLink = document.getElementById('pp');
    const termsLink = document.getElementById('tos');
    
    // Create modal HTML structure
    function createModal(id, data) {
        const modal = document.createElement('div');
        modal.id = id;
        modal.className = 'legal-modal';
        modal.style.display = 'none';
        
        let sectionsHTML = '';
        data.sections.forEach(section => {
            sectionsHTML += `<h3>${section.title}</h3>`;
            sectionsHTML += `<p>${section.content}</p>`;
            if (section.list) {
                sectionsHTML += '<ul>';
                section.list.forEach(item => {
                    sectionsHTML += `<li>${item}</li>`;
                });
                sectionsHTML += '</ul>';
            }
        });
        
        modal.innerHTML = `
            <div class="legal-modal-overlay"></div>
            <div class="legal-modal-content">
                <div class="legal-modal-header">
                    <h2>${data.title}</h2>
                    <button class="legal-modal-close">&times;</button>
                </div>
                <div class="legal-modal-body">
                    <div class="legal-content">
                        ${sectionsHTML}
                        <p class="last-updated"><strong>Last Updated:</strong> June 9, 2025</p>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        return modal;
    }
    
    // Function to open modal
    function openModal(modal) {
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        document.body.style.overflow = 'hidden';
    }

    // Function to close modal
    function closeModal(modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }
    
    // Create modals
    const privacyModal = createModal('privacyModal', legalContent.privacy);
    const termsModal = createModal('termsModal', legalContent.terms);
    
    // Setup event listeners
    function setupModalEvents(modal) {
        const overlay = modal.querySelector('.legal-modal-overlay');
        const closeBtn = modal.querySelector('.legal-modal-close');
        
        overlay.addEventListener('click', () => closeModal(modal));
        closeBtn.addEventListener('click', () => closeModal(modal));
    }
    
    setupModalEvents(privacyModal);
    setupModalEvents(termsModal);
    
    // Link event listeners
    if (privacyLink) {
        privacyLink.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            openModal(privacyModal);
        });
    }
    
    if (termsLink) {
        termsLink.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            openModal(termsModal);
        });
    }
    
    // Escape key handler
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (privacyModal.classList.contains('active')) {
                closeModal(privacyModal);
            }
            if (termsModal.classList.contains('active')) {
                closeModal(termsModal);
            }
        }
    });
}

// Initialize legal modals - single initialization
let legalModalsInitialized = false;

function ensureLegalModalsInit() {
    if (!legalModalsInitialized) {
        initLegalModals();
        legalModalsInitialized = true;
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensureLegalModalsInit);
} else {
    ensureLegalModalsInit();
}

// Coming Soon functionality for footer links
function initComingSoonPopups() {
    // Select all footer links that should show "Coming Soon" (exclude social links and legal links)
    const footerLinks = document.querySelectorAll('.footer-links a');
    
    footerLinks.forEach(link => {
        // Skip if it's already handled (has href="#" or is a specific link we want to keep)
        if (link.getAttribute('href') === '#' || 
            link.id === 'pp' || 
            link.id === 'tos' ||
            link.href.includes('http') || 
            link.href.includes('mailto:')) {
            return;
        }
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showComingSoonPopup();
        });
    });
}

function showComingSoonPopup() {
    // Create popup HTML
    const popup = document.createElement('div');
    popup.className = 'coming-soon-popup';
    popup.innerHTML = `
        <div class="coming-soon-overlay"></div>
        <div class="coming-soon-content">
            <div class="coming-soon-icon">
                <i class="fas fa-rocket"></i>
            </div>
            <h3>Coming Soon!</h3>
            <p>This feature is currently under development. Stay tuned for updates!</p>
            <button class="btn btn-primary coming-soon-close">Got it!</button>
        </div>
    `;
    
    document.body.appendChild(popup);
    
    // Show popup with animation
    setTimeout(() => {
        popup.classList.add('active');
    }, 10);
    
    // Close popup functionality
    const closeBtn = popup.querySelector('.coming-soon-close');
    const overlay = popup.querySelector('.coming-soon-overlay');
    
    function closePopup() {
        popup.classList.remove('active');
        setTimeout(() => {
            popup.remove();
        }, 300);
    }
    
    closeBtn.addEventListener('click', closePopup);
    overlay.addEventListener('click', closePopup);
    
    // Close with Escape key
    const escapeHandler = (e) => {
        if (e.key === 'Escape') {
            closePopup();
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
}

// Initialize coming soon popups after DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initComingSoonPopups);
} else {
    initComingSoonPopups();
}

/* Cache bust: Mon Jun  9 03:46:46 AM UTC 2025 */
/* Cache bust: Mon Jun  9 04:09:13 AM UTC 2025 */
/* Cache bust: Mon Jun  9 04:09:13 AM UTC 2025 */
/* Cache bust: Mon Jun  9 04:09:14 AM UTC 2025 */
/* Cache bust: Mon Jun  9 04:09:15 AM UTC 2025 */
/* Cache bust: Mon Jun  9 04:09:15 AM UTC 2025 */
/* Cache bust: Mon Jun  9 04:09:21 AM UTC 2025 */
/* Cache bust: Mon Jun  9 04:09:21 AM UTC 2025 */
/* Cache bust: Mon Jun  9 04:09:22 AM UTC 2025 */
/* Cache bust: Mon Jun  9 04:09:22 AM UTC 2025 */
/* Cache bust: Mon Jun  9 04:09:22 AM UTC 2025 */
/* Cache bust: Mon Jun  9 04:09:22 AM UTC 2025 */
/* Cache bust: Mon Jun  9 04:09:25 AM UTC 2025 */
/* Cache bust: Mon Jun  9 04:09:35 AM UTC 2025 */
/* Cache bust: Mon Jun  9 04:09:36 AM UTC 2025 */
