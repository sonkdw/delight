'use client';

import { useEffect, useRef, useState } from 'react';
import styles from '../styles/Main.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { SplitText } from 'gsap/SplitText';
import { usePinnedImageSwitch, useSectionStaggerAnim } from '../hook/gsapHooks';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
gsap.registerPlugin(SplitText);

const faqList = [
  {
    question: '입장권은 어디에서 구매할 수 있나요?',
    answer: '답변',
  },
  {
    question: '관람 시 사전 예약이 필요한가요?',
    answer: '답변',
  },
  {
    question: '운영시간이 궁금합니다.',
    answer: '답변',
  },
  {
    question: '찾아가는 방법은 어디서 확인하나요?',
    answer: '답변',
  },
  {
    question: '입장 후 나갔다가 재입장이 가능한가요?',
    answer: '답변',
  },
  {
    question: '반려동물 동반 입장이 가능한가요?',
    answer:
      '관람객 안전 및 쾌적한 전시환경을 위해 실내 및 야외전시장에 반려동물 출입을 제한하고 있습니다. 단, 시각 장애인 안내견은 출입이 가능합니다.',
  },
];

export default function MainPage() {
  const img1Ref = useRef<HTMLDivElement | null>(null);
  const img2Ref = useRef<HTMLDivElement | null>(null);
  const img3Ref = useRef<HTMLDivElement | null>(null);
  const img4Ref = useRef<HTMLDivElement | null>(null);
  const img5Ref = useRef<HTMLDivElement | null>(null);
  const img6Ref = useRef<HTMLDivElement | null>(null);
  const textRef = useRef(null);
  const logoRef = useRef(null);
  const sectionTopRef = useRef(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cardImgRef = useRef(null);
  const cardImg2Ref = useRef(null);
  const section5Ref = useRef(null);
  const section6Ref = useRef(null);
  const section7Ref = useRef(null);
  const section8Ref = useRef(null);
  const cardScaleContainerRef = useRef<HTMLDivElement>(null);

  const faqMarqueeRef = useRef<HTMLDivElement>(null);

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const handleFaqToggle = (idx: number) => {
    setOpenFaqIndex(idx === openFaqIndex ? null : idx);
  };

  // 스크롤 스무더
  useEffect(() => {
    const smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.2, // 부드러움 정도, 1~2 추천
      effects: true, // 패럴랙스 효과용, 기본 true
    });

    // cleanup
    return () => {
      if (smoother) smoother.kill();
    };
  }, []);

  // 로고 텍스트 스플릿
  useEffect(() => {
    const split = new SplitText(textRef.current, { type: 'words' });
    const tl = gsap.timeline();

    // 1. 텍스트 등장
    tl.from(split.words, {
      opacity: 0,
      y: 40,
      stagger: 0,
      duration: 1,
      ease: 'expo.out',
    });

    // 2. 로고 등장 (텍스트 끝나고)
    tl.fromTo(
      logoRef.current,
      { y: 100 },
      {
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: 'power2.out',
      },
      '+=0.1'
    );

    // 3. 로고 퇴장
    // tl.to(logoRef.current, {
    //   opacity: 0,
    //   y: -30,
    //   duration: 0.6,
    //   ease: 'expo.in',
    // });

    // 4. 텍스트 퇴장 (로고 퇴장 끝나고 바로)
    // tl.to(split.chars, {
    //   opacity: 0,
    //   y: -30,
    //   duration: 0.6,
    //   stagger: 0.02,
    //   ease: 'expo.in',
    // });

    return () => split.revert();
  }, []);

  // 첫번째 섹션 검정색 영역의 높이를 줄이는 gsap
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sectionTop = sectionTopRef.current;

    if (sectionTop) {
      gsap.to(sectionTop, {
        height: '0vh',
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionTop,
          start: 'top top',
          end: 'bottom top',
          scrub: false,
        },
      });
    }
  }, []);

  // 두번째 섹션 텍스트와 이미지가 순차적으로 나오는 모션
  useSectionStaggerAnim(sectionRef, styles);

  // 네번째 섹션 스크롤 시 이미지 교체 모션
  usePinnedImageSwitch(cardImgRef, styles);
  usePinnedImageSwitch(cardImg2Ref, styles);

  useSectionStaggerAnim(section5Ref, styles);
  useSectionStaggerAnim(section6Ref, styles);
  useSectionStaggerAnim(section7Ref, styles);
  useSectionStaggerAnim(section8Ref, styles);

  // 이미지 날라오는 모션
  useEffect(() => {
    if (!cardScaleContainerRef.current) return;
    // 기준이 되는 스크롤러(부모 div) 정의.
    const scrollSection = cardScaleContainerRef.current;

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
          pin: true,
          anticipatePin: 1,
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

  // faq 마퀴
  useEffect(() => {
    if (!faqMarqueeRef.current) return;
    gsap.fromTo(
      faqMarqueeRef.current,
      { x: 0, y: 0, rotate: -5 },
      {
        x: '-50vw', // 이동거리
        rotate: -5,
        ease: 'none',
        scrollTrigger: {
          trigger: faqMarqueeRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        {/* 첫번쨰 섹션 */}
        <>
          <div ref={sectionTopRef} className={styles.sectionTop}>
            <div className={styles.wrapper}>
              <p className={styles.text}>
                <span ref={textRef}>2025</span>
              </p>
              <h1 className={styles.logo}>
                <img ref={logoRef} src="/images/logo.png" alt="logo" />
              </h1>
              <div className={styles.scrollBar}>
                <span>SCROLL</span>
                <div className={styles.bar}></div>
              </div>
            </div>
          </div>

          {/* 검정색 영역 걷히면 나타나는 동영상 영역*/}
          <div className={styles.bgBox}></div>
        </>

        <div className={styles.sectionInfo}>
          <div className={styles.wrapper}>
            {/* 두번째 섹션 */}
            <div ref={sectionRef}>
              <p className={`${styles.textRight} ${styles.slideText}`}>2025. 5. 8 - 2025. 11. 15</p>

              <div className={styles.infoCard}>
                <div className={styles.cardImg}>
                  <img src="/images/main/info01.jpg" alt="info01" />
                </div>
                <div className={styles.cardText}>
                  도시는 어둡고도 찬란하며, 차갑고도 뜨겁다.
                  <br />
                  소란스러우나 고요하고, 무심하지만 다정하다.
                </div>
              </div>
            </div>

            {/* 세번째 섹션 */}
            <div className={styles.infoCardFloating}>
              <div className={styles.floatingBox}>
                <div className={styles.keyImg}>
                  <img src="/images/main/info02.jpg" alt="info02" />
                </div>
                <div className={styles.keyText}>
                  Synchronicity
                  <br />
                  of Simulacra
                </div>
                <div className={`${styles.floatingImg} ${styles.floatingImgLeft}`}>
                  <img src="/images/main/info03.jpg" alt="info03" />
                </div>
                <div className={`${styles.floatingImg} ${styles.floatingImgRight}`}>
                  <img src="/images/main/info04.jpg" alt="info04" />
                </div>

                <div className={styles.subText}>
                  정보의 고정성과 유동성,
                  <br />
                  물질성과 비물질성이 교차하는
                  <br />
                  현대 도시의 복합적 정체성
                </div>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.cardImg}>
                <img src="/images/main/info05.jpg" alt="info05" />
              </div>
              <div className={styles.cardText}>도시성과 인간의 감각적 경험</div>
            </div>
          </div>
        </div>

        {/* 네번째 섹션 */}
        <div ref={cardImgRef} className={styles.sectionBg}>
          <img src="/images/main/bg01.jpg" alt="bg01" className={styles.blindBg1} />
          {/* 이미지2: 바뀔 이미지 (초기 opacity: 0) */}
          <img src="/images/main/bg02.jpg" alt="bg02" className={styles.blindBg2} />
          <div className={styles.blind}>
            <h2>
              The past, present
              <br />
              and future of seoul
            </h2>
          </div>
        </div>

        {/* 다섯번째 섹션 */}
        <div className={`${styles.sectionInfo} ${styles.marginTopVh}`}>
          <div className={styles.wrapper}>
            <div ref={section5Ref} className={styles.infoCard}>
              <div className={`${styles.slideText}`}>
                도시는 어둡고도 찬란하며, 차갑고도 뜨겁다.
                <br />
                소란스러우나 고요하고, 무심하지만 다정하다.
              </div>
              <div className={styles.cardImg}>
                <img src="/images/main/info06.jpg" alt="info06" />
              </div>
            </div>

            <div ref={section6Ref} className={styles.infoCardDivide}>
              <div className={`${styles.subText} ${styles.slideText}`}>빛의 기억, 어둠과 빛</div>
              <div className={styles.divideBox}>
                <div className={`${styles.divideImg} ${styles.divideImgLeft}`}>
                  <img src="/images/main/info07.jpg" alt="info07" />
                </div>
                <div className={`${styles.keyText} ${styles.slideText}`}>
                  끊임없이 넘쳐흐르는
                  <br />
                  사각의 흐름
                </div>
                <div className={`${styles.divideImg} ${styles.divideImgRight}`}>
                  <img src="/images/main/info08.jpg" alt="info08" />
                </div>
              </div>
            </div>

            <div ref={section7Ref} className={styles.infoCard}>
              <p className={styles.marqueeText}>delight seoul 2025</p>
              <div className={styles.cardImg}>
                <img src="/images/main/info09.jpg" alt="info09" />
              </div>
              <div className={`${styles.slideText}`}>
                무엇이 숨겨지고 있고, 무엇이 드러나는가?
                <br />
                우리가 진실이라고 믿는 것은 어디까지인가?
              </div>
            </div>
          </div>
        </div>

        <div ref={cardImg2Ref} className={styles.sectionBg}>
          <img src="/images/main/bg03.jpg" alt="bg03" className={styles.blindBg1} />
          <img src="/images/main/bg04.jpg" alt="bg04" className={styles.blindBg2} />
          <div className={styles.blind}>
            <h2>
              The past, present
              <br />
              and future of seoul
            </h2>
          </div>
        </div>

        <div ref={section8Ref} className={`${styles.sectionInfo} ${styles.marginTopVh}`}>
          <div className={styles.wrapper}>
            <div className={styles.infoCard}>
              <div className={styles.cardImg}>
                <img src="/images/main/info10.jpg" alt="info10" />
              </div>
              <div className={styles.cardText}>
                우리가 기억하는 서울,
                <br />
                잊고 있었던 서울,
                <br />
                그리고 상상 속의 서울
              </div>
            </div>

            <div className={styles.infoCardFloating}>
              <div className={styles.floatingBox}>
                <div className={styles.keyImg}>
                  <img src="/images/bg-low.jpg" alt="img2" />
                </div>
                <div className={styles.keyText}>Resonance</div>
                <div className={`${styles.floatingImg} ${styles.floatingImgLeft}`}>
                  <img src="/images/bg-low.jpg" alt="img2" />
                </div>
                <div className={`${styles.floatingImg} ${styles.floatingImgRight}`}>
                  <img src="/images/bg-low.jpg" alt="img2" />
                </div>

                <div className={styles.subText}>
                  언어로 설명되기 전의 순간,
                  <br />그 안에 숨어있는 진짜 아름다움은 무엇일까?
                </div>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.cardImg}>
                <img src="/images/bg-low.jpg" alt="img1" />
              </div>
              <div className={styles.cardText}>
                축적된 서사와 데이터의 집합,
                <br />
                무의식적 기억의 형식
              </div>
            </div>
          </div>
        </div>

        <div ref={cardScaleContainerRef} className={styles.container}>
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
                  <img src="/images/main/grid-img01.jpg" alt="img2" />
                </div>
              </div>
              <div className={styles.gridBox}>
                <p className={styles.text}>DE</p>
                <div className={styles.img}>
                  <img src="/images/main/grid-img02.jpg" alt="img2" />
                </div>
              </div>
              <div className={styles.gridBox}>
                <p className={styles.text}>DE</p>
                <div className={styles.img}>
                  <img src="/images/main/grid-img03.jpg" alt="img2" />
                </div>
              </div>
              <div className={styles.gridBox}>
                <p className={styles.text}>DE</p>
                <div className={styles.img}>
                  <img src="/images/main/grid-img04.jpg" alt="img2" />
                </div>
              </div>
              <div className={styles.gridBox}>
                <p className={styles.text}>DE</p>
                <div className={styles.img}>
                  <img src="/images/main/grid-img05.jpg" alt="img2" />
                </div>
              </div>
              <div className={styles.gridBox}>
                <p className={styles.text}>DE</p>
                <div className={styles.img}>
                  <img src="/images/main/grid-img06.jpg" alt="img2" />
                </div>
              </div>
              <div className={styles.gridBox}>
                <p className={styles.text}>DE</p>
                <div className={styles.img}>
                  <img src="/images/main/grid-img07.jpg" alt="img2" />
                </div>
              </div>
              <div className={styles.gridBox}>
                <p className={styles.text}>DE</p>
                <div className={styles.img}>
                  <img src="/images/main/grid-img08.jpg" alt="img2" />
                </div>
              </div>
              <div className={styles.gridBox}>
                <p className={styles.text}>DE</p>
                <div className={styles.img}>
                  <img src="/images/main/grid-img09.jpg" alt="img2" />
                </div>
              </div>
              <div className={styles.gridBox}>
                <p className={styles.text}>DE</p>
                <div className={styles.img}>
                  <img src="/images/main/grid-img10.jpg" alt="img2" />
                </div>
              </div>
              <div className={styles.gridBox}>
                <p className={styles.text}>DE</p>
                <div className={styles.img}>
                  <img src="/images/main/grid-img11.jpg" alt="img2" />
                </div>
              </div>
              <div className={styles.gridBox}>
                <p className={styles.text}>DE</p>
                <div className={styles.img}>
                  <img src="/images/main/grid-img12.jpg" alt="img2" />
                </div>
              </div>
              <div className={styles.gridBox}>
                <p className={styles.text}>DE</p>
                <div className={styles.img}>
                  <img src="/images/main/grid-img13.jpg" alt="img2" />
                </div>
              </div>
              <div className={styles.gridBox}>
                <p className={styles.text}>DE</p>
                <div className={styles.img}>
                  <img src="/images/main/grid-img14.jpg" alt="img2" />
                </div>
              </div>
              <div className={styles.gridBox}>
                <p className={styles.text}>DE</p>
                <div className={styles.img}>
                  <img src="/images/main/grid-img15.jpg" alt="img2" />
                </div>
              </div>
              <div className={styles.gridBox}>
                <p className={styles.text}>DE</p>
                <div className={styles.img}>
                  <img src="/images/main/grid-img16.jpg" alt="img2" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* faq */}
        <div className={styles.sectionFaq}>
          <div className={styles.wrapper}>
            <div ref={faqMarqueeRef} className={styles.marqueeTitle}>
              FAQ FAQ FAQ FAQ FAQ FAQ FAQ FAQ FAQ FAQ FAQ FAQ FAQ FAQ FAQ FAQ FAQ FAQ FAQ FAQ FAQ
              FAQ FAQ FAQ
            </div>
            <div className={styles.accorWrap}>
              {faqList.map((faq, idx) => (
                <div className={styles.accorCol} key={idx}>
                  <button
                    type="button"
                    className={styles.title}
                    onClick={() => handleFaqToggle(idx)}
                    aria-expanded={openFaqIndex === idx}
                    aria-controls={`faq-panel-${idx}`}
                  >
                    {faq.question}
                  </button>
                  <div
                    id={`faq-panel-${idx}`}
                    className={`${styles.accorDetail} ${openFaqIndex === idx ? styles.open : ''}`}
                  >
                    {faq.answer}
                  </div>
                </div>
              ))}
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
                    <p>서울 종로구 율곡로 18 도화서길디원</p>
                  </div>
                  <div className={styles.col}>
                    <p>
                      2025년 5월 8일부터
                      <br />
                      11월 15일까지
                    </p>
                    <p>
                      오전 10:00 ~ 오후 20:00
                      <br />
                      연중무휴
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className={styles.footer}>
          <div className={styles.wrapper}>
            <div className={styles.footerLogo}>
              <img src="/images/main/footer-logo01.jpg" alt="delight collective" />
            </div>
            <div className={styles.footerLogo}>
              <img src="/images/main/footer-logo02.jpg" alt="silver fish space + media" />
            </div>
            <div className={styles.footerLogo}>
              <img src="/images/main/footer-logo03.jpg" alt="문화체육관광부" />
            </div>
            <div className={styles.footerLogo}>
              <img
                src="/images/main/footer-logo04.jpg"
                alt="한국콘텐츠진흥원 Korea Creative Content Agency"
              />
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
