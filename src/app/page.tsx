'use client';

import Image from 'next/image';
import styles from './styles/ComingSoon.module.css';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';


// app/page.tsx
import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/main')
}

// export default function ComingSoonPage() {
//   const infoTextRef = useRef<HTMLParagraphElement>(null);
//   const comingSoonRef = useRef<HTMLParagraphElement>(null);

//   useEffect(() => {
//     gsap.registerPlugin(ScrollTrigger);
//     const topInfo = document.querySelector(`.${styles.topInfo}`);
//     const overlay = document.querySelector(`.${styles.overlay}`);

//     // 검정색 영역의 높이를 줄이는 gsap
//     if (topInfo) {
//       gsap.to(topInfo, {
//         height: '60vh',
//         ease: 'power2.out',
//         scrollTrigger: {
//           trigger: topInfo,
//           start: 'top top', // 시작 지점
//           end: 'bottom top', // 끝나는 시점
//           scrub: true, // 스크롤에 따라 애니메이션 연동
//         },
//       });
//     }

//     // 곧 웹사이트에서도... 텍스트 애니메이션
//     if (topInfo && infoTextRef.current) {
//       gsap.set(infoTextRef.current, { opacity: 0, y: 4 });

//       let isShown = false; // 현재 텍스트가 보이는지 여부 플래그

//       ScrollTrigger.create({
//         trigger: topInfo,
//         start: 'top top',
//         end: 'bottom top',
//         scrub: true,
//         onUpdate: (self) => {
//           const progress = self.progress;
//           console.log(progress);
//           // 스크롤 내릴때 텍스트 등장
//           if (progress >= 0.5 && !isShown) {
//             isShown = true;
//             gsap.to(infoTextRef.current, {
//               opacity: 1,
//               y: 0,
//               duration: 1,
//               ease: 'power3.out',
//             });
//             // 스크롤 올릴때 텍트스 사라짐
//           } else if (progress < 0.5 && isShown) {
//             isShown = false;
//             gsap.to(infoTextRef.current, {
//               opacity: 0,
//               y: 4,
//               duration: 0.2,
//               //delay: 0.5, comingsoon 이후 0.5초 뒤에 사라짐
//               ease: 'power3.in',
//             });
//           }
//         },
//       });
//     }

//     // Coming Soon 애니메이션
//     if (topInfo && comingSoonRef.current) {
//       gsap.set(comingSoonRef.current, { opacity: 0, y: 4 });

//       let isShown = false;

//       ScrollTrigger.create({
//         trigger: topInfo,
//         start: 'top top',
//         end: 'bottom top',
//         scrub: true,
//         onUpdate: (self) => {
//           const progress = self.progress;

//           if (progress >= 0.5 && !isShown) {
//             isShown = true;
//             gsap.to(comingSoonRef.current, {
//               opacity: 1,
//               y: 0,
//               duration: 1,
//               delay: 0.5, // "곧 웹사이트에서도..." 이후 0.5초 뒤에 등장
//               ease: 'power3.out',
//             });
//             // 글자가 보이면 글자 숨김 처리
//           } else if (progress < 0.5 && isShown) {
//             isShown = false;
//             gsap.to(comingSoonRef.current, {
//               opacity: 0,
//               y: 4,
//               duration: 0.2,
//               ease: 'power3.in',
//             });
//           }
//         },
//       });
//     }

//     // 오버레이 블러 & 어둡게 처리
//     if (overlay) {
//       gsap.to(overlay, {
//         backgroundColor: 'rgba(0, 0, 0, 1)', // 어둡게 처리
//         backdropFilter: 'blur(5px)', // 블러정도 처리
//         ease: 'none',
//         scrollTrigger: {
//           trigger: `.${styles.bgBox}`,
//           start: 'top 90%',
//           end: 'bottom top',
//           scrub: true,
//         },
//       });
//     }
//   }, []);

//   return (
//     <div className={styles.container}>
//       <div className={styles.topInfo}>
//         <div className={styles.wrapper}>
//           {/* 화면 */}
//           <>
//             <div className={styles.nowOnInfo}>
//               <div className={styles.badgeWrap}>
//                 <span className={styles.badge}>NOW ON</span>
//               </div>
//               <div className={styles.year}>
//                 20 <br /> 25
//               </div>
//               <div className={styles.schedule}>
//                 <p>5월8일부터 11월15일까지</p>
//                 <p>10:00 - 20:00, 연중무휴</p>
//               </div>
//             </div>

//             <header className={styles.header}>
//               <div className={styles.logo}>
//                 <Image src="/images/logo.png" alt="Delight Seoul 2025" width={240} height={80} />
//               </div>
//             </header>

//             <div className={styles.locationWrap}>
//               <p className={styles.location}>
//                 서울 종로구 <br />
//                 율곡로 18 <br />
//                 도화서길디원
//               </p>
//             </div>
//           </>
//         </div>
//       </div>

//       {/* 하단 배경 */}
//       <div className={styles.bgBox}>
//         <div className={styles.overlay} /> {/* 화면 어둡게 + 블러처리를 위한 오버레이 */}
//         <div className={styles.bgBoxWrapper}>

//           {/* text */}
//           <div className={styles.comingsoonWrap}>
//             <p className={styles.comingsoonInfoText} ref={infoTextRef}>
//               곧, 웹사이트에서도 <br />
//               딜라이트 서울 정보를 <br />
//               만나보실 수 있습니다.
//             </p>
//             <p className={styles.comingsoonText} ref={comingSoonRef}>
//               Coming soon...
//             </p>
//           </div>

//         </div>
//       </div>


//     </div>
//   );
// }