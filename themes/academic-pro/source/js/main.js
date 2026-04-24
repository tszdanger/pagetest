document.addEventListener('DOMContentLoaded', function() {
  // Navbar scroll effect
  var navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Mobile nav toggle
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', function() {
      links.classList.toggle('active');
    });

    // Close nav on link click
    links.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        links.classList.remove('active');
      });
    });
  }

  // Smooth active section highlight
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-link');
  if (sections.length && navLinks.length) {
    window.addEventListener('scroll', function() {
      var scrollY = window.scrollY + 100;
      var current = '';
      sections.forEach(function(section) {
        if (section.offsetTop <= scrollY) {
          current = section.getAttribute('id');
        }
      });
      navLinks.forEach(function(link) {
        link.style.color = '';
        link.style.background = '';
        if (link.getAttribute('href') === '#' + current) {
          link.style.color = 'var(--color-accent)';
        }
      });
    });
  }
});
