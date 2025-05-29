'use client';

import React, { useEffect, useRef, useState } from 'react';

import YouTube, { YouTubeEvent, YouTubeProps } from 'react-youtube';

const VIDEO_ID = 'ZFWOwC_pmLw';
const Player = () => {
  const [screen, setScreen] = useState({ height: window.innerHeight, width: window.innerWidth });
  const playerRef = useRef<YouTube>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>(null);

  const handleViewClick = async () => {
    const playInfos = playerRef?.current?.getInternalPlayer();
    const isMuted = await playInfos.isMuted();

    if (isMuted) {
      await playInfos?.unMute();
      return;
    }
    await playInfos?.mute();
  };

  const handlePlayerReady: YouTubeProps['onReady'] = async (event) => {
    await event.target.playVideo();
  };

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
  const handlePlayerStateChange: YouTubeProps['onStateChange'] = (event) => {
    const player = event.target;
    if (event.data === -1 || event.data === 5) return;
    if (event.data === YouTube.PlayerState.PLAYING) {
      intervalRef.current = setInterval(() => handleUpdateCurrentTime(player), 1000);
      return;
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      async ([entry]) => {
        const visible = entry.isIntersecting;
        if (!playerRef.current) return;

        if (!visible) {
          await playerRef?.current?.getInternalPlayer()?.mute();
        } else {
          await playerRef?.current?.getInternalPlayer().playInfos?.unMute();
        }
      },
      {
        threshold: 0.1, // 50% 이상 보여야 '보이는 것'으로 간주
      }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, [playerRef.current, containerRef.current]);

  useEffect(() => {
    const handleResize = () => {
      setScreen({ height: window.innerHeight, width: window.innerWidth });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div ref={containerRef} className="">
      <button
        className="absolute top-0 right-0 bottom-0 left-0 bg-transparent"
        onClick={handleViewClick}
      />

      <YouTube
        ref={playerRef}
        iframeClassName="embed embed-youtube"
        videoId={VIDEO_ID}
        id={VIDEO_ID}
        className="h-screen w-full"
        opts={{
          height: String(screen.height),
          width: String(screen.width),
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
            origin: window.location.origin,
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
