
        (function() {
            emailjs.init({
              publicKey: "rtEd1aC0v6D07xCCY"
            });
        })();

        document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        // Select the submit button WITHIN the form
        const submitButton = contactForm.querySelector('button[type="submit"]'); 
        
        // Ensure the button was found
        if (!submitButton) {
             console.error("Submit button not found inside the contact form!");
             return; // Exit if button not found
        }

        // Get references to the spans inside the button
        const buttonText = submitButton.querySelector('.button-text');
        const spinner = submitButton.querySelector('.spinner');
        const formStatus = document.getElementById('formStatus'); // Your existing status div

        // Check if the spans exist (verify HTML structure)
        if (!buttonText) {
             console.error("'.button-text' span not found inside the submit button. Check your HTML.");
             return; 
        }
         if (!spinner) {
            console.error("'.spinner' span not found inside the submit button. Check your HTML.");
            return; 
         }

        // Add the submit event listener
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission
            const serviceID = 'service_yci8fis'; // Your Service ID
            const templateID = 'template_p2a5obg'; // Your Template ID

            // --- Start Loading State ---
            submitButton.disabled = true;           // Disable button
            buttonText.style.display = 'none';      // Hide original text
            spinner.style.display = 'inline-block'; // Show the spinner
            if (formStatus) formStatus.textContent = ''; // Clear previous status messages
            // --- End Loading State ---

            // Call emailjs (or your form submission logic)
            emailjs.sendForm(serviceID, templateID, this)
                .then(() => { // On Success
                    console.log('SUCCESS!');
                    alert('Message sent successfully!'); 
                    contactForm.reset(); 

                    // --- Reset Button State (Success) ---
                    submitButton.disabled = false;            // Re-enable button
                    spinner.style.display = 'none';           // Hide spinner
                    buttonText.style.display = 'inline-block'; // Show original text
                    if (formStatus) formStatus.textContent = ''; 
                    // --- End Reset Button State ---

                }, (error) => { // On Error
                    console.log('FAILED...', error);
                    if (formStatus) formStatus.textContent = 'Failed to send message. Please try again.'; 

                    // --- Reset Button State (Error) ---
                    submitButton.disabled = false;            // Re-enable button
                    spinner.style.display = 'none';           // Hide spinner
                    buttonText.style.display = 'inline-block'; // Show original text
                    // --- End Reset Button State ---
                });
        });
    } else {
        console.error("Contact form with ID 'contactForm' not found.");
    }
});

        document.addEventListener("DOMContentLoaded", function () {
		// Mobile Menu Toggle
		const menuToggle = document.querySelector(".menu-toggle");
		const menu = document.querySelector(".menu");
		const menuLinks = document.querySelectorAll(".menu a");

		menuToggle.addEventListener("click", function (event) {
			event.stopPropagation(); // Prevent immediate closing
			menu.classList.toggle("active");
		});

		// Close menu when clicking a menu link
		menuLinks.forEach(link => {
			link.addEventListener("click", function () {
				setTimeout(() => {
					menu.classList.remove("active");
				}, 350);
			});
		});

    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
        if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
            menu.classList.remove("active");
        }
    });

    // Smooth scrolling
    menuLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 50,
                    behavior: "smooth"
                });
            }
        });
    });

    // Scroll Animation
    const sections = document.querySelectorAll(".section");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            } else {
                entry.target.classList.remove("visible");
            }
        });
    }, { threshold: 0.2 });

    sections.forEach((section) => {
        section.classList.add("reveal");
        observer.observe(section);
    });

    // Typing Text Effect
    const typingText = document.getElementById("typing-text");
    const texts = ["B.S. Information Technology", "Developer"];
    let index = 0;
    let isDeleting = false;
    let charIndex = 0;

    function typeEffect() {
        let currentText = texts[index];
        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        typingText.textContent = currentText.substring(0, charIndex);

        if (!isDeleting && charIndex === currentText.length) {
            setTimeout(() => (isDeleting = true), 1000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            index = (index + 1) % texts.length;
        }

        setTimeout(typeEffect, isDeleting ? 100 : 200);
    }

    typeEffect();

    // Particle Background (from CodePen)
    (function ( $, window, document, undefined ) {
	// Plugin constructor
	var Starfield = function(el, options) {
		this.el			= el;
		this.$el		= $(el);
		this.options	= options;

		that			= this;
	};

	var isPlaying;
	var isInited	= false;
	var canCanvas	= false;
	var animId;

	// MIT license

	(function() {
		var lastTime = 0;
		var vendors = ['ms', 'moz', 'webkit', 'o'];
		for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
			window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
			window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
									   || window[vendors[x]+'CancelRequestAnimationFrame'];
		}
	 
		if (!window.requestAnimationFrame)
			window.requestAnimationFrame = function(callback, element) {
				var currTime = new Date().getTime();
				var timeToCall = Math.max(0, 16 - (currTime - lastTime));
				var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
				  timeToCall);
				lastTime = currTime + timeToCall;
				return id;
			};
	 
		if (!window.cancelAnimationFrame)
			window.cancelAnimationFrame = function(id) {
				clearTimeout(id);
			};
	}());
  
	// Plugin prototype
	Starfield.prototype = {
		// Default settings
		defaults: {
			starColor:	"rgba(255,255,255,1)", 
			bgColor:	"rgba(0,0,0,8)",
			mouseMove:	true,
			mouseSpeed:	0.9,
			fps:		60,
			speed:		0.5,
			quantity:	1000,
			ratio:		100,
			divclass:	"starfield"
		},

		init: function() {
			// Get default settings 
			this.settings = $.extend({}, this.defaults, this.options);

			// Query variables
			var url	= document.location.href;
			this.n	= parseInt(
				(url.indexOf('n=') != -1) ? url.substring(url.indexOf('n=') + 2, (
					(url.substring(
						url.indexOf('n=') + 2,
						url.length)
					).indexOf('&') != -1) ? url.indexOf('n=') + 2 + (url.substring(
						url.indexOf('n=') + 2,
						url.length)
					).indexOf('&') :
						url.length) :
							this.settings.quantity
			);

			this.flag				= true;
			this.test 				= true;
			this.w					= 0;
			this.h					= 0;
			this.x					= 0;
			this.y					= 0;
			this.z					= 0;
			this.star_color_ratio	= 0;
			this.star_x_save		= 0;
			this.star_y_save		= 0;
			this.star_ratio			= this.settings.ratio;
			this.star_speed			= this.settings.speed;
			this.star_speed_save	= 0;
			this.star				= new Array(this.n);
			this.color				= this.settings.starColor;
			this.opacity			= 0.1;

			this.cursor_x			= 0;
			this.cursor_y			= 0;
			this.mouse_x			= 0;
			this.mouse_y			= 0;

			this.canvas_x			= 0;
			this.canvas_y			= 0;
			this.canvas_w			= 0;
			this.canvas_h			= 0;
			
			this.fps				= this.settings.fps;

			// Check for device orientation support
			this.desktop			= !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|IEMobile)/);
			this.orientationSupport	= window.DeviceOrientationEvent !== undefined;
			this.portrait			= null;

			// Inject the canvas element
			var canvasInit = function(){
				that.w			= that.$el.width();
				that.h			= that.$el.height();

				that.initW		= that.w;
				that.initH		= that.h;

				that.portrait	= that.w < that.h;

				that.wrapper	= $('<canvas />')
				.addClass(that.settings.divclass);

				that.wrapper.appendTo(that.el);

				that.starz	= $('canvas', that.el);

				if (that.starz[0].getContext) { // Can canvas?
					that.context	= that.starz[0].getContext('2d');
					canCanvas		= true;
				}

				that.context.canvas.width = that.w;
				that.context.canvas.height = that.h;
			}
			canvasInit();

			// Create initial star array and canvas context
			var starInit = function(){
				// Get context for the canvas element
				if(canCanvas){ // Check for canvas drawering abilities.
					that.x					= Math.round(that.w / 2);
					that.y					= Math.round(that.h / 2);
					that.z					= (that.w + that.h) / 2;
					that.star_color_ratio	= 1 / that.z;
					that.cursor_x			= that.x;
					that.cursor_y			= that.y;
	
					// Big bang
					for(var i = 0; i < that.n; i++) {
						that.star[i]	= new Array(5); 

						that.star[i][0]	= Math.random() * that.w * 2 - that.x * 2;
						that.star[i][1]	= Math.random() * that.h * 2 - that.y * 2;
						that.star[i][2]	= Math.round(Math.random() * that.z);
						that.star[i][3]	= 0;
						that.star[i][4]	= 0;
					}	

					// Set the colors
					that.context.fillStyle		= that.settings.bgColor;
					that.context.strokeStyle	= that.settings.starColor;			
				} else {
					return;
				}
			}
			starInit();

			isInited = true;
		},

		// Iterate over every star on the field and move it slightly
		anim: function(){
			this.mouse_x	= this.cursor_x - this.x;
			this.mouse_y	= this.cursor_y - this.y;
			this.context.fillRect(0, 0, this.w, this.h);

			for(var i = 0; i < this.n; i++) {
				this.test			= true;
				this.star_x_save	= this.star[i][3];
				this.star_y_save	= this.star[i][4];
				this.star[i][0]	+= this.mouse_x >> 9;

				// X coords
				if(this.star[i][0] > this.x << 1) {
					this.star[i][0] -= this.w << 1;
					this.test = false;
				}
				if(this.star[i][0] <- this.x << 1) {
					this.star[i][0] += this.w << 1;
					this.test = false;
				}

				// Y coords
				this.star[i][1] += this.mouse_y >> 9;
				if(this.star[i][1] > this.y << 1) {
					this.star[i][1] -= this.h << 1;
					this.test = false;
				}
				if(this.star[i][1] <- this.y << 1) {
					this.star[i][1] += this.h << 1;
					this.test = false;
				}

				// Z coords
				this.star[i][2] -= this.star_speed;
				if(this.star[i][2] > this.z) {
					this.star[i][2] -= this.z;
					this.test = false;
				}
				if(this.star[i][2] < 0) {
					this.star[i][2] += this.z;
					this.test = false;
				}

				this.star[i][3] = this.x + (this.star[i][0] / this.star[i][2]) * this.star_ratio;
				this.star[i][4] = this.y + (this.star[i][1] / this.star[i][2]) * this.star_ratio;

				if(this.star_x_save > 0
				&& this.star_x_save < this.w
				&& this.star_y_save > 0
				&& this.star_y_save < this.h
				&& this.test) {
					this.context.lineWidth = (1 - this.star_color_ratio * this.star[i][2]) * 2;
					this.context.beginPath();
					this.context.moveTo(this.star_x_save,this.star_y_save);
					this.context.lineTo(this.star[i][3], this.star[i][4]);
					this.context.stroke();
					this.context.closePath();
				}
			}
		},

		loop: function(){
			this.anim();

			animId = window.requestAnimationFrame(function(){that.loop()});
		},

		move: function(){
			var doc	= document.documentElement;

			if (this.orientationSupport && !this.desktop) {
				//$('<p class="output"></p>').prependTo('.content');
				//var output = document.querySelector('.output');
				window.addEventListener('deviceorientation', handleOrientation, false);
			} else {
				window.addEventListener('mousemove', handleMousemove, false);
			}
			if (!this.desktop) {
				window.addEventListener('touchstart', handleTouch, false);
				window.addEventListener('touchmove', handleTouch, false);
				window.addEventListener('touchend', handleTouchEnd, false);
			}
			function handleTouch(event) {
				if (event.touches.length > 0) {
				that.cursor_x = event.touches[0].pageX || event.touches[0].clientX + doc.scrollLeft - doc.clientLeft;
				that.cursor_y = event.touches[0].pageY || event.touches[0].clientY + doc.scrollTop - doc.clientTop;
				}
			}
			function handleOrientation(event) {
				if( event.beta !== null && event.gamma !== null) {
					var x = event.gamma, y = event.beta;

					if (!that.portrait) {
						x = event.beta * -1;
						y = event.gamma;
					}

					that.cursor_x	= (that.w / 2) + (x * 3);
					that.cursor_y	= (that.h / 2) + (y * 3);

					/*var output = document.querySelector('.output');
					output.innerHTML = "rotZ : " + Math.round(event.alpha) + "<br />\n";
					output.innerHTML += "rotX: " + Math.round(event.beta) + "<br />\n";
					output.innerHTML += "rotY: " + Math.round(event.gamma) + "<br />\n";*/
				}
			}

			function handleMousemove(event) {
				that.cursor_x	= event.pageX || event.clientX + doc.scrollLeft - doc.clientLeft;
				that.cursor_y	= event.pageY || event.clientY + doc.scrollTop - doc.clientTop;
			}

			function getRandomColor() {
			const r = Math.floor(Math.random() * 256);
			const g = Math.floor(Math.random() * 256);
			const b = Math.floor(Math.random() * 256);
			return `rgba(<span class="math-inline">\{r\},</span>{g},${b},1)`;
			}
		},

		stop: function(){
			window.cancelAnimationFrame(animId);

			isPlaying = false;
		},

		// this.start this whole thing
		start: function() {
			// Initialize
			if (!isInited) {
				isInited = true;
				this.init();
			}
			
			// Start the animation loop
			if (!isPlaying) {
				isPlaying = true;
				this.loop();
			}

			window.addEventListener('resize', function(){that.resizer()}, false);

			window.addEventListener('orientationchange', function(){that.resizer()}, false);

			// Move stars on mouse move
			if (this.settings.mouseMove) {
				this.move();
			}

			return this;
		}
	}

	Starfield.defaults	= Starfield.prototype.defaults;

	// Finally, the actual plugin code
	$.fn.starfield = function(options){
		return this.each(function() {
			new Starfield(this, options).start();
		});
	}

	window.Starfield = Starfield;
})( jQuery, window, document );

$('.starfield').starfield();
});
		document.addEventListener("DOMContentLoaded", function () {
		  const prevButton = document.querySelector(".prev");
		  const nextButton = document.querySelector(".next");
		  const wrapper = document.querySelector(".certificate-wrapper");
		  const images = Array.from(document.querySelectorAll(".certificate-image"));
		  let currentIndex = 0;
		  const imageCount = images.length;
		  const transitionDuration = '0.5s';
	  
		  function showImage(index) {
			wrapper.style.transition = `transform ${transitionDuration} ease`;
			wrapper.style.transform = `translateX(-${index * 100}%)`;
		  }
	  
		  prevButton.addEventListener("click", function () {
			if (currentIndex === 0) {
			  wrapper.style.transition = "none";
			  currentIndex = imageCount - 1;
			  wrapper.style.transform = `translateX(-100%)`;
			  requestAnimationFrame(() => {
				wrapper.style.transition = `transform ${transitionDuration} ease`;
				wrapper.style.transform = `translateX(-${(imageCount - 1) * 100}%)`;
			  }, 10);
			} else {
			  currentIndex--;
			  showImage(currentIndex);
			}
		  });
	  
		  nextButton.addEventListener("click", function () {
			if (currentIndex === imageCount - 1) {
				currentIndex = 0;
				wrapper.style.transition = "none"; // Disable transition for immediate repositioning
				wrapper.style.transform = `translateX(-100%)`;// Position to the far left (visually, first image is to the right)
				requestAnimationFrame(() => {
				wrapper.style.transition = `transform ${transitionDuration} ease`; // Re-enable transition
				wrapper.style.transform = `translateX(0%)`; // Slide to the first image
				}, 10);
			} else {
				currentIndex++;
				showImage(currentIndex);
			}
			});
	  
		  showImage(currentIndex);
	  
		  function updateSlider() {
			showImage(currentIndex);
		  }
	  
		  window.addEventListener('resize', updateSlider);
		});

		window.addEventListener('load', function() {
			const track = document.querySelector('.projects-track');
			const dots = document.querySelectorAll('.dot');

			if(!track || dots.length === 0) return;

			dots.forEach((dot, index) => {
				dot.addEventListener('click', function(e) {
					e.preventDefault();
					console.log("Click registered on dot:", index);

					// Calculation: 2 pages, track is 200%. 
					// Page 1 = 0%, Page 2 = -50%
					const moveAmount = index * -50; 
					
					// Force the transform
					track.style.transform = `translateX(${moveAmount}%)`;

					// Toggle Classes
					dots.forEach(d => d.classList.remove('active'));
					this.classList.add('active');
				});
			});
		});
		document.querySelectorAll('.project-box').forEach(box => {
			box.addEventListener('click', function(e) {
				// Toggle the 'active' class on the clicked box
				this.classList.toggle('show-text');
				
				// Optional: Close other open boxes when clicking a new one
				document.querySelectorAll('.project-box').forEach(otherBox => {
					if (otherBox !== this) otherBox.classList.remove('show-text');
				});
			});
		});