'use client';

import { useEffect, useRef, useState } from 'react';
import styles from '../styles/Main.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { SplitText } from 'gsap/SplitText';
import faqList from '@/data/faqs.json';
import {
  useImageFadeSwitch,
  useSectionImgShowAnim,
  useSectionStaggerAnim,
  useShowTextAnimation,
} from '../hook/gsapHooks';
import { useIsMobile } from '../hook/useMediaQuery';
import Player from '@/_components/player';

declare global {
  interface Window {
    daum?: {
      roughmap?: {
        Lander?: new (options: {
          timestamp: string;
          key: string;
          mapWidth: string;
          mapHeight: string;
        }) => { render: () => void };
      };
    };
    naver?: NaverGlobal;
  }
}

// Size와 Point 인터페이스 정의
interface NaverSize {
  width: number;
  height: number;
}

interface NaverPoint {
  x: number;
  y: number;
}

interface NaverGlobal {
  maps: {
    Map: new (element: HTMLElement, options?: NaverMapOptions) => NaverMapInstance;
    LatLng: new (lat: number, lng: number) => NaverLatLngInstance;
    Marker: new (options: NaverMarkerOptions) => NaverMarkerInstance;
    Size: new (width: number, height: number) => NaverSize;
    Point: new (x: number, y: number) => NaverPoint;
    // 필요하면 다른 객체도 추가
  };
}

interface NaverMapOptions {
  center?: NaverLatLngInstance;
  zoom?: number;
  // 필요한 옵션만 추가
}

interface NaverMapInstance {
  setCenter: (latlng: NaverLatLngInstance) => void;
  setZoom: (level: number) => void;
  // 필요한 메소드만 추가
}

interface NaverLatLngInstance {
  lat: () => number;
  lng: () => number;
}

interface NaverMarkerIcon {
  url?: string;
  size?: NaverSize;
  content?: string;
  anchor?: NaverPoint;
  // 실제로 지원하는 추가 옵션 있으면 추가
}

interface NaverMarkerOptions {
  position: NaverLatLngInstance;
  map: NaverMapInstance;
  title?: string;
  icon?: NaverMarkerIcon; // icon은 optional, 네이버 공식 문서상
}

interface NaverMarkerInstance {
  setPosition: (latlng: NaverLatLngInstance) => void;
  setMap: (map: NaverMapInstance | null) => void;
  getTitle?: () => string;
  // 필요한 메소드만 추가
}

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
gsap.registerPlugin(SplitText);

export default function MainPage() {
  const img1Ref = useRef<HTMLDivElement | null>(null);
  const img2Ref = useRef<HTMLDivElement | null>(null);
  const img3Ref = useRef<HTMLDivElement | null>(null);
  const img4Ref = useRef<HTMLDivElement | null>(null);
  const img5Ref = useRef<HTMLDivElement | null>(null);
  const img6Ref = useRef<HTMLDivElement | null>(null);
  const textRef = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);
  const text4Ref = useRef(null);
  const text5Ref = useRef(null);
  const text6Ref = useRef(null);
  const text7Ref = useRef(null);
  const text8Ref = useRef(null);
  const text9Ref = useRef(null);
  const text10Ref = useRef(null);
  const text11Ref = useRef(null);
  const text12Ref = useRef(null);
  const text13Ref = useRef(null);
  const text14Ref = useRef(null);
  const text15Ref = useRef(null);
  const text16Ref = useRef(null);
  const logoRef = useRef(null);
  const sectionTopRef = useRef(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const section2Ref = useRef<HTMLDivElement | null>(null);
  const section3Ref = useRef<HTMLDivElement | null>(null);
  const section4Ref = useRef<HTMLDivElement | null>(null);
  const section5Ref = useRef(null);
  const section6Ref = useRef(null);
  const section7Ref = useRef(null);
  const section8Ref = useRef(null);
  const section9Ref = useRef(null);
  const section10Ref = useRef<HTMLDivElement | null>(null);
  const section11Ref = useRef<HTMLDivElement | null>(null);

  const cardImgRef = useRef<HTMLDivElement | null>(null);

  const animatedTextRef = useRef<HTMLDivElement>(null);

  const cardScaleContainerRef = useRef<HTMLDivElement>(null);

  const gridRef = useRef(null);
  const videoDivRef = useRef<HTMLDivElement>(null);
  const textLeftRef = useRef(null);
  const textRightRef = useRef(null);

  const delightSeoulMarqueeRef = useRef<HTMLDivElement>(null);
  const faqMarqueeRef = useRef<HTMLDivElement>(null);
  const mapMarqueeRef = useRef<HTMLDivElement>(null);

  // 그리드
  const gridBoxRef = useRef<HTMLDivElement>(null);
  const gridOverlayRef = useRef<HTMLDivElement>(null);
  const gridBaseRef = useRef<HTMLDivElement>(null);

  const gridBox2Ref = useRef<HTMLDivElement>(null);
  const gridOverlay2Ref = useRef<HTMLDivElement>(null);
  const gridBase2Ref = useRef<HTMLDivElement>(null);

  const gridBox3Ref = useRef<HTMLDivElement>(null);
  const gridOverlay3Ref = useRef<HTMLDivElement>(null);
  const gridBase3Ref = useRef<HTMLDivElement>(null);

  const gridBox4Ref = useRef<HTMLDivElement>(null);
  const gridOverlay4Ref = useRef<HTMLDivElement>(null);
  const gridBase4Ref = useRef<HTMLDivElement>(null);

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const isMobile = useIsMobile();

  // 첫번째 비디오 url 유무 플래그 (임시)
  const topVideoUrl = true;

  // 두번째 비디오 url 유무 플래그 (임시)
  const bottomVideoUrl = false;

  const handleFaqToggle = (idx: number) => {
    setOpenFaqIndex(idx === openFaqIndex ? null : idx);
  };

  // 스크롤 스무더
  // useEffect(() => {
  //   if (isMobile === undefined) return;

  //   if (!isMobile) {
  //     const smoother = ScrollSmoother.create({
  //       wrapper: '#smooth-wrapper',
  //       content: '#smooth-content',
  //       smooth: 1, // 부드러움 정도, 1~2 추천
  //       effects: true, // 패럴랙스 효과용, 기본 true
  //     });
  //     // cleanup
  //     return () => {
  //       if (smoother) smoother.kill();
  //     };
  //   }
  // }, [isMobile]);

  // 로고 텍스트 스플릿
  useEffect(() => {
    const split = new SplitText(textRef.current, { type: 'words' });
    const tl = gsap.timeline();

    // 1. 텍스트 등장
    tl.from(split.words, {
      opacity: 0,
      y: 40,
      stagger: 0.5,
      duration: 0.7,
      ease: 'power3.inOut',
    });

    // 2. 로고 등장 (텍스트 끝나고)
    tl.fromTo(
      logoRef.current,
      { y: 100 },
      {
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: 'power3.inOut',
      },
      '+=0.1'
    );

    return () => split.revert();
  }, []);

  // 뒤의 숫자로 딜레이 속도 조절하시면 됩니다!
  useShowTextAnimation(text2Ref); // 2025 5. 8 - 2025. 11. 15
  useShowTextAnimation(text3Ref, 0.2); // 도시는 어둡고도 찬란하며
  useShowTextAnimation(text4Ref, 0.4); // 정보의 고정성과 유동성
  useShowTextAnimation(text5Ref, 0.5); // 도시성과 인간의 감각적 경험
  useShowTextAnimation(text6Ref); // 도시는 어둡고도 찬란하며, 차갑고도 뜨겁다.
  useShowTextAnimation(text7Ref); // 빛의 기억, 어둠과 빛
  useShowTextAnimation(text8Ref); // 끊임없이 넘쳐흐르는 사각의 흐름
  useShowTextAnimation(text9Ref, 1); // 무엇이 숨겨지고 있고, 무엇이 드러나는가?
  useShowTextAnimation(text10Ref, 0.4); // 우리가 기억하는 서울,
  useShowTextAnimation(text11Ref); // 언어로 설명되기 전의 순간,
  useShowTextAnimation(text12Ref); // 축적된 서사와 데이터의 집합,
  useShowTextAnimation(text13Ref); // London - Seoul - Paris
  useShowTextAnimation(text14Ref); // 끊임없이 넘쳐흐르는 사각의 흐름
  useShowTextAnimation(text15Ref, 0.5); // Delight seoul 2025
  useShowTextAnimation(text16Ref, 0.5); // Delight seoul 2025

  // 첫번째 섹션 검정색 영역의 높이를 줄이는 gsap
  useEffect(() => {
    if (topVideoUrl) {
      gsap.registerPlugin(ScrollTrigger);

      const sectionTop = sectionTopRef.current;

      if (sectionTop) {
        gsap.to(sectionTop, {
          height: '0vh',
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: sectionTop,
            start: 'top top',
            // end: 'bottom top',
            end: '+=1',
            scrub: false,
            // pin: true,
          },
        });
      }
    }
  }, []);

  // 텍스트와 이미지가 순차적으로 나오는 모션
  useSectionStaggerAnim(sectionRef, styles);
  useSectionImgShowAnim(section2Ref, styles);
  useSectionStaggerAnim(section3Ref, styles);
  useSectionStaggerAnim(section4Ref, styles);
  useSectionStaggerAnim(section5Ref, styles);
  useSectionStaggerAnim(section6Ref, styles);
  useSectionStaggerAnim(section7Ref, styles);
  useSectionStaggerAnim(section8Ref, styles);
  useSectionStaggerAnim(section9Ref, styles);
  useSectionImgShowAnim(section10Ref, styles);
  useSectionImgShowAnim(section11Ref, styles);

  useEffect(() => {
    if (animatedTextRef.current) {
      // 1. 단어 단위 래핑
      const split = new SplitText(animatedTextRef.current, { type: 'words' });

      // 2. 단어별 애니메이션: opacity 0 → 1
      gsap.fromTo(
        split.words,
        { opacity: 0 },
        {
          opacity: 1,
          stagger: 0.27,
          duration: 0.45, // 등장속도
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: animatedTextRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, []);

  // 스크롤 시 이미지 교체 모션
  useImageFadeSwitch(cardImgRef, styles);

  // 가로스크롤 섹션
  const pivotContainerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pivotContainerRef.current || !innerRef.current) return;

    const totalWidth = innerRef.current.scrollWidth - pivotContainerRef.current.offsetWidth;

    // 모바일이면 스크롤 길이 넉넉하게
    const scrollLen = isMobile ? totalWidth * 1.7 : totalWidth;

    gsap.to(innerRef.current, {
      x: -totalWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: pivotContainerRef.current,
        start: 'top top',
        end: () => `+=${scrollLen}`, // 가로로 스크롤할 전체 길이만큼
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // 이미지 날라오는 모션
  useEffect(() => {
    if (
      !cardScaleContainerRef.current ||
      !img1Ref.current ||
      !img2Ref.current ||
      !img3Ref.current ||
      !img4Ref.current ||
      !img5Ref.current ||
      !img6Ref.current ||
      !videoDivRef.current ||
      !textLeftRef.current ||
      !textRightRef.current
    )
      return;

    gsap.registerPlugin(ScrollTrigger);

    const scrollSection = cardScaleContainerRef.current;
    const moveSettings = [
      { x: -200, y: 0 },
      { x: 80, y: -60 },
      { x: 120, y: 120 },
      { x: -60, y: 130 },
      { x: 100, y: -100 },
      { x: 10, y: -100 },
    ];

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollSection,
        start: 'top top',
        end: '+=3000',
        scrub: true,
        pin: true,
        anticipatePin: 2,
      },
    });

    const imageRefs = [img1Ref, img4Ref, img6Ref, img5Ref, img3Ref, img2Ref];

    imageRefs.forEach((imgRef, i) => {
      const { x, y } = moveSettings[i];
      tl.to(
        imgRef.current,
        {
          duration: 0.8,
          keyframes: [
            { scale: 0.3, opacity: 0, x: 0, y: 0, duration: 0 },
            { scale: 0.8, opacity: 1, x: (x * 2) / 3, y: (y * 2) / 3, ease: 'none' },
            { scale: 1, opacity: 0, x, y, ease: 'none' },
          ],
        },
        `-=${i === 0 ? 0 : 0.6}`
      );
    });

    // 텍스트 이동
    // x축의 수치로 텍스트의 움직임을 조절하시면 됩니다
    tl.to(textLeftRef.current, { x: -200, duration: 1, ease: 'power2.out' }, 'textMove');
    tl.to(textRightRef.current, { x: 30, duration: 1, ease: 'power2.out' }, 'textMove');

    // opacity 조정
    tl.to(
      textLeftRef.current,
      { opacity: 0, duration: 0.6, ease: 'power2.out' },
      'textMove+=0.3' // 0.3초 뒤에 opacity 시작
    );
    tl.to(textRightRef.current, { opacity: 0, duration: 0.6, ease: 'power2.out' }, 'textMove+=0.3');

    // 비디오 커지며 텍스트 위로
    ScrollTrigger.matchMedia({
      // 데스크탑
      '(min-width: 769px)': () => {
        tl.fromTo(
          videoDivRef.current,
          {
            opacity: 1,
            scale: 0,
          },
          {
            opacity: 1,
            width: '80vw',
            height: '80vh',
            scale: 1,
            duration: 1.5,
            ease: 'power3.out',
          },
          '-=.9'
        );
      },
      // 모바일
      '(max-width: 768px)': () => {
        tl.fromTo(
          videoDivRef.current,
          {
            opacity: 1,
            scale: 0,
          },
          {
            opacity: 1,
            width: '90vw',
            height: '50vh',
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
          },
          '-=.9'
        );

        ScrollTrigger.refresh();
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // 비디오가 뷰포트에 들어오면 재생
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!videoDivRef.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      {
        threshold: 0.3, // 30% 이상 보이면 inView true
      }
    );
    observer.observe(videoDivRef.current);
    return () => observer.disconnect();
  }, []);

  // 그리드 ref
  useEffect(() => {
    if (!gridRef.current) return;

    ScrollTrigger.create({
      trigger: gridRef.current,
      start: 'top 80%', // 뷰포트 80% 지점에서 시작
      end: 'bottom 20%', // 끝나는 시점
      toggleClass: { targets: gridRef.current, className: 'active' },
    });

    // cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // 그리드 이미지 움직이는 모션
  useEffect(() => {
    if (!gridBoxRef.current || !gridBaseRef.current || !gridOverlayRef.current) return;

    // 첫 번째 gridBox (DE)
    gsap.to(gridBaseRef.current, {
      y: '-110%',
      ease: 'none',
      scrollTrigger: {
        trigger: gridBoxRef.current,
        start: 'top 80%', // 숫자를 줄이면 영어가 늦게 니옴 / 숫자가 커지면 영어가 빨리 나옴
        end: 'top 30%', // 숫자가 작아지면 애니메이션이 느리게 끝남 / 커지면 빨리 끝남
        scrub: true,
      },
    });
    gsap.to(gridOverlayRef.current, {
      y: '0%',
      ease: 'none',
      scrollTrigger: {
        trigger: gridBoxRef.current,
        start: 'top 80%', // 숫자를 줄이면 영어가 늦게 니옴 / 숫자가 커지면 영어가 빨리 나옴
        end: 'top 30%', // 숫자가 작아지면 애니메이션이 느리게 끝남 / 커지면 빨리 끝남
        scrub: true,
      },
    });

    // 두 번째 gridBox (LIG)
    if (gridBox2Ref.current && gridBase2Ref.current && gridOverlay2Ref.current) {
      gsap.to(gridBase2Ref.current, {
        y: '-110%',
        ease: 'none',
        scrollTrigger: {
          trigger: gridBox2Ref.current,
          start: 'top bottom', // 해당 div의 top이 뷰포트의 bottom에 닿을 때 시작 (=가장 빨리 시작)
          end: 'top 60%', // 숫자가 작아지면 애니메이션이 느리게 끝남 / 커지면 빨리 끝남
          scrub: true,
        },
      });
      gsap.to(gridOverlay2Ref.current, {
        y: '0%',
        ease: 'none',
        scrollTrigger: {
          trigger: gridBox2Ref.current,
          start: 'bottom 50%',
          end: 'top 40%',
          scrub: true,
        },
      });
    }

    // 세 번째 gridBox
    if (gridBox3Ref.current && gridBase3Ref.current && gridOverlay3Ref.current) {
      gsap.to(gridBase3Ref.current, {
        y: '-110%',
        ease: 'none',
        scrollTrigger: {
          trigger: gridBox3Ref.current,
          start: 'top 70%', // 숫자를 줄이면 영어가 늦게 나옴 / 숫자가 커지면 영어가 빨리 나옴
          end: 'top 30%', // 숫자가 작아지면 애니메이션이 느리게 끝남 / 커지면 빨리 끝남
          scrub: true,
        },
      });
      gsap.to(gridOverlay3Ref.current, {
        y: '0%',
        ease: 'none',
        scrollTrigger: {
          trigger: gridBox3Ref.current,
          start: 'top 70%', // 숫자를 줄이면 영어가 늦게 니옴 / 숫자가 커지면 영어가 빨리 나옴
          end: 'top 30%', // 숫자가 작아지면 애니메이션이 느리게 끝남 / 커지면 빨리 끝남
          scrub: true,
        },
      });
    }

    // 네 번째 gridBox (seoul)
    if (gridBox4Ref.current && gridBase4Ref.current && gridOverlay4Ref.current) {
      gsap.to(gridBase4Ref.current, {
        y: '-110%',
        ease: 'none',
        scrollTrigger: {
          trigger: gridBox4Ref.current,
          start: 'bottom 50%', // 해당 div의 bottom이 뷰포트의 50%에 닿을 때 시작 (=아주 늦게 시작)
          end: 'bottom 25%', // 숫자가 작아지면 애니메이션이 느리게 끝남 / 커지면 빨리 끝남
          scrub: true,
        },
      });
      gsap.matchMedia({
        // 데스크탑
        '(min-width: 769px)': () => {
          gsap.to(gridOverlay4Ref.current, {
            y: '20%',
            ease: 'none',
            scrollTrigger: {
              trigger: gridBox4Ref.current,
              start: 'bottom 50%',
              end: 'bottom 25%',
              scrub: true,
            },
          });
        },
        // 모바일
        '(max-width: 768px)': () => {
          gsap.to(gridOverlay4Ref.current, {
            y: '0%',
            ease: 'none',
            scrollTrigger: {
              trigger: gridBox4Ref.current,
              start: 'top 90%',
              end: 'top 20%',
              scrub: true,
            },
          });
        },
      });
    }

    // cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // 딜라이트 서울 마퀴
  useEffect(() => {
    if (!delightSeoulMarqueeRef.current) return;

    const textEl = delightSeoulMarqueeRef.current;

    const xFrom = isMobile ? '50vw' : 620;
    const xTo = isMobile ? '0' : '-10vw';

    gsap.fromTo(
      textEl,
      { x: xFrom, y: 0 },
      {
        x: xTo,
        ease: 'none',
        scrollTrigger: {
          trigger: textEl,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );
  }, [isMobile]);

  // faq 마퀴
  useEffect(() => {
    if (!faqMarqueeRef.current) return;
    gsap.fromTo(
      faqMarqueeRef.current,
      { x: '-50vw', y: 0, rotate: -2 },
      {
        x: '0vw', // 이동거리
        rotate: -2,
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

  // location 마퀴
  useEffect(() => {
    if (!mapMarqueeRef.current) return;
    gsap.fromTo(
      mapMarqueeRef.current,
      { x: '-50vw', y: 0, rotate: -2 },
      {
        x: '0vw', // 이동거리
        rotate: -2,
        ease: 'none',
        scrollTrigger: {
          trigger: mapMarqueeRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );
  }, []);

  // sticky gallery
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const rightImg1Ref = useRef<HTMLDivElement>(null);
  const rightImg2Ref = useRef<HTMLDivElement>(null);
  const rightImg3Ref = useRef<HTMLDivElement>(null);
  const rightImg4Ref = useRef<HTMLDivElement>(null);
  const rightImg5Ref = useRef<HTMLDivElement>(null);

  useSectionStaggerAnim(rightImg1Ref, styles);
  useSectionStaggerAnim(rightImg2Ref, styles);
  useSectionStaggerAnim(rightImg3Ref, styles);
  useSectionStaggerAnim(rightImg4Ref, styles);
  useSectionStaggerAnim(rightImg5Ref, styles);

  // 특정 위치에 오면 텍스트 바꿔주기
  const [sgText, setSgText] = useState(
    <>
      <span className={styles.sgLeftTop}>지금, 여기</span>
      <br />
      익숙하면서도 낯선
      <br />
      공존의 장면
    </>
  );

  const prevAnyVisibleRef = useRef<boolean | null>(null);
  useEffect(() => {
    const targets = [rightImg5Ref.current, section7Ref.current, pivotContainerRef.current];
    if (targets.some((el) => !el)) return;

    // 모바일인지 체크
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

    const visibleMap = new Map();

    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibleMap.set(entry.target, entry.isIntersecting);
        });

        const isAnyTargetVisible = targets.some((el) => visibleMap.get(el));
        const anyVisible = !isAnyTargetVisible;

        if (prevAnyVisibleRef.current === anyVisible) return;
        prevAnyVisibleRef.current = anyVisible;

        console.log('anyVisible changed to', anyVisible);

        gsap.to(leftRef.current, {
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            setSgText(
              anyVisible ? (
                <>
                  <span className={styles.sgLeftTop}>지금, 여기</span>
                  <br />
                  익숙하면서도 낯선
                  <br />
                  공존의 장면
                </>
              ) : isMobile ? (
                <>
                  끊임없이 <br /> 넘쳐흐르는 <br /> 사각의 흐름
                </>
              ) : (
                <>
                  <br />
                  끊임없이 넘쳐흐르는 <br /> 사각의 흐름
                </>
              )
            );
            setTimeout(() => {
              gsap.to(leftRef.current, { opacity: 1, duration: 0.3 });
            }, 30);
          },
        });
      },
      { threshold: 0.5 }
    );

    targets.forEach((el) => {
      visibleMap.set(el, false);
      observer.observe(el as HTMLElement);
    });

    return () => observer.disconnect();
  }, []);

  // 네이버 지도 관련 함수
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 이미 지도 객체가 있으면 중복 로딩 방지
    if (window.naver && window.naver.maps && mapRef.current) {
      createMap();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=wusfcf60wp';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // *** naver/maps 네임스페이스 비동기 로딩 기다리기 ***
      const interval = setInterval(() => {
        if (window.naver && window.naver.maps && mapRef.current) {
          createMap();
          clearInterval(interval);
        }
      }, 100);
    };

    function createMap() {
      const { naver } = window;
      if (!naver || !mapRef.current) return;
      const center = new naver.maps.LatLng(37.575321, 126.981629);

      const map = new naver.maps.Map(mapRef.current, {
        center,
        zoom: 17,
      });
      new naver.maps.Marker({
        position: center,
        map,
        title: '도화서길디원',
        icon: {
          content: `
          <a
  href="https://booking.naver.com/booking/5/bizes/1400786"
  target="_blank"
  rel="noopener noreferrer"
  style="width:2.5rem;height:3.3rem;display:flex;align-items:center;justify-content:center;"
>
  <img src="/images/main/map-pin.png" style="width:100%;height:100%;" />
</a>

        `,
          // size: new naver.maps.Size(48, 64), // px 단위 (3rem, 4rem ≒ 48, 64)
          anchor: new naver.maps.Point(24, 64), // 하단 중앙이 위치에 찍히게
        },
      });
    }

    // cleanup: script 제거
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id="smooth-wrapper" className={styles.noise}>
      <div id="smooth-content">
        {/* 첫번쨰 섹션 */}
        <>
          <div ref={sectionTopRef} className={styles.sectionTop}>
            <div className={styles.wrapper}>
              <p className={styles.text}>
                <span ref={textRef}>2025</span>
              </p>
              <h1 className={styles.logo}>
                <img ref={logoRef} src="/images/logo.png" alt="Delight seoul 2025 - logo" />
              </h1>
              <div className={styles.scrollBar}>
                <span>SCROLL</span>
                <div className={styles.bar}></div>
              </div>
            </div>
          </div>

          {/* 검정색 영역 걷히면 나타나는 동영상 영역 */}
          <div className={styles.bgBox}>
            <Player />
          </div>
        </>

        <div className={styles.sectionInfo}>
          <div className={styles.wrapper}>
            {/* 두번째 섹션 */}
            <div ref={sectionRef}>
              <div className={`${styles.textRight}`}>
                <p className={styles.textDeco} ref={text2Ref}>
                  2025. 5. 8 - 2025. 11. 15
                </p>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.cardImg}>
                  <img
                    src="/images/main/info01.jpg"
                    alt="전시를 체험중인 관람객 모습 - Collage: Gwanghwa"
                  />
                </div>
                <div className={styles.overflowHidden}>
                  <p ref={text3Ref}>
                    도시는 어둡고도 찬란하며, 차갑고도 뜨겁다.
                    <br />
                    소란스러우나 고요하고, 무심하지만 다정하다.
                  </p>
                </div>
              </div>
            </div>

            {/* 세번째 섹션 */}
            <div className={styles.infoCardFloating}>
              <div ref={section2Ref} className={styles.floatingBox}>
                <div className={`${styles.keyImg} ${styles.centerCardImg}`}>
                  <img
                    src="/images/main/info02.jpg"
                    alt="631 - 딜라이트(Delight)의 상징적 모티프인 “청사초롱”을 현대적으로 재해석한 인스톨레이션 작업"
                  />
                </div>
                <div
                  ref={animatedTextRef}
                  className={`${styles.keyText} ${styles.display}`}
                  style={{ fontFamily: 'Noto Serif Display' }}
                >
                  Synchronicity
                  <br />
                  of Simulacra
                </div>
                <div
                  className={`${styles.floatingImg} ${styles.floatingImgLeft} ${styles.cardSlowImg2}`}
                >
                  <img
                    src="/images/main/info03.jpg"
                    alt="631 - 딜라이트(Delight)의 상징적 모티프인 “청사초롱”을 현대적으로 재해석한 인스톨레이션 작업"
                  />
                </div>

                <div
                  className={`${styles.floatingImg} ${styles.floatingImgRight} ${styles.cardSlowImg}`}
                >
                  <img
                    src="/images/main/info04.jpg"
                    alt="Moon - 서서히 퍼지는 달빛은 어둠 속에서 서서히 드러나는 인간의 내면성과 감정의 흐름을 은유하며, 도시가 품고 있는 강인함과 생명력을 감각적으로 전달한다."
                  />
                </div>

                <div className={styles.subText}>
                  <p ref={text4Ref}>
                    정보의 고정성과 유동성,
                    <br />
                    물질성과 비물질성이 교차하는
                    <br />
                    현대 도시의 복합적 정체성
                  </p>
                </div>
              </div>
            </div>

            <div ref={section3Ref} className={styles.infoCard}>
              <div className={styles.infoCardDivide}>
                <div className={`${styles.cardImg} ${styles.smCardImg}`}>
                  <img
                    src="/images/main/info05.jpg"
                    alt="12지신의 숲 Forest of the Twelve Guardians -  도시 공간 속에서 흔히 스쳐 지나칠 수 있지만, 일상 속 필수적 정보를 전달하는 ‘사인(Sign)’의 의미에 주목한 공간 미디어 인스톨레이션"
                  />
                </div>
                <div className={`${styles.cardImg} ${styles.smCardImg}`}>
                  <img
                    src="/images/main/01.jpg"
                    alt="City Pulse - 서울 도심 곳곳에 존재하는 수많은 간판들은 단순한 상업적 도구를 넘어, 개인의 희망과 도시의 서사를 담고 있는 상징적 매개체이다."
                  />
                </div>
              </div>
              <div className={styles.overflowHidden}>
                <p ref={text5Ref}>도시성과 인간의 감각적 경험</p>
              </div>
            </div>
          </div>
        </div>

        {/* 네번째 섹션 */}
        <div ref={cardImgRef} className={styles.sectionBg}>
          <img
            src="/images/main/bg01.jpg"
            alt="돌과 나무에서 시작된 이야기 A Story That Began with Stone and Wood - 공간 미디어 인스톨레이션 작품은 일상 속에서 쉽게 마주치는 돌, 나무, 그리고 인간과 자연의 손길이 오랜 시간 축적된 다양한 오브제들을 예술적 모티프로 삼아 구성되었다."
            className={styles.blindBg1}
          />
          <img
            src="/images/main/bg02.jpg"
            alt="기억의 스펙트럼 The Spectrum of Memory - 이 작업은 개인의 기억 속 색채가 공유되고 확장되는 지점을 추적하며, 그것이 어떻게 공동의 서사로 전환되는지를 실험합니다."
            className={styles.blindBg2}
          />
          <div ref={text16Ref} className={styles.blindText}>
            LONDON - SEOUL - PARIS
          </div>
        </div>

        {/* 다섯번째 섹션 */}
        <div className={`${styles.sectionInfo}`}>
          <div className={styles.wrapperTop}>
            <div ref={containerRef} className={styles.sgContainer}>
              <div ref={leftRef} className={styles.sgLeft}>
                {sgText}
              </div>

              <div ref={rightRef} className={styles.sgRight}>
                <div ref={rightImg1Ref} className={styles.infoCard}>
                  <div className={styles.cardImg}>
                    <img
                      className={styles.sgImg}
                      src="/images/main/info06.jpg"
                      alt="돌과 나무에서 시작된 이야기 A Story That Began with Stone and Wood - 공간 미디어 인스톨레이션 작품은 일상 속에서 쉽게 마주치는 돌, 나무, 그리고 인간과 자연의 손길이 오랜 시간 축적된 다양한 오브제들을 예술적 모티프로 삼아 구성되었다."
                    />
                  </div>
                </div>

                <p ref={text13Ref}>
                  그 표면에 새겨진 시간의 흔적과 <br />
                  존재의 서사
                </p>

                <div ref={rightImg2Ref} className={styles.infoCard}>
                  <div className={styles.infoCardDivide}>
                    <div className={`${styles.cardImg} ${styles.sgSmImg}`}>
                      <img
                        className={`${styles.sgImg}`}
                        src="/images/main/info07-1.jpg"
                        alt="Collage: Gwanghwa - 이 작품은 경복궁의 정문인 광화문과 그 뒤로 펼쳐진 북악산을 중심으로 구성되며, ”일월오봉도(日月五峯圖)”의 구도를 차용합니다. 일월오봉도는 조선 왕조의 권위와 자연 질서를 상징하는 도상으로, 왕의 공간을 장식하던 가장 상징적인 회화입니다."
                      />
                    </div>
                    <div className={`${styles.cardImg} ${styles.sgSmImg}`}>
                      <img
                        className={`${styles.sgImg}`}
                        src="/images/main/02.jpg"
                        alt="Collage: Gwanghwa - 이 작품은 경복궁의 정문인 광화문과 그 뒤로 펼쳐진 북악산을 중심으로 구성되며, ”일월오봉도(日月五峯圖)”의 구도를 차용합니다. 일월오봉도는 조선 왕조의 권위와 자연 질서를 상징하는 도상으로, 왕의 공간을 장식하던 가장 상징적인 회화입니다."
                      />
                    </div>
                  </div>
                </div>

                <div ref={rightImg3Ref} className={styles.infoCard}>
                  <div className={styles.cardImg}>
                    <img
                      className={styles.sgImg}
                      src="/images/main/info08-1.jpg"
                      alt="관람객 모습 - Collage: Gwanghwa"
                    />
                  </div>
                </div>

                <p ref={text14Ref}>
                  도시의 양면성과 <br />
                  공존의 미학
                </p>

                <div ref={rightImg4Ref} className={styles.infoCard}>
                  <div className={` ${styles.cardImg}`}>
                    <img
                      className={styles.sgImg}
                      src="/images/main/03.jpg"
                      alt="관람객 모습 - 빛의 기억 Memory of Light"
                    />
                  </div>
                </div>

                <div ref={rightImg5Ref} className={styles.infoCard}>
                  <div className={` ${styles.cardImg}`}>
                    <img
                      className={styles.sgImg}
                      src="/images/main/04.jpg" // 정사각 비율로 변경
                      alt="관람객 모습 - Pattern: 시간을 짓는 손길"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div ref={section7Ref} className={`${styles.delightSeoulMarqueeContainer}`}>
              <p ref={delightSeoulMarqueeRef} className={styles.marqueeText}>
                delight seoul 2025
              </p>
            </div>
          </div>
        </div>

        {/* 가로스크롤 영역 */}
        <div className={styles.pivotScSection} ref={pivotContainerRef}>
          <div className={`${styles.overflowHidden}`}>
            <h2 ref={text15Ref}>Delight seoul 2025</h2>
            <p
              ref={text9Ref}
              className={`${styles.wrapperBottom} ${isMobile ? styles.wrapperInline : styles.infoCard}`}
            >
              무엇이 숨겨지고 있고, 무엇이 드러나는가?
              <br />
              우리가 진실이라고 믿는 것은 어디까지인가?
            </p>
          </div>
          {/* 가로스크롤 */}
          <div className={styles.pivotScImgs}>
            <div className={styles.pivotScImgsInner} ref={innerRef}>
              <img
                src="/images/main/info10.jpg"
                alt="Neon Notelgia - 본 작업은 도시 공간 속에서 흔히 스쳐 지나칠 수 있지만, 일상 속 필수적 정보를 전달하는 ‘사인(Sign)’의 의미에 주목한 공간 미디어 인스톨레이션이다."
                width={656}
                height={373}
              />
              <img
                src="/images/main/info11-1.jpg"
                alt="관람객 모습 - Resonance"
                width={656}
                height={373}
              />
              <img src="/images/main/info14.jpg" alt="전시 모습 " width={656} height={373} />

              <img
                src="/images/main/05.jpg"
                alt="Neon Notelgia - 본 작업은 도시 공간 속에서 흔중 스쳐 지나칠 수 있지만, 일상 속 필수적 정보를 전달하는 ‘사인(Sign)’의 의미에 주목한 공간 미디어 인스톨레이션이다."
                width={656}
                height={373}
              />
              <img
                src="/images/main/06.jpg"
                alt="Pattern: 시간을 짓는 손길 - 이 작업은 ‘무늬’라는 시각적 언어를 통해 시간과 기억, 그리고 자연에 대한 인간의 인식을 형상화합니다. "
                width={656}
                height={373}
              />
              <img
                src="/images/main/07.jpg"
                alt="기억의 스펙트럼
The Spectrum of Memory - 색은 단순한 시각 요소를 넘어, 기억을 저장하고 불러오는 감각적 코드로 작동합니다."
                width={656}
                height={373}
              />
            </div>
          </div>
        </div>

        {/* 이미지 날라오는 모션 */}
        <div ref={cardScaleContainerRef} className={styles.container}>
          <div className={styles.fixedBox}>
            {/* 이미지 6개 */}
            <div ref={img1Ref} className={`${styles.image} ${styles.img1}`}>
              <img
                src="/images/main/section3-08.jpg"
                alt="전시를 즐기는 관람객의 모습"
                className={styles.img}
              />
            </div>
            <div ref={img2Ref} className={`${styles.image} ${styles.img2}`}>
              <img
                src="/images/main/section3-13.jpg"
                alt="전시를 즐기는 관람객의 모습"
                className={styles.img}
              />
            </div>
            <div ref={img3Ref} className={`${styles.image} ${styles.img3}`}>
              <img
                src="/images/main/section3-14.jpg"
                alt="전시를 즐기는 관람객의 모습"
                className={styles.img}
              />
            </div>
            <div ref={img4Ref} className={`${styles.image} ${styles.img4}`}>
              <img
                src="/images/main/section3-02.jpg"
                alt="전시를 즐기는 관람객의 모습"
                className={styles.img}
              />
            </div>
            <div ref={img5Ref} className={`${styles.image} ${styles.img5}`}>
              <img
                src="/images/main/section3-07.jpg"
                alt="전시를 즐기는 관람객의 모습"
                className={styles.img}
              />
            </div>
            <div ref={img6Ref} className={`${styles.image} ${styles.img6}`}>
              <img
                src="/images/main/section3-06.jpg"
                alt="전시를 즐기는 관람객의 모습"
                className={styles.img}
              />
            </div>

            {/* 텍스트 + 비디오 */}
            <div className={styles.centerTitle}>
              <span ref={textLeftRef} className={styles.leftTitle}>
                딜라이트
              </span>

              <div ref={videoDivRef} className={styles.videoBox}>
                {inView ? (
                  bottomVideoUrl ? (
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/ZFWOwC_pmLw?autoplay=1&mute=1&loop=1&playlist=ZFWOwC_pmLw&controls=0&showinfo=0&modestbranding=1"
                      title="YouTube video player"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      className={styles.video}
                    />
                  ) : (
                    <video
                      src="/videos/outro.mp4"
                      autoPlay
                      muted
                      loop
                      playsInline
                      className={styles.video}
                      style={{ objectFit: 'contain' }}
                    />
                  )
                ) : null}
              </div>

              <span ref={textRightRef} className={styles.rightTitle}>
                서울
              </span>
            </div>
          </div>
        </div>

        <div ref={gridRef} className={styles.sectionGrid}>
          <div className={styles.wrapper}>
            <div className={styles.gridWrap}>
              {/* -------- DE ---------- */}
              <div className={styles.gridBox} ref={gridBoxRef} style={{ position: 'relative' }}>
                <div
                  ref={gridBaseRef}
                  className={styles.img}
                  style={{
                    backgroundImage: "url('/images/main/grid-img01.jpg')",
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 9,
                  }}
                />
                <div
                  ref={gridOverlayRef}
                  className={styles.img}
                  style={{
                    backgroundImage: "url('/images/main/grid-text-05.svg')",
                    backgroundRepeat: 'no-repeat',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                  }}
                />
              </div>
              <div className={styles.gridBox}>
                <p className={styles.text}></p>
                <div className={styles.img}>
                  <img src="/images/main/grid-img02.jpg" alt="전시를 즐기는 관람객의 모습" />
                </div>
              </div>
              <div className={styles.gridBox}>
                <p className={styles.text}></p>
                <div className={styles.img}>
                  <img src="/images/main/grid-img03.jpg" alt="전시를 즐기는 관람객의 모습" />
                </div>
              </div>
              {/* --------- seoul --------- */}
              <div className={styles.gridBox} ref={gridBox4Ref} style={{ position: 'relative' }}>
                <div
                  ref={gridBase4Ref}
                  className={styles.img}
                  style={{
                    backgroundImage: "url('/images/main/grid-img04.jpg')",
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 9,
                  }}
                />
                <div
                  ref={gridOverlay4Ref}
                  className={styles.img}
                  style={{
                    backgroundImage: isMobile
                      ? "url('/images/main/grid-text-06.svg')"
                      : "url('/images/main/grid-text-08.svg')",
                    backgroundRepeat: 'no-repeat',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                  }}
                />
              </div>
              <div className={styles.gridBox}>
                <p className={styles.text}></p>
                <div className={styles.img}>
                  <img src="/images/main/grid-img05.jpg" alt="전시를 즐기는 관람객의 모습" />
                </div>
              </div>
              <div className={styles.gridBox}>
                <p className={styles.text}></p>
                <div className={styles.img}>
                  <img src="/images/main/grid-img06.jpg" alt="전시를 즐기는 관람객의 모습" />
                </div>
              </div>
              {/* ---------- HT -------- */}
              <div className={styles.gridBox} ref={gridBox3Ref} style={{ position: 'relative' }}>
                <div
                  ref={gridBase3Ref}
                  className={styles.img}
                  style={{
                    backgroundImage: "url('/images/main/grid-img07.jpg')",
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 9,
                  }}
                />
                <div
                  ref={gridOverlay3Ref}
                  className={styles.img}
                  style={{
                    backgroundImage: "url('/images/main/grid-text-07.svg')",
                    backgroundRepeat: 'no-repeat',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                  }}
                />
              </div>

              <div className={styles.gridBox}>
                <p className={styles.text}></p>
                <div className={styles.img}>
                  <img src="/images/main/grid-img08.jpg" alt="전시를 즐기는 관람객의 모습" />
                </div>
              </div>
              <div className={styles.gridBox}>
                <p className={styles.text}></p>
                <div className={styles.img}>
                  <img src="/images/main/grid-img09.jpg" alt="전시를 즐기는 관람객의 모습" />
                </div>
              </div>
              {/* --------- LIG --------- */}
              <div className={styles.gridBox} ref={gridBox2Ref} style={{ position: 'relative' }}>
                <div
                  ref={gridBase2Ref}
                  className={styles.img}
                  style={{
                    backgroundImage: "url('/images/main/grid-img10.jpg')",
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 9,
                  }}
                />
                <div
                  ref={gridOverlay2Ref}
                  className={styles.img}
                  style={{
                    backgroundImage: isMobile
                      ? "url('/images/main/grid-text-08.svg')"
                      : "url('/images/main/grid-text-06.svg')",
                    backgroundRepeat: 'no-repeat',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                  }}
                />
              </div>
              <div className={styles.gridBox}>
                <p className={styles.text}></p>
                <div className={styles.img}>
                  <img src="/images/main/grid-img11.jpg" alt="전시를 즐기는 관람객의 모습" />
                </div>
              </div>
              <div className={styles.gridBox}>
                <p className={styles.text}></p>
                <div className={styles.img}>
                  <img src="/images/main/grid-img12.jpg" alt="전시를 즐기는 관람객의 모습" />
                </div>
              </div>
              <div className={styles.gridBox}>
                <p className={styles.text}></p>
                <div className={styles.img}>
                  <img src="/images/main/grid-img13.jpg" alt="전시를 즐기는 관람객의 모습" />
                </div>
              </div>
              <div className={styles.gridBox}>
                <p className={styles.text}></p>
                <div className={styles.img}>
                  <img src="/images/main/grid-img14.jpg" alt="전시를 즐기는 관람객의 모습" />
                </div>
              </div>
              <div className={styles.gridBox}>
                <p className={styles.text}></p>
                <div className={styles.img}>
                  <img src="/images/main/grid-img15.jpg" alt="전시를 즐기는 관람객의 모습" />
                </div>
              </div>
              <div className={styles.gridBox}>
                <p className={styles.text}></p>
                <div className={styles.img}>
                  <img src="/images/main/grid-img16.jpg" alt="전시를 즐기는 관람객의 모습" />
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
              FAQ FAQ FAQ FAQ FAQ FAQ FAQ FAQ FAQ FAQ FAQ FAQ FAQ FAQ FAQ FAQ FAQ FAQ FAQ FAQ FAQ
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
                    style={{ whiteSpace: 'pre-line' }}
                  >
                    {faq.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* location */}
        <div className={styles.sectionLocation}>
          <div className={styles.wrapper}>
            <div ref={mapMarqueeRef} className={styles.marqueeTitle}>
              LOCATION LOCATION LOCATION LOCATION LOCATION LOCATION LOCATION LOCATION LOCATION
              LOCATION LOCATION LOCATION LOCATION LOCATION LOCATION LOCATION LOCATION LOCATION
              LOCATION LOCATION LOCATION LOCATION LOCATION LOCATION LOCATION LOCATION LOCATION
            </div>

            <div className={styles.locationWrap}>
              <div className={styles.location}>
                {/* 네이버 지도 */}
                <div ref={mapRef} style={{ width: '100%', height: '400px' }} />
              </div>
              <div className={styles.textWrap}>
                <div className={styles.row}>
                  <div className={styles.col}>
                    <p>
                      서울 종로구 율곡로 18 <br />
                      도화서길디원
                    </p>
                  </div>
                  <div className={styles.row}>
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
