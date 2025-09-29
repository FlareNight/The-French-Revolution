// Quiz Data
const quizData = [
    {
        id: 1,
        question: "In what year did the French Revolution begin?",
        options: ["1787", "1789", "1791", "1792"],
        correct: 1,
        explanation: "The French Revolution began in 1789 with the convening of the Estates-General on May 5th.",
        difficulty: "easy"
    },
    {
        id: 2,
        question: "What event is considered the symbolic beginning of the French Revolution?",
        options: ["Tennis Court Oath", "Storming of the Bastille", "Execution of Louis XVI", "Declaration of Rights"],
        correct: 1,
        explanation: "The Storming of the Bastille on July 14, 1789, is widely considered the symbolic beginning of the French Revolution.",
        difficulty: "easy"
    },
    {
        id: 3,
        question: "Who was known as the 'Incorruptible' during the Revolution?",
        options: ["Georges Danton", "Jean-Paul Marat", "Maximilien Robespierre", "Jacques Necker"],
        correct: 2,
        explanation: "Maximilien Robespierre was nicknamed 'The Incorruptible' due to his moral righteousness and dedication to revolutionary ideals.",
        difficulty: "medium"
    },
    {
        id: 4,
        question: "What was the Third Estate?",
        options: ["Nobility", "Clergy", "Common people", "Military"],
        correct: 2,
        explanation: "The Third Estate represented the common people of France, making up about 98% of the population but having little political power.",
        difficulty: "easy"
    },
    {
        id: 5,
        question: "When was Louis XVI executed?",
        options: ["January 21, 1793", "July 14, 1789", "September 22, 1792", "August 26, 1789"],
        correct: 0,
        explanation: "King Louis XVI was executed by guillotine on January 21, 1793, marking the definitive end of the monarchy.",
        difficulty: "medium"
    },
    {
        id: 6,
        question: "What document declared the fundamental rights of French citizens?",
        options: ["Tennis Court Oath", "Declaration of the Rights of Man and Citizen", "Civil Constitution of the Clergy", "Constitution of 1791"],
        correct: 1,
        explanation: "The Declaration of the Rights of Man and of the Citizen, adopted on August 26, 1789, established fundamental human rights.",
        difficulty: "medium"
    },
    {
        id: 7,
        question: "What period was characterized by mass executions and political purges?",
        options: ["The Directory", "Reign of Terror", "National Convention", "Thermidorian Reaction"],
        correct: 1,
        explanation: "The Reign of Terror (1793-1794) was marked by violent political purges and mass executions of perceived enemies of the revolution.",
        difficulty: "easy"
    },
    {
        id: 8,
        question: "Who seized power in 1799, effectively ending the French Revolution?",
        options: ["Maximilien Robespierre", "Georges Danton", "Napoleon Bonaparte", "Jacques Necker"],
        correct: 2,
        explanation: "Napoleon Bonaparte's coup d'état on November 9, 1799, ended the Directory and effectively concluded the revolutionary period.",
        difficulty: "easy"
    },
    {
        id: 9,
        question: "What was the main cause of France's financial crisis before the Revolution?",
        options: ["Poor harvests", "Involvement in American Revolutionary War", "Luxury spending by nobility", "Trade wars"],
        correct: 1,
        explanation: "France's involvement in the American Revolutionary War severely strained the kingdom's finances, contributing to the crisis.",
        difficulty: "medium"
    },
    {
        id: 10,
        question: "What was the slogan of the French Revolution?",
        options: ["Liberty, Equality, Fraternity", "Death to Tyrants", "Vive la France", "Justice and Freedom"],
        correct: 0,
        explanation: "'Liberty, Equality, Fraternity' became the famous motto of the French Revolution, embodying its core ideals.",
        difficulty: "easy"
    },
    {
        id: 11,
        question: "What event forced the royal family to move from Versailles to Paris?",
        options: ["Storming of the Bastille", "Women's March on Versailles", "Tennis Court Oath", "Great Fear"],
        correct: 1,
        explanation: "The Women's March on Versailles (October 5-6, 1789) forced King Louis XVI and his family to move to Paris.",
        difficulty: "medium"
    },
    {
        id: 12,
        question: "What was abolished during the Great Fear?",
        options: ["Monarchy", "Feudalism", "Church property", "Third Estate"],
        correct: 1,
        explanation: "The Great Fear led to the abolition of feudalism and serfdom in France during the summer of 1789.",
        difficulty: "hard"
    }
];

// Quiz State
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswers = [];
let quizStarted = false;

// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Quiz Functions
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswers = [];
    quizStarted = true;
    
    document.getElementById('quiz-start').classList.remove('active');
    document.getElementById('quiz-question').classList.add('active');
    
    loadQuestion();
}

function loadQuestion() {
    const question = quizData[currentQuestionIndex];
    const progressPercent = ((currentQuestionIndex + 1) / quizData.length) * 100;
    
    // Update progress bar
    document.getElementById('progress-fill').style.width = progressPercent + '%';
    document.getElementById('progress-text').textContent = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
    
    // Update question content
    document.getElementById('question-text').textContent = question.question;
    
    // Update difficulty badge
    const difficultyBadge = document.getElementById('difficulty-badge');
    difficultyBadge.textContent = question.difficulty;
    difficultyBadge.className = `difficulty-badge ${question.difficulty}`;
    
    // Generate answer options
    const answerOptionsContainer = document.getElementById('answer-options');
    answerOptionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'answer-option';
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => selectAnswer(index));
        answerOptionsContainer.appendChild(optionElement);
    });
    
    // Hide explanation
    document.getElementById('quiz-explanation').classList.add('hidden');
}

function selectAnswer(selectedIndex) {
    const question = quizData[currentQuestionIndex];
    const options = document.querySelectorAll('.answer-option');
    
    // Disable all options
    options.forEach(option => {
        option.classList.add('disabled');
    });
    
    // Mark selected answer
    options[selectedIndex].classList.add('selected');
    
    // Show correct/incorrect styling
    options.forEach((option, index) => {
        if (index === question.correct) {
            option.classList.add('correct');
        } else if (index === selectedIndex && index !== question.correct) {
            option.classList.add('incorrect');
        }
    });
    
    // Update score
    const isCorrect = selectedIndex === question.correct;
    if (isCorrect) {
        score++;
    }
    
    // Store selected answer
    selectedAnswers[currentQuestionIndex] = {
        selected: selectedIndex,
        correct: question.correct,
        isCorrect: isCorrect
    };
    
    // Show explanation
    showExplanation(isCorrect, question.explanation);
}

function showExplanation(isCorrect, explanation) {
    const explanationElement = document.getElementById('quiz-explanation');
    const resultIcon = document.getElementById('result-icon');
    const resultText = document.getElementById('result-text');
    const explanationText = document.getElementById('explanation-text');
    const explanationHeader = document.querySelector('.explanation-header');
    
    if (isCorrect) {
        resultIcon.textContent = '✅';
        resultText.textContent = 'Correct!';
        explanationHeader.className = 'explanation-header correct';
    } else {
        resultIcon.textContent = '❌';
        resultText.textContent = 'Incorrect';
        explanationHeader.className = 'explanation-header incorrect';
    }
    
    explanationText.textContent = explanation;
    explanationElement.classList.remove('hidden');
    
    // Update next button text
    const nextBtn = document.getElementById('next-btn');
    if (currentQuestionIndex === quizData.length - 1) {
        nextBtn.textContent = 'View Results';
    } else {
        nextBtn.textContent = 'Next Question';
    }
}

function nextQuestion() {
    if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById('quiz-question').classList.remove('active');
    document.getElementById('quiz-results').classList.add('active');
    
    const percentage = Math.round((score / quizData.length) * 100);
    
    // Update score display
    document.getElementById('final-score').textContent = score;
    document.getElementById('score-percentage').textContent = percentage + '%';
    document.getElementById('correct-count').textContent = score;
    document.getElementById('incorrect-count').textContent = quizData.length - score;
    
    // Update results emoji and feedback
    const resultsEmoji = document.getElementById('results-emoji');
    const resultsTitle = document.getElementById('results-title');
    const feedbackText = document.getElementById('feedback-text');
    
    if (percentage >= 90) {
        resultsEmoji.textContent = '🏆';
        resultsTitle.textContent = 'Excellent!';
        feedbackText.textContent = 'Outstanding! You have an excellent understanding of the French Revolution. You clearly know your revolutionary history!';
    } else if (percentage >= 75) {
        resultsEmoji.textContent = '🎉';
        resultsTitle.textContent = 'Great Job!';
        feedbackText.textContent = 'Well done! You have a solid grasp of French Revolutionary history. Just a few more details to master!';
    } else if (percentage >= 60) {
        resultsEmoji.textContent = '👍';
        resultsTitle.textContent = 'Good Effort!';
        feedbackText.textContent = 'Not bad! You have a basic understanding of the French Revolution. Review the content to improve your knowledge!';
    } else if (percentage >= 40) {
        resultsEmoji.textContent = '📚';
        resultsTitle.textContent = 'Keep Learning!';
        feedbackText.textContent = 'There\'s room for improvement! Go back through the timeline and key events to strengthen your understanding.';
    } else {
        resultsEmoji.textContent = '💪';
        resultsTitle.textContent = 'Try Again!';
        feedbackText.textContent = 'Don\'t give up! Review all the sections carefully and retake the quiz. The French Revolution is complex but fascinating!';
    }
    
    // Animate score circle
    setTimeout(() => {
        const scoreCircle = document.querySelector('.score-circle');
        scoreCircle.style.transform = 'scale(1.1)';
        setTimeout(() => {
            scoreCircle.style.transform = 'scale(1)';
        }, 300);
    }, 500);
}

function restartQuiz() {
    document.getElementById('quiz-results').classList.remove('active');
    document.getElementById('quiz-start').classList.add('active');
    
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswers = [];
    quizStarted = false;
}

// Navigation smooth scrolling and other existing functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(124, 45, 18, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(220, 38, 38, 0.3)';
        } else {
            navbar.style.background = 'rgba(124, 45, 18, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('timeline-item')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
                
                if (entry.target.classList.contains('figure-card') || 
                    entry.target.classList.contains('cause-card') ||
                    entry.target.classList.contains('event-card') ||
                    entry.target.classList.contains('impact-card')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }

                if (entry.target.classList.contains('section-title')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            }
        });
    }, observerOptions);

    // Observe timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
        observer.observe(item);
    });

    // Observe cards
    const cards = document.querySelectorAll('.figure-card, .cause-card, .event-card, .impact-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        card.style.transitionDelay = `${(index % 3) * 0.1}s`;
        observer.observe(card);
    });

    // Observe section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.style.opacity = '0';
        title.style.transform = 'translateY(20px)';
        title.style.transition = 'all 0.6s ease';
        observer.observe(title);
    });

    // Timeline hover effects
    const timelineMarkers = document.querySelectorAll('.timeline-marker');
    timelineMarkers.forEach(marker => {
        const content = marker.nextElementSibling;
        
        marker.addEventListener('mouseenter', function() {
            content.style.transform = 'scale(1.05)';
            content.style.zIndex = '10';
        });
        
        marker.addEventListener('mouseleave', function() {
            content.style.transform = 'scale(1)';
            content.style.zIndex = '1';
        });
    });

    // Add sparkle effect on card hover
    function createSparkle(x, y, color = '#dc2626') {
        const sparkle = document.createElement('div');
        sparkle.style.position = 'absolute';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.width = '4px';
        sparkle.style.height = '4px';
        sparkle.style.backgroundColor = color;
        sparkle.style.borderRadius = '50%';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '1000';
        sparkle.style.animation = 'sparkleAnimation 0.8s ease-out forwards';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 800);
    }

    // Add sparkle effect to cards on hover
    const allCards = document.querySelectorAll('.figure-card, .cause-card, .event-card, .impact-card');
    allCards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            const rect = card.getBoundingClientRect();
            const colors = ['#dc2626', '#ea580c', '#f59e0b'];
            
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    const x = rect.left + Math.random() * rect.width;
                    const y = rect.top + Math.random() * rect.height;
                    const color = colors[Math.floor(Math.random() * colors.length)];
                    createSparkle(x, y, color);
                }, i * 100);
            }
        });
    });

    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroDecoration = document.querySelector('.hero-decoration');
        if (heroDecoration) {
            heroDecoration.style.transform = `rotate(${scrolled * 0.1}deg)`;
        }
    });

    // Add typing effect to hero subtitle
    function typeWriter(element, text, speed = 50) {
        element.textContent = '';
        let i = 0;
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Apply typing effect after a delay
    setTimeout(() => {
        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroSubtitle) {
            const originalText = heroSubtitle.textContent;
            typeWriter(heroSubtitle, originalText, 100);
        }
    }, 1000);

    // Add click effect to timeline items
    const timelineContents = document.querySelectorAll('.timeline-content');
    timelineContents.forEach(content => {
        content.addEventListener('click', function(event) {
            // Create ripple effect
            const ripple = document.createElement('div');
            const rect = content.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.position = 'absolute';
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (event.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (event.clientY - rect.top - size / 2) + 'px';
            ripple.style.background = 'rgba(220, 38, 38, 0.3)';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            content.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });

    // Add floating animation to hero elements
    function addFloatingAnimation() {
        const floatingElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description');
        floatingElements.forEach((element, index) => {
            element.style.animation += `, floating${index + 1} 3s ease-in-out infinite`;
        });
    }

    // Apply floating animation after initial animations complete
    setTimeout(addFloatingAnimation, 2000);

    // Add progress indicator for scroll position
    const progressBar = document.createElement('div');
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.width = '0%';
    progressBar.style.height = '3px';
    progressBar.style.background = 'linear-gradient(45deg, #dc2626, #ea580c)';
    progressBar.style.zIndex = '1001';
    progressBar.style.transition = 'width 0.1s ease';
    document.body.appendChild(progressBar);

    // Update progress bar on scroll
    window.addEventListener('scroll', function() {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });

    // Add active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');

    function highlightNavigation() {
        let current = '';
        const scrollPosition = window.pageYOffset + 150; // Offset for navbar height
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        // Default to hero if we're at the top
        if (window.pageYOffset < 100) {
            current = 'hero';
        }

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === '#' + current) {
                item.classList.add('active');
            }
        });
    }

    // Update active navigation on scroll
    window.addEventListener('scroll', highlightNavigation);
    
    // Initial call to set active navigation
    highlightNavigation();

    // Add console welcome message
    console.log('%c🇫🇷 Welcome to the French Revolution Experience! 🇫🇷', 'color: #dc2626; font-size: 16px; font-weight: bold;');
    console.log('%cExplore the timeline, hover over cards, discover events, and test your knowledge with our interactive quiz!', 'color: #ea580c; font-size: 12px;');
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    // Don't interfere with quiz interactions
    if (quizStarted && document.getElementById('quiz-question').classList.contains('active')) {
        return;
    }
    
    const sections = ['hero', 'timeline', 'figures', 'causes', 'events', 'impact', 'quiz'];
    let currentIndex = 0;
    
    // Find current section
    sections.forEach((section, index) => {
        const element = document.getElementById(section);
        const rect = element.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom > 100) {
            currentIndex = index;
        }
    });
    
    // Navigate with arrow keys
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        const nextIndex = Math.min(currentIndex + 1, sections.length - 1);
        scrollToSection(sections[nextIndex]);
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevIndex = Math.max(currentIndex - 1, 0);
        scrollToSection(sections[prevIndex]);
    }
});

// Performance optimization - debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    // Any intensive scroll operations would go here
}, 10);

// Quiz keyboard shortcuts (when quiz is active)
document.addEventListener('keydown', function(e) {
    if (!quizStarted) return;
    
    const questionContainer = document.getElementById('quiz-question');
    const explanationVisible = !document.getElementById('quiz-explanation').classList.contains('hidden');
    
    if (questionContainer.classList.contains('active') && !explanationVisible) {
        // Number keys 1-4 to select answers
        if (e.key >= '1' && e.key <= '4') {
            e.preventDefault();
            const optionIndex = parseInt(e.key) - 1;
            const options = document.querySelectorAll('.answer-option');
            if (options[optionIndex] && !options[optionIndex].classList.contains('disabled')) {
                selectAnswer(optionIndex);
            }
        }
    } else if (explanationVisible) {
        // Enter or Space to go to next question
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            nextQuestion();
        }
    }
});

// Add quiz completion celebration effect
function celebrateCompletion() {
    const colors = ['#dc2626', '#ea580c', '#f59e0b'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            const color = colors[Math.floor(Math.random() * colors.length)];
            createSparkle(x, y, color);
        }, i * 50);
    }
}

// Trigger celebration when showing excellent results
const originalShowResults = showResults;
showResults = function() {
    originalShowResults();
    
    const percentage = Math.round((score / quizData.length) * 100);
    if (percentage >= 90) {
        setTimeout(celebrateCompletion, 1000);
    }
};