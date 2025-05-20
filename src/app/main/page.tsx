'use client';

import { useEffect, useRef } from 'react';
import styles from '../styles/Main.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MainPage() {
  const img1Ref = useRef<HTMLDivElement | null>(null);
  const img2Ref = useRef<HTMLDivElement | null>(null);
  const img3Ref = useRef<HTMLDivElement | null>(null);
  const img4Ref = useRef<HTMLDivElement | null>(null);
  const img5Ref = useRef<HTMLDivElement | null>(null);
  const img6Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 기준이 되는 스크롤러(부모 div) 정의. 없으면 document.body 사용.
    const scrollSection = document.body;

    // 이미지1 등장 → 퇴장 (0%~15%)
    gsap.fromTo(
      img1Ref.current,
      { scale: 0.6, opacity: 1 },
      {
        scale: 2, // 커졌다가 사라지는 느낌이면 scale: 2, 사라지게만 할거면 scale:1로 유지
        opacity: 0,
        ease: 'expo.inOut',
        scrollTrigger: {
          trigger: scrollSection,
          start: '0% top', // 전체 스크롤 시작
          end: '15% top',
          scrub: true,
        },
      }
    );
    // 퇴장
    gsap.to(img1Ref.current, {
      scale: 2,
      opacity: 0,
      ease: 'expo.inOut',
      scrollTrigger: {
        trigger: scrollSection,
        start: '15% top',
        end: '0% top',
        scrub: true,
      },
    });

    // 이미지2 등장(2%) → 퇴장(17%)
    gsap.fromTo(
      img2Ref.current,
      { scale: 0.3, opacity: 1 },
      {
        scale: 2,
        opacity: 0,
        ease: 'expo.inOut',
        scrollTrigger: {
          trigger: scrollSection,
          start: '2% top',
          end: '17% top',
          scrub: true,
        },
      }
    );
    // 퇴장
    gsap.to(img2Ref.current, {
      scale: 2,
      opacity: 0,
      ease: 'expo.inOut',
      scrollTrigger: {
        trigger: scrollSection,
        start: '17% top',
        end: '2% top',
        scrub: true,
      },
    });

    // 이미지3 등장(5%) → 퇴장(30%)
    gsap.fromTo(
      img3Ref.current,
      { scale: 0.3, opacity: 1 },
      {
        scale: 2,
        opacity: 0,
        ease: 'expo.inOut',
        scrollTrigger: {
          trigger: scrollSection,
          start: '5% top',
          end: '30% top',
          scrub: true,
        },
      }
    );
    // 퇴장
    gsap.to(img3Ref.current, {
      scale: 2,
      opacity: 0,
      ease: 'expo.inOut',
      scrollTrigger: {
        trigger: scrollSection,
        start: '30% top',
        end: '5% top',
        scrub: true,
      },
    });

    // 이미지4 등장(7%) → 퇴장(40%)
    gsap.fromTo(
      img4Ref.current,
      { scale: 0.3, opacity: 1 },
      {
        scale: 2,
        opacity: 0,
        ease: 'expo.inOut',
        scrollTrigger: {
          trigger: scrollSection,
          start: '7% top',
          end: '40% top',
          scrub: true,
        },
      }
    );
    // 퇴장
    gsap.to(img4Ref.current, {
      scale: 2,
      opacity: 0,
      ease: 'expo.inOut',
      scrollTrigger: {
        trigger: scrollSection,
        start: '40% top',
        end: '7% top',
        scrub: true,
      },
    });

    // 이미지5 등장(10%) → 퇴장(50%)
    gsap.fromTo(
      img5Ref.current,
      { scale: 0.3, opacity: 1 },
      {
        scale: 2,
        opacity: 0,
        ease: 'expo.inOut',
        scrollTrigger: {
          trigger: scrollSection,
          start: '10% top',
          end: '50% top',
          scrub: true,
        },
      }
    );
    // 퇴장
    gsap.to(img5Ref.current, {
      scale: 2,
      opacity: 0,
      ease: 'expo.inOut',
      scrollTrigger: {
        trigger: scrollSection,
        start: '50% top',
        end: '10% top',
        scrub: true,
      },
    });

    // 이미지6 등장(15%) → 퇴장(60%)
    gsap.fromTo(
      img6Ref.current,
      { scale: 0.3, opacity: 1 },
      {
        scale: 2,
        opacity: 0,
        ease: 'expo.inOut',
        scrollTrigger: {
          trigger: scrollSection,
          start: '15% top',
          end: '60% top',
          scrub: true,
        },
      }
    );
    // 퇴장
    gsap.to(img6Ref.current, {
      scale: 2,
      opacity: 0,
      ease: 'expo.inOut',
      scrollTrigger: {
        trigger: scrollSection,
        start: '60% top',
        end: '15% top',
        scrub: true,
      },
    });

    // 클린업
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.centerTitle}>딜라이트 서울</div>

      <div ref={img1Ref} className={`${styles.image} ${styles.img1}`}>
        <img src="/images/test-image1.png" alt="img1" className={styles.img} />
      </div>
      <div ref={img2Ref} className={`${styles.image} ${styles.img2}`}>
        <img src="/images/test-image2.png" alt="img2" className={styles.img} />
      </div>
      <div ref={img3Ref} className={`${styles.image} ${styles.img3}`}>
        <img src="/images/test-image1.png" alt="img3" className={styles.img} />
      </div>
      <div ref={img4Ref} className={`${styles.image} ${styles.img4}`}>
        <img src="/images/test-image1.png" alt="img4" className={styles.img} />
      </div>
      <div ref={img5Ref} className={`${styles.image} ${styles.img5}`}>
        <img src="/images/test-image1.png" alt="img5" className={styles.img} />
      </div>
      <div ref={img6Ref} className={`${styles.image} ${styles.img6}`}>
        <img src="/images/test-image2.png" alt="img6" className={styles.img} />
      </div>
    </div>
  );
}
