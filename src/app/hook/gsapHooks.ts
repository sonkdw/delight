import { RefObject, useEffect } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

export function useSectionStaggerAnim(
  sectionRef: RefObject<HTMLElement | null>,
  styles: { [key: string]: string }
) {
  useEffect(() => {
    if (!sectionRef.current) return;

    const slideText = sectionRef.current.querySelectorAll(`.${styles.slideText}`);
    gsap.from(slideText, {
      opacity: 1,
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
      opacity: 0,
      y: 100,
      scale: 1,
      // stagger: 0.15,
      duration: 1.5,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 60%',
        toggleActions: 'play none none reverse',
        scrub: false,
      },
    });

    const cardImg2 = sectionRef.current.querySelectorAll(`.${styles.cardImg2}`);
    gsap.from(cardImg2, {
      opacity: 1,
      y: 200,
      scale: 1,
      duration: 0.5,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top -30%',
        toggleActions: 'play none none reverse',
        scrub: false,
      },
    });

    const cardSlowImg = sectionRef.current.querySelectorAll(`.${styles.cardSlowImg}`);
    gsap.from(cardSlowImg, {
      opacity: 1,
      y: 300,
      scale: 1,
      duration: 0.5,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: sectionRef.current,
        toggleActions: 'play none none reverse',
        scrub: true,
      },
    });

    const cardSlowImg2 = sectionRef.current.querySelectorAll(`.${styles.cardSlowImg2}`);
    gsap.from(cardSlowImg2, {
      opacity: 1,
      y: 300,
      scale: 1,
      duration: 0.5,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: sectionRef.current,
        toggleActions: 'play none none reverse',
        scrub: true,
      },
    });

    const cardImgIn = sectionRef.current.querySelectorAll(`.${styles.cardImg} img`);
    gsap.from(cardImgIn, {
      y: 80,
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

export function useImageFadeSwitch(
  triggerRef: React.RefObject<HTMLElement | null>,
  styles: { [key: string]: string },
  setShowScrollBar: React.Dispatch<React.SetStateAction<boolean>>
) {
  useEffect(() => {
    if (!triggerRef.current) return;

    const bg1 = triggerRef.current.querySelector(`.${styles.blindBg1}`);
    const bg2 = triggerRef.current.querySelector(`.${styles.blindBg2}`);
    const bg3 = triggerRef.current.querySelector(`.${styles.blind}`);

    // 초기 상태 세팅
    gsap.set(bg1, { opacity: 1 });
    gsap.set(bg2, { opacity: 0 });
    gsap.set(bg3, { opacity: 0 });

    // 구간1: bg1 → bg2 전환
    gsap.to(bg1, {
      opacity: 0,
      scrollTrigger: {
        trigger: triggerRef.current,
        start: 'top top', // 트리거 top이 뷰포트 top 닿을 때 시작
        end: 'bottom center',
        scrub: true,
      },
    });

    gsap.to(bg2, {
      opacity: 1,
      scrollTrigger: {
        trigger: triggerRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: true,
      },
    });

    gsap.to(bg3, {
      opacity: 1,
      scrollTrigger: {
        trigger: triggerRef.current,
        start: `+=200`,
        end: '+=200',
        scrub: true,
        onUpdate: () => {
          // 실시간으로 blind의 opacity 값을 체크
          const currentOpacity = Number(gsap.getProperty(bg3, 'opacity'));
          if (currentOpacity > 0.6) {
            setShowScrollBar(true);
          } else {
            setShowScrollBar(false);
          }
        },
      },
    });

    // 클린업
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [triggerRef, styles]);
}

export function useShowTextAnimation(
  textRef: React.RefObject<HTMLElement | null>,
  delay: number = 0 // 기본값 0
) {
  useEffect(() => {
    if (!textRef.current) return;
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay: delay,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
        },
      }
    );
    // 클린업: 컴포넌트 언마운트시 ScrollTrigger 제거
    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, [textRef, delay]);
}
