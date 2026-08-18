/* ========================================
   SPORTS LAB - MAIN JAVASCRIPT
======================================== */


/* ========================================
   PAGE LOADER
======================================== */

document.addEventListener("DOMContentLoaded", function () {

    const loader = document.getElementById("page-loader");

    if (loader) {

        loader.classList.add("hidden");

        // Safety backup
        setTimeout(function () {
            loader.classList.add("hidden");
        }, 1500);

    }

});


/* ========================================
   MOBILE NAVIGATION
======================================== */

document.addEventListener("DOMContentLoaded", function () {

    const menuToggle =
        document.getElementById("menuToggle");

    const navLinks =
        document.getElementById("navLinks");


    if (!menuToggle || !navLinks) {
        return;
    }


    /* OPEN / CLOSE MENU */

    menuToggle.addEventListener("click", function () {

        const isOpen =
            navLinks.classList.toggle("active");

        menuToggle.classList.toggle(
            "active",
            isOpen
        );

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

    });


    /* CLOSE MENU WHEN LINK IS CLICKED */

    const links =
        navLinks.querySelectorAll("a");

    links.forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("active");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });


    /* CLOSE MENU WHEN CLICKING OUTSIDE */

    document.addEventListener("click", function (event) {

        if (
            !navLinks.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {

            navLinks.classList.remove("active");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });


    /* CLOSE MENU WITH ESCAPE */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            navLinks.classList.remove("active");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

});

/* ========================================
   CONTACT FORM
======================================== */

const CONTACT_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbwh7NBx30SBO2vwOguaBCRw5h59cZiyTPYi20ltbLap4PhlprbBWFyIZ-tqh2_q0zpInw/exec";


document.addEventListener("DOMContentLoaded", function () {

    const contactForm =
        document.getElementById("contactForm");

    if (!contactForm) {
        return;
    }


    const submitButton =
        document.getElementById("contactSubmit");

    const submitText =
        document.getElementById("submitText");

    const submitArrow =
        document.getElementById("submitArrow");

    const formNote =
        document.getElementById("formNote");


    contactForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            submitButton.disabled = true;

            submitText.textContent =
                "SENDING...";

            submitArrow.textContent =
                "•";


            formNote.textContent =
                "Sending your message...";

            formNote.style.color =
                "#888";


            const formData =
                new FormData(contactForm);


            const data = {

                name:
                    formData.get("name"),

                email:
                    formData.get("email"),

                phone:
                    formData.get("phone"),

                subject:
                    formData.get("subject"),

                message:
                    formData.get("message")

            };


            try {

                const response =
                    await fetch(
                        CONTACT_SCRIPT_URL,
                        {
                            method: "POST",

                            body:
                                JSON.stringify(data)
                        }
                    );


                const result =
                    await response.json();


                if (!result.success) {

                    throw new Error(
                        result.message ||
                        "Something went wrong."
                    );

                }


                /* SUCCESS */

                submitText.textContent =
                    "MESSAGE SENT!";

                submitArrow.textContent =
                    "✓";


                formNote.textContent =
                    "Thanks! We'll get back to you as soon as possible.";

                formNote.style.color =
                    "#4caf50";


                contactForm.reset();


            } catch (error) {

                console.error(error);


                submitText.textContent =
                    "SEND MESSAGE";

                submitArrow.textContent =
                    "→";


                formNote.textContent =
                    "Something went wrong. Please try again or call us at (520) 510-2890.";

                formNote.style.color =
                    "#e53935";


            }


            setTimeout(function () {

                submitButton.disabled =
                    false;

            }, 2000);

        }
    );

});
