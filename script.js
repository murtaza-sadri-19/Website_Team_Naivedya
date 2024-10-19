$(".step").click(function() {
  // Remove active class from all steps
  $(".step").removeClass("active");

  // Add active class to the clicked step
  $(this).addClass("active");

  // Reset list-style classes for all steps
  $(".step").removeClass("list-style1 list-style2");

  // Add list-style1 to the clicked step
  $(this).addClass("list-style1");

  // Add list-style2 to previous steps
  $(this).prevAll(".step").addClass("list-style2");
});

$(".step01").click(function() {
  $("#line-progress").css("width", "0%");
  $(".dig").addClass("active").siblings().removeClass("active");
});

$(".step02").click(function() {
  $("#line-progress").css("width", "25%");
  $(".grab").addClass("active").siblings().removeClass("active");
});

$(".step03").click(function() {
  $("#line-progress").css("width", "50%");
  $(".convey").addClass("active").siblings().removeClass("active");
});

$(".step04").click(function() {
  $("#line-progress").css("width", "75%");
  $(".cover").addClass("active").siblings().removeClass("active");
});

$(".step05").click(function() {
  $("#line-progress").css("width", "100%");
  $(".frame").addClass("active").siblings().removeClass("active");
});

  // ======================================================================================
  $(document).ready(function() {
    $('#carouselId').carousel({
      interval: 2000 // Set the interval between slides (in milliseconds)
    });
  
    // Add click event to the carousel indicators
    $('.carousel-indicators li').click(function() {
      var index = $(this).data('slide-to');
      $('#carouselId').carousel(index);
    });
  
    // Add click event to the carousel controls
    $('.carousel-control-prev').click(function() {
      $('#carouselId').carousel('prev');
    });
  
    $('.carousel-control-next').click(function() {
      $('#carouselId').carousel('next');
    });
  });
  // ====================================================================
  $(document).ready(function () {
    // Grab the initial top offset of the navigation
    var stickyNavTop = $(".header").offset().top;
  
    // Our function that decides whether the navigation bar should have "fixed" css position or not.
    $(window).scroll(function () {
      if ($(window).scrollTop() >= stickyNavTop) {
        // If page is scrolled more than navbar offset, change its position to fixed to stick to top, restoring its original top offset
        $(".header").addClass("affix");
      } else {
        // Else, change the position back to "static"
        $(".header").removeClass("affix");
      }
    });
  });
  //===========================================================================================
  const slidesContainer = document.getElementById("images");
  let currentSlide = 0;

  function showSlide(index) {
    const newTransformValue = -index * 100 + "%";
    slidesContainer.style.transform =
      "translateX(" + newTransformValue + ")";
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slidesContainer.children.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide =
      (currentSlide - 1 + slidesContainer.children.length) %
      slidesContainer.children.length;
    showSlide(currentSlide);
  }

  // // Automatic slideshow
  autoSlideInterval = setInterval(nextSlide, 2000);

  // Optional: Pause on hover
  slidesContainer.addEventListener("mouseenter", () =>
    clearInterval(autoSlideInterval)
  );
 
  // Add click event listeners to controls
  const nextButton = document.getElementById("controls-next");
  const prevButton = document.getElementById("controls-prev");

  nextButton.addEventListener("click", nextSlide);
  prevButton.addEventListener("click", prevSlide);
  //==============================================================================
  function showSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'flex'
  }
  function hideSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'none'
  }
  // ===========================================
  