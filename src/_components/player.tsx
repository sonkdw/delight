'use client';

import React, { useEffect, useRef, useState } from 'react';
import YouTube, { YouTubeEvent, YouTubeProps } from 'react-youtube';

type SizeType = { height: number; width: number };

const VIDEO_ID = 'ZFWOwC_pmLw';

const Player = () => {
  const [size, setSize] = useState<SizeType>({
    height: 0,
    width: 0,
  });
  const playerRef = useRef<YouTube>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>(null);

  // 영상 클릭했을때 실행되는 핸들러(mute toggle)
  const handleViewClick = async () => {
    const playInfos = playerRef?.current?.getInternalPlayer();
    const isMuted = await playInfos.isMuted();
    if (isMuted) {
      await playInfos?.unMute();
      return;
    }
    await playInfos?.mute();
  };

  // 영상 준비되면 바로 시작
  const handlePlayerReady: YouTubeProps['onReady'] = async (event) => {
    await event.target.playVideo();
  };

  // 영상 재생시간 113초(마지막쯤) 넘어가면 영상 초기(4초)로 되돌려 재생
  const handleUpdateCurrentTime = async (player: YouTubeEvent['target']) => {
    if (!playerRef?.current) return;
    const targetYoutubeVideo = playerRef?.current;
    const playTime = await targetYoutubeVideo.getInternalPlayer().getCurrentTime();
    const canGoStartPoint = playTime > 113;
    if (canGoStartPoint) {
      player.seekTo(4, true);
      return;
    }
  };

  // 영상 재생 상태 변경 핸들러
  const handlePlayerStateChange: YouTubeProps['onStateChange'] = (event) => {
    const player = event.target;
    if (event.data === -1 || event.data === 5) return;
    if (event.data === YouTube.PlayerState.PLAYING) {
      intervalRef.current = setInterval(() => handleUpdateCurrentTime(player), 1000);
      return;
    }
  };

  // 유저 화면에서 영상이 안보이면 자동 뮤트 처리
  useEffect(() => {
    const observer = new IntersectionObserver(
      async ([entry]) => {
        const visible = entry.isIntersecting;
        if (!playerRef.current) return;

        if (!visible) {
          await playerRef?.current?.getInternalPlayer()?.mute(); //안보이면 뮤트 처리
        } else {
          await playerRef?.current?.getInternalPlayer().playInfos?.unMute();
        }
      },
      {
        threshold: 0.1, // 10% 이상 보여야 '보이는 것'으로 간주
      }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, [playerRef.current, containerRef.current]);

  useEffect(() => {
    if (!containerRef.current) return;
    const handleResize = () => {
      setSize({
        height: containerRef.current?.clientHeight ?? window?.innerHeight,
        width: containerRef.current?.clientWidth ?? window.innerWidth,
      });
    };
    handleResize();
    containerRef.current?.addEventListener('resize', handleResize);
    return () => containerRef.current?.removeEventListener('resize', handleResize);
  }, [containerRef.current]);

  return (
    <div ref={containerRef} className="z-50 h-full w-full">
      <button
        className="absolute top-0 right-0 bottom-0 left-0 bg-transparent"
        onClick={handleViewClick}
      />

      <YouTube
        ref={playerRef}
        iframeClassName="embed embed-youtube"
        videoId={VIDEO_ID}
        id={VIDEO_ID}
        className="w-full"
        opts={{
          height: String(size.height),
          width: String(size.width),
          playerVars: {
            autoplay: 1,
            loop: 1,
            mute: 1,
            start: 3,
            controls: 1,
            showinfo: 0,
            modestbranding: 0,
            playsinline: 1,
            enablejsapi: 1,
            disablekb: 1,
            'x-webkit-airplay': 'allow',
            'webkit-playsinline': true,
          },
        }}
        style={{ width: '100vw' }}
        onReady={handlePlayerReady}
        onStateChange={handlePlayerStateChange}
        onPlay={handlePlayerStateChange}
        onPause={handlePlayerStateChange}
        loading="lazy"
      />
    </div>
  );
};

export default React.memo(Player);
