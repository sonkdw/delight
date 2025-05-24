'use client';

import { useEffect, useRef, useState } from 'react';
import styles from '../styles/Main.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { SplitText } from 'gsap/SplitText';
import {
  // usePinnedImageSwitch,
  useImageFadeSwitch,
  useSectionImgShowAnim,
  useSectionStaggerAnim,
  useShowTextAnimation,
} from '../hook/gsapHooks';
import { useIsMobile } from '../hook/useMediaQuery';

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
  }
}

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
gsap.registerPlugin(SplitText);

const faqList = [
  {
    question: '관람 가능한 연령은 어떻게 되나요?',
    answer:
      '보호자 없이 입장이 가능한 연령은 14세(중학생) 이상입니다. 36개월 미만은 무료입장이 가능하며 관련 증빙 서류를 필수로 지참하셔야 합니다.',
  },
  {
    question: '재입장이 가능한가요?',
    answer: '티켓은 1회 입장 기준이며, 퇴장 시 재입장이 불가합니다.',
  },
  {
    question: '전시장 내 유모차, 휠체어 이용이 가능한가요?',
    answer:
      '유모차, 휠체어 이용이 가능하지만 대여 서비스는 제공하지 않습니다. 전시가 지하 3층부터 지상 5층으로 이동하는 전시장 구조입니다. 계단 및 엘리베이터로 이동은 가능하나, 혼잡도에 따라 이동에 불편함이 있을 수 있습니다.',
  },
  {
    question: '관람 시 사진 및 영상 촬영을 해도 되나요?',
    answer:
      '본 전시는 관람 시 사진 및 영상 촬영이 가능합니다. 단, 대형 전문 장비 등은 이용하실 수 없습니다.',
  },
  {
    question: '주차 시설이 있나요?',
    answer:
      '본 전시장은 주차장 시설이 없으니, 인근 주차장을 이용하시거나 가급적 대중교통을 이용해 주시기 바랍니다.',
  },
  {
    question: '기타 안내사항',
    answer:
      '사용한 티켓은 환불 불가합니다.\n관객 부주의로 상해를 입었을 경우 책임은 관객에게 있으며, 전시장에서는 이에 대한 책임을 지지 않습니다.\n전시장 내 음료와 음식물 반입이 불가합니다.\n반려동물 출입이 불가합니다.',
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

  const cardImgRef = useRef(null);
  const cardImg2Ref = useRef(null);

  const animatedTextRef = useRef<HTMLDivElement>(null);
  const animatedText2Ref = useRef<HTMLDivElement>(null);

  const cardScaleContainerRef = useRef<HTMLDivElement>(null);

  const gridRef = useRef(null);
  const videoDivRef = useRef(null);
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

  const [showScrollBar, setShowScrollBar] = useState(false);
  const [showScrollBar2, setShowScrollBar2] = useState(false);

  const isMobile = useIsMobile();

  const handleFaqToggle = (idx: number) => {
    setOpenFaqIndex(idx === openFaqIndex ? null : idx);
  };

  // 스크롤 스무더
  useEffect(() => {
    const smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1, // 부드러움 정도, 1~2 추천
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

    // // 3. 로고 퇴장
    // tl.to(logoRef.current, {
    //   opacity: 0,
    //   y: -30,
    //   duration: 0.6,
    //   ease: 'expo.in',
    // });
    //
    // // 4. 텍스트 퇴장 (로고 퇴장 끝나고 바로)
    // tl.to(split.chars, {
    //   opacity: 0,
    //   y: -30,
    //   duration: 0.6,
    //   stagger: 0.02,
    //   ease: 'expo.in',
    // });

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
  useShowTextAnimation(text9Ref, 0.5); // 무엇이 숨겨지고 있고, 무엇이 드러나는가?
  useShowTextAnimation(text10Ref, 0.4); // 우리가 기억하는 서울,
  useShowTextAnimation(text11Ref); // 언어로 설명되기 전의 순간,
  useShowTextAnimation(text12Ref); // 축적된 서사와 데이터의 집합,

  // 첫번째 섹션 검정색 영역의 높이를 줄이는 gsap
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sectionTop = sectionTopRef.current;

    if (sectionTop) {
      gsap.to(sectionTop, {
        height: '0vh',
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: sectionTop,
          start: 'top top',
          end: 'bottom top',
          scrub: false,
        },
      });
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

    if (animatedText2Ref.current) {
      // 1. 단어 단위 래핑
      const split = new SplitText(animatedText2Ref.current, { type: 'words' });

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
            trigger: animatedText2Ref.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, []);

  // 스크롤 시 이미지 교체 모션
  useImageFadeSwitch(cardImgRef, styles, setShowScrollBar);
  useImageFadeSwitch(cardImg2Ref, styles, setShowScrollBar2);

  const blindRef = useRef(null); // .blind DOM 참조

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setShowScrollBar(entry.isIntersecting); // 화면에 보이면 true
      },
      { threshold: 0.3 } // 30% 이상 보이면 트리거
    );
    if (blindRef.current) observer.observe(blindRef.current);
    return () => {
      if (blindRef.current) observer.unobserve(blindRef.current);
    };
  }, []);

  const blind2Ref = useRef(null); // .blind DOM 참조

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setShowScrollBar(entry.isIntersecting); // 화면에 보이면 true
      },
      { threshold: 0.3 } // 30% 이상 보이면 트리거
    );
    if (blind2Ref.current) observer.observe(blind2Ref.current);
    return () => {
      if (blind2Ref.current) observer.unobserve(blind2Ref.current);
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
    // tl.fromTo(
    //   videoDivRef.current,
    //   {
    //     opacity: 1,
    //     scale: 0,
    //     duration: 1.5,
    //     ease: 'power3.out',
    //   },
    //   {
    //     opacity: 1,
    //     width: '80vw',
    //     height: '80vh',
    //     scale: 1,
    //     duration: 1.5,
    //     ease: 'power3.out',
    //   },
    //   '-=.9'
    // );

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
      },
    });

    // ScrollTrigger.refresh();

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
    gsap.fromTo(
      delightSeoulMarqueeRef.current,
      { x: 0, y: 0 },
      {
        x: '-20vw', // 이동거리
        ease: 'none',
        scrollTrigger: {
          trigger: delightSeoulMarqueeRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );
  }, []);

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

  // location 지도
  useEffect(() => {
    const scriptId = 'daum-roughmap-script';

    // roughmapLoader.js 중복 삽입 방지
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        // 스크립트 완전히 로드된 후에만 render 실행!
        if (
          window.daum &&
          window.daum.roughmap &&
          typeof window.daum.roughmap.Lander === 'function'
        ) {
          new window.daum.roughmap.Lander({
            timestamp: '1747889978369',
            key: '2o4s2',
            mapWidth: '800',
            mapHeight: '360',
          }).render();
        }
      };
    } else {
      // 이미 있으면 polling (스크립트가 비동기로 로드될 수 있어서)
      const checkAndRender = () => {
        if (
          window.daum &&
          window.daum.roughmap &&
          typeof window.daum.roughmap.Lander === 'function'
        ) {
          new window.daum.roughmap.Lander({
            timestamp: '1747889978369',
            key: '2o4s2',
            mapWidth: '800',
            mapHeight: '360',
          }).render();
        } else {
          setTimeout(checkAndRender, 100);
        }
      };
      checkAndRender();
    }
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
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/ZFWOwC_pmLw?autoplay=1&mute=1&loop=1&playlist=ZFWOwC_pmLw&controls=0&showinfo=0&modestbranding=1"
              title="YouTube video player"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className={styles.video}
            />
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
                <div ref={animatedTextRef} className={styles.keyText}>
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
              <div className={styles.cardImg}>
                <img
                  src="/images/main/info05.jpg"
                  alt="12지신의 숲 Forest of the Twelve Guardians -  도시 공간 속에서 흔히 스쳐 지나칠 수 있지만, 일상 속 필수적 정보를 전달하는 ‘사인(Sign)’의 의미에 주목한 공간 미디어 인스톨레이션"
                />
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
          <div className={styles.blind} ref={blindRef}>
            <h2>
              The past, present
              <br />
              and future of seoul
            </h2>

            {/* 막대기 등장 */}
            <div className={`${styles.scrollBar} ${showScrollBar ? styles.show : ''}`}>
              <div className={styles.bar} key={Date.now()}></div>
            </div>
          </div>
        </div>

        {/* 다섯번째 섹션 */}
        <div className={`${styles.sectionInfo}`}>
          <div className={styles.wrapper}>
            <div ref={section5Ref} className={styles.infoCard}>
              <div className={`${styles.overflowHidden}`}>
                <p ref={text6Ref}>
                  도시는 어둡고도 찬란하며, 차갑고도 뜨겁다.
                  <br />
                  소란스러우나 고요하고, 무심하지만 다정하다.
                </p>
              </div>
              <div className={styles.cardImg}>
                <img
                  src="/images/main/info06.jpg"
                  alt="돌과 나무에서 시작된 이야기 A Story That Began with Stone and Wood - 공간 미디어 인스톨레이션 작품은 일상 속에서 쉽게 마주치는 돌, 나무, 그리고 인간과 자연의 손길이 오랜 시간 축적된 다양한 오브제들을 예술적 모티프로 삼아 구성되었다."
                />
              </div>

              <div className={`${styles.subText} ${styles.overflowHidden}`}>
                <p ref={text7Ref}>빛의 기억, 어둠과 빛</p>
              </div>
            </div>

            <div ref={section6Ref} className={styles.infoCardDivide}>
              <div className={styles.divideBox}>
                <div className={`${styles.divideImg} ${styles.divideImgLeft} ${styles.cardImg}`}>
                  <img
                    src="/images/main/info07.jpg"
                    alt="Collage: Gwanghwa - 이 작품은 경복궁의 정문인 광화문과 그 뒤로 펼쳐진 북악산을 중심으로 구성되며, ”일월오봉도(日月五峯圖)”의 구도를 차용합니다. 일월오봉도는 조선 왕조의 권위와 자연 질서를 상징하는 도상으로, 왕의 공간을 장식하던 가장 상징적인 회화입니다."
                  />
                </div>
                <div className={`${styles.keyText} ${styles.overflowHidden}`}>
                  <p ref={text8Ref}>
                    끊임없이 넘쳐흐르는
                    <br />
                    사각의 흐름
                  </p>
                </div>
                <div className={`${styles.divideImg} ${styles.divideImgRight} ${styles.cardImg}`}>
                  <img src="/images/main/info08.jpg" alt="관람객 모습 - Collage: Gwanghwa" />
                </div>
              </div>
            </div>

            <div ref={section7Ref} className={styles.infoCard}>
              <p ref={delightSeoulMarqueeRef} className={styles.marqueeText}>
                delight seoul 2025
              </p>
              <div className={styles.cardImg}>
                <img
                  src="/images/main/info09.jpg"
                  alt="The Door:상상의 경계, 선택의 임계점 - 이 작업은 ‘문 ’이라는 상징을 통해 인간 내면의 상상력과 탐험 욕구, 그리고 선택의 양가성을 시각적으로 구현한 설치 작품입니다. "
                />
              </div>
              <div className={`${styles.overflowHidden}`}>
                <p ref={text9Ref}>
                  무엇이 숨겨지고 있고, 무엇이 드러나는가?
                  <br />
                  우리가 진실이라고 믿는 것은 어디까지인가?
                </p>
              </div>
            </div>
          </div>
        </div>

        <div ref={cardImg2Ref} className={styles.sectionBg}>
          <img
            src="/images/main/bg03.jpg"
            alt="Path: 존재와 인식의 흐름 - 이 작업은 ‘길’이라는 일상적이면서도 근본적인 도시의 구조를 통해, 사람과 사람, 공간과 기억이 어떻게 연결되고 구성되는지를 탐구합니다."
            className={styles.blindBg1}
          />
          <img
            src="/images/main/bg04.jpg"
            alt="빛의 기억 Memory of Light - 이 작품은 데이터의 흐름 속에서 생성되는 최소 단위의 조형성을 시각적으로 재현한 설치 작업입니다."
            className={styles.blindBg2}
          />
          <div className={styles.blind} ref={blind2Ref}>
            <h2>
              The past, present
              <br />
              and future of seoul
            </h2>

            {/* 막대기 등장 */}
            <div className={`${styles.scrollBar} ${showScrollBar2 ? styles.show : ''}`}>
              <div className={styles.bar} key={Date.now()}></div>
            </div>
          </div>
        </div>

        <div ref={section8Ref} className={`${styles.sectionInfo} ${styles.marginTopVh}`}>
          <div className={styles.wrapper}>
            <div className={styles.infoCard}>
              <div className={styles.cardImg}>
                <img
                  src="/images/main/info10.jpg"
                  alt="Neon Notelgia - 본 작업은 도시 공간 속에서 흔히 스쳐 지나칠 수 있지만, 일상 속 필수적 정보를 전달하는 ‘사인(Sign)’의 의미에 주목한 공간 미디어 인스톨레이션이다."
                />
              </div>
              <div className={styles.overflowHidden}>
                <p ref={text10Ref}>
                  우리가 기억하는 서울,
                  <br />
                  잊고 있었던 서울,
                  <br />
                  그리고 상상 속의 서울
                </p>
              </div>
            </div>

            <div className={styles.infoCardFloating}>
              <div ref={section10Ref} className={styles.floatingBox}>
                <div className={`${styles.keyImg} ${styles.centerCardImg}`}>
                  <img
                    src="/images/main/info11.jpg"
                    alt="Resonance - 이 작업은 관람객이 디지털로 구현된 대나무 숲을 천천히 거닐도록 유도하며, 서울이라는 도시를 정의하는 ‘공식적인 언어’가 과연 진심을 담고 있는지, 아니면 더 깊은 진실을 감추 고 있는지를 스스로 질문하게 합니다."
                  />
                </div>
                <div ref={animatedText2Ref} className={`${styles.keyText} ${styles.colorWhite}`}>
                  Resonance
                </div>
                <div
                  className={`${styles.floatingImg} ${styles.floatingImgLeft} ${styles.cardSlowImg2}`}
                >
                  <img
                    src="/images/main/info12.jpg"
                    alt="빛의 기억 Memory of Light - 이 작품은 데이터의 흐름 속에서 생성되는 최소 단위의 조형성을 시각적으로 재현한 설치 작업입니다."
                  />
                </div>

                <div
                  className={`${styles.floatingImg} ${styles.floatingImgRight} ${styles.cardSlowImg}`}
                >
                  <img src="/images/main/info13.jpg" alt="전시를 즐기는 관람객의 모습" />
                </div>

                <div className={`${styles.overflowHidden} ${styles.subText}`}>
                  <p ref={text11Ref}>
                    언어로 설명되기 전의 순간,
                    <br />그 안에 숨어있는 진짜 아름다움은 무엇일까?
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.cardImg}>
                <img src="/images/main/info14.jpg" alt="전시 모습 중" />
              </div>
              <div className={styles.overflowHidden}>
                <p ref={text12Ref}>
                  축적된 서사와 데이터의 집합,
                  <br />
                  무의식적 기억의 형식
                </p>
              </div>
            </div>
          </div>
        </div>

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
                {inView && (
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/ZFWOwC_pmLw?autoplay=1&mute=1&loop=1&playlist=ZFWOwC_pmLw&controls=0&showinfo=0&modestbranding=1"
                    title="YouTube video player"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    className={styles.video}
                  />
                )}
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
                {/* 지도 */}
                {/* <div
                  id="daumRoughmapContainer1747889978369"
                  className="root_daum_roughmap root_daum_roughmap_landing"
                /> */}
                {/* 임시 지도 이미지 */}
                <div>
                  <img src="/images/main/location.png" alt="map" />
                </div>
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
