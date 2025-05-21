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

    // 이미지1 등장 → 퇴장 (0%~30%)
    gsap.fromTo(
      img1Ref.current,
      { scale: 0.6, opacity: 0, x: 0 },
      {
        scale: 1.2, // 커졌다가 사라지는 느낌이면 scale: 2, 사라지게만 할거면 scale:1로 유지
        opacity: 1,
        x: -100, // 왼쪽으로 300px 이동
        ease: 'expo.inOut',
        scrollTrigger: {
          trigger: scrollSection,
          start: '0% top', // 전체 스크롤 시작
          end: '30% top',
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
        start: '30% top',
        end: '0% top',
        scrub: true,
      },
    });

    // 이미지2 등장(2%) → 퇴장(45%)
    gsap.fromTo(
      img2Ref.current,
      { scale: 0.3, opacity: 1, y: 0 },
      {
        scale: 2,
        opacity: 0,
        y: -200,
        ease: 'expo.inOut',
        scrollTrigger: {
          trigger: scrollSection,
          start: '2% top',
          end: '45% top',
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
        start: '45% top',
        end: '2% top',
        scrub: true,
      },
    });

    // 이미지3 등장(5%) → 퇴장(50%)
    gsap.fromTo(
      img3Ref.current,
      { scale: 0.3, opacity: 1, x: 0, y: 0 },
      {
        scale: 2,
        opacity: 0,
        x: 200,
        y: -300,
        ease: 'expo.inOut',
        scrollTrigger: {
          trigger: scrollSection,
          start: '5% top',
          end: '50% top',
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
        start: '50% top',
        end: '5% top',
        scrub: true,
      },
    });

    // 이미지4 등장(7%) → 퇴장(60%)
    gsap.fromTo(
      img4Ref.current,
      { scale: 0.3, opacity: 1, x: 0, y: 0 },
      {
        scale: 2,
        opacity: 0,
        x: 300,
        y: -100,
        ease: 'expo.inOut',
        scrollTrigger: {
          trigger: scrollSection,
          start: '7% top',
          end: '60% top',
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
        start: '60% top',
        end: '7% top',
        scrub: true,
      },
    });

    // 이미지5 등장(10%) → 퇴장(70%)
    gsap.fromTo(
      img5Ref.current,
      { scale: 0.3, opacity: 1, x: 0, y: 0 },
      {
        scale: 2,
        opacity: 0,
        x: -300,
        y: 100,
        ease: 'expo.inOut',
        scrollTrigger: {
          trigger: scrollSection,
          start: '10% top',
          end: '70% top',
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
        start: '70% top',
        end: '10% top',
        scrub: true,
      },
    });

    // 이미지6 등장(15%) → 퇴장(80%)
    gsap.fromTo(
      img6Ref.current,
      { scale: 0.3, opacity: 1, x: 0, y: 0 },
      {
        scale: 2,
        opacity: 0,
        x: 300,
        y: 200,
        ease: 'expo.inOut',
        scrollTrigger: {
          trigger: scrollSection,
          start: '15% top',
          end: '80% top',
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
        start: '80% top',
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
    <>

    <div className={styles.sectionTop}>
      <div className={styles.wrapper}>
        <p className={styles.text}>2025</p>
        <h1 className={styles.logo}>
          <img src="/images/logo.png" alt="" />
        </h1>
      </div>
    </div>

      <div className={styles.sectionInfo}>
        <div className={styles.wrapper}>
          <p className={styles.textRight}>2025. 5. 8 - 2025. 11. 15</p>

          <div className={styles.infoCard}>
            <div className={styles.cardImg}>
              <img src="/images/bg-low.jpg" alt="img1" />
            </div>
            <div className={styles.cardText}>
              도시는 어둡고도 찬란하며, 차갑고도 뜨겁다.<br />
              소란스러우나 고요하고, 무심하지만 다정하다.
            </div>
          </div>

          <div className={styles.infoCardFloating}>
            <div className={styles.floatingBox}>
              <div className={styles.keyImg}>
                <img src="/images/bg-low.jpg" alt="img2" />
              </div>
              <div className={styles.keyText}>
                Synchronicity<br />
                of Simulacra
              </div>
              <div className={`${styles.floatingImg} ${styles.floatingImgLeft}`}>
                <img src="/images/bg-low.jpg" alt="img2" />
              </div>
              <div className={`${styles.floatingImg} ${styles.floatingImgRight}`}>
                <img src="/images/bg-low.jpg" alt="img2" />
              </div>

              <div className={styles.subText}>
                정보의 고정성과 유동성,<br />
                물질성과 비물질성이 교차하는<br />
                현대 도시의 복합적 정체성
              </div>

            </div>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.cardImg}>
              <img src="/images/bg-low.jpg" alt="img1" />
            </div>
            <div className={styles.cardText}>
              도시성과 인간의 감각적 경험
            </div>
          </div>

        </div>
      </div>


      <div className={styles.sectionBg}>
        <img src="/images/bg-low.jpg" alt="" />
        <div className={styles.blind}>
          <h2>The past, present<br />
            and future of seoul</h2>
        </div>
      </div>


      <div className={styles.sectionInfo}>
        <div className={styles.wrapper}>

          <div className={styles.infoCard}>
            <div className={styles.cardText}>
              도시는 어둡고도 찬란하며, 차갑고도 뜨겁다.<br />
              소란스러우나 고요하고, 무심하지만 다정하다.
            </div>
            <div className={styles.cardImg}>
              <img src="/images/bg-low.jpg" alt="img1" />
            </div>

          </div>

          <div className={styles.infoCardDivide}>
            <div className={styles.subText}>
              빛의 기억, 어둠과 빛
            </div>
            <div className={styles.divideBox}>

              <div className={`${styles.divideImg} ${styles.divideImgLeft}`}>
                <img src="/images/bg-low.jpg" alt="img2" />
              </div>
              <div className={styles.keyText}>
                끊임없이 넘쳐흐르는<br />
                사각의 흐름
              </div>
              <div className={`${styles.divideImg} ${styles.divideImgRight}`}>
                <img src="/images/bg-low.jpg" alt="img2" />
              </div>

            </div>
          </div>

          <div className={styles.infoCard}>
            <p className={styles.marqueeText}>delight seoul 2025</p>
            <div className={styles.cardImg}>
              <img src="/images/bg-low.jpg" alt="img1" />
            </div>
            <div className={styles.cardText}>
              무엇이 숨겨지고 있고, 무엇이 드러나는가?<br />
              우리가 진실이라고 믿는 것은 어디까지인가?
            </div>
          </div>

        </div>
      </div>


      <div className={styles.sectionBg}>
        <img src="/images/bg-low.jpg" alt="" />
        <div className={styles.blind}>
          <h2>The past, present<br />
            and future of seoul</h2>
        </div>
      </div>

      <div className={styles.sectionInfo}>
        <div className={styles.wrapper}>

          <div className={styles.infoCard}>
            <div className={styles.cardImg}>
              <img src="/images/bg-low.jpg" alt="img1" />
            </div>
            <div className={styles.cardText}>
              우리가 기억하는 서울,<br />
              잊고 있었던 서울,<br />
              그리고 상상 속의 서울
            </div>
          </div>

          <div className={styles.infoCardFloating}>
            <div className={styles.floatingBox}>
              <div className={styles.keyImg}>
                <img src="/images/bg-low.jpg" alt="img2" />
              </div>
              <div className={styles.keyText}>
                Resonance
              </div>
              <div className={`${styles.floatingImg} ${styles.floatingImgLeft}`}>
                <img src="/images/bg-low.jpg" alt="img2" />
              </div>
              <div className={`${styles.floatingImg} ${styles.floatingImgRight}`}>
                <img src="/images/bg-low.jpg" alt="img2" />
              </div>

              <div className={styles.subText}>
                언어로 설명되기 전의 순간,<br />
                그 안에 숨어있는 진짜 아름다움은 무엇일까?
              </div>

            </div>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.cardImg}>
              <img src="/images/bg-low.jpg" alt="img1" />
            </div>
            <div className={styles.cardText}>
              축적된 서사와 데이터의 집합,<br />
              무의식적 기억의 형식
            </div>
          </div>

        </div>
      </div>






    <div className={styles.container}>
      <div className={styles.fixedBox}>
        <div className={styles.wrapper}>
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
      </div>
    </div>






      <div className={styles.sectionGrid}>
        <div className={styles.wrapper}>
          <div className={styles.gridWrap}>
            <div className={styles.gridBox}>
              <p className={styles.text}>DE</p>
              <div className={styles.img}>
                <img src="/images/bg-low.jpg" alt="img2" />
              </div>
            </div>
            <div className={styles.gridBox}>
              <p className={styles.text}>DE</p>
              <div className={styles.img}>
                <img src="/images/bg-low.jpg" alt="img2" />
              </div>
            </div>
            <div className={styles.gridBox}>
              <p className={styles.text}>DE</p>
              <div className={styles.img}>
                <img src="/images/bg-low.jpg" alt="img2" />
              </div>
            </div>
            <div className={styles.gridBox}>
              <p className={styles.text}>DE</p>
              <div className={styles.img}>
                <img src="/images/bg-low.jpg" alt="img2" />
              </div>
            </div>
            <div className={styles.gridBox}>
              <p className={styles.text}>DE</p>
              <div className={styles.img}>
                <img src="/images/bg-low.jpg" alt="img2" />
              </div>
            </div>
            <div className={styles.gridBox}>
              <p className={styles.text}>DE</p>
              <div className={styles.img}>
                <img src="/images/bg-low.jpg" alt="img2" />
              </div>
            </div>
            <div className={styles.gridBox}>
              <p className={styles.text}>DE</p>
              <div className={styles.img}>
                <img src="/images/bg-low.jpg" alt="img2" />
              </div>
            </div>
            <div className={styles.gridBox}>
              <p className={styles.text}>DE</p>
              <div className={styles.img}>
                <img src="/images/bg-low.jpg" alt="img2" />
              </div>
            </div>
            <div className={styles.gridBox}>
              <p className={styles.text}>DE</p>
              <div className={styles.img}>
                <img src="/images/bg-low.jpg" alt="img2" />
              </div>
            </div>
            <div className={styles.gridBox}>
              <p className={styles.text}>DE</p>
              <div className={styles.img}>
                <img src="/images/bg-low.jpg" alt="img2" />
              </div>
            </div>
            <div className={styles.gridBox}>
              <p className={styles.text}>DE</p>
              <div className={styles.img}>
                <img src="/images/bg-low.jpg" alt="img2" />
              </div>
            </div>
            <div className={styles.gridBox}>
              <p className={styles.text}>DE</p>
              <div className={styles.img}>
                <img src="/images/bg-low.jpg" alt="img2" />
              </div>
            </div>
            <div className={styles.gridBox}>
              <p className={styles.text}>DE</p>
              <div className={styles.img}>
                <img src="/images/bg-low.jpg" alt="img2" />
              </div>
            </div>
            <div className={styles.gridBox}>
              <p className={styles.text}>DE</p>
              <div className={styles.img}>
                <img src="/images/bg-low.jpg" alt="img2" />
              </div>
            </div>
            <div className={styles.gridBox}>
              <p className={styles.text}>DE</p>
              <div className={styles.img}>
                <img src="/images/bg-low.jpg" alt="img2" />
              </div>
            </div>
            <div className={styles.gridBox}>
              <p className={styles.text}>DE</p>
              <div className={styles.img}>
                <img src="/images/bg-low.jpg" alt="img2" />
              </div>
            </div>

          </div>
        </div>
      </div>


      <div className={styles.sectionFaq}>
        <div className={styles.wrapper}>
          <div className={styles.marqueeTitle}>FAQ FAQ FAQ </div>

          <div className={styles.accorWrap}>
            <div className={styles.accorCol}>
              <p className={styles.title}>제목</p>
              <div className={styles.accorDetail}>
                상세 내용
              </div>
            </div>
          </div>
        </div>
      </div>



      <div className={styles.sectionLocation}>
        <div className={styles.wrapper}>
          <div className={styles.marqueeTitle}>Location</div>

          <div className={styles.locationWrap}>
            <div className={styles.location}>지도</div>
            <div className={styles.textWrap}>
              <div className={styles.row}>
                <div className={styles.col}>
                  <p>서울 종로구 율곡로 18
                    도화서길디원</p>
                </div>
                <div className={styles.col}>
                  <p>2025년 5월 8일부터<br />
                    11월 15일까지</p>
                  <p>오전 10:00 ~ 오후 20:00<br />
                    연중무휴</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      <footer className={styles.footer}>
        <div className={styles.wrapper}>
          <div className={styles.footerLogo}>
            <img src="/images/bg-low.jpg" alt="img1" />
          </div>
          <div className={styles.footerLogo}>
            <img src="/images/bg-low.jpg" alt="img1" />
          </div>
          <div className={styles.footerLogo}>
            <img src="/images/bg-low.jpg" alt="img1" />
          </div>
          <div className={styles.footerLogo}>
            <img src="/images/bg-low.jpg" alt="img1" />
          </div>
        </div>
      </footer>





        </>




  );
}
