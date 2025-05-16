// Main JavaScript functionality for the OpenDataLab website

document.addEventListener('DOMContentLoaded', function() {
  // Change navigation bar background on scroll
  const header = document.querySelector('header');
  
  // Check if we're on the home page (has slideshow)
  const hasSlideshow = document.querySelector('.slideshow-container');
  
  if (hasSlideshow) {
    // Start with transparent header on home page
    header.classList.remove('scrolled');
    
    window.addEventListener('scroll', function() {
      if (window.scrollY > 100) { // When scrolled past 100px
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  } else {
    // On other pages, always have the solid header
    header.classList.add('scrolled');
  }

  // Special handling for resources page to ensure headings are visible
  const isResourcesPage = document.querySelector('.resources-section');
  
  if (isResourcesPage) {
    // Apply special styling to ensure resource headings remain visible
    document.querySelectorAll('.resource-category h2').forEach(heading => {
      heading.style.display = 'block';
      heading.style.visibility = 'visible';
      heading.style.opacity = '1';
      heading.style.color = 'var(--primary-color)';
      heading.style.background = 'transparent';
      heading.style.borderBottom = 'none';
      heading.style.padding = '1.5rem 1.5rem 0.8rem 1.5rem';
      heading.style.fontWeight = '600';
      heading.style.fontSize = '2rem';
      heading.style.letterSpacing = '0.5px';
      heading.style.position = 'relative';
      
      // Add the small accent line under headings
      const afterStyle = document.createElement('style');
      afterStyle.textContent = `.resource-category h2::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 1.5rem;
        width: 70px;
        height: 3px;
        background: var(--accent-color);
        margin: 0;
        display: block;
        visibility: visible;
        opacity: 1;
      }`;
      document.head.appendChild(afterStyle);
    });
  }

  // Add smooth scrolling to all anchor links
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
}); 