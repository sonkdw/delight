'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './styles/ComingSoon.module.css';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

export default function ComingSoonPage() {
  const infoTextRef = useRef<HTMLParagraphElement>(null);
  const comingSoonRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // 곧 웹사이트에서도... 텍스트 애니메이션
    if (infoTextRef.current) {
      gsap.from(infoTextRef.current, {
        opacity: 0,
        y: 50,
        duration: 1.5, // 애니메이션 지속 시간
        ease: 'power3.out',
        scrollTrigger: {
          trigger: infoTextRef.current, // 텍스트가 보이면 트리거
          start: 'top 80%',
          toggleActions: 'play reverse play reverse', // 애니메이션이 한번만 실행되길 원하면 play none none none 옵션 사용
        },
      });
    }

    // Coming Soon 애니메이션
    if (comingSoonRef.current) {
      gsap.from(comingSoonRef.current, {
        opacity: 0,
        y: 30,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: comingSoonRef.current,
          start: 'top 100%',
          toggleActions: 'play reverse play reverse',
        },
      });
    }

    // 오버레이 블러 & 어둡게 처리
    const overlay = document.querySelector(`.${styles.overlay}`);
    if (overlay) {
      gsap.to(overlay, {
        backgroundColor: 'rgba(0, 0, 0, 1)', // 어둡게 처리
        backdropFilter: 'blur(25px)', // 블러정도 처리
        ease: 'none',
        scrollTrigger: {
          trigger: `.${styles.bgBox}`,
          start: 'top 90%',
          end: 'bottom top',
          scrub: true,
        },
      });
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* 화면 */}
        <>
          <div className={styles.nowOnInfo}>
            <div className={styles.badgeWrap}>
              <span className={styles.badge}>NOW ON</span>
            </div>
            <div className={styles.year}>
              20 <br /> 25
            </div>
            <div className={styles.schedule}>
              <p>5월8일부터 11월15일까지</p>
              <p>10:00 - 17:00, 연중무휴</p>
            </div>
          </div>

          <header className={styles.header}>
            <div className={styles.logo}>
              <Image src="/images/logo.png" alt="Delight Seoul 2025" width={240} height={80} />
            </div>

            <Link href="#" target="_blank" className={styles.buyButton}>
              티켓 구매하기
            </Link>
          </header>

          <div className={styles.locationWrap}>
            <p className={styles.location}>
              서울 종로구 <br />
              율곡로 18 <br />
              도화서길디원
            </p>
          </div>
        </>
      </div>

      {/* 하단 배경 */}
      <div className={styles.bgBox}>
        <div className={styles.overlayWrap}>
          <div className={styles.overlay} /> {/* 화면 어둡게 + 블러처리를 위한 오버레이 */}
          <div className={styles.wrapper}>
            <p className={styles.schedule} ref={infoTextRef}>
              곧, 웹사이트에서도 <br />
              딜라이트 서울 정보를 만나보실 수 있습니다.
            </p>
            <p className={styles.location} ref={comingSoonRef}>
              Coming soon...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
