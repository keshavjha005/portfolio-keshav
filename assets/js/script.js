$(document).ready(function () {

    // Dark Mode Toggle Functionality
    $('#dark-mode-toggle').click(function () {
        $('body').toggleClass('dark-mode'); // Toggle the dark mode class on the body

        // Change the icon based on the mode
        if ($('body').hasClass('dark-mode')) {
            $(this).html('<i class="fas fa-sun"></i>'); // Sun icon for light mode
        } else {
            $(this).html('<i class="fas fa-moon"></i>'); // Moon icon for dark mode
        }
    });

    // Navbar Toggle Functionality (for mobile view)
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    // Scroll and Load Functions
    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        // Scroll Top Button Visibility
        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }
    });

    // Scroll Spy (active link in the navbar based on scroll position)
    $('section').each(function () {
        let height = $(this).height();
        let offset = $(this).offset().top - 200;
        let top = $(window).scrollTop();
        let id = $(this).attr('id');

        if (top > offset && top < offset + height) {
            $('.navbar ul li a').removeClass('active');
            $('.navbar').find(`[href="#${id}"]`).addClass('active');
        }
    });

    // Smooth Scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear');
    });

    // EmailJS contact form submission
    $("#contact-form").submit(function (event) {
        emailjs.init("user_TTDmetQLYgWCLzHTDgqxm");

        emailjs.sendForm('contact_service', 'template_contact', '#contact-form')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                document.getElementById("contact-form").reset();
                alert("Form Submitted Successfully");
            }, function (error) {
                console.log('FAILED...', error);
                alert("Form Submission Failed! Try Again");
            });
        event.preventDefault();
    });

    // Tawk.to Live Chat Integration
    var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
    (function () {
        var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
        s1.async = true;
        s1.src = 'https://embed.tawk.to/60df10bf7f4b000ac03ab6a8/1f9jlirg6';
        s1.charset = 'UTF-8';
        s1.setAttribute('crossorigin', '*');
        s0.parentNode.insertBefore(s1, s0);
    })();

    // Visibility Change Event for Updating Tab Title and Icon
    document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === "visible") {
            document.title = "Portfolio | Keshva Jha";
            $("#keshav").attr("href", "assets/images/keshav.png");
        } else {
            document.title = "Come Back To Portfolio";
            $("#keshav").attr("href", "assets/images/favhand.png");
        }
    });

    // Typed.js Effect
    var typed = new Typed(".typing-text", {
        strings: ["Mern stack developer", "full stack developer"],
        loop: true,
        typeSpeed: 50,
        backSpeed: 25,
        backDelay: 500,
    });

    // Fetch and Display Skills
    async function fetchData(type = "skills") {
        let response;
        type === "skills" ?
            response = await fetch("skills.json") :
            response = await fetch("./projects/projects.json");
        const data = await response.json();
        return data;
    }

    function showSkills(skills) {
        let skillsContainer = document.getElementById("skillsContainer");
        let skillHTML = "";
        skills.forEach(skill => {
            skillHTML += `
                <div class="bar">
                    <div class="info">
                        <img src=${skill.icon} alt="skill" />
                        <span>${skill.name}</span>
                    </div>
                </div>`;
        });
        skillsContainer.innerHTML = skillHTML;
    }

    function showProjects(projects) {
        let projectsContainer = document.querySelector("#project .box-container");
        let projectHTML = "";
        projects.slice(0, 10).filter(project => project.category != "android").forEach(project => {
            projectHTML += `
                <div class="box tilt">
                    <img draggable="false" src="/assets/images/projects/${project.image}.png" alt="project" />
                    <div class="content">
                        <div class="tag">
                            <h3>${project.name}</h3>
                        </div>
                        <div class="desc">
                            <p>${project.desc}</p>
                            <div class="btns">
                                <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
                                <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
                            </div>
                        </div>
                    </div>
                </div>`;
        });
        projectsContainer.innerHTML = projectHTML;

        VanillaTilt.init(document.querySelectorAll(".tilt"), {
            max: 15,
        });
    }

    fetchData().then(data => {
        showSkills(data);
    });

    fetchData("projects").then(data => {
        showProjects(data);
    });

    // Preloader (Optional: Uncomment to use)
    // function loader() {
    //     document.querySelector('.loader-container').classList.add('fade-out');
    // }
    // function fadeOut() {
    //     setInterval(loader, 500);
    // }
    // window.onload = fadeOut;

    // Disable Developer Tools
    document.onkeydown = function (e) {
        if (e.keyCode == 123) {
            return false;
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
            return false;
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
            return false;
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
            return false;
        }
        if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
            return false;
        }
    };
});

