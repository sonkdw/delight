import { RefObject, useEffect } from 'react';
import gsap from 'gsap';

export function useSectionStaggerAnim(
  sectionRef: RefObject<HTMLElement | null>,
  styles: { [key: string]: string }
) {
  useEffect(() => {
    if (!sectionRef.current) return;

    const slideText = sectionRef.current.querySelectorAll(`.${styles.slideText}`);
    gsap.from(slideText, {
      opacity: 0,
      y: 60,
      stagger: 0.18,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    const cardImg = sectionRef.current.querySelectorAll(`.${styles.cardImg}`);
    gsap.from(cardImg, {
      opacity: 0,
      y: 60,
      stagger: 0.18,
      duration: 1.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 40%',
        toggleActions: 'play none none reverse',
      },
    });

    const cardText = sectionRef.current.querySelectorAll(`.${styles.cardText}`);
    gsap.from(cardText, {
      opacity: 0,
      y: 60,
      stagger: 0.18,
      duration: 1.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 5%',
        toggleActions: 'play none none reverse',
      },
    });
  }, [sectionRef, styles]);
}

export function usePinnedImageSwitch(
  triggerRef: RefObject<HTMLElement | null>,
  styles: { [key: string]: string }
) {
  useEffect(() => {
    if (!triggerRef.current) return;

    // 두 번째 이미지에만 효과 적용
    gsap.to(`.${styles.blindBg2}`, {
      opacity: 1,
      scrollTrigger: {
        trigger: triggerRef.current,
        start: 'top top',
        end: '+=500',
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });
  }, [triggerRef, styles]);
}
