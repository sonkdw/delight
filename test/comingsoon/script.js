
document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);


    gsap.from(".black", {
        scrollTrigger: {
            trigger: ".image",
            scrub: true,
            start: "top bottom",
            end: "top top",
            onUpdate() {
                console.log("Update")
            }
        },
        scaleY: 0,
        transformOrigin: "left center",
        ease: "none"
    });



    gsap.from("section.red .text", {
        x: -500,
        opacity: 0,
        scrollTrigger: {
            trigger: "section.red",
            start:"top 50%",
            toggleActions: "play none none reset",
            // markers:true
        },
    });








// Only necessary to correct marker position - not needed in production
    if (document.querySelector('.gsap-marker-scroller-start')) {
        const markers = gsap.utils.toArray('[class *= "gsap-marker"]');

        bodyScrollBar.addListener(({ offset }) => {
            gsap.set(markers, { marginTop: -offset.y })
        });
    }

});

