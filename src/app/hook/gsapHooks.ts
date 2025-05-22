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
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    const cardImg = sectionRef.current.querySelectorAll(`.${styles.cardImg}`);
    gsap.from(cardImg, {
      opacity: 1,
      y: 100,
      scale: 1,
      stagger: 0.18,
      duration: 1.5,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 40%',
        toggleActions: 'play none none reverse',
        scrub: false,
      },
    });

    const cardImgIn = sectionRef.current.querySelectorAll(`.${styles.cardImg} img`);

    gsap.from(cardImgIn, {
      y: 100,
      stagger: 0.18,
      duration: 1,
      ease: 'power3.inOut',
      scale: 1.4,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
        scrub: true,
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
  triggerRef: React.RefObject<HTMLElement | null>,
  styles: { [key: string]: string }
) {
  useEffect(() => {
    if (!triggerRef.current) return;

    // 1. 두 번째 이미지를 오른쪽 바깥에 배치
    gsap.set(`.${styles.blindBg2}`, {
      xPercent: 100, // 처음에 화면 밖(오른쪽)
      opacity: 1, // 오퍼시티 고정 (밀려오는 효과에 집중)
    });

    // 2. 스크롤/휠 시 중앙으로 슬라이드
    gsap.to(`.${styles.blindBg2}`, {
      xPercent: 0, // 가운데로 이동
      ease: 'expo.inOut',
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
